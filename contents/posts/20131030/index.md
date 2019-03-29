---
tags: ["Linux", "Linode"]
categories: ["Linux", "Linode"]
title:  "Removing a blocked ip from fail2ban on a Linode"
author: val antonini
date: 2013-10-30
template: article.pug
location: /2013/10/30
---

I have a Linode setup with [fail2ban](http://www.fail2ban.org "fail2ban") running to ban ip's after several failed login attempts. Setting it up is as simple as following the directions provided by Linode [here](https://library.linode.com/security/fail2ban "setting up fail2ban on Linode").

If your like me and manage to ban your own ip this how to fix it.

1. Log into the linode manager.

2. Click on the remote access tab.

3. In the console access click the 'Lish via Ajaxterm Launch Lish Ajax Console' link. This will launch a shell in the browser. Login with your username and password and become a superuser:

```bash
sudo su
```

4. Check if you are indeed banned (replace 192.168.1.1 with your ipaddress):

```bash
iptables -L -n | grep 192.168.1.1
```

If you get a line like the one below you have been banned.


```bash
DROP    all    --    192.168.1.1    0.0.0.0/0
```

5. Determine the name of the jail your in.

```bash
iptables -L | grep fail2ban
```

This should give you an output similar to this.

```bash
fail2ban-ssh   tcp   --   anywhere   anywhere   multiport dports ssh
Chain fail2ban-ssh (1 references)
```

In my case there was only 1 entry, fail2ban-ssh.

6. Use this in your next query to remove your ip:

```bash
iptables -D fail2ban-ssh -s 192.168.1.1 -j DROP
```

You should now be unbanned and can log out of the web console.