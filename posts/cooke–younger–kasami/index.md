---
title: Cooke–Younger–Kasami
layout: post
date: 2020-07-22
description: An insight into the CYK parsing algorithm.
tags:
  - Theory of Computation
banner: ./data.jpg
---

So something I have been working on and learning about over the last few months is the field of Computation. 
Its interesting to look at and think about how langauges are processed.

I recently started learning about formal langauges, a set of pre-defined rules that allow input strings to be manipulated 
(or parsed) and enables validating membership of the string/sentence to the language.

I am by no means an expert in this area, and having covered it have huge admiration for people that have both 
contributed to this field and work in Theoretical Computer Science.

### Context-Free Langauges ###

We will dive into context-free langauges, a subclass of formal langauges. A context-free language is defined by a context-
free grammar, which consists of rules (also called productions). It is more powerful than [Finite Automata](https://en.wikipedia.org/wiki/Finite-state_machine) or 
[Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression).

An important application of context-free grammars occurs in the specification and compilation of programming languages (i.e compilers).

For the maths reader(s) the formal definition of a context-free grammar is a 4-tuple `(V, Σ, R, S)` where;
  
  1. `V` is a finite set called the variables,
  2. `Σ` is a finite set, disjoint from V , called the terminals,
  3. `R` is a finite set of rules, with each rule being a variable and a
  string of variables and terminals, and 
  4. `S ∈ V` is the start variable.

The following is an example of a context-free grammar, which we will call `G`

```
A → 0A1
B → b
B → #
```

Each rule appears as a line in the grammar, comprising a symbol and a string separated by an arrow (`symbol → string`).
- The symbol is called a **variable**.
- The string consists of variables and other symbols called **terminals**.

Things to note:
- variables are uppercase letters
- terminals are represented with lowercase letters or numbers

The first variable in the set of rules is known as the **start variable**. In our langauge `G`, the variables are `A and B` and the terminals are `0,1 and #`.

We can use a grammar to describe a language by generating each string of that language in the following manner.

1. Write down the start variable.
2. Find the rules that satisfy that variable and replace with the string on the right hand-side.
3. Repeat step 2 until there are only terminals.

Take the string `00#11`. The sequence of substitutions to obtain the string is called a **derivation**;

`A ⇒ 0A1 ⇒ 00A11 ⇒ 00#11`

Any string of variables and/or terminals derived from the start variable is called a **sentential form**.

This is a great [tool](https://web.stanford.edu/class/archive/cs/cs103/cs103.1156/tools/cfg/) that demonstrates this.

For those curious, context-free languages are closed under; union, concatenation, and Kleene star. I won't prove those in 
this post but if you're interested drop me a message! 📮

So that is some of the background on the topic of context-free langauges. Now let's get to the crux of this post. Efficient algorithms for deciding whether a string belongs to a context-free language do exist and we'll be covering one. They are based on parsing, which means the construction of a [parse tree](https://en.wikipedia.org/wiki/Parse_tree). 

Note: The parse tree represents the hierarchical structure of the string. 

### Cooke–Younger–Kasami ###


The Cooke–Younger–Kasami (CYK) algorithm is an `O(mnnn)` time algorithm for parsing context-free languages (the triple n isn't a typo, I mean n cubed). Here n refers to the number of words in the sentence, and m is the number of rules in the grammar. It is based on dynamic programming where the sentence is parsed by first processing short substrings (sub-sentences) that form a part of the whole, and combining the results to obtain a parse tree for the whole sentence.

Consider the following langauge `H`.

```
E → E+T
E → T
T → T*F
T → F
F → C
F → −C
C → 1
C → 0
C → 𝑥
```

We will transform the langauge `H` into Chomsky Normal Form by following these steps to simplify the rules.

1. Create new start variable 𝑆 (merge terminals with the same variables)
2. Remove `𝜖` rules (if applicable)
3. Remove all unit rules
4. Remove rules of length ≥ 3
5. Replace terminals with variables

```
S → EA | TB | 1 | 0 | 𝑥 | VC
E → EA | TB | 1 | 0 | 𝑥 | VC
T → TB |  1 | 0 | 𝑥 | VC
F → 1  |  0 | 𝑥 | VC
C → 1  |  0 | 𝑥
U → +
V → −
W → *
A → UT
B → WF
```

To parse a given string for this langauge, the CYK algorithm implementes a triangular table data structure that is shown as a lower triangular matrix (of size `n x n`).

So, this part is going to be a little chunky, bare with me.

The CYK algorithm operates by processing one row of the table at a time, starting from the bottom row which corresponds to *one-word* sub-sentences, and working its way to the top node that corresponds to the whole sentence. Given the string `1+1` we 
will implement the algorithm.

This shows the **dynamic programming** nature of the algorithm: the short sub-sentences are parsed first and used in parsing the longer sub-sentences and whole sentence.

The algorithm tries to find on each row any rules that could have generated the corresponding combination of symbols. 
On the bottom row, we can start by finding rules that could have generated each individual word (or terminal). 

So for example, we notice that the word `1` could have been generated by any of `S,E,T,F,C` and `+` can (only) by generated by the 
rule `U → +`. 

We now move one row up and consider rules which consist of two variables (also referred to as a binary rule). A binary rule can be applied in a given cell if the two symbols on the right side of the rule are found in cells that correspond to splitting the sub-sentence in the current cell into two consecutive parts. 

This means that in cell (2,3) for example, we can split the sub-sentence `+ 1` into two parts that correspond to cell (2,2) and 
(3,3) respectively. There are no such rules that satisfy any combination of variables when in cell (1,2).

We can apply this process again in cell (1,3), where the word `EA` is on the right side of two variables; `S and E`.

The CYK table for the string `1+1`;

|                   |           |                   |
|:-----------------:|:---------:|:-----------------:|
|     (1,3) `S`     |           |                   |
|      (1,2)        | (2,3) `A` |                   |
| (1,1) `S,E,T,F,C` | (2,2) `U` | (3,3) `S,E,T,F,C` |
|        1          |    +      |        1          |

Pseudocode for the CYK algorithm;
```
T = n x n array of empty lists
for each i = 1 to n:
  T[i,i] = [word[i]]
for len = 0,...,n-1:
  while rule can be applied:
    if x ⟶ T[i,i+len] for some x:
      add x in T[i,i+len]
    if x ⟶ T[i,i+k] T[i+k+1,i+len] for some k,x:
      add x in T[i,i+len]
```

### Parse Trees ###

When it is known that a string is a member of the langauge, we are able to contruct a parse tree to depict the derivations from 
the start variable to the word.

The derivations for the word `1+1` are; `S ⇒ EA ⇒ EUT ⇒ 1UT ⇒ 1+T ⇒ 1+1`

In the next post I'll go into more detail on how we would construct parse trees and the cover the application of this algorithm 
in Java with the langauge `H`.

If you're still reading this then - wow and why?! 

Let me know what you think and if anything was unclear or could be explained better then get in touch! 


