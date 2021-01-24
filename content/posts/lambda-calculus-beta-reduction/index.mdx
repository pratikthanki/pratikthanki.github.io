---
title: Lambda Calculus Beta Reduction
date: 2021-01-24
description: The theory of functions
tags:
  - Functional Programming
---

Further to my previous post on [Lambda Calculus](../lambda-calculus), here I'll share implementation of 
[Beta Reduction](https://en.wikipedia.org/wiki/Lambda_calculus).

## Beta-Reduction

Formally, beta reduction (also written `β-reduction`) is the replacement of a bound variable in a 
function body with a function argument. The purpose of `β-reduction` is to compute the result of a 
function by function application using specific rules.

Some helper functions:

```hs

applyL :: Term -> Term -> Term
applyL a b = Apply a b

applyR :: Term -> Term -> Term
applyR a b = Apply b a

lambda :: Var -> Term -> Term
lambda x m = Lambda x m

```

In applying beta-reduction we will follow these steps:
- build (\x.(βM))N
- build (\x.M)(βN)
- build (βM)N
- build M(βN)
- build \x.(βM)
- recursion terminator

## Normal Order Reduction

Normal‐order reduction, also known as leftmost outermost reduction and standard reduction, is a 
valuable reduction strategy because normal‐order reduction always produces an answer, if there is one.

Outermost reduction strategies always reduce an outermost redex, i.e., a redex which is not inside 
any other redex.

Putting this reduction strategy into algorithmic terms:
- A term of the form x is a normal form, with no need to reduce.
- Given a term of the form MN, consider the shape of M:
  - If M is `λx.M′`, the whole term is `(λx.M′)Ns`. Reduce this redex.
  - Otherwise, look for a redex in M (i.e. look on the left) and reduce it if you find it. 
  If there isn’t one, look for a redex in N and reduce that.

```hs

beta :: Term -> [Term]
beta (Apply (Lambda x m) n) = (substitute x n m):(concat [betaM, betaN])
  where
    betaM = map (applyR n) (map (lambda x) (beta m))
    betaN = map (applyL (lambda x m)) (beta n)
beta (Apply m n) = concat[(map (applyR n) (beta m)), (map (applyL m) (beta n))]
beta (Lambda x m) = map (lambda x) (beta m)
beta (Variable v) = []

```

We will need four pattern-matching cases: one to see if the term is a redex, and if not, the three 
usual cases for `Term` to look further down in the term (as mentioned previously).

In the first case, we should consider looking for further redexes as well. Since `beta` returns a list, 
we will have to be mindful of recursive calls.

```hs

normalize :: Term -> [Term]
normalize t | (null (beta t)) = t:[]
            | otherwise       = t:(normalize (beta t !! 0))


normal :: Term -> Term
normal t | (null (beta t)) = t
         | otherwise       = normal (beta t !! 0)

```

## Applicative Order Reduction

Applicative-order reduction is the leftmost innermost reduction strategy. That is to say, you look for 
all the innermost redexes, and then pick the leftmost one and reduce that.

Here is applicative-order reduction as an algorithm:
- A term of the form x is in normal form, nothing to reduce.
- Given a term of the form λx. M, find a redex in M and reduce that.
- Given a term of the form MN, look for a redex inside M and reduce that. If you don’t find one, look 
inside N instead. If there isn’t one there, perhaps M has the form λx.M', in which case the whole term 
is a redex, reduce that.

Because this is an innermost strategy, we only reduce a redex when we are sure that there are no other 
redexes inside it.

```hs

a_beta :: Term -> [Term]
a_beta (Apply (Lambda x m) n) = concat [a_betaM, a_betaN,[(substitute x n m)]]
  where
    a_betaM = map (applyR n) (map (lambda x) (a_beta m))
    a_betaN = map (applyL (lambda x m)) (a_beta n)
a_beta (Apply m n) = concat[(map (applyR n) (a_beta m)), (map (applyL m) (a_beta n))]
a_beta (Lambda x m) = map (lambda x) (a_beta m)
a_beta (Variable v) = []  


a_normalize :: Term -> [Term]
a_normalize t | (null (a_beta t)) = t:[]
              | otherwise       = t:(a_normalize (a_beta t !! 0))


a_normal :: Term -> Term
a_normal t | (null (a_beta t)) = t
           | otherwise         = a_normal (a_beta t !! 0)

```

To demonstrate our understanding, here are two examples where:
- `example1` reduces to normal form in more steps with normal order than with applicative order reduction
- `example2` reduces to normal form in fewer steps with normal order than with applicative order reduction

```hs

identity = Lambda "x" (Variable "x")
dup = Lambda "x" (Apply (Variable "x") (Variable "x"))

example1 :: Term
example1 = Apply (numeral 3) (numeral 3)

example2 :: Term
example2 = Apply (Lambda "y" identity) example1

```

## Summary

### Leftmost‐outermost/normal order

- Inefficient: duplicates before evaluating, duplicating work
- Terminating: will always find a normal form if one exists

### Leftmost‐innermost/applicative order

- Efficient: doesn’t duplicate work
- Non-terminating: may not find a normal form, even if one exists

We can compare this to Haskell, which uses lazy evaluation/call by need
- Efficient: will evaluate when needed, once, or not at all;
- Terminating: will always find a normal form if one exists;
- Computational effects become more difficult to handle;
- Implementation is more complicated and creates overhead.

Thanks for reading!

Pratik Thanki ✌️
