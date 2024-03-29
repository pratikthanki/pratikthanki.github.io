---
title: System Threading Channels
layout: post
date: 2020-08-31
description: 
tags:
- .NET
---

Working in an environemnt where I handle (huge) data in a .NET architecture, something I've learnt more about is [Channels](https://devblogs.microsoft.com/dotnet/an-introduction-to-system-threading-channels/) (thanks W).


## Background

Given the rise of data-intensive and focused applications, undestanding how the data is produced and handled in the pipeline can 
be underestimated. I will never undervalue data prepared in a database or at the other end of an API (ever again)!

Simply, Channels is a data structure to store data as a consumer from the producer whilst allowing for notifications in both directions. 
It is a concept of synchronisation between components (or producers and consumers) where data is also passed concurrently. It comes in the form; 
`Channel<T>` for reading and writing.

In a practical sense one or more producers of data writes into the Channel which is then read by one or many consumers. Strictly speaking. 
a Channel is a [thread-safe](https://stackoverflow.com/questions/261683/what-is-the-meaning-of-the-term-thread-safe) queue.

Some of the important questions that should be answered when looking to handle data, with or without Channels;

- Should the consumer (data handler) be able to hold an unbounded number of items? 
- If not, what should happen when it fills up? 
  - When there is room should there be some form of watermark before requesting data or for every space that becomes available?
- How critical is performance? 
- Do we need to try to minimize synchronisation? 
- Can we make any assumptions about how many producers and consumers are allowed concurrently? 


## Why?

Channels are useful in data-intensive applications that employ a queue processing service. 

Take for an instance, a producer (service) polling an endpoint for messages/data - which is written to the channel. Concurrently, 
the consumer task reads from the queue as soon as messages are written to the channel. For performance enthusiasts, the producer/
consumer tasks are split and all data is passed through the channel.

In the event, the producer is writing more messages to the channel than the consumer is processing from the channel more consumer 
tasks can be created. If either performs more efficiently than the other they can be scaled accordingly to achieve better through-put. 


## Getting Started

`System.Threading.Channels` is part of the shared framework in .NET Core, meaning you don't need to install anything - winning! 
There is also a NuGet package and the code is in the [dotnet/runtime](https://github.com/dotnet/runtime/tree/df3930ecd237000813d1833286513d65557efffe/src/libraries/System.Threading.Channels) repo.

There is a static `Channel` class which provides methods for creating channels.

This is still something I am learning about, I wanted to write about what I know so far to consolidate my knowledge and share 
with anyone keen on steaming data-architectures (of course!) 😂

I <s>am keen to</s> will follow-up this post with a practical example that demonstrates the performance impact of Channels! For more details and 
performance differences check out [Stephen Toub's post](https://devblogs.microsoft.com/dotnet/an-introduction-to-system-threading-channels/).
