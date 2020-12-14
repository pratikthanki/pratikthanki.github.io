---
title: Lambda Calculus
date: 2020-12-14
description: The theory of functions
tags:
  - Functional Programming
---

In broadening my understand of CS principles I recently started learning about Functional Programming (or FP). In 
this post we'll cover what underpins FP, Lambda Calculus (λ-calculus).

Lambda calculus is a theory of functions first proposed by Alonzo Church in the 1930s. If his name sounds familiar 
you'd be right! I mentioned him in my [Turing Machines](../turing-machines/index.mdx) post. 

We can think of lambda calculus as the mathematical foundation of functional programming – an underpinning 
explanatory tool.

Lambda calculus is a formal system in which every lambda term denotes a function and any term (function) can be 
applied to any other term. **So, functions are inherently higher order.**

The syntax and semantics of lambda calculus are very small and simple. 

Lambda calculus is a fully expressive language of computatable functions (i.e. Turing complete). For example, it can 
represent integers, etc. Effectively, this makes it a complete programming language.

# Functional Programming

Functional programming is all about programming using only functions, a very different paradigm to imperative programming
which uses sequences of commands in an ordered manner. This can have adverse effects if the order in which values are 
changed is unpredictable.

In essence, the key concept of FP is **Modularity**. The program functions are always defined in terms of other functions which 
are further defined in terms of smaller functions.

Haskell is an example of a functionalal programming language that is:
- Functional
  - Functions are mathematical objects that we think of as taking an input and computing an output from it.
- Statically typed
  - Everything in Haskell has a type. A type is something that tells you what kind of a thing it is.
- Has lazy evaluation
  - Haskell only evaluates those parts of the program that it really needs to and doesn’t bother with the bits that it 
  doesn’t need to.

Scala and Lisp are examples of other functional programming languages. Many imperative programming languages now include 
some sort of support for programming with functions.

Why functional programming matters? by John Hughes summarises FP perfectly:
```
The functional programmer sounds rather like a medieval monk, denying himself the pleasures of life in the hope that it will make him virtuous. To those more interested in material benefits, these “advantages” are totally unconvincing.
```

## Functions 

Functions are mathematical objects which we think of as taking an input and computing an output from it. Functional programs 
contain no assignment statements and as such, no side-effects. 

The function will produce the same output every time for the same set of inputs.

An example in Haskell, a function has two parts

1. type signature

```
<function> :: <type>
```

You don't need to specify the type signature, Haskell will figure this out. However, its better to do so as this can root 
out any mistakes in the function.

2. function declaration

```
<function> <parameters> = <function body>
```

Take this example that adds two to its input.

```
addtwo :: Integer -> Integer
addsix x = x + 2

```

Or this example that returns the absolute of its input. Guards let our functions behave differently in different situations. 
They are a convenient notation for conditional evaluation (i.e if-then-else).

```
absolute :: Int -> Int
absolute x
  | x < 0      = -x
  | otherwise  = x
```

## Recursion

Recursion is another important aspect of CS used extensively in FP. Take the following example which calculates the factorial on 
the given input.

```
factorial :: Integer -> Integer
factorial x
  | x <= 1 =1
  | otherwise = x * factorial (x -1)
```

This is recursive is because the factorial function is referred to in the declaration or body of the function.

We can invoke the function like so: `factorial 4`

Each time the value minus one passed into `factorial`, resulting in: `4 * 3 * 2 * 1 = 24`

This is aother recursion example: 

```
total :: [Int] -> Int
total [] = 0
total (x:xs) = x + total xs
```

## Currying 

Another approach to functions with multiple arguements is called *currying* (after the logician Haskell B. Curry).

The idea is that functions receive arguments one at a time. When there are still arguments to come, we still have a function 
rather than an answer.

An interesting example of this is the `max` function. This function takes an integer as an input, outputs a function that takes 
an integer as an input and returns the maximum of the two inputs. 

```
max :: Integer -> (Integer -> Integer)
```

Boolean values allows us to dive deeper into currying. 
```
True :: Bool
False :: Bool
```

`not` is an example of a function that takes a boolean input and returns a boolean output: `not :: Bool -> Bool`

Logical `and` (`&&`) takes two boolean values and compares them to return a boolean value: `(&&) :: Bool -> Bool -> Bool`

Logical `or` (`||`): `(||) :: Bool -> Bool -> Bool`

In Haskell, you can turn an infix operation such as `&&` into an ordinary function by putting it into parentheses, 
so that `&&` becomes the prefix `(&&)`:

```
True && True :: Bool
(&&) True False :: Bool
```

When we are using some maths operators on integers, we can write them in prefix notation like so:

```
(+), (*), (-), (^) :: Integer -> Integer -> Integer
```

Other functions in prefix notation and using integers as arguments include:

```
min, max, div, mod ::  Integer -> Integer -> Integer
(==), (<=), (>=), (<), (>) ::  Integer -> Integer -> Bool
```

## Lambda Calculus

The syntax of λ-calculus is given by the following grammar: `M,N :: = x | λx.M | MN`

Where `x` ranges over an infinite collection of variables. `M` in this definition means some term of the λ-calculus.

If we write something down in the form of `λ-variable.λ–term` then the two together become a new λ-term.

The syntax is a BNF (Backus-Naur Form) grammar, and it gives us an inductive definition of the set of λ-terms (as 
in it builds things up piece by piece).

- Any variable x is a term of λ-calculus.
- If M is a term and x is a variable, then  λx.M is a term.
- If M and M are terms, then so is MN 

Putting this altogether.

Take the function `λx.M`, it has an argument `x` and behaves like `M`. When `λx.M` is applied to some argument, `M` will be 
"evaluated" with x bound to the argument. This term is also referred to as `λ–abstractions`.

Another example is `MN`, the application of function `M` to argument `N`.

The BNF grammar describes the abstract syntax of the language. Every term is one of the following:
- a variable
- an abstraction, with two further pieces of information:
  - the variable being abstracted – the `x` of `λx.M`
  - the body of the abstraction – the `M` of `λx.M`
- an application, with two further pieces of information:
  - the function part of the application – the `M` of `MN`
  - the argument part of the application – the `N` of `MN`

## Haskell Implementation

Lets start with a basic example of implementing Church numerals in Haskell for a given integer.

Church numerals use lambdas to create a representation of numbers. The idea is closely related to the functional 
representation of natural numbers. Where `L = λ` below.

```
zero  = Lf.Lx.x
one   = Lf.Lx.(f x)
two   = Lf.Lx.(f (f x))
three = Lf.Lx.(f (f (f x)))
four  = Lf.Lx.(F (f (f (f x))))

```

Here, we have our numeral function which take an `Int` and returns our representation of a `Term`:

```hs
numberToTerm :: Int -> Term
numberToTerm i
  | i == 0    =  Variable "x"
  | otherwise = Apply(Variable "f")(numberToTerm(i-1))

numeral :: Int -> Term
numeral i = Lambda "f" (Lambda "x" (numberToTerm i))

```

### Variables

Now, lets look at creating functions to generate variables. The `variables` function can build a list of strings 
which contain every letter of the alphabet and a number. That increments with every loop.

```hs

-- Helper function for 'variables' function
alphabet :: [Var]
alphabet = [[c] | c <- ['a'..'z']]

variables :: [Var]
variables = alphabet ++ [c : i | i <- map show [1..], c <- ['a'..'z']]

```

`filterVariables` is our function to remove `Term`'s from list 1 based on items in list 2.

```hs
filterVariables :: [Var] -> [Var] -> [Var]
filterVariables [] [] = []
filterVariables [] _ = []
filterVariables _ [] = []
filterVariables (x:xs) (y:ys)
  |  x `elem` (y:ys)  =  filterVariables xs (y:ys)
  | otherwise         = x : filterVariables xs (y:ys)

```

Building on the above we can create a function `fresh` to generate a variable that does not occur in the list.

```hs
fresh :: [Var] -> Var
fresh list = head (filterVariables variables list)

```

And now, to put everything (we have done so far) together we can create a `used` function which collects all the 
variable names used in a `Term`, both as a "Variable" and in a "Lambda" abstraction and return them in an ordered list.

```hs
-- Helper function for 'used' function
termToVariableNames :: Term -> [Var]
termToVariableNames (Apply n m)   = merge (termToVariableNames n) (termToVariableNames m)
termToVariableNames (Lambda z n)  = sort(z : termToVariableNames n)
termToVariableNames (Variable z)  = [z]

toUnique :: (Eq x) => [x] -> [x]
toUnique [] = []
toUnique (y:ys) = y : toUnique (filter (/= y) ys)


used :: Term -> [Var]
used x = toUnique(termToVariableNames x)

```

Based on our goal of implementing lambda calculus we need both a `rename` and `substitute` function which implements 
capture-avoiding substitution.

For example, `rename x y m` renames `x` to `y` in the term `m`, i.e., `M[y/x]`.

And, `substitute x n m` corresponds to `M[N/x]`

```hs
rename :: Var -> Var -> Term -> Term
rename x y (Apply n m) = Apply (rename x y n) (rename x y m)
rename x y (Lambda z n) 
  | z == x    = Lambda z n
  | otherwise = Lambda z (rename x y n)
rename x y (Variable z) 
  | z == x    = Variable y
  | otherwise = Variable z


substitute :: Var -> Term -> Term -> Term
substitute x n (Apply y m) = Apply(substitute x n y) (substitute x n m)
substitute x n (Lambda y m)
  | y == x    = Lambda y m
  | otherwise = Lambda z (substitute x n (rename y z m))
  where z = fresh (merge (merge (used m) (used n)) [x])
substitute x n (Variable y)
  | y == x    = n
  | otherwise = Variable y

```

That's quite a lot that has been covered in this post; from a brief overview of Haskell, Functional Programming to an
Introduction to Lambda Calculus. The fun really started with implementing lambda calculus in Haskell. In a follow-up 
post I will cover the concept of beta-reduction and how that can be implemented in Haskell.

Thanks for reading!

Pratik Thanki ✌️
