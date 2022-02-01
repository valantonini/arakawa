---
tags: ["Go", "Software engineering"]
categories: ["Software Engineering"]
title: "why go?"
author: val antonini
date: 2022-02-01
template: article.pug
location: /2022/02/01
---

I have been asked a few times why I like Go so much. If I had to choose only 1 thing, it would be
the philosophy of simplicity that underpins the language, standard libraries, packages, and tooling. 
Whilst no language is perfect, I appreciate its trade-offs for the following benefits. It's worth to note
these are purely personal opinion and not necessarily specific or restricted to Go, simply things that are 
important to me that you get for free.

## language
- structural typing allows for implicit interface implementation allowing for easy substitution, mocking, 
testing and dependency injection
- concise syntax with few keywords that makes all Go code feel familiar
- fast build / run / test times
- compiles to machine code without sacrificing GC or runtime reflection
- single binary (no runtime complaints about assemblies not matching manifests or multiple projects overwriting each other)
- straight forward access modifiers expressed by the capitalisation of first letters

## tooling
- good documentation that is easy to read and navigate (and produced from code)
- built in documentation tools
- compilable examples that become documentation
- a built-in, opinionated formatter that can't be tweaked
- built in test tools
- no need to manage dependencies with a 3rd party tool like nuget or npm
- vendor command for reproducible builds
- an easy way to redirect dependencies locally to test changes

## conventions, practices and philosophy
- Go convention doesn't prefix interfaces with 'I' (resulting in all the interface files being grouped together seperate 
  from their implementation is the project tree)
- tests sit next to the file they are testing and not in a separate project
- a strong opposition to abstraction and strong push towards simplicity
- a philosophy of optimizing for the reader instead of the writer

## controversial
- tabs over spaces 👻
