---
date: "2021-03-01T23:45:00.00Z"
published: true
description: My list of simple and complex git commands and operations.
slug: git-cheatsheet
tags:
  - git
  - cheatsheet  
  - howto
time_to_read: 5
title: Git Cheatsheet
type: post
---

I use a mix of both command-line and [GitHub Desktop](https://desktop.github.com/), keeping both fresh in my mind. I don't want to go entirely desktop because there are times (ssh-ing for example) when I have to use the command-line.

Note: Anything with an asterisk (`*`) can be done with [GitHub Desktop](https://desktop.github.com/). 

# Creating a new branch*

Work in the smallest, most atomic feature branches possible. It's easier for people to review smaller things, meaning you will move faster.

```
git checkout -b my-new-branch
```

# Committing all my changes*

Note: Don't end commit messages with punctuation. Many projects reject it. Not sure why, it is just a thing.

Note 2: GitHub desktop makes adding long commits easy.

```
git commit -am "I am committing everything"
```

# Pushing my branch up*

```
git push origin my-new-branch
```

# Deleting a local branch*

```
git branch -d my-new-branch
```

# Deleting a remote branch (on GitHub, Gitlab, etc)

```
git branch -D my-new-branch
```


# Squashing all commits into a new one

Rebase is fundamental to working with Git. Yet unless I really think hard I screw them up. Therefore, I tend to just squash everything down to one commit and look good in the process. Until now, no one has known I frequently copy/pasta this series for all my PRs. Here is how I do it:

```
git checkout my-new-branch
git reset $(git merge-base master my-new-branch)
git add -A
git commit -m "OMG I figured out everything with just one commit"
git push --force
```
