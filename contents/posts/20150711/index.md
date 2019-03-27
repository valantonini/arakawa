---
tags: ["Algorithms", "C#", "Pathing", "Game Development"]
categories: ["Algorithms", "C#", "Pathing", "Game Development"]
title: "A* algorithm in C#"
author: val antonini
date: 2015-07-11
template: article.pug
location: /2015/07/11
---

An A* algorithm in C#. Original credit goes to Gustavo Franko and his post on [code guru](http://www.codeguru.com/csharp/csharp/cs_misc/designtechniques/article.php/c12527/AStar-A-Implementation-in-C-Path-Finding-PathFinder.htm "A* implementation on code guru"). With his permission I've pulled out the A* algorithm from the sample app, updated some of the code to use some newer c# features, added some tests to demonstrate usage and uploaded it to github. You can view the project at [https://github.com/valantonini/AStar](https://github.com/valantonini/AStar "https://github.com/valantonini/AStar"). The algorithm contains a variety options such as whether it uses diagonals.

The grid is represented as a byte array with an open position represented as a 1 and a
blocked position represented as a 0. You can set up a path from a string using the following (where O is open and X is blocked):

```cs

var level =   @"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                XOOOXXXXOOOOOOOOOOOOOOOOOOOOOOOX
                XOOOXXXXOOOOOOOOOOOOOOOOOOOOOOOX
                XOOOXXXXOOOOOOOOOOOOOOOOOOOOOOOX
                XOOOXXXXOOOOOOOOOOOOOOOOOOOOOOOX
                XOOOXXXXOOOOOOOOOOOOOOOOOOOOOOOX
                XOOOXXXXOOOOOOOOOOOOOOOOOOOOOOOX
                XOOOXXXXOOOOOOOOOOOOOOOOOOOOOOOX
                XOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOX
                XOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOX
                XOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOX
                XXXXXXXXXXXXXXXXXXXXXXOOOOOOOOOX
                XXXXXXXXXXXXXXXXXXXXXXOOOOOOOOOX
                XXXXXXXXXXXXXXXXXXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOXXXXXOOOOOOOOOX
                XOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOX
                XOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOX
                XOOOOOOXXXXXXXXXXXXXXXXXXXXXXXXX
                XOOOOOOXXXXXXXXXXXXXXXXXXXXXXXXX
                XOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOX
                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

_grid = new byte[32,32];
var splitLevel = level.Split('\n')
                    .Select(x => x.Trim())
                    .ToList();

for (var x = 0; x < splitLevel.Count; x++)
{
    for (var y = 0; y < splitLevel[x].Length; y++)
    {
        if (splitLevel[x][y] != 'X')
        {
            _grid[x, y] = 1;
        }
    }
}

```