---
title: Constructing Parse Trees
date: 2020-07-24
description: Creating parse trees from the CYK table
tags:
  - Theory of Computation
banner: ./tree.jpg
---

Following on from my [previous post](https://pratikthanki.github.io/cooke-younger-kasami) we will build on 
our understanding of context-free languages and how we can construct parse trees.

Just a reminder, this is the pseudocode for the CYK algorithm;
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

And this is the CYK table for the string `1+1` in the langauge `H` we defined previously.

|                   |           |                   |
|:-----------------:|:---------:|:-----------------:|
|     (1,3) `S`     |           |                   |
|      (1,2)        | (2,3) `A` |                   |
| (1,1) `S,E,T,F,C` | (2,2) `U` | (3,3) `S,E,T,F,C` |
|        1          |    +      |        1          |

What you don't see in the pseudocode is a means to keep track of how we obtained each entry in the CYK table (at any cell). 
Each time we apply a rule, we should store the symbol(s) from the other cells where the symbols on the right side of the rule were found.

For example, in cell (2,3) we should store that `A` was found because `U` in cell (2,2) and `T` in cell `3,3` meet the conditions 
of a production in our langauge (`A → UT`). For cell (1,3) it is; `S → EA` from cells (1,1) `E` and (2,3) `A`.

It is important to store the entire production or at the very least the individual symbols that were used.

If there are multiple ways to obtain a symbol in a given cell, then we should store information about each possible way as a 
separate path. These different routes will correspond to different ways to parse the sentence.

After storing the productions to the symbols that enabled us to obtain the symbols in the higher rows of the table, we can work 
down the CYK table from the start symbol (`S`) to construct parse trees. By traversing the references between the symbols at the top 
(we will refer to each cel in the "path' as a node). 
If there is no `S` in the top node, the sentence is invalid/not grammatical, and it doesn't belong to the language at all.

In the above example there are many parse trees (or derivations) that would generate the string `1+1`. See if you can figure those out. 

Here is the parse tree based on the derivations (`S ⇒ EA ⇒ EUT ⇒ 1UT ⇒ 1+T ⇒ 1+1`);

```

   S     
┌──┴──┐  
E     A  
│   ┌─┴─┐
1   U   T
    │   │
    +   1
```


### Java Implementation ###

To track the productions as we move up the CYK table we can implement our own class object.

We have class implementations for the [`Rule`](https://github.com/pratikthanki/CsAtBath/blob/master/Foundations%20of%20Computation/Parser/computation/contextfreegrammar/Rule.java) 
and [`ParseTreeNode`](https://github.com/pratikthanki/CsAtBath/blob/master/Foundations%20of%20Computation/Parser/computation/parsetree/ParseTreeNode.java). 
I won't go into detail about them on this post, just that thay are here and how we store rules and parse tree we are building.

```Java
public class BackPointer {

    private Rule Rule;
    private List<Rule> ChildRules;
    private ParseTreeNode ParseTreeNode;

    public BackPointer(Rule rule) {
        Rule = rule;
        ChildRules = new ArrayList<>();
        ChildRules.add(this.Rule);
        addNodeFromRule(rule);
    }

    public BackPointer(Rule rule) {
        Rule = rule;
        addNodeFromRule(rule);
    }

    public BackPointer() {

    }

    /*
     * ...
     * getters and setters for all those properties
     * ...
     */

    public void addChildRule(Rule rule) {
        ChildRules.add(rule);
    }

    public void addChildRule(List<Rule> rule) {
        for (Rule r : rule) {
            ChildRules.add(r);
        }
    }

    /**
     * Add a list of parse tree nodes to the backpointer which got to this point.
     *
     * @return void
     */
    public void addChildNode(List<ParseTreeNode> node) {
        assert node.size() < 3 && node.size() > 0;
        if (node.size() == 2) {
            this.ParseTreeNode = new ParseTreeNode(this.Rule.getVariable(), node.get(0), node.get(1));
        }
        if (node.size() == 1) {
            this.ParseTreeNode = new ParseTreeNode(this.Rule.getVariable(), node.get(0));
        }
    }

    /*
     * Add a ParseTreeNode to the BackPointer instantiated object based on the rule
     * provided in the constructor
     */
    private void addNodeFromRule(Rule rule) {
        if (rule.getExpansion().isTerminal()) {
            Terminal terminal = new Terminal(rule.getExpansion().toString().charAt(0));
            Variable variable = rule.getVariable();
            this.ParseTreeNode = new ParseTreeNode(variable, new ParseTreeNode(terminal));
        }
    }
}
```

Full [`BackPointer`](https://github.com/pratikthanki/CsAtBath/blob/master/Foundations%20of%20Computation/Parser/_CYK/BackPointer.java) code is on GitHub.

Considering the BackPointer, we can now look at how the CYK algorithm is implemented in Java to parse the string and move up the CYK table.


Lets start by instantiating the CYK table in our new method `cykRecogniser` which takes a langauge and a word.

The [`Word`](https://github.com/pratikthanki/CsAtBath/blob/master/Foundations%20of%20Computation/Parser/computation/contextfreegrammar/Word.java)
and [`ContextFreeGrammar`](https://github.com/pratikthanki/CsAtBath/blob/master/Foundations%20of%20Computation/Parser/computation/contextfreegrammar/ContextFreeGrammar.java) 
classes are objects that do and act as we have already covered. The language is expected to be in **Chomsky Normal Form**.


```Java
private void cykRecogniser(ContextFreeGrammar cfg, Word word) {

    List<List<List<BackPointer>>> cykTable = new ArrayList<>(word.length());
    for (int i = 0; i < word.length(); i++) {
        cykTable.add(new ArrayList<>(word.length() - i));
        for (int j = word.length() - i - 1; j >= 0; j--) {
            cykTable.get(i).add(new ArrayList<>());
        }
    }
}
```


We will create convenient helper method to find all rules based any a combination or variables from two different cells in the CYK table;

```Java
/* Return a list of rules based on the language and the word */
private List<Rule> getRulesForWord(ContextFreeGrammar cfg, Word word) {
    List<Rule> rules = new ArrayList<>();
    for (Rule rule : cfg.getRules()) {
        if (rule.getExpansion().equals(word))
            rules.add(rule);
    }
    return rules;
}
```


Now, we should start by finding all variables for the terminals in the string, this can be added under what we already have for our `cykRecogniser`;

```Java
for (int i = 0; i < word.length(); i++) {
    Word symInWord = new Word(String.valueOf(word.get(i)));
    List<Rule> rules = getRulesForWord(cfg, symInWord);

    for (Rule validRule : rules) {
        cykTable.get(0).get(i).add(new BackPointer(validRule));
    }
}
```


This is the main loop over the word based on the pseudocode to validate membership of the word in the langauge. 
For every loop of the word we will:
- examine each combination of a variable with differing lengths 
- if we find matches, track which variables (from which cells) resulted in the match 
- create new nodes at every point up the table

```Java
for (int i = 1; i < word.length(); i++) {

    for (int k = 0; k < word.length() - i; k++) {

        for (int l = 0; l < i; l++) {

            // set of indexes to access 3D array
            int X1 = i - l - 1;
            int Y1 = k;
            int X2 = l;
            int Y2 = i - l + k;

            List<BackPointer> currentVariable = cykTable.get(X1).get(Y1);
            List<BackPointer> nextVariable = cykTable.get(X2).get(Y2);

            for (int c = 0; c < currentVariable.size(); c++) {

                for (int n = 0; n < nextVariable.size(); n++) {

                    // Combine the two variables in this iteration so we can check if 
                    // that word is on the right side of any production.
                    Word possibleWord = new Word(
                        currentVariable.get(c).getRule().getVariable(), 
                        nextVariable.get(n).getRule().getVariable()
                    );

                    List<Rule> rules = getRulesForWord(cfg, possibleWord);

                    for (Rule validRule : rules) {
                        // Create new BackPointer from all productions (rules) found 
                        BackPointer bp = new BackPointer(validRule);

                        // Based on our current position we retrieve the cell from the CYK table
                        BackPointer bpCurrent = cykTable.get(X1).get(Y1).get(c);
                        BackPointer bpNext = cykTable.get(X2).get(Y2).get(n);

                        // Add child rules if comination of symbols produce a Variable
                        bp.addChildRule(bpCurrent.getChildRules());
                        bp.addChildRule(bpNext.getChildRules());

                        // Add list of nodes from both symbols that would have got to that point of the CYK table
                        bp.addChildNode(Arrays.asList(bpCurrent.getParseTreeNode(), bpNext.getParseTreeNode()));

                        // Append BackPointer object to the cell of the iteration
                        cykTable.get(i).get(k).add(bp);
                    }
                }
            }
        }
    }
}
```

You maybe thinking, "this is cool, but even I can do this without a fancy kyc algorithm or whatever its called?"

And you're right. The fun really starts when we work with; 1. longer string 2. more complicated rules.

Here are a few **cool** examples that our CYK algorithm has parsed;

`-x+x+1*0+0*-0+0`

```

                            S           
                    ┌───────┴───────┐   
                    E               A   
            ┌───────┴───────┐     ┌─┴─┐ 
            E               A     U   T 
      ┌─────┴─────┐      ┌──┴──┐  │   │ 
      E           A      U     T  +   0 
  ┌───┴───┐    ┌──┴──┐   │  ┌──┴──┐     
  E       A    U     T   +  T     B     
┌─┴─┐   ┌─┴─┐  │  ┌──┴──┐   │  ┌──┴──┐  
V   C   U   T  +  T     B   0  W     F  
│   │   │   │     │   ┌─┴─┐    │   ┌─┴─┐
-   x   +   x     1   W   F    *   V   C
                      │   │        │   │
                      *   0        -   0
```

`1+1+-0*x+1*0*0`

```

                     S                       
         ┌───────────┴───────────┐           
         E                       A           
   ┌─────┴─────┐             ┌───┴───┐       
   E           A             U       T       
┌──┴──┐    ┌───┴───┐         │  ┌────┴────┐  
E     A    U       T         +  T         B  
│   ┌─┴─┐  │   ┌───┴───┐     ┌──┴──┐    ┌─┴─┐
1   U   T  +   T       B     T     B    W   F
    │   │    ┌─┴─┐   ┌─┴─┐   │   ┌─┴─┐  │   │
    +   1    V   C   W   F   1   W   F  *   0
             │   │   │   │       │   │       
             -   0   *   x       *   0       
```

Or this mammoth of a string 🐘:

`-x+1*-x+1*0+0*-0+0+0*-x*-x+1*-x+1*0+0*-0+0+0*-x`

```

                                                                                         S                    
                                                                                ┌────────┴────────┐           
                                                                                E                 A           
                                                                       ┌────────┴────────┐     ┌──┴──┐        
                                                                       E                 A     U     T        
                                                             ┌─────────┴─────────┐     ┌─┴─┐   │  ┌──┴──┐     
                                                             E                   A     U   T   +  T     B     
                                                  ┌──────────┴──────────┐     ┌──┴──┐  │   │      │  ┌──┴──┐  
                                                  E                     A     U     T  +   0      0  W     F  
                                      ┌───────────┴───────────┐      ┌──┴──┐  │  ┌──┴──┐             │   ┌─┴─┐
                                      E                       A      U     T  +  T     B             *   V   C
                             ┌────────┴────────┐           ┌──┴──┐   │  ┌──┴──┐  │  ┌──┴──┐              │   │
                             E                 A           U     T   +  T     B  0  W     F              -   x
                     ┌───────┴───────┐    ┌────┴────┐      │  ┌──┴──┐   │   ┌─┴─┐   │   ┌─┴─┐                 
                     E               A    U         T      +  T     B   1   W   F   *   V   C                 
             ┌───────┴───────┐     ┌─┴─┐  │   ┌─────┴─────┐   │  ┌──┴──┐    │   │       │   │                 
             E               A     U   T  +   T           B   1  W     F    *   0       -   0                 
      ┌──────┴──────┐     ┌──┴──┐  │   │   ┌──┴──┐     ┌──┴──┐   │   ┌─┴─┐                                    
      E             A     U     T  +   0   T     B     W     F   *   V   C                                    
  ┌───┴───┐      ┌──┴──┐  │  ┌──┴──┐       │  ┌──┴──┐  │   ┌─┴─┐     │   │                                    
  E       A      U     T  +  T     B       0  W     F  *   V   C     -   x                                    
┌─┴─┐  ┌──┴──┐   │  ┌──┴──┐  │  ┌──┴──┐       │   ┌─┴─┐    │   │                                              
V   C  U     T   +  T     B  0  W     F       *   V   C    -   x                                              
│   │  │  ┌──┴──┐   │   ┌─┴─┐   │   ┌─┴─┐         │   │                                                       
-   x  +  T     B   1   W   F   *   V   C         -   x                                                       
          │  ┌──┴──┐    │   │       │   │                                                                     
          1  W     F    *   0       -   0                                                                     
             │   ┌─┴─┐                                                                                        
             *   V   C                                                                                        
                 │   │                                                                                        
                 -   x                                                                                        




```

I hope you have found this post useful. There are a lot of parts to take in and some that we have glossed over. 
If you're interested [Michael Sipser's Introduction to the Theory of Computation](https://www.amazon.co.uk/Introduction-Theory-Computation-International-Michael/dp/1133187811)
covers these areas better than anywehere I have read.

You can find all the code on [GitHub](https://github.com/pratikthanki/CsAtBath/tree/master/Foundations%20of%20Computation/Parser). 
If you have any questions or comments please let me know!

Pratik Thanki ✌️
