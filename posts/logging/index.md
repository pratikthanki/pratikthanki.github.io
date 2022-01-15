---
layout: post
title: Logging
layout: post
date: 2021-10-17
tags:
  - Monitoring
---

No matter if you're a backend or frontend developer, a crcucial aspect of your application 
is logging. It often acts as the lens for viewing the state and behaviour of your application. 
Below I have detailed things I've learnt when I write logs.

This is somewhat debated, but I have started to find logging after an event/action tells you 
more than logging before something happens. In the example below the first log message doesn't 
indicate or suggest if the request was successful. Unless the request is in a `try-ctach` block 
and exceptions are logged then the second log line provides more context. Hunting logs to debug 
issues becomes more difficult if it actually isn't clear the HTTP request is successful in this 
example.

```cs

_logger.LogInformation("Sending API request");
await _restClient.SendAsync();


await _restClient.SendAsync();
_logger.LogInformation("Sent API request");

```

The level of this logging is contentious and dependant on the minimum level for the application 
but using `INFORMATION` is reasonable.

Another improvement to logging is separating what is going often, depicted in a human-readable 
format with the technical details. The second aspect of this is contextual detail important for 
debugging technical issues.

```cs

await _restClient.SendAsync();
_logger.LogInformation("Sent request to {url} to retrieve list of contacts", url);


await _restClient.SendAsync();
_logger.LogInformation("Sent request to retrieve list of contacts. {Url}", url);

```

Standardizing messages with templates makes them easier to find via log ingestion frameworks 
(i.e. Splunk, Elastic and Graylog). The first log message is difficult to find or parse with 
regex or similar, especially as the URL will change each time. Also consider long URLs or 
unexpected query paramters, this will likely mean the complete log message will not be visible 
on the screen.

The second log message in the example above is easy to parse and find in a log analysis tool 
because the paramters are split and can seamlessly be added. See the example below which shows 
the JSON depiction of the log message.

```json

{
  "timestamp": "2021-10-17T21:01:12.732",
  "message": "Sent request to retrieve list of contacts. {Url}",
  "Url": "https://example.com/api/contacts?all=true"
}

```

Log levels are often a misunderstood and under-utilised tool at a developers disposal. Log 
levels are there for a reason and should be used appropriately. There are key distinctions 
between, `WARNING` & `ERROR` and `INFORMATION` & `DEBUG`.

Looking at the example below, the API request could fail for an expected reason like 
authorization resulting in a `WARNING` whilst some other unforseen/ unaccounted exception 
should be seen as a `ERROR`. And the default log level when the API request is successful is 
`INFORMATION`.

```cs

try 
{
  var response = _restClient.SendAsync();
  _logger.LogInformation("Sent request to retrieve list of contacts. {Url}", url);
  _logger.LogDebug("Response received from API request. {StatusCode}", response.StatusCode);
}
catch(UnauthorizedException unauthorizedException) 
{
  _logger.LogWarning(unauthorizedException, "Response to API was unauthorized. {Url}", url);
}
catch(Exception e)
{
  _logger.LogError(e, "Request to API failed. {Url}", url);
}

```

In summary, in the event of a `WARNING` something was donw but not perfectly and an `ERROR` means 
you didn’t do it. In terms of the `DEBUG` log level, this can be a very handy developer tool to 
log technical messages useful for understanding the state and actions of the application. These 
messages go beyond **what** is happening and detail **how** and/or **why**. The `INFORMATION` log 
level reads as a story any reader can consume to understand what is happening from a "business" 
logic view point.

Consider the example below, every (business) use-case results in a single line of `INFORMATION` 
logging whilst there is `DEBUG` logs which give a more detailed insight into how the process works.

```json

{ "@t": "2021-10-17T12:14:45.549Z", "@mt": "Query parameters valid.", "@l": "Debug" }
{ "@t": "2021-10-17T12:14:45.549Z", "@mt": "Querying for trades in range. {From}-{Until}", "@l": "Information", "From": "2021-01-01T08:00", "Until": "2021-01-01T17:00" }
{ "@t": "2021-01-01T12:14:45.553Z", "@mt": "Trades cache refreshed. {LatestTradeTimestamp}", "@l": "Debug", "LatestTradeTimestamp": "2021-01-01T12:00" }
{ "@t": "2021-10-17T12:14:45.554Z", "@mt": "Trades found. {Total}", "@l": "Information", "Total": "482" }
{ "@t": "2021-10-17T12:14:45.554Z", "@mt": "Updating cache with recent trades found. {Total}", "@l": "Debug", "Total": "56" }
{ "@t": "2021-10-17T12:14:45.554Z", "@mt": "Updating cache with recent trades found. {Total}", "@l": "Debug", "Total": "56" }
{ "@t": "2021-10-17T12:14:45.554Z", "@mt": "Appending trades with product details.", "@l": "Information" }

```

Logging is just one aspect of observability, you can read more about this in a prior 
article; [Grafana Cloud](../grafana-cloud/index.mdx).


