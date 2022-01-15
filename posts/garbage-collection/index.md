---
title: Garbage Collection
layout: post
date: 2021-09-04
description: What is it and how does it work?
tags:
  - .NET
---

TL;DR: The garbage collector (GC) manages the allocation and release of memory 
for an application.


## Background

Garbage Collection is an important aspect of programming developers need to be more 
mindful of in some languages than otherwise. In C# this is handled by the 
[Common Language Runtime](https://docs.microsoft.com/en-us/dotnet/standard/clr).

C/C++ are unmanaged languages where the developer is responsible for memory management 
and security considerations. In contrast, managed code (C#, F# and Visual Basic to name 
a few) can be run on top of .NET. When you write and compile code in these high-level 
languages you get Intermediate Language code which the runtime then compiles and executes.


## Garbage Collection

Using C# as an example hereon, each time a new object is created the common language 
runtime allocates memory for the object from the managed heap. The runtime continues 
to allocate space for new objects as long as their is address space available in the 
managed heap.

Considering memory is not infinite, at some point the GC must free up some memory. The 
optimization engine determines the best time to perform a collection, based upon the 
allocations being made. When the GC performs a collection to reclaim memory it checks 
for objects in the managed heap that are no longer being used.


## Memory

Running processes have their own virtual address space while multiple processes on the 
same machine share the same physical memory. Processes running on 32-bit computers have 
2-GB user-mode virtual address space. The garbage collector allocates and frees virtual 
memory for you on the managed heap.

When you initialize a new process, the runtime reserves a contiguous region of address 
space for the process which is referred to as the managed heap. The managed heap maintains 
a pointer to the address where the next object in the heap will be allocated. All reference 
types are allocated on the managed heap.

The GCs optimizing engine determines the best time to perform a collection based on the 
allocations being made. When the GC performs a collection it determines which objects are 
no longer being used by examining the applications roots.

An application's roots include static fields, local variables on a thread's stack, CPU 
registers, GC handles, and the finalize queue.


## Collection

Garbage Collection only occurrs when one of the following conditions is true:
1. If the system has low physical memory.
2. If the memory allocated to various objects in the managed heap exceeds pre-set 
thresholds.
3. If the `GC.Collect` method is called, this is uncommon and mostly for unique 
situations/ testing.

Before a garbage collection starts, all managed threads are suspended except for the 
thread that triggered the garbage collection.


## Benefits 

GC provides the following benefits:
- Develop application without having to free memory manually.
- Allocate objects on the managed heap efficiently.
- Reclaim objects that are no longer being used, clears their memory, and keeps the 
memory available for future allocations.
- Provides memory safety by making sure that an object cannot use the content of another 
object.


## Generations

In 1984 David Ungar came up with a [generational hypothesis](https://people.cs.umass.edu/~emery/classes/cmpsci691s-fall2004/papers/p157-ungar.pdf) 
which gave birth to the generational garbage collectors. 

The GC algorithm is based on several considerations:
- It's faster to compact the memory for a portion of the managed heap than for the entire 
managed heap.
- Newer objects have shorter lifetimes and older objects have longer lifetimes.
- Newer objects tend to be related to each other and accessed by the application around the 
same time.

Garbage collection primarily occurs with the reclamation of short-lived objects. The managed 
heap is divided into three generations to optimize the performance of the garbage collector. 
Generations 0, 1, and 2, so it can handle long-lived and short-lived objects separately. 

The garbage collector stores new objects in generation 0. Generation 1 and 2 store objects created 
early in the application's lifetime that survive collections (and thus promoted, more details on 
this to follow).

The reason for this is that it is more performant to compact a portion of the managed heap than 
the entire heap, thus releasing the memory in a specific generation rather than release the memory 
for the entire managed heap each time it performs a collection.


## Survival and promotions

Objects that are not reclaimed in a garbage collection are known as survivors and are promoted to 
the next generation:
- Objects that survive a generation 0 garbage collection are promoted to generation 1.
- Objects that survive a generation 1 garbage collection are promoted to generation 2.
- Objects that survive a generation 2 garbage collection remain in generation 2.


## What happens during a garbage collection?

A garbage collection has the following phases:
- *Marking* : Finds and creates a list of all live objects.
- *Relocating* : Updates the references to the objects that will be compacted.
- *Compacting* : Reclaims the space occupied by the dead objects and compacts the surviving objects. 
The compacting phase moves objects that have survived a garbage collection toward the older end of 
the segment.

This is just a high-level overview of my knoweldge, the [MS Docs](https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/) 
provie a great overview of GC if you want to know more.


