---
tags: ["C#", "Game Development", "Pathing"]
categories: ["C#", "Game Development", "Pathing"]
title:  "Graphs and pathing in C#"
author: val antonini
date: 2013-08-03
template: article.pug
location: /2013/08/03
---


*UPDATE 2:* This article is now out of date. Please visit [Graphs and Pathing in C# – part 2](/2014/12/21 "Graphs and Pathing in C# – part 2")

*UPDATE:* There was a good article that I enjoyed at [developing the future](http://www.developingthefuture.net/dijkstra-algorithm-graph-shortest-path/ "developing the future") recently that also looks at Dijkstra's algorithm.

I am currently working on a game (in Unity3d) with my friends. It's an isometric dungeon crawler similar to Diablo for android. We are planning to release it as a free game just so we can get a feel of the whole process of developing a game, using the tools and getting it into the Play store.

One of the decisions we made was to have a dynamic level generator. There are many good resources on dynamic level generation such as [donjon](http://donjon.bin.sh/fantasy/dungeon/about/ "donjon dungeon generator") but I wanted to try and see what kind of approach I'd come up with by myself (knowing very well it would probably be a far from perfect solution).

My approach was to create a bunch of rooms in a 2D matrix and join them together. The generating and placing of random rooms was easy but I was struggling on how I would join them together. I thought back to my studies in Japan where I had the pleasure of taking "Data and Algorithm Structure" under one of my favorite teachers of all time [Ikegami Atsuko (池上敦子)](http://cleo.ci.seikei.ac.jp/~atsuko/index.html "Ikegami Atsuko"). She has won a series of awards for her papers on pathing and scheduling and is a fantastic teacher. I remembered a lesson in which she presented Dijkstra's algorithm for shortest paths and decided to opt for that.

I thought I'd use Dijkstra's algorithm to join the 2 center co-ordinates of the room. This is probably a heavy weight approach requiring the whole graph to be generated before the calculating could begin but would guarantee the optimal path (we don't want the player spending all the time in corridors) and ensure the corridor would choose the optimal [N/S/E/W] door to exit/enter without having to determine all the paths between the 2 rooms walls.

The first thing I did was to read the dungeon matrix into a graph only to find that C# didn't have a built in graph collection. A quick google shows there are many trade offs to consider when developing a graph and these trade offs are all specific to what the graph is going to be used for. While I am sure there are plenty of graph libraries already out there that would suit my purpose I decided I would build my own to see how it would all piece together. I used [this](http://msdn.microsoft.com/en-us/library/ms379574(v=vs.80).aspx "msdn") as a launch pad and proceeded to simplify it and take advantage of some of C#'s new features.

The result (and purpose of this post) is a C# graph library with shortest path algorithm that I'd like to share with the world (and also my first Github project). You can get it [on githiub](https://github.com/valantonini/GraphCollection "github/valantonini/graphcollection").

Just a quick note, if your wondering why I keep a list of unvisited nodes AND keep a visited boolean on the GraphNode (see below) and proceed to update them both, it's because of the cost of traversing the list to find if a node's neighbor has been visited. This was causing the algorithm to grind to a halt (I was able to get pathing on a Galaxy S3 from 27 seconds to 2.5 seconds by doing this and some other minor tweaks). Also, it may seem like a GraphNode should not be responsible for carrying the distance value used in Dijkstra's algorithm (not to be confused with the edge cost between 2 nodes) but this would once again mean I would not need to perform a lookup when checking for the current distance of a node.

```cs
public class Dijkstra<T>
{
    // elided

    private List<GraphNode<T>> _unvisited;

    // elided

    public void MarkAsVisited(GraphNode<T> node)
    {
        node.Visited = true;
        _unvisited.Remove(node);
    }

    // elided

}
```

```cs
public class GraphNode<T>
{
    public T Value { get; set; }
    public int Distance { get; set; }
    public bool Visited { get; set; }

    // elided

}
```