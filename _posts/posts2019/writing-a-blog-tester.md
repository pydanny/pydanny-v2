---
date: "2019-10-15"
description: Ensuring that code in my articles actually works.
published: false
slug: writing-a-blog-tester
  - python
  - blog
time_to_read: 5
title: Writing a blog tester
---

# A Little Bit of History

If you look back at some of the older articles on my blog you'll see I used [pytest](https://pytest.org) assertions to verify that code I wrote actually worked if you tried it out. Some examples:

- [cached-property: Don't copy/paste code](https://www.pydanny.com/cached-property.html)
- [Docstrings and Various Python Objects](https://www.pydanny.com/docstrings-and-various-python-objects.html)

I had a little python script that would recursively search my blog for `ReStructuredText`, slurp out the python blocks, write those to file, then run pytest against the generated files. This meant that while my blog might have grammar or spelling errors, the code was bug free.

# Requirements

With the advent of my new blog I decided to rewrite the testrunner script with these features:

- Works with individual Markdown files. For debugging of blog entries this is faster and easier.
- Rely on simple Python `assert` statements. Nothing against pytest, but if I'm testing individual files, it's overkill.

# How it works

Let's say I have a code snippet with two asserts spread out over two code blocks:

```python
def times_5(x):
    return x * 5

assert times_5(3) == 15
```

```python
assert times_5(4) == 20
```

When I run it, the script slurps these code blocks up and combines them into a single Python file called `testfile.py`. It looks something like this:

```python
def times_5(x):
    return x * 5

assert times_5(3) == 15
assert times_5(4) == 20
```

Once saved as `testfile.py`, then `subprocess.Popen()` is run the code and capture the results. Any errors are reported to the user. If you have `assert times_5(4) == 200`, it's going to throw an `AssertionError`.

# The Code

You'll notice that there is no highlighting in `md_testrunner.py` below. The reason is that if I did that, it breaks the testing process. 

```
"""
Name: md_testrunner.py
Usage: python md_test_runner.py blogpost.md
Tested on: Python 3.7 and 3.8
"""
from sys import argv
from tempfile import NamedTemporaryFile
import re
import subprocess

open_pattern = re.compile("\s*`{3}\s*python")
close_pattern = re.compile("\s*`{3}")
test_filename = "testfile.py"


def main(filename):
    # Create an array of the Python code called "code"
    code = []
    in_python = False
    with open(filename) as f:
        for line in f.readlines():
            if re.match(open_pattern, line) is not None:
                in_python = True
                continue
            if in_python == True and re.match(close_pattern, line):
                in_python = False
            if in_python == True:
                code.append(line)

    # Save the code as a string to the testfile
    # `tempfile.NamedTempFile` fails here because the `write()` doesn't seem to occur
    # until the `with` statement is finished. I would love to be wrong in that, using
    # a tempfile is the cleaner approach. Please let me know a better approach.
    with open(test_filename, mode="w") as f:
        f.writelines("".join(code))

    # Run the code
    cmd = ["python", test_filename]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, error = proc.communicate()

    # Display the results
    print("Output: " + output.decode("ascii"))
    print("Error: " + error.decode("ascii"))
    print("Code: " + str(proc.returncode))

    # Cleanup
    os.remove(test_filename)


if __name__ == "__main__":
    main(argv[1])
```

# Next Steps

- Make it more fault tolerant. `sys.argv[1]` is fragile for gathering CLI arguments.
- Package it up so others can use it.
- Figure out how to make it not break the testing process if I turn on code highlighting.
