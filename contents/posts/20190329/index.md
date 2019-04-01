---
tags: ["Web Development"]
categories: ["Web Development"]
title: "Site rewrite"
author: val antonini
date: 2019-03-29
template: article.pug
location: /2019/03/29
---

I moved this blog away from wordpress in 2014 and decided to write it using [Jekyll](https://jekyllrb.com "Jekyll"). At the time I really was fascinated by Ruby and wanted to learn it and it seemed like a great opportunity. I was also unhappy with the responsive wordpress themes at the time.

I've been working almost exclusively in Javascript and Typescript the last 6 months and have really enjoyed it. I decided to rewrite the blog in [Wintersmith](http://wintersmith.io "Wintersmith") as it seemed like easier to maintain and I feel ok open sourcing it as it's not a bunch of barely functioning, badly written Ruby and spaghetti css.

I still love my initial design I came up with in 2014 and used more or less the same design. It's also been 6 months since I've used jQuery for web development so I opted for a custom compiled [Bulma](https://bulma.io "Bulma") instead of Bootstrap as I didn't want any JQuery dependencies. I initially started out using [Spectre](https://picturepan2.github.io/spectre/ "Spectre") but found some of the things I really liked such as off canvas was marked as experimental and not quite working how I intended.

The final setup is:

- [Wintersmith](http://wintersmith.io "Wintersmith")
- [Bulma](https://bulma.io "Bulma") 
- [Sass](https://sass-lang.com "Sass")
- [PugJS](https://pugjs.org/ "PugJS")
- [Jekyll simple search](https://github.com/christian-fei/Simple-Jekyll-Search "Jekyll simple search")
- [Typescript](https://www.typescriptlang.org "Typescript")
- [Highlightjs](https://highlightjs.org/ "highlightjs")
- [Gulp](https://gulpjs.com "Gulp")
- Markdown for content

[PurgeCss](https://github.com/FullHuman/purgecss "purgecss") is used to trim down all the excess and deliver a front page around ~100kB, 85kb of which are images and fonts.

Source code can be found [here](https://github.com/valantonini/arakawa "github/valantonini/arakawa").
