---
title:  "How to tell if a transform is facing another in Unity3d"
author: val antonini
date: 2013-06-10
template: article.pug
location: /2013/06/10
---


A helpful method to check to see if a transform is facing another transform in Unity3d


```cs
private bool IsFacing(Transform target)
{
    Vector3 forward = transform.TransformDirection(Vector3.forward);
    Vector3 toTarget = target.position - transform.position;
    return Vector3.Dot(forward, toTarget) > 0;
}
```