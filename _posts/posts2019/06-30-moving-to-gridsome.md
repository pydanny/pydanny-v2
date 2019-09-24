---
category: blog
date: "2019-06-30"
description: Why and how I'm moving my blog to gridsome.
published: true
slug: moving-to-gridsome
tags:
  - javascript
  - blog
timeToRead: 3
time_to_read: 3
title: Moving to Gridsome
---

[In 2018 I wrote my own blog engine](/writing-new-blog-engine) and it's time to move off.

# Tooling is fun until it isn't

Outline:

- I like writing code and thought this was going to be a fun, easy project. How hard is it to write a blog engine anyway?
- My original Flask/Markdown/Serverless design was really slow
- Moved to slurping up generated Flask output into a static site. The compilation time to make this happen took minutes. This made writing new posts annoying.
- Optimizing page/image loads is code I didn't feel like running

TODO expand

## Choosing a new blog engine

Requirements:

- Must be a static site because Jamstack rocks
- If not using .html extension, must easily redirect from .html to as not to annoy old readers
- VueJS because it's my favorite frontend framework
- Side note: Can I change my name to PyJsDanny?
- Deploy on Netlify with Netlify CMS as a future option so I can edit posts on mobile devices

TODO expand

## Migration time!

- Python's markdown library is more foregiving than JavaScript's remark library
- Find all the missing images
- Fix broken links
- Use netlify

TODO expand

## Moving back to GitHub

- I prefer GitLab but GitHub is where the community is
- Move will occur once migration is complete

TODO expand
