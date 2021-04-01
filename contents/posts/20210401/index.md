---
tags: ["Algorithms", "C#", "Pathing", "Game Development"]
categories: ["Algorithms", "C#", "Pathing", "Game Development"]
title: "A better A* algorithm"
author: val antonini 
date: 2021-04-01 
template: article.pug 
location: /2021/04/01
---

A few years ago I needed a path finding algorithm in a hurry for a procedural level generator I was trying to write. I
managed to find a C# one that supported a number of options and was focused on performance. I reached out to the author
if they minded if I [changed it a bit and package it up as a nuget](https://github.com/valantonini/AStar). The author agreed, and I used the library in a couple
procedural level generators such as [this one](/2018/09/30).

Recently a couple of people reached out with some questions about the implementations of it including an interesting one
from Lucas:

> ...
>
> I was wondering if you had any advice on how I might be able to add a priority to tiles.
> For example, I'm adding different tiles that increase unit speed, and others that slow it down,
> and I'd like my unit's to pathfind to tiles the user built that increase unit movement speed
> (if it happens to actually increase the trip time given the travel path).
>
> ...

I thought this was an interesting question and decided to take this opportunity to completely rewrite it trading off a
little speed for some more organized code allowing easier extensibility and readability.

The basic premise of the algorithm is that as the A* algorithm is fanning out checking nodes, it calculates the nodes
distance from its start position (G) and the distance to the target position (H) and adds these togethor to produce F.

```cs
var updatedSuccessor = new PathFinderNode(
                              position: successor.Position,
                              g: newG,
                              h:_heuristic.Calculate(successor.Position, end),
                              parentNodePosition: q.Position
                           );
```

The algorithm is constantly selecting the node with the lowest F value and calculating F for it's neighbours. If the
neighbour has already been evaluated, the algorithm checks to see if it would be a faster path to it. This is needed as
distance to neighbour nodes may not be even. Constantly evaluating the node with the next smallest F value and the F
value being derived off the distance from home + the distance to the target means the algorithm naturally defers assesing
nodes that are away from both the start and end until it has hit an obstacle and requires to assess a longer path to get
around it.

![A* Example](/images/posts/20210401/Astarpathfinding.gif "A* Example")

<div class="image-attribution">
    <a href="https://commons.wikimedia.org/wiki/File:Astar_progress_animation.gif">Subh83</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>, via Wikimedia Commons
</div>

Because the world passed into the algorithm is a multidimensional array of short where 0 indicates a closed node, I
wondered if I could just add the value of the open tile the user passed in to offset the H value (the distance to
the target). This should guide the algorithm into favouring higher positive numbers as they appear closer to the target.

```cs
var updatedSuccessor = new PathFinderNode(
                              position: successor.Position,
                              g: newG,
                              h:_heuristic.Calculate(successor.Position, end) - _world[successor.Position],
                              parentNodePosition: q.Position
                           );
```

I set up a unit test to see if I could make it take an unusual path from top left to top right without breaking the
other tests and it appeared to work:

```cs
1 1 1 1 1 1 5
1 5 1 1 1 5 1
1 1 5 5 5 1 1
1 1 1 1 1 1 1

* 1 1 1 1 1 * 
1 * 1 1 1 * 1 
1 1 * * * 1 1 
1 1 1 1 1 1 1 
```

I'll need to do some further tests, but it seems promising. 

You can find the algorithm on [github](https://github.com/valantonini/AStar).
