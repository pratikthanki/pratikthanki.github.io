---
title: Channels Example
layout: post
date: 2020-09-10
description: 
tags:
- .NET
---

Further to my prior post on Channels, in this post I will go over implementation details and explore `System.Threading.Channels`.

The static factory methods of the 
[Channel](https://docs.microsoft.com/en-us/dotnet/api/system.threading.channels.channel?view=dotnet-plat-ext-2.1) 
class can be used to create Channels (see the code snippet below). The type parameter `T` is used to define the type of 
object that can be handled by the created Channel; and passed from a publisher to a subscriber.

```csharp
public static class Channel
{
    public static Channel<T> CreateUnbounded<T>();
    public static Channel<T> CreateUnbounded<T>(UnboundedChannelOptions options);

    public static Channel<T> CreateBounded<T>(int capacity);
    public static Channel<T> CreateBounded<T>(BoundedChannelOptions options);
}
```

You can create a channel with unlimited capacity using `CreateUnbounded<T>`. As cool as this is, probably a little dangerous 
if your producer outpaces your consumer. Without a capacity limit, the channel will keep accepting new items. As the consumer 
fails to keep up, the number of queued items will continually increase. Memory consumption will spike and not be released until 
items in the channel have been handled by the consumer.

`CreateBounded<T>` creates a channel with an explicit capacity (maintained by the implementation). At the point at which the 
channel fills up `TryWrite` will return `false`. `ChannelWriter<T>` provides a `WriteAsync` method designed to deal with the 
instance described above, where the channel is full and writing needs to wait. Thi is a form of *backpressure*, `WriteAsync` 
can be used with the producer (awaiting) the result of `WriteAsync` and only being allowed to continue when room becomes 
available.

`CreateUnbounded<T>` and `CreateBounded<T>` contain overloads which take 
[`BoundedChannelOptions`](https://docs.microsoft.com/en-us/dotnet/api/system.threading.channels.boundedchanneloptions?view=dotnet-plat-ext-2.1) 
that lets you configure the channel, this includes;
- `AllowSynchronousContinuations`: 
- `SingleReader`
- `SingleWriter`
- `Capacity`


Creating a channel;

```csharp

var capacity = 100;
var channel = Channel.CreateBounded<string>(capacity);

```


Writing to a channel;

```csharp

var writer = channel.Writer;

await writer.WriteAsync("this is the first message");

```


Reading from a channel;

```csharp

var reader = channel.Reader;

while (await reader.WaitToReadAsync())
{
    if (reader.TryRead(out var msg))
    {
        Console.WriteLine(msg);
    }
}

```

The `reader` and `writer` properties expose the following abstract classes;

```csharp
public abstract class ChannelWriter<T>
{
    public abstract bool TryWrite(T item);
    public virtual ValueTask WriteAsync(T item, CancellationToken cancellationToken = default);
    public abstract ValueTask<bool> WaitToWriteAsync(CancellationToken cancellationToken = default);
    public void Complete(Exception error);
    public virtual bool TryComplete(Exception error);
}

public abstract class ChannelReader<T>
{
    public abstract bool TryRead(out T item);
    public virtual ValueTask<T> ReadAsync(CancellationToken cancellationToken = default)
    public abstract ValueTask<bool> WaitToReadAsync(CancellationToken cancellationToken = default);

    public virtual Task Completion { get; }
}
```

Breakdown of the splits between producer-consumer;
- one producer - one consumer      : one-to-one relationship
- multiple producer - one consumer : one consmer subscribes to multiple producers
- one producer - multiple consumer : multiple consumers read from one producer


Through my reading and research I also came across `System.Threading.Tasks.Dataflow` which I am keen to learn more about. 

As Stephen Toub mentions in his devblogs post, if all you need to do is hand-off data to producer(s) and consumer(s) Channels 
is a *much simpler, leaner bet*.

There are some cool developments in the GitHub repo, particularly the [Issues](https://github.com/dotnet/runtime/labels/area-System.Threading.Channels)
section on new features and community discussions. 

Thanks for taking the time to read this post! 
