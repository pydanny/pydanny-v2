---
date: 2014-04-24
tag: 
  - python

author: Daniel Roy Greenfeld
location: California
title: Python Partials are Fun!
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/python-partials-are-fun.html">Python Partials are Fun!</a>
</div>
</h1>
<p>Writing reusable code is a good thing, right? The trick is to do so in a
way that makes your life and those of others easier, but to do so in a
very clear and maintainable way. Recently I've been playing around with
Python's
<a href="https://docs.python.org/2.7/library/functools.html#functools.partial" target="_blank">functools.partial</a>
function, which I've found can help facilitate writing reusable code.</p>
<p><a href="https://pydanny.com/python-partials-are-fun.html" target="_blank"><img alt="image" src="https://pydanny.com/static/partials.png"/></a></p>
<p>While the documentation has a nice explanation and demonstration of
<code>functools.partial</code>, it's very serious. I've got my own internal
version of things which I think is a little more fun.</p>
<h1 id="my-explanation-of-functoolspartial">My Explanation of <code>functools.partial</code></h1>
<p>What <code>functools.partial</code> does is:</p>
<ul>
<li>Makes a new version of a function with one or more arguments already
filled in.</li>
<li>New version of a function documents itself.</li>
</ul>
<p>Rather than dive into paragraphs of explanation, I'll use code examples
to explain how this works.</p>
<h1 id="my-demonstration-of-functoolspartial">My Demonstration of <code>functools.partial</code></h1>
<p>First, let's say we want to create a function that explicitly performs
<a href="https://en.wikipedia.org/wiki/Exponentiation" target="_blank">exponentiation</a>. This way
we can get the
<a href="https://en.wikipedia.org/wiki/Square_(algebra)" target="_blank">squares</a>,
<a href="https://en.wikipedia.org/wiki/Cube_(algebra)" target="_blank">cubes</a>, and other power
operations on any number. This duplicates Python's built-in <code>pow()</code>
function, but our version has the very nice addition of keyword
arguments.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">def</span> <span class="nf">power</span><span class="p">(</span><span class="n">base</span><span class="p">,</span> <span class="n">exponent</span><span class="p">):</span>
    <span class="k">return</span> <span class="n">base</span> <span class="o">**</span> <span class="n">exponent</span>
</code></pre></div>
<p>Now what if we want to have dedicated square and cube functions that
leverage the <code>power()</code> function? Of course, we can do it thus:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">def</span> <span class="nf">square</span><span class="p">(</span><span class="n">base</span><span class="p">):</span>
    <span class="k">return</span> <span class="n">power</span><span class="p">(</span><span class="n">base</span><span class="p">,</span> <span class="mi">2</span><span class="p">)</span>

<span class="k">def</span> <span class="nf">cube</span><span class="p">(</span><span class="n">base</span><span class="p">):</span>
    <span class="k">return</span> <span class="n">power</span><span class="p">(</span><span class="n">base</span><span class="p">,</span> <span class="mi">3</span><span class="p">)</span>
</code></pre></div>
<p>This works, but what if we want to create 15 or 20 variations of our
<code>power()</code> function? What about 1000 of them? Writing that much
repetitive code is, needless to say, annoying. This is where partials
come into play. Let's rewrite our square and cube functions using
partials, and test it for success using
<a href="https://pydanny.com/pytest-no-boilerplate-testing.html" target="_blank">py.test</a>:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="kn">from</span> <span class="nn">functools</span> <span class="kn">import</span> <span class="n">partial</span>

<span class="n">square</span> <span class="o">=</span> <span class="n">partial</span><span class="p">(</span><span class="n">power</span><span class="p">,</span> <span class="n">exponent</span><span class="o">=</span><span class="mi">2</span><span class="p">)</span>
<span class="n">cube</span> <span class="o">=</span> <span class="n">partial</span><span class="p">(</span><span class="n">power</span><span class="p">,</span> <span class="n">exponent</span><span class="o">=</span><span class="mi">3</span><span class="p">)</span>

<span class="k">def</span> <span class="nf">test_partials</span><span class="p">():</span>
    <span class="k">assert</span> <span class="n">square</span><span class="p">(</span><span class="mi">2</span><span class="p">)</span> <span class="o">==</span> <span class="mi">4</span>
    <span class="k">assert</span> <span class="n">cube</span><span class="p">(</span><span class="mi">2</span><span class="p">)</span> <span class="o">==</span> <span class="mi">8</span>
</code></pre></div>
<p>Whoa! That's awesome. You know what adds to that awesome? Functions
created with partial document themselves (to a degree). I'll
demonstrate with more tests:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">def</span> <span class="nf">test_partial_docs</span><span class="p">():</span>
    <span class="k">assert</span> <span class="n">square</span><span class="o">.</span><span class="n">keywords</span> <span class="o">==</span> <span class="p">{</span><span class="s2">"exponent"</span><span class="p">:</span> <span class="mi">2</span><span class="p">}</span>
    <span class="k">assert</span> <span class="n">square</span><span class="o">.</span><span class="n">func</span> <span class="o">==</span> <span class="n">power</span>

    <span class="k">assert</span> <span class="n">cube</span><span class="o">.</span><span class="n">keywords</span> <span class="o">==</span> <span class="p">{</span><span class="s2">"exponent"</span><span class="p">:</span> <span class="mi">3</span><span class="p">}</span>
    <span class="k">assert</span> <span class="n">cube</span><span class="o">.</span><span class="n">func</span> <span class="o">==</span> <span class="n">power</span>
</code></pre></div>
<p>Using a loop, let's build and test ten (10) custom <code>power()</code> functions,
which I'll call 'power partials' (ahem... I find 'power partials'
sounds rather amusing.):</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">def</span> <span class="nf">test_power_partials</span><span class="p">():</span>

    <span class="c1"># List to store the partials</span>
    <span class="n">power_partials</span> <span class="o">=</span> <span class="p">[]</span>
    <span class="k">for</span> <span class="n">x</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">11</span><span class="p">):</span>

        <span class="c1"># create the partial</span>
        <span class="n">f</span> <span class="o">=</span> <span class="n">partial</span><span class="p">(</span><span class="n">power</span><span class="p">,</span> <span class="n">exponent</span><span class="o">=</span><span class="n">x</span><span class="p">)</span>

        <span class="c1"># Add the partial to the list</span>
        <span class="n">power_partials</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">f</span><span class="p">)</span>

    <span class="c1"># We could just use list comprehension instead of the loop</span>
    <span class="c1"># [partial(power, exponent=x) for x in range(1, 11)]</span>


    <span class="c1"># Test the first power</span>
    <span class="k">assert</span> <span class="n">power_partials</span><span class="p">[</span><span class="mi">0</span><span class="p">](</span><span class="mi">2</span><span class="p">)</span> <span class="o">==</span> <span class="mi">2</span>

    <span class="c1"># Test the fifth power</span>
    <span class="k">assert</span> <span class="n">power_partials</span><span class="p">[</span><span class="mi">4</span><span class="p">](</span><span class="mi">2</span><span class="p">)</span> <span class="o">==</span> <span class="mi">32</span>

    <span class="c1"># Test the tenth power</span>
    <span class="k">assert</span> <span class="n">power_partials</span><span class="p">[</span><span class="mi">9</span><span class="p">](</span><span class="mi">2</span><span class="p">)</span> <span class="o">==</span> <span class="mi">1024</span>        
</code></pre></div>
<h1 id="a-way-to-organize-partials">A Way to Organize Partials</h1>
<p>Lists are great, but sometimes it's nice to have a more legible way of
interacting with functions. There are an infinite ways to make this
happen, but I like the dot notation of classes. So here is a 'partial
structure' class which follows a pattern I think is pretty handy:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># Since I like my article code to work in both Python 2.7 and 3,</span>
<span class="c1">#   I'll import the excellent six library to manage the</span>
<span class="c1">#   differences between Python versions. Six is available on PyPI</span>
<span class="c1">#   at https://pypi.python.org/pypi/six.</span>
<span class="kn">from</span> <span class="nn">six</span> <span class="kn">import</span> <span class="n">add_metaclass</span>

<span class="k">class</span> <span class="nc">PowerMeta</span><span class="p">(</span><span class="nb">type</span><span class="p">):</span>
    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">cls</span><span class="p">,</span> <span class="n">name</span><span class="p">,</span> <span class="n">bases</span><span class="p">,</span> <span class="n">dct</span><span class="p">):</span>

        <span class="c1"># generate 50 partial power functions:</span>
        <span class="k">for</span> <span class="n">x</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">51</span><span class="p">):</span>

            <span class="c1"># Set the partials to the class</span>
            <span class="nb">setattr</span><span class="p">(</span>
                <span class="c1"># cls represents the class</span>
                <span class="bp">cls</span><span class="p">,</span>

                <span class="c1"># name the partial</span>
                <span class="s2">"p{}"</span><span class="o">.</span><span class="n">format</span><span class="p">(</span><span class="n">x</span><span class="p">),</span>

                <span class="c1"># partials created here</span>
                <span class="n">partial</span><span class="p">(</span><span class="n">power</span><span class="p">,</span> <span class="n">exponent</span><span class="o">=</span><span class="n">x</span><span class="p">)</span>
            <span class="p">)</span>
        <span class="nb">super</span><span class="p">(</span><span class="n">PowerMeta</span><span class="p">,</span> <span class="bp">cls</span><span class="p">)</span><span class="o">.</span><span class="fm">__init__</span><span class="p">(</span><span class="n">name</span><span class="p">,</span> <span class="n">bases</span><span class="p">,</span> <span class="n">dct</span><span class="p">)</span>

<span class="nd">@add_metaclass</span><span class="p">(</span><span class="n">PowerMeta</span><span class="p">)</span>
<span class="k">class</span> <span class="nc">PowerStructure</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>
    <span class="k">pass</span>
</code></pre></div>
<p>Okay, let's test our PowerStructure class as an instantiated
PowerStructure:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">def</span> <span class="nf">test_power_structure_object</span><span class="p">():</span>
    <span class="n">p</span> <span class="o">=</span> <span class="n">PowerStructure</span><span class="p">()</span>

    <span class="c1"># 10 squared</span>
    <span class="k">assert</span> <span class="n">p</span><span class="o">.</span><span class="n">p2</span><span class="p">(</span><span class="mi">10</span><span class="p">)</span> <span class="o">==</span> <span class="mi">100</span>

    <span class="c1"># 2 to the 5th power</span>
    <span class="k">assert</span> <span class="n">p</span><span class="o">.</span><span class="n">p5</span><span class="p">(</span><span class="mi">2</span><span class="p">)</span> <span class="o">==</span> <span class="mi">32</span>

    <span class="c1"># 2 to the 50th power</span>
    <span class="k">assert</span> <span class="n">p</span><span class="o">.</span><span class="n">p50</span><span class="p">(</span><span class="mi">2</span><span class="p">)</span> <span class="o">==</span> <span class="mi">1125899906842624</span>
</code></pre></div>
<p>Looks good, right? But wait, there's more!</p>
<p>Thanks to the power of metaclasses, we don't need to instantiate the
PowerStructure class!</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">def</span> <span class="nf">test_power_structure_class</span><span class="p">():</span>
    <span class="c1"># Thanks to the power of metaclasses, we don't need to instantiate!</span>

    <span class="c1"># 10 squared</span>
    <span class="k">assert</span> <span class="n">PowerStructure</span><span class="o">.</span><span class="n">p2</span><span class="p">(</span><span class="mi">10</span><span class="p">)</span> <span class="o">==</span> <span class="mi">100</span>

    <span class="c1"># 2 to the 5th power</span>
    <span class="k">assert</span> <span class="n">PowerStructure</span><span class="o">.</span><span class="n">p5</span><span class="p">(</span><span class="mi">2</span><span class="p">)</span> <span class="o">==</span> <span class="mi">32</span>

    <span class="c1"># 2 to the 50th power</span>
    <span class="k">assert</span> <span class="n">PowerStructure</span><span class="o">.</span><span class="n">p50</span><span class="p">(</span><span class="mi">2</span><span class="p">)</span> <span class="o">==</span> <span class="mi">1125899906842624</span>
</code></pre></div>
<p><a href="https://gist.github.com/pydanny/11295815" target="_blank">Source Code</a></p>
<h1 id="summary">Summary</h1>
<p>I've provided some simple examples of how to use <code>functools.partials</code>.
I find them really useful for certain tasks, mostly in avoiding
repeating myself. Like any coding tool, complex usage can cloak the
meaning of code, so be careful and use <code>functools.partials</code> judiciously.</p>
<p>Update: <a href="https://twitter.com/ncoghlan_dev" target="_blank">Nick Coghlan</a> reminded me to
mention that Python has a <code>pow()</code> built-in.</p>
<p>Update 04/30/2014: <a href="https://twitter.com/samueljohn_de" target="_blank">Samuel John</a>
corrected me on Nick Coghlan's name.</p>
<p>Published: 2014-04-24 09:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>