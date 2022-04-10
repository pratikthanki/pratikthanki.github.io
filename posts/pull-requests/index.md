---
title: Pull Requests
layout: post
date: 2021-03-28
description: Getting the most out of code reviews
tags:
- Engineering Practices
---

Something I have been thinking about writing for a while and a huge aspect of Software Engineering is the code review process.

My motivation to write abouth this comes from my own experiences where pull requests are fast and lean. Not only do I think 
about ways to improve how I create short and concise pull requests - adding appropriate details in the description adds context 
useful for the reviewer. This post is my way of reflecting on my ability to review code and how I can get better.

Let's start, once you've found an optimal way to build, fix or add some new functionality you'll create a new branch 
(`dev/pt/cool-new-feature`) push your changes and create a pull request. You already know this, but what should happen next? Some 
looks at it and gives it a tick but it can and should be seen as the perfect time for team collaboration, optimising code and 
ensuring clarity for the next Engineer.


## Background

What is a pull request and why do we need them?

- helps avoid break builds
- ensure consistency across the project
- make other people in the team aware of the upcoming change
- promotes quality
- creates discussion to optimise code and general solution

Looking and reflecting at both sides of the code review process, below are some of my thoughts.


## Developer

When looking to develop code, some important guidlines to bare in mind:

- satisy the "checklist"
- provide context and explain your why
- share details on how this can be tested 
- detail what you decided not to do (design choice/ pattern)
- add code-comments (reviewers don't and can't be expected to know every line of code)
- address all comments, add a response where appropriate (this shows acknoledgement)


## Reviewer

As someone looking to review code its important to remember some of these things:

- show empathy
- be kind and respectful
- don't be short - explain your reasoning (even beter if its in-person or on a call)
- simplify code and encourage comments (to explain the _why_)

Read more of the [Do and Don't](https://chromium.googlesource.com/chromium/src/+/master/docs/cr_respect.md) points here.


## What to look for

Further to the above, as a reviewer at a high-level you should be wary of:

1. Functionality: does this change do what it says
2. Complexity: is this change more complex than it needs to be
3. Design: does code interact with layers in a coherent manner or does it contradict the design of the codebase
4. Tests: are there unit and integration test (as required). If so, are they useful and do they cover common and fringe use cases
5. Comments: do methods/classes include comments explaining why (not what is happening)
6. Naming: do method, classes or properties have clear names that explain their purpose (but not too long - ofcourse!)
7. Style: is their a company or team style guide and is it being followed (see the [Goole Style Guide](https://google.github.io/styleguide/) as an example)
8. Documentation: is the change documented or should it be. If so, where is most appropriate - confluece, readme or some other home
9. Complement: point-out when you see something cool, funny or just happy something has been updated/removed!

Disagreements are common place and when they happen, as the reviewers it is important to be polite and respectfully describe any 
suggestion you're making. Back-and-forth will inevitably happen, and getting your point across may take that.

If you found this interesting I would encourage you to have a look at Google's [eng-practices](https://github.com/google/eng-practices) 
on GitHub for more information and the [Goole Style Guide](https://google.github.io/styleguide/).
