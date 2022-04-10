---
title: Relational Algebra
layout: post
date: 2020-10-09
description: 
tags:
- Relational Algebra
---

I have been using SQL for 5+ years now and took something like; `SELECT * FROM [myTable]` for granted, never again! 

Appreciating how something is done rather than just what to do and when is where I have ventured towards with SQL and 
generally relational database systems. I recently started looking at relational algebra and how it underpins querying langauge.

## What is relational algebra?

Before I answer that, if you didn't study maths beyond _Pythagoras' Theorem_ that's OK! Algebra, more broadly is a system 
consisting; 
- *operands*: variables or values from which new values can be constructed
- *operators*: symbols denoting procedures that construct new values from given values 

Getting back to the initial question, relational algebra is a collection of algebraic operators that are defined on relations 
and produce relations as results.

Relational algebra was first created by Edgar Codd at IBM and is a form of `well-founded semantics` for modelling data stored in 
relational databases, and defining queries on it. You can read the 
[June 1920](https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf) paper.

## Operators

### Unary

- Restriction: picking certain rows
- Projection: picking certain columns

### Binary

- Cartesian Product: all combination of sets across two tables
- Union: append multiple sets with the same number of columns 
- Difference

### Other

Composition of relations over the same attributes
- Joins
- Intersection
- Division


## Test Data

Consider the set `Athletes` with the attributes `Name, Height, Weight, Age`;

```
(
  ('Bob', 180, 75, 25),
  ('John', 170, 82, 21),
  ('Sam', 185, 80, 27),
  ('Adam', 175, 70, 30),
  ('Paul', 190, 95, 35)
)
```

And the set `Teams` with the attributes `Team, Name`;

```
(
  ('Red', 'Bob'),
  ('Red', 'John'),
  ('Blue', 'Sam'),
  ('Blue', 'Adam'),
  ('Green', 'Paul')
)
```

## Examples

`Selection` of sets where `Age > 30` would return all attributes and the subsets, `σ Age>30 (Athletes)`

```
(
  ('Paul', 190, 95, 35)
)
```

`Projection` of attributes `Name, Height` and the subsets, `Π Name,Height (Athletes)`;

```
(
  ('Bob', 180),
  ('John', 170),
  ('Sam', 185),
  ('Adam', 175),
  ('Paul', 190)
)
```

`Rename` of the attribute `Name`; `ρ Athlete/Name (Athletes)`

`Natural Join` of the sets `Athletes` and `Teams`, `Athletes ⋈ Teams`;

```
(
  ('Bob', 180, 75, 25, 'Red'),
  ('John', 170, 82, 21, 'Red'),
  ('Sam', 185, 80, 27, 'Blue'),
  ('Adam', 175, 70, 30, 'Blue'),
  ('Paul', 190, 95, 35, 'Green')
)
```

This was a brief overview on relational algebra and how it underpins database querying, for more information you should also 
consider reading more about [Set Theory](https://en.wikipedia.org/wiki/Set_theory). SQL is an implementation of 
[multi-set theory](https://en.wikipedia.org/wiki/Multiset).
