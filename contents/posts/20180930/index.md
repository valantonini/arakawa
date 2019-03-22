---
tags: ["C#", "Game Development", "Pathing", "Unity3D"]
categories: ["C#", "Game Development", "Pathing", "Unity3D"]
title: "Promethean - A procedural dungeon generator in C#"
author: val antonini
date: 2018-09-30
template: article.pug
location: /2018/09/30
---

![Promethean procedural dungeon sample](/images/posts/20180930/sample.png "Promethean procedural dungeon sample")

I've gotten a first version of a procedural dungeon generator written in C#. I aim for this to be compatible with
the Unity but at the moment it looks like Unity isn't a fan of a List of Lists. You can see the code on 
[Github](https://github.com/valantonini/Promethean) and view some generated floor maps in the browser 
[here](https://prometheanapp.azurewebsites.net).
  
The browser rendererjust renders a bunch of coloured tiles on a canvas. Each colour represents a different piece
(inside corner, outside corner) and/or a pieces orientation.

It works by generating a whole bunch of rooms (rectangles). At first I was going to make sure they didn't overlap
but the overlapping rooms meant that not every room was just a boring rectangle.

I then use [my A* implementation](https://github.com/valantonini/AStar) to link all the rooms together by 
ordering the rooms by distance from origin and then drawing a path from room center to room center. I then
double the size of everything (so a tile is now represented by 2 x 2 tile of the same type). I then run over the
floor tiles and identify what should be walls, corners etc. By doubling the tiles in the previous step, I can 
ensure there are no room corners that overlap eachother and can limit the number of tile types to the 20 below 
although you could use a smaller tileset and just rotate them according to their position.

```cs
public static class Tile
{
    public static byte Empty => 1;

    public static byte Floor => 0;

    public static byte TopLeftInsideCorner => 2;
    public static byte TopRightInsideCorner => 3;
    public static byte BottomLeftInsideCorner => 4;
    public static byte BottomRightInsideCorner => 5;

    public static byte TopWall => 6;
    public static byte RightWall => 7;
    public static byte BottomWall => 8;
    public static byte LeftWall => 9;

    public static byte TopLeftOutsideCorner => 10;
    public static byte TopRightOutsideCorner => 11;
    public static byte BottomLeftOutsideCorner => 12;
    public static byte BottomRightOutsideCorner => 13;

    public static byte TopNub => 14;
    public static byte RightNub => 15;
    public static byte BottomNub => 16;
    public static byte LeftNub => 17;

    public static byte DoubleVerticalWall => 18;
    public static byte DoubleHorizontalWall => 19;
}
```