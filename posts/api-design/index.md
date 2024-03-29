---
title: API Design
layout: post
date: 2020-11-22
description: Designing usable, flexible and extensible APIs.
tags:
- REST
---

Designing APIs can be a lot of fun! I'm excited to cover aspects of REST API design inspired by the API Azure Design 
guidelines. from REST, HTTP Status Codes and Versioning.

Most modern web applications expose APIs that a client can use to interact with the application in someway.

A well-designed web API based on Azure API Management should aim to support:
- Platform independence: Regardless of how the API is implemented, the client does not or should not care. 
Its important to use standard protocols and have an agreed format/mechanism for data transfer. 
- Service evolution: Developing the web API should not affect the client interacting with the API. And 
importantly all functionality should be discoverable so that client applications can use it to its fullest.

## REST 

Brief background on REST. Proposed in 2000 by Roy Fielding, Representational State Transfer (REST) as an 
architectural approach to designing web services. REST is an architectural style for providing standards between 
computer systems on the web. The cool thing about REST, it is independent of any underlying protocol 
and is not necessarily tied to HTTP. 

REST uses open standards and does not couple the implementation of the API or the client application to any 
specific implementation. For example, a REST web service could be written in ASP.NET, and client applications 
can use any language or toolset that can generate HTTP requests and parse HTTP responses.

## HTTP Methods

The HTTP protocol defines a number of methods that assign semantic meaning to a request. 

The common HTTP methods used by most RESTful web APIs are:
- GET: retrieves a specific resource at the specified URI. 
The body of the response message contains the details of the requested resource.
- POST: creates a new resource at the specified URI. 
The body of the request message provides the details of the new resource.
- PUT: either creates or replaces the resource at the specified URI. 
The body of the request message specifies the resource to be created or updated.
- PATCH: performs a partial update of a resource. 
The request body specifies the set of changes to apply to the resource.
- DELETE: removes the resource at the specified URI.

Differences between POST, PUT and PATCH can be a little fragmented. But simply, a POST request creates a resource. 
A PUT request creates a resource or updates an existing resource. A PATCH request performs a partial update to an 
existing resource. 

### Examples 

```shell

# Retrieves all orders
GET /orders

# Create new order
POST /orders

# Update details of an order(s)
PUT /orders

# Remove an order
DELETE /orders

```

## Resources

The design of resources depends on sufficient understanding of the domain, uses cases and client needs.

An example that demonstrates good resource design when looking to create an `order`, the one below is from the 
Azure API Management docs and perhaps the simplest example!

```shell

# Good 
POST /orders 

# Bad
POST /create-order

```

Resources should not be complicated and clearly define intent. `GET /orders/9` would return an order with Id 9 and 
`GET /orders/9/products` would return all products for order with Id 9.

Resources beyond the format or structure `/collection/item/collection` can become convoluted and more difficult for 
users to navigate. Not to mention maintain, extend and scale for the developer. 


## HTTP Status Codes 

There are **many** HTTP Status Codes! Broadly they can be broken down into the following "categories":
- 1xx Informational
- 2xx Success
- 3xx Redirection
- 4xx Client Error
- 5xx Server Error

I won't go over them here, you can find a fuller list of StatusCodes in the 
[Microsoft.AspNetCore.Http](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.statuscodes?view=aspnetcore-5.0) 
namespace. 

Some of the more prevalent status codes for the HTTP Methods we've covered:

### GET 
- `200 OK`
- `404 Not Found`

### POST
- `201 Created`
- `204 No Content`
- `400 Bad Request`

### PUT
- `200 OK`
- `201 Created`
- `204 No Content`
- `409 Conflict`

### DELETE
- `204 No Content`
- `404 Not Found`

### PATCH

Considering this request updates parts of an exitsing resource, the server processes the patch document sent to 
perform the update. 

To quote the Azure API docs: 

> JSON is probably the most common data format for web APIs. There are two main JSON-based patch formats, called JSON patch and JSON merge patch.

Common response codes to denote errors:
- `400 Bad Request`
- `409 Conflict`
- `415 Unsupported Media Type`

The majority of the status codes I have cited are predominantly used. You can also find details on 
[REST API Tutorial](https://www.restapitutorial.com/httpstatuscodes.html).

## Versioning

It is rare that the scope or intent for a Web API would remain constant. As we covered earlier, the client should 
be unaffected by any changes made to the API or its resources whilst new client applications can take advantage of 
new features and resources.

Common use cases and reasons for change could be:
- deprecating or adding properties to collections 
- change in relationship between collections
- change in the response structure 

In making these changes it is important to assess the impact any of this could have on the client given the infinite ways 
the client could be using the API.

Versioning can be implemented in several ways, most common is **URI Versioning**. 

A change to an existing or addition of a resource to a Web API can include the version numer in the URL.

If we have a maps API with the resource `/stations` which returns:

```json

[
  {
    “id”: 1,
    ”name”: ”London Bridge Station”, 
    ”address”: ”Station Approach Rd, London SE1 9SP”
  },
  {
    ...
  }
]

```

If we make changes to this endpoint such that the address is more specific/broken down and additional fields are added, 
a change to the resource would be represented as `/v2/stations`:

```json

[
  {
    “id”: 1,
    ”name”: ”London Bridge Station”, 
    ”address”: {
      "road": ”Station Approach Rd"
      "city": "London"
      "postcode": "SE1 9SP”
      },
    "tubeLines": [
      "Jubilee",
      "Northern"
    ]
  },
  {
    ...
  }
]

```

Another way to version this change would be through **Query String Versioning**. 

This way of versioning would alleviate the need for multiple URLs. The version being requested can be specified 
through query parameters, such as `/stations?version=2`

This approach has the semantic advantage that upon making a request, the same resource is always retrieved from 
the request URL. However, it depends on the code that handles the request (the Controller) to parse the query string 
and send back the appropriate HTTP response.

As opposed to additional resources or providing query parameters, versioning can also be handled through **Header Versioning**.

You can implement a custom header that indicates the version of the resource. The client application is then responsible for 
adding the appropriate header to any requests, whilst requests without this header can use the default version.

The following example uses a custom header named `Custom-Header`. The value of this header indicates the version of web API.

Using the example above, our request would look like this:

```shell

`GET /stations`
`Custom-Header: version=2`

```

Performance implications should be considered when selecting a versioning strategy, especially caching on the web server. 
The **URI Versioning** and **Query String Versioning** schemes are cache-friendly as far as the same resources refer to 
the same data on each request.

## OpenAPI Specification (OAS)

As part of efforts to standardize REST API descriptions, OAS was developed (renamed) from the Swagger 2.0 specification 
and brought under the [OpenAPI](https://www.openapis.org/) Initiative.

OpenAPI promotes a contract-first approach which means you design the API interface first and than implement the interface 
(contract), rather than an implementation-first approach.

Tools like [Swagger](https://swagger.io/) are useful in generating client documentation from API interfaces. 

OpenAPI implementations for .NET include [Swashbuckle and NSwag](https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger?view=aspnetcore-5.0).

You can find more details on Microsoft REST API design guidelines 
[here](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md).

Inspiration for this post and material I found to be very useful was the 
[Azure API Design Guide](https://azure.microsoft.com/mediahandler/files/resourcefiles/api-design/Azure_API-Design_Guide_eBook.pdf).
