---
title: Promise Theory
layout: post
date: 2022-02-28
description: Underpinnings of container complexity through simplicity
tags: 
- Kubernetes
---

Since watching [Kubernetes: The Documentary [PART 1]](https://youtu.be/BE77h7dmoQU?t=470) and 
hearing [Kelsey Hightower](https://twitter.com/kelseyhightower) use the real-world (post office) 
analogy and mention Promise Theory I was drawn towards understanidng more and how it underpins 
modern development practices.


## What is it?

Promise Theory sits contrary to obligation theories (for exampled, command and control) which 
view interactions and behavior under the assumption that agents choose behavior based on their 
obligation to follow the rules and by extension take certain actions.

Promise theory is about modelling causation, change and balance between communicating agents 
(human or machines). It is about finding the necessary and sufficient conditions for cooperation 
between distributed agents. The desire to follow the rules is voluntary and it should be noted 
that, __agents can only be responsible for their own behavior, not the behavior of other agents__.

The questions to always ask for every promise are:
- Which agent in the system is going to be responsible for making and keeping the promise? (Agents 
can only promise their own behaviour)
- What actions/operations repair a promise not kept? How are they parameterized and how do they 
converge to a desired state?

Consider the obligation theory of command and control, if there were a TV in the office which 
should always be on the news channel if/when the TV goes on standby or there is a power outage 
the an "orchestrator" would need to manually intervene to set the channel. Conflicts can arise 
when multiple instructors look to intervene and issue different instructions. The place where 
the instructions are determined is not the place where they must be carried out. 

Now, extrapolate this concept with N instances of services running across machines in multiple 
locations. An approach like this would crumble, require manual intervention and result in more 
conflicts than resolutions. One of the problems is that it separates intent from implementation, 
creating uncertainty of outcome. This example leads nicely into the next section.


## Tenets of promise theory

Citing the [free book](http://markburgess.org/BookOfPromises.pdf) by 
[Mark Burgess](https://www.linkedin.com/in/markburgessoslo/), the tenets of promise theory are as 
follows:

1. Agents are autonomous. They can only make promises about their own behaviour. No other agent 
can impose a promise upon them.
2. Making a promise involves passing information to an observer, but not necessarily a message 
in the explicit sense of a linguistic communication.
3. The assessment of whether a promise is kept or not kept may be made independently by any agent 
in itsscope.
4. The interpretation of a promise’s intent may be made independently by any agent in its scope.
5. The internal workings of agents are assumed to be unknown. Knowledge of them may be assessed 
from the promises they make, and keep. However, we may choose the boundary of an agent wherever 
we please to hide or expose different levels of information, e.g. we may think of a car as an 
atomic vehicle, or as a collection of agents working together.


## Why is it important?

The benefits of a promise theory approach come from thinking about management through constraints, 
without any detailed operational protocols. The model of promises can be likened to the architectural 
paradigm that is microservices (watch out for a future post which covers this).


### Promise Theory via Policy Management

The way we view the world in Promise Theory is as a collection of agents or nested containers of 
things that can keep promises. In the context of Kubernetes this is the YAML files.

Consider the configuration in a `Deployment` YAML resource (below) which details probes amongst other 
things, a strict policy has been defined to ensure there are atleast 4 replicas at any point and no 
more than 10 - see **SECTION A**. Another policy in the resource is that replica health can be validated 
with the `/healthz` endpoint, if there is an unhealthy response with a threshold of 1 error 10 seconds 
apart to constitute ["liveness"](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-command) - 
else the conatiner is restarted as is it deemed unhealthy - see **SECTION B** within the snippet.


```yaml

apiVersion: apps/v1
kind: Deployment
spec:
  # SECTION A
  minReplicas: 4
  maxReplicas: 10
  targetCPUUtilizationPercentage: 50
  # SECTION A

  selector:
    matchLabels:
      app: application-name
  template:
    metadata:
      labels:
        app: application-name
    spec:
      containers:
      - image: image-name:latest
        name: application-name
        imagePullPolicy: Always
        ports:
        - name: liveness-port
        containerPort: 8080
        hostPort: 8080
        # SECTION B
        livenessProbe:
        httpGet:
            path: /healthz
            port: liveness-port
        failureThreshold: 1
        periodSeconds: 10

        startupProbe:
        httpGet:
            path: /healthz
            port: liveness-port
        failureThreshold: 30
        periodSeconds: 10
        # SECTION B

```

From this example you can see that Promises turn design and configuration into a form of knowledge 
management, by shifting the attention away from what changes onto what interfaces exist between 
components and what promises they keep and why.

Applications have to be extensible by cooperation, sometimes called **horizontal scaling** through 
parallelism rather than vertical scaling through brute force. Databases like Cassandra and Postgres 
illustrate how to deal with the issues of scale, redundancy and relativity.

Read more about promises from the Cloud Native Computing Foundation (CNCF) and the 
[Kubernetes Policy Management White Paper](https://github.com/kubernetes/sig-security/blob/main/sig-security-docs/papers/policy/CNCF_Kubernetes_Policy_Management_WhitePaper_v1.pdf) and following the work of 
[Mark Burgess](https://www.linkedin.com/in/markburgessoslo/). 

I will follow-up with a deeper dive of Promise Theory and examples within the context of Kubernetes.
