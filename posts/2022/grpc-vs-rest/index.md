---
title: gRPC vs REST
layout: post
date: 2022-01-17
description: More API design
tags: 
- REST 
- gRPC 
---

As most engineers will know, APIs are the standard for modern communication between 
services. There are two primary models for API design: RPC and REST (and OpenAPI but 
I won't dive into that). Irrespective of model, modern APIs are implemented by mapping 
them in one way or another to the same HTTP protocol.

Over the course of my reading I have come to find that RPC APIs adopt ideas from 
HTTP while staying within the RPC model. In this post I will cover both models, 
explain the advantages/disadvantages and hope this will provide sufficient guidance 
on how to choose between them.

This is a great high-level overview from [Microsoft](https://docs.microsoft.com/en-us/aspnet/core/grpc/comparison?view=aspnetcore-6.0#high-level-comparison) 
which I found to be helpful.

| Feature                | gRPC                           | HTTP APIs with JSON           |
|------------------------|--------------------------------|-------------------------------|
| Contract               | Required (.proto)              | Optional (OpenAPI)            |
| Protocol               | HTTP/2                         | HTTP                          |
| Payload                | Protobuf (small, binary)       | JSON (large, human readable)  |
| Prescriptiveness       | Strict specification           | Loose. Any HTTP is valid.     |
| Streaming              | Client, server, bi-directional | Client, server                |
| Browser support        | No (requires grpc-web)         | Yes                           |
| Security               | Transport (TLS)                | Transport (TLS)               |
| Client code-generation | Yes                            | OpenAPI + third-party tooling |

## REST 

REST is the name that has been given to the architectural style of HTTP itself. The 
importance of REST is that it helps us understand how to think about HTTP and its use. 

A quote from __Google Cloud__ which summarises the HTTP-REST dynamic nicely:
>  HTTP is the reality — REST is a set of design ideas that shaped it.

At the most basic level in this style of API, the client does not construct URLs from 
other information, only the URLs that are passed out by the server as-is.

Many web APIs are defined in terms of **endpoints** that have **parameters**. Endpoint 
and parameter are not terms or concepts that are native to HTTP or REST, they are 
concepts carried over from Remote Procedure Call (RPC) and related technologies.

### Advantages

- Allows API clients use standard HTTP tools and technologies, which for many API 
designers justifies the effort
- General-purpose and widely available technologies means clients can use them and 
servers can implement them __easily__
- API calls can easily be made by typing URLs into a browser, or issuing cURL commands
- HTTP APIs can be accessed/ implemented by using no more technology than a basic HTTP 
library

### Disadvantages

- Complexity behind using URL paths, their parameters, and the HTTP methods that are 
used with them
- Requires API designers to specify the details of how the RPC model is expressed on 
top of HTTP for their specific API, and the client of the API has to learn that detail.
- Don't implement the whole HTTP protocol, which requires API providers and clients to 
figure out how to specify and learn which subset of HTTP is supported by a particular 
API (think OpenAPI/Swagger)

## gRPC

A second model for using HTTP for APIs is gRPC which uses HTTP/2 under the covers. 
It is an open-source framework for implementing RPC APIs, it takes inspiration from 
Remote Procedure Call (RPC) developed by Google. Its key advantages include being; 
interoperable, modern, and efficient (by using Protocol Buffers).

Contrary to the HTTP/1.1 protocol (REST) provides access to data via resources using 
generic HTTP methods such as GET, POST, PUT, DELETE. Specifically, HTTP/1.1 cycles 
TCP connections, while gRPC breaks the standard connection-level load balancing as 
it maintains a single long-lived TCP connection in which all requests are multiplexed.

HTTP is not exposed to the API designer, gRPC-generated "services" hide HTTP from 
the client and server meaning the "how" behind mapping of RPC concepts to HTTP are 
hidden. Engineers only need to learn gRPC.

The way a client uses a gRPC API is by following these three steps:
1. Decide which procedure to call
2. Calculate the parameter values to use (if any)
3. Use a code-generated "service" to make the call, passing the parameter values

For sometime engineers are "programmed" (is that a pun?) to think REST and the use of 
verbage is the best way to convey intent. Look how easy and obvioud RPC is:

```

createAccount(username, contact_email, password) -> account_id
addSubscription(account_id, subscription_type) -> subscription_id
sendActivationReminderEmail(account_id) -> null
cancelSubscription(subscription_id, reason, immediate=True) -> null
getAccountDetails(account_id) -> {full data tree}

```

** credit for this extract is this [blog post](https://www.freecodecamp.org/news/rest-is-the-new-soap-97ff6c09896d/).

Using REST to replicate this behaviour is also (fairly) straightforward. The "parameters" 
for those endpoints are JSON name/value pairs in the request body.

```

POST /accounts <headers> (username, contact_email, password)> -> account_URL
POST /subscriptions <headers> (account_URL, subscription_type) -> subscription_URL
POST /activation-reminder-outbox <headers> (account_URL) -> email_URL
POST /cancellations <headers> (subscription_URL, reason, immediate=True) -> cancellaton_URL
GET /account/{accountId} ->  {full data tree}

```

### Advantages

- More verbose and simpler way of defining remote procedures (through interface 
description language (IDL))
- HTTP/2 is not exposed to the API designer or API user
- RPC model is layered over HTTP so intervention is required, those decisions are built 
into the gRPC software and generated code
- Very good at generating client-side programming libraries that are intuitive for 
programmers to use and execute efficiently
- Simple to implement on the server side
- Good performance through use of binary payload that is efficient to create and parse
- Efficient management of connections

### Disadvantages

- Requires special software on both the client and the server
- gRPC-generated code has to be incorporated into client and server build processes
- No concept of `Etag` and `If-Match` headers to provide guarantees when more than one
client tries to update the same resource
- No mechanism for making partial updates either (HTTP defines a `PATCH` method)

## Conclusion

The use cases and justification for gRPC are very much dependant on your own domain 
(but that's not helpful). When we consider the benefits of gRPC it could be argues the following 
types of scenarios make it "ideal":
1. Lightweight microservices where efficiency is critical
2. Polyglot systems where multiple languages are required for development.
3. Point-to-point real-time services that need to handle streaming requests or responses.

## Further Reading 
Some useful resources here if you want to dive deeper:
- [Introduction to gRPC on .NET](https://docs.microsoft.com/en-us/aspnet/core/grpc/?view=aspnetcore-5.0) by Microsoft
- [Introduction to gRPC](https://grpc.io/docs/what-is-grpc/introduction/) by `grpc.io`
