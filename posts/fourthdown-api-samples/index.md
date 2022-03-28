---
title: FourthDown API Samples
layout: post
date: 2020-12-23
description: Code samples for the play-by-play API.
tags:
- API
---

Further to my previous post introducing the [FourthDown API](../fourth-down-api), here I have detailed 
code snippets from various languages to get started.

Heads-up, you can see more details about all the endpoints and how to create an api key on the 
[FourthDown API Docs](https://fourthdown.azurewebsites.net/).

## C#

```cs

using System;
using RestSharp;

namespace HelloWorldApplication 
{
  class HelloWorld 
  {
    static void Main(string[] args) 
    {
      var client = new RestClient("https://fourthdown.azurewebsites.net/api/game/scoringsummaries?Week=1&Team=NE&Season=2017");
      client.Timeout = -1;

      var request = new RestRequest(Method.GET);

      IRestResponse response = client.Execute(request);

      Console.WriteLine(response.Content);
    }
  }
}

```

## Go

```go

package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://fourthdown.azurewebsites.net/api/game/scoringsummaries?Week=1&Team=NE&Season=2017"
  method := "GET"

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, nil)

  if err != nil {
    fmt.Println(err)
    return
  }

  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}

```

## JavaScript 

```js

var myHeaders = new Headers();

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://fourthdown.azurewebsites.net/api/game/scoringsummaries?Week=1&Team=NE&Season=2017", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

## NodeJs

```js

var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'GET',
  'hostname': 'fourthdown.azurewebsites.net',
  'path': '/api/game/scoringsummaries?Week=1&Team=NE&Season=2017',
  'headers': { },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();

```

## Ruby

```ruby

require "uri"
require "net/http"

url = URI("https://fourthdown.azurewebsites.net/api/game/scoringsummaries?Week=1&Team=NE&Season=2017")

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Get.new(url)

response = https.request(request)
puts response.read_body

```

## Objective-C

```c

#import <Foundation/Foundation.h>

dispatch_semaphore_t sema = dispatch_semaphore_create(0);

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://fourthdown.azurewebsites.net/api/game/scoringsummaries?Week=1&Team=NE&Season=2017"]
  cachePolicy:NSURLRequestUseProtocolCachePolicy
  timeoutInterval:10.0];

[request setAllHTTPHeaderFields:headers];

[request setHTTPMethod:@"GET"];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
  if (error) {
    NSLog(@"%@", error);
    dispatch_semaphore_signal(sema);
  } else {
    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
    NSError *parseError = nil;
    NSDictionary *responseDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:&parseError];
    NSLog(@"%@",responseDictionary);
    dispatch_semaphore_signal(sema);
  }
}];
[dataTask resume];
dispatch_semaphore_wait(sema, DISPATCH_TIME_FOREVER);

```

## Python 

```py

import requests

url = "https://fourthdown.azurewebsites.net/api/game/scoringsummaries?Week=1&Team=NE&Season=2017"

headers = { }

response = requests.request("GET", url, headers=headers)

print(response.text)

```

## R

```R

library(httr)

URL <- "https://fourthdown.azurewebsites.net/api/game/scoringsummaries?Week=1&Team=NE&Season=2017"

r <- GET(URL, add_headers("x-api-key" = KEY))

```

## cURL

```shell

curl --location --request GET 'https://fourthdown.azurewebsites.net/api/game/scoringsummaries?Week=1&Team=NE&Season=2017' 

```

## PowerShell

```ps1

$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"

$response = Invoke-RestMethod 'https://fourthdown.azurewebsites.net/api/game/scoringsummaries?Week=1&Team=NE&Season=2017' -Method 'GET' -Headers $headers -Body $body
$response | ConvertTo-Json

```

## Shell

```shell

http --follow --timeout 3600 GET 'https://fourthdown.azurewebsites.net/api/game/scoringsummaries?Week=1&Team=NE&Season=2017'

```
