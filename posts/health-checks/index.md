---
title: Health Checks
layout: post
date: 2022-05-10
description: Making the most of health checks
tags:
- .NET
- Kubernetes
---

Understanding the health and state of an application is crucial in minimizing impact for 
the end user. In this post we'll cover health checks in .NET, how they can be made to be 
extensible and what can be done to report on those results with Prometheus metrics.


## Background

Health Check middleware is offered in ASP.NET Core, and can be exposed as HTTP endpoints 
for real-time monitoring.

Health probes can be used by container orchestrators (like Kubernetes or Docker Swarm) to 
check the state of an application. For instance, responding to a failing health check by 
halting a rolling deployment or restarting a container.

A load balancer might react to an unhealthy app by routing traffic away from the failing 
instance to a healthy instance.

Further to this, application dependencies such as databases and external service endpoints 
can also be tested for health. Physical server resources can also be tested (i.e. memory, 
disk, and CPU) for healthy status.

How you implement health checks goes in tandem with the broader technology stack and 
architecture. For instance, using Kubernetes means you can define [probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/):
- Liveness: determines whether the pod running is in a healthy state and if it is not then 
it is terminated and redeployed.
- Readiness: determines whether or not a pod is ready to serve requests. If the pod is 
unhealthy its IP address is removed from the endpoints of all Services.
- Startup: verifies whether the application within a container is started. This is run 
before any other probe. If unhealthy, the pod is killed and follows the pod’s `restartPolicy`.

I may cover probes in more detail in a future post as that in itself is a big topic which 
covers Helm amongst other things.


## Example

Here we'll cover an example on how to implement health checks in C# .NET Core.

Create a health check by implementing the `IHealthCheck` interface. A type-activated 
health check can be used to make a type of check extensible for multiple data sources. In 
this case we have a database health check which validates connectivity to the database:

```cs

public class DatabaseHealthCheck : IHealthCheck
{
    private readonly string _connectionString;

    public DatabaseHealthCheck(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        HealthCheckResult result;

        try
        {
            await using var conn = new SqlConnection(_connectionString);
            var command = new CommandDefinition(
                commandText: "SELECT 1",
                commandTimeout: 10,
                cancellationToken: cancellationToken);

            await conn.QuerySingleAsync<int>(command);
            result = HealthCheckResult.Healthy("Successfully queried database..");
        }
        catch(Exception ex)
        {
            result = HealthCheckResult.Unhealthy("Exception querying database..");
        }

        return await Task.FromResult(result);
    }

```

Next, we create an extension method to conveniently register one or multiple 
`DatabaseHealthCheck`'s:

```cs

public static class HealthCheckExtensions
{
    public static IHealthChecksBuilder AddDatabaseHealthCheck(
        this IHealthChecksBuilder builder,
        string healthCheckName,
        string connectionString,
        string[] tags = null)
    {
        return builder
            .AddTypeActivatedCheck<DatabaseHealthCheck>(
                name: healthCheckName,
                failureStatus: HealthStatus.Unhealthy,
                tags: new[]{"health", "ready", "live"},
                args: new object[]{connectionString});
    }
}

```

Pass `tags` when you call the extension method if they belong to any particular type of probe.

Now that we have what is needed to create a health check and to register them. They can 
then be added in the `ConfigureServices` and `Configure` method of an ASP.NET application 
like this:

```cs

public void ConfigureServices(IServiceCollection services)
{
    // ..

    services
        .AddHealthChecks()
        .AddDatabaseHealthCheck("db_check_1", Configuration["db-1"])
        .AddDatabaseHealthCheck("db_check_2", Configuration["db-2"])

        // Optionally, reference the Prometheus NuGet package to send health checks as metrics
        .ForwardToPrometheus(); 

    // ..
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // ..

    app
        .UseEndpoints(endpoints =>
        {
            endpoints.MapControllers()

            // You can register multiple endpoints as needed - i.e. "/ready" and "/live"
            endpoints.MapHealthChecks("/health", new HealthCheckOptions
            {
                Predicate = healthCheck => healthCheck.Tags.Contains("health")
            });

            // Create the Prometheus "/metrics" endpoint for the health check results and 
            // any other metrics defined by the application
            endpoints.MapMetrics();
        });

    // ..
}

```

Additional endpooints can be defined by using `HealthCheckOptions` and the `Predicate` 
property and base it off the `tags` set for each health check.

Status codes based on the health state can also be customized, see 
[Customize the HTTP status code](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-6.0#customize-the-http-status-code).
