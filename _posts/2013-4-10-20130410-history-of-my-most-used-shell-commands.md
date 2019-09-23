---
date: 2013-4-10
tag:
  - python
  - twoscoops
  - book

author: Daniel Roy Greenfeld
location: California
title: Annotated History of My Most Used Shell Commands
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/20130410-history-of-my-most-used-shell-commands.html"
        >Annotated History of My Most Used Shell Commands</a
      >
    </div>
  </h1>
  <p>
    An oldie, but a goodie. This time I annotate it with reasons as to why
    things are used so much. If you blog, post your own!
  </p>
  <p>For reference, anything after a "#" is an annotation. :</p>
  <pre><code>$ history | awk '{a[$2]++ } END{for(i in a){print a[i] " " i}}'|sort -rn |head -n 20
166 git     # I am a software developer.
138 make    # Building the book takes 5 to 8 commands depending on format.
68 touch    # Readying the book for kindle requires adding a lot of new files.
51 python   # I am a Python developer and often use the shell.
21 open     # Opening PDFs and Mobi to see how the book build works.
12 rm       # I hate bad files.
10 cd       # Intrigued that this isn't higher.
9 kindled/kindlegen # Converting the book to .mobi format.
7 heroku    # Support for clients.
6 vim       # Sometimes I use it to keep my street cred up.
5 bpython   # I like this shell.
3 source    # Activating virtualenv without virtualenvwrapper. Long story...
3 cp        # Files need to be copied, right?
3 gondor    # More client support.
2 import    # I have no idea.
1 wget      # Fetching files from the internets.
1 pip       # More client support.
1 ls        # How is this not higher?
1 ssh       # Some projects are not on PaaS.
</code></pre>
  <p>
    Interesting how much of my very recent shell experience is focused on the
    <a href="http://django.2scoops.org/" target="_blank">book</a>.
  </p>
  <p>
    Speaking of books, today's reading is Jeff Knupp's
    <a
      href="http://www.amazon.com/Writing-Idiomatic-Python-3-3-ebook/dp/B00B5VXMRG/ref=tmm_kin_title_0?ie=UTF8&amp;qid=1365610132&amp;sr=8-1&amp;tag=ihpydanny-20"
      target="_blank"
      >Writing Idiomatic Python 3.3</a
    >
    (Python 2.7 edition also
    <a
      href="http://www.amazon.com/Writing-Idiomatic-Python-2-7-3-ebook/dp/B00B5KG0F8/ref=la_B00BBE1MDI_1_2_title_1_kin?ie=UTF8&amp;qid=1365610777&amp;sr=1-2&amp;tag=ihpydanny-20"
      target="_blank"
      >available</a
    >)
  </p>
  <p>Published: 2013-4-10 09:00</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/twoscoops.html">twoscoops</a>
    <a href="/tag/book.html">book</a>
  </p>
  <hr />
  <h3 class="ui header">Subscribe!</h3>
  <p>
    If you read this far, you might want to follow me on
    <a href="https://twitter.com/pydanny">twitter</a> or
    <a href="https://github.com/pydanny">github</a> and subscribe via email
    below (I'll email you new articles when I publish them).
  </p>
   
</div>
