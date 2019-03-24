---
tags: ["C#","DbUp", "Databases", "Serilog"]
categories: ["C#"]
title: "DbUp Serilog Upgrade Log"
author: val antonini
date: 2015-10-27
template: article.pug
location: /2015/10/27
---


A DbUp Upgrade Log that logs to serilog. You can view the project at [https://github.com/valantonini/DbUp.SerilogUpgradeLog](https://github.com/valantonini/DbUp.SerilogUpgradeLog "DBUp Serilog Upgrade Logger - Github") or install [via nuget](https://www.nuget.org/packages/DbUp.SerilogUpgradeLogger "DBUp Serilog Upgrade Logger - Nuget")



```bash
Install-Package DbUp.SerilogUpgradeLogger
```

Usage:

```cs
var upgrader = DeployChanges.To
                            .SqlDatabase("")
                            .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
                            .LogToConsole()
                            .LogToSerilog() //add this line
                            .Build();

```