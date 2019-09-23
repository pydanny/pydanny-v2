---
date: 2013-11-22
tag:
  - python

author: Daniel Roy Greenfeld
location: California
title: Python Yields are Fun!
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/python-yields-are-fun.html">Python Yields are Fun!</a>
    </div>
  </h1>
  <p>
    While you can optimize the heck out of your Python code with
    <code>generators</code> and <code>generator expressions</code> I'm more
    interested in goofing around and solving classic programming questions with
    the <code>yield</code> statement.
  </p>
  <p>
    <strong>note:</strong> For this article, since it's easier to explain things
    as they happen, I'll be including a lot of inline comments.
  </p>
  <p>
    Let's start with a simple function that returns a sequence of some of my
    favorite values:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># yielding.py</span>
<span class="k">def</span> <span class="nf">pydanny_selected_numbers</span><span class="p">():</span>

    <span class="c1"># If you multiple 9 by any other number you can easily play with</span>
    <span class="c1">#   numbers to get back to 9.</span>
    <span class="c1">#   Ex: 2 * 9 = 18. 1 + 8 = 9</span>
    <span class="c1">#   Ex: 15 * 9 = 135. 1 + 3 + 5 = 9</span>
    <span class="c1">#   See https://en.wikipedia.org/wiki/Digital_root</span>
    <span class="k">yield</span> <span class="mi">9</span>

    <span class="c1"># A pretty prime.</span>
    <span class="k">yield</span> <span class="mi">31</span>

    <span class="c1"># What's 6 * 7?</span>
    <span class="k">yield</span> <span class="mi">42</span>

    <span class="c1"># The string representation of my first date with Audrey Roy</span>
    <span class="k">yield</span> <span class="s2">"2010/02/20"</span>

</code></pre>
  </div>

  <p>
    <strong>note:</strong> When a function uses the <code>yield</code> keyword
    it's now called a <strong>generator</strong>.
  </p>
  <p>Let's do a test drive in the REPL:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">yielding</span> <span class="kn">import</span> <span class="n">pydanny_selected_numbers</span>  <span class="c1"># import ye aulde code</span>

<span class="o">&gt;&gt;&gt;</span> <span class="n">pydanny_selected_numbers</span><span class="p">()</span> <span class="c1"># create the iterator object</span>
<span class="o">&lt;</span><span class="n">generator</span> <span class="nb">object</span> <span class="n">pydanny_selected_numbers</span> <span class="n">at</span> <span class="mh">0x1038a03c0</span><span class="o">&gt;</span>

<span class="o">&gt;&gt;&gt;</span> <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="n">pydanny_selected_numbers</span><span class="p">():</span> <span class="c1"># iterate through the iterator</span>
<span class="o">...</span> <span class="k">print</span><span class="p">(</span><span class="n">i</span><span class="p">)</span>
<span class="o">...</span>
<span class="mi">9</span>
<span class="mi">31</span>
<span class="mi">42</span>
<span class="s2">"2010/02/20"</span>

<span class="o">&gt;&gt;&gt;</span> <span class="n">iterator</span> <span class="o">=</span> <span class="n">pydanny_selected_numbers</span><span class="p">()</span> <span class="c1"># create the iterator object</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="n">iterator</span><span class="p">:</span> <span class="c1"># iterate through the iterator object</span>
<span class="o">...</span> <span class="k">print</span><span class="p">(</span><span class="n">i</span><span class="p">)</span>
<span class="o">...</span>
<span class="mi">9</span>
<span class="mi">31</span>
<span class="mi">42</span>
<span class="s2">"2010/02/20"</span>
</code></pre>
  </div>

  <p>
    Of course, if you know anything about generator expressions, you know I
    could do this more tersely with the following:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="n">iterator</span> <span class="o">=</span> <span class="p">(</span><span class="n">x</span> <span class="k">for</span> <span class="n">x</span> <span class="ow">in</span> <span class="p">[</span><span class="mi">9</span><span class="p">,</span> <span class="mi">31</span><span class="p">,</span> <span class="mi">42</span><span class="p">,</span> <span class="s2">"2010/02/20"</span><span class="p">])</span> 
<span class="o">&gt;&gt;&gt;</span> <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="n">iterator</span><span class="p">:</span>
<span class="o">...</span>     <span class="k">print</span><span class="p">(</span><span class="n">i</span><span class="p">)</span>
<span class="o">...</span>
<span class="mi">9</span>
<span class="mi">31</span>
<span class="mi">42</span>
<span class="s2">"2010/02/20"</span>
</code></pre>
  </div>
  <p>
    While that is more terse, it doesn't give us the amount of control we get by
    defining our own generator function. For example, what if I want to present
    the Fibonacci sequence in a loop rather than with recursion?
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># fun.py</span>
<span class="k">def</span> <span class="nf">fibonacci</span><span class="p">(</span><span class="nb">max</span><span class="p">):</span>
    <span class="n">result</span> <span class="o">=</span> <span class="mi">0</span>
    <span class="n">base</span> <span class="o">=</span> <span class="mi">1</span>
    <span class="k">while</span> <span class="n">result</span> <span class="o">&lt;=</span> <span class="nb">max</span><span class="p">:</span>

        <span class="c1"># This yield statement is where the execution leaves the function.</span>
        <span class="k">yield</span> <span class="n">result</span>
        <span class="c1"># This is where the execution comes back into the function. This is</span>
        <span class="c1"># just whitespace, but that it came back while preserving the state</span>
        <span class="c1"># of the function is pretty awesome.</span>

        <span class="c1"># Fibonacci code to increase the number according to</span>
        <span class="c1">#   https://en.wikipedia.org/wiki/Fibonacci_number</span>
        <span class="n">n</span> <span class="o">=</span> <span class="n">result</span> <span class="o">+</span> <span class="n">base</span>
        <span class="n">result</span> <span class="o">=</span> <span class="n">base</span>
        <span class="n">base</span> <span class="o">=</span> <span class="n">n</span>

<span class="k">if</span> <span class="vm">**name**</span> <span class="o">==</span> <span class="s2">"**main**"</span><span class="p">:</span>

    <span class="k">for</span> <span class="n">x</span> <span class="ow">in</span> <span class="n">fibonacci</span><span class="p">(</span><span class="mi">144</span><span class="p">):</span>
        <span class="k">print</span><span class="p">(</span><span class="n">x</span><span class="p">)</span>

</code></pre>
  </div>

  <p>Let's try this out in the REPL:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">fun</span> <span class="kn">import</span> <span class="n">fibonacci</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">fibonacci</span><span class="p">(</span><span class="mi">10</span><span class="p">)</span>
<span class="o">&lt;</span><span class="n">generator</span> <span class="nb">object</span> <span class="n">fibonacci</span> <span class="n">at</span> <span class="mh">0x10d49e460</span><span class="o">&gt;</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">for</span> <span class="n">x</span> <span class="ow">in</span> <span class="n">fibonacci</span><span class="p">(</span><span class="mi">10</span><span class="p">):</span>
<span class="o">...</span>     <span class="k">print</span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="mi">0</span>
<span class="mi">1</span>
<span class="mi">1</span>
<span class="mi">2</span>
<span class="mi">3</span>
<span class="mi">5</span>
<span class="mi">8</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">iterator</span> <span class="o">=</span> <span class="n">fibonacci</span><span class="p">(</span><span class="mi">5</span><span class="p">)</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">iterator</span>
<span class="o">&lt;</span><span class="n">generator</span> <span class="nb">object</span> <span class="n">fibonacci</span> <span class="n">at</span> <span class="mh">0x10d63c550</span><span class="o">&gt;</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">iterator</span><span class="o">.</span><span class="n">next</span><span class="p">()</span>
<span class="mi">0</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">iterator</span><span class="o">.</span><span class="n">next</span><span class="p">()</span>
<span class="mi">1</span>
</code></pre>
  </div>
  <p>
    What's nice about this is so much more than fibonacci logic in a generator
    function. Instead, imagine instead of a lightweight calculation I had done
    something performance intensive. By using generator expressions I can
    readily control the execution calls with the iterator object's
    <code>next()</code> method, saving processor cycles.
  </p>
  <p>Very nifty.</p>
  <h1 id="summary">Summary</h1>
  <p>
    I admit it. Like many Python developers, I find using tools like yields and
    generators to optimize the heck out of performance intensive things a lot of
    fun.
  </p>
  <p>
    If you are like me and like this sort of stuff, I recommend the following
    resources:
  </p>
  <ul>
    <li>
      <a
        href="http://www.amazon.com/Treading-Python-Volume-Intermediate/dp/149055095X/ref=tmm_pap_title_0?tag=mlinar-20"
        target="_blank"
        >Matt Harrison's Treading on Python Volume 2: Intermediate Python</a
      >
    </li>
    <li>
      <a
        href="http://www.jeffknupp.com/blog/2013/04/07/improve-your-python-yield-and-generators-explained/"
        target="_blank"
        >Jeff Knupp's Improve Your Python: 'yield' and Generators Explained</a
      >
    </li>
  </ul>
  <p>
    In the next article I'll demonstrate how to use the
    <code>yield</code> statement to create context managers.
  </p>
  <p>
    <strong>Update</strong>:
    <a href="https://twitter.com/ntoll" target="_blank">Nicholas Tollervey</a>
    pointed me at wikipedia's Digital root article, so I added it to the
    comments of the first code sample.
  </p>
  <p>
    <strong>Update</strong>: Oddthinking pointed out that I forgot a print
    statement. In the REPL it's not really needed, but if this is translated to
    a script then it's necessary.
  </p>
  <p>Published: 2013-11-22 14:00</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
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
