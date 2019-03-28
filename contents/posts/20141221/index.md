---
tags: ["C#", "Game Development", "Pathing", "Algorithms"]
categories: ["C#", "Game Development", "Pathing", "Algorithms"]
title: "Graphs and pathing in C# part 2"
author: val antonini
date: 2014-12-21
template: article.pug
location: /2014/12/21
---
---
A while ago [I created an implementation of Dijkstra's algorithm](/2013/08/03 "Graphs and pathing in C#") for pathfinding. It turns out there was a bug that meant although it found a path, it wasn't always the shortest. I thought this was a great chance to re-write it and implement some of the performance tips I received.

The project can be found on Github [here](https://github.com/valantonini/GraphCollection "Github - valantonini/GraphCollection").


The usage has been greatly simplified. You can graph [the example on the wikipedia page](http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm "Wikipedia - Dijkstra's algorithm") like this:

```cs
var one = new GraphNode<int>(1);
var two = new GraphNode<int>(2);
var three = new GraphNode<int>(3);
var four = new GraphNode<int>(4);
var five = new GraphNode<int>(5);
var six = new GraphNode<int>(6);

one.AddNeighbour(six, 14);
one.AddNeighbour(three, 9);
one.AddNeighbour(two, 7);

two.AddNeighbour(three, 10);
two.AddNeighbour(four, 15);

three.AddNeighbour(six, 2);
three.AddNeighbour(four, 11);

four.AddNeighbour(five, 6);

five.AddNeighbour(six, 9);

var graph = new List<GraphNode<int>> {one, two, three, four, five, six};

var dijkstra = new Dijkstra<int>(graph);
var path = dijkstra.FindShortestPathBetween(one, five);
```

I am currently working on an A* algorithm to use in place of this but I still think Dijkstra's algorithm is an awesome algorithm and wanted to provide a better implementation.
