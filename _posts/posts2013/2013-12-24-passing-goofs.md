---
category: python
date: '2013-12-24'
filename: posts2013/2013-12-24-passing-goofs.md
published: true
slug: exceptions-as-decorator-arguments
tags:
- python
- howto
timeToRead: 0
time_to_read: 0
title: Exceptions as Decorator Arguments
---

I wanted to see if I could have an exception as a decorator argument.
Here is what I came up with:

``` python
import functools

class MyGoof(Exception):
    pass

def pass_goof(exception):
    def decorator(test_func):
        @functools.wraps(test_func)
        def wrapper(*args, **kwargs):
            try:
                return test_func(*args, **kwargs)
            except exception as e:
                return None
        return wrapper
    return decorator

@pass_goof(MyGoof)
def test1():
    return "test1"

@pass_goof(MyGoof)
def test2():
    raise MyGoof

assert test1() == 'test1'
assert test2() == None
```
