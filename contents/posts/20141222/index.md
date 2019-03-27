---
tags: ["C#", "Data Structures", "Collections", "Algorithms"]
categories: ["C#", "Data Structures", "Algorithms"]
title: "A priority queue in C#"
author: val antonini
date: 2014-12-22
template: article.pug
location: /2014/12/22
---

*Update 2*: I have created a PriorityQueue that only sorts when the indexed value changes [here](/2014/12/24 "Priority Queue in C# part 2")

*Update*: I will be creating a new version of this that determines whether sorting is actually required before sorting (i.e. whether any of the sort keys have changed).

I was looking for a priority queue in C# for some pathing algorithms. The built in SortedDictionary doesn't allow duplicate keys and I wanted a collection that didn't require me to remove and re-add an item to update it. There were a lot of good solutions on the internet but I think I came up with a really simple and clever implementation.

I realised, for me, the only time I access an item is by popping/dequeueing it so I only really need to sort the collection immediately before popping it. Doing it this way means I don't need to worry about inserting an item at the correct point or updating the collection when the values inside it change. I checked to see [what algorithm a List(T).Sort uses on MSDN](http://msdn.microsoft.com/en-us/library/b0zbh7b6(v=vs.110).aspx "List<T>.Sort Method") and was really happy to find the following:

>This method uses the Array.Sort method, which applies the introspective sort as follows:
> - If the partition size is fewer than 16 elements, it uses an insertion sort algorithm.
> - If the number of partitions exceeds 2 * LogN, where N is the range of the input array, it uses a Heapsort algorithm.
> - Otherwise, it uses a Quicksort algorithm.
> This implementation performs an unstable sort; that is, if two elements are equal, their order might not be preserved. In  ontrast, a stable sort preserves the order of elements that are equal. On average, this method is an O(n log n) operation, where n is Count; in the worst case it is an O(n ^ 2) operation.

The constructor accepts an optional IComparer<T> to decide how items are compared.

```cs
using System.Collections.Generic;

namespace valantonini
{
    public interface IPriorityQueue<T>
    {
        void Push(T item);
        T Pop();
        bool Contains(T item);
    }

    public class PriorityQueue<T> : IPriorityQueue<T>
    {
        private readonly List<T> _innerList = new List<T>();
        private readonly IComparer<T> _comparer;

        public int Count
        {
            get { return _innerList.Count; }
        }

        public PriorityQueue(IComparer<T> comparer = null)
        {
            _comparer = comparer ?? Comparer<T>.Default;
        }

        public void Push(T item)
        {
            _innerList.Add(item);
        }

        public T Pop()
        {
            if (_innerList.Count <= 0)
            {
                return default(T);
            }

            Sort();
            var item = _innerList[0];
            _innerList.RemoveAt(0);
            return item;
        }

        public bool Contains(T item)
        {
            return _innerList.Contains(item);
        }

        private void Sort()
        {
            _innerList.Sort(_comparer);
        }
    }
}
```
The big weakness in this solution is it sorts each time you pop so there is a big overhead if you do sequential pops without the sort key ever having changed. The trade off is we don't need to worry about updating the collection each time a sort key is updated. This is handy if the sort key is being tracked and updated regularly from somewhere else.