---
tags: ["C#", "Data Structures", "Collections"]
categories: ["C#", "Data Structures"]
title: "A priority queue in C# - part 2"
author: val antonini
date: 2014-12-24
template: article.pug
location: /2014/12/24
---


In [my last post](/2014/12/22 "Priority Queue in C#") I had created a simple priority queue. Unfortunately it would sort itself each time an item is popped/dequeued. I have created [a better priority queue that only sorts itself when the indexed value is changed](https://github.com/valantonini/PriorityQueue "valantonini/PriorityQueue").


I do this by having items implement the provided IPrioritizable interface. I was initially going to build it on the [INotifyPropertyChanged interface](http://msdn.microsoft.com/en-us/library/system.componentmodel.inotifypropertychanged(v=vs.110).aspx "MSDN INotifyPropertyChanged Interface" ) but I thought this solution was simpler. The interface has 2 methods to Add/Remove an Action that notifies the PriorityQueue that it needs to be sorted. It now also requires a IComparer be provided. An example of this would be:

```cs
using System;
using System.Collections.Generic;

namespace PriorityQueueCollection.Tests
{
    public class PrioritizableItem : IPrioritizable
    {
        private Action _indexUpdated;
        private int _value;

        public int Value
        {
            get { return _value; }
            set
            {
                _indexUpdated();
                _value = value;
            }
        }

        public PrioritizableItem(int value)
        {
            _indexUpdated = () => { };
            Value = value;
        }

        public void AddIndexUpdatedAction(Action indexUpdated)
        {
            _indexUpdated = indexUpdated;
        }

        public void RemoveIndexUpdatedAction()
        {
            _indexUpdated = () => { };
        }
    }

    public class ComparePrioritizableItem : IComparer<PrioritizableItem>
    {
        public int Compare(PrioritizableItem x, PrioritizableItem y)
        {
            if (x.Value > y.Value)
            {
                return 1;
            }

            if (x.Value < y.Value)
            {
                return -1;
            }

            return 0;
        }
    }
}
```

Whilst not as simple as it's predecessor it wastes less time ordering the queue on sequential pops.