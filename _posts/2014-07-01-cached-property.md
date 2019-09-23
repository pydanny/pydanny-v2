---
date: 2014-07-01
tag:
  - python
  - django
  - flask
  - bottle
  - ppoftw
  - pypi
  - pyramid

author: Daniel Roy Greenfeld
location: California
title: "cached-property: Don't copy/paste code"
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/cached-property.html">cached-property: Don't copy/paste code</a>
    </div>
  </h1>
  <p>
    In Python, the <code>@cached_property</code> decorator is a really nice
    piece of code. What it does is it caches the result of a
    <a
      href="https://docs.python.org/2/library/functions.html#property"
      target="_blank"
      >property</a
    >
    call. The cached result will persist as long as the instance does, so if the
    instance is passed around and the function subsequently invoked, the cached
    result will be returned.
  </p>
  <p>
    If that doesn't make much sense, below is a snippet of code that shows the
    code and demonstrates it in action. As always, I'm using
    <a
      href="https://pydanny.com/pytest-no-boilerplate-testing.html"
      target="_blank"
      >pytest</a
    >
    to validate my code:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">datetime</span> <span class="kn">import</span> <span class="n">datetime</span><span class="p">,</span> <span class="n">timedelta</span>
<span class="kn">import</span> <span class="nn">time</span>

<span class="k">class</span> <span class="nc">cached_property</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>
<span class="sd">""" A property that is only computed once per instance and then replaces</span>
<span class="sd"> itself with an ordinary attribute. Deleting the attribute resets the</span>
<span class="sd"> property.</span>

<span class="sd"> Source: https://github.com/bottlepy/bottle/commit/fa7733e075da0d790d809aa3d2f53071897e6f76</span>
<span class="sd"> """</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">func</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">=</span> <span class="nb">getattr</span><span class="p">(</span><span class="n">func</span><span class="p">,</span> <span class="s1">'__doc__'</span><span class="p">)</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">func</span> <span class="o">=</span> <span class="n">func</span>

    <span class="k">def</span> <span class="fm">__get__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">obj</span><span class="p">,</span> <span class="bp">cls</span><span class="p">):</span>
        <span class="k">if</span> <span class="n">obj</span> <span class="ow">is</span> <span class="bp">None</span><span class="p">:</span>
            <span class="k">return</span> <span class="bp">self</span>
        <span class="n">value</span> <span class="o">=</span> <span class="n">obj</span><span class="o">.</span><span class="vm">__dict__</span><span class="p">[</span><span class="bp">self</span><span class="o">.</span><span class="n">func</span><span class="o">.</span><span class="vm">__name__</span><span class="p">]</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">func</span><span class="p">(</span><span class="n">obj</span><span class="p">)</span>
        <span class="k">return</span> <span class="n">value</span>

<span class="k">class</span> <span class="nc">SlowClass1</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>

    <span class="nd">@cached_property</span>
    <span class="k">def</span> <span class="nf">very_slow</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="sd">"""Represents a performance heavy property."""</span>
        <span class="n">time</span><span class="o">.</span><span class="n">sleep</span><span class="p">(</span><span class="mi">1</span><span class="p">)</span>  <span class="c1"># Wait a WHOLE second!</span>
        <span class="k">return</span> <span class="s2">"I am slooooow"</span>

<span class="k">def</span> <span class="nf">test_slow_class1</span><span class="p">():</span>
<span class="c1"># Instantiate the slow class</span>
<span class="n">slow_class</span> <span class="o">=</span> <span class="n">SlowClass1</span><span class="p">()</span>

    <span class="c1"># Start the clock!</span>
    <span class="n">start</span> <span class="o">=</span> <span class="n">datetime</span><span class="o">.</span><span class="n">now</span><span class="p">()</span>

    <span class="c1"># Call the property. This time it's really slow...</span>
    <span class="k">assert</span> <span class="n">slow_class</span><span class="o">.</span><span class="n">very_slow</span> <span class="o">==</span> <span class="s2">"I am slooooow"</span>

    <span class="c1"># Check that it took at least a second to run</span>
    <span class="k">assert</span> <span class="n">timedelta</span><span class="p">(</span><span class="n">milliseconds</span><span class="o">=</span><span class="mi">1000</span><span class="p">)</span> <span class="o">&gt;=</span> <span class="n">start</span> <span class="o">-</span> <span class="n">datetime</span><span class="o">.</span><span class="n">now</span><span class="p">()</span>

    <span class="c1"># Call the property a second time. This time it runs fast.</span>
    <span class="k">assert</span> <span class="n">slow_class</span><span class="o">.</span><span class="n">very_slow</span> <span class="o">==</span> <span class="s2">"I am slooooow"</span>

    <span class="c1"># Second time running, should take a TINY amount of time.</span>
    <span class="c1"># Should take just a microsecond, but we'll play a test for and test</span>
    <span class="c1">#   for a maximim of at least 100 milliseconds.</span>
    <span class="k">assert</span> <span class="n">timedelta</span><span class="p">(</span><span class="n">milliseconds</span><span class="o">=</span><span class="mi">1100</span><span class="p">)</span> <span class="o">&gt;</span> <span class="n">start</span> <span class="o">-</span> <span class="n">datetime</span><span class="o">.</span><span class="n">now</span><span class="p">()</span>

</code></pre>
  </div>

  <p>
    This is great for encapsulating slow database queries, fetching results from
    third-party REST APIs, performing slow algorithms, and anything else where
    you would want to catch the results. Pretty neat, yeah!
  </p>
  <p>
    While originally implemented for web frameworks such as Django, Flask,
    Pyramid, and Bottle, I've copy/pasted the
    <code>cached_property</code> property from non-web project to project as a
    quick way to give my code a little boost. I got tired of doing this, and on
    May 17th, 2014 I decided to release it as a package called cached-property
    on
    <a href="https://pypi.python.org/pypi/cached-property" target="_blank"
      >PyPI</a
    >. Using it is easy:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># assuming you've already done "pip install cached-property"</span>
<span class="kn">from</span> <span class="nn">cached_property</span> <span class="kn">import</span> <span class="n">cached_property</span>

<span class="k">class</span> <span class="nc">SlowClass2</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>

    <span class="nd">@cached_property</span>
    <span class="k">def</span> <span class="nf">very_slow</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="sd">"""Represents a performance heavy property."""</span>
        <span class="n">time</span><span class="o">.</span><span class="n">sleep</span><span class="p">(</span><span class="mi">1</span><span class="p">)</span>  <span class="c1"># Wait a WHOLE second!</span>
        <span class="k">return</span> <span class="s2">"I am slooooow"</span>

<span class="k">def</span> <span class="nf">test_slow_class2</span><span class="p">():</span>
<span class="c1"># Instantiate the slow class</span>
<span class="n">slow_class</span> <span class="o">=</span> <span class="n">SlowClass2</span><span class="p">()</span>

    <span class="c1"># Start the clock!</span>
    <span class="n">start</span> <span class="o">=</span> <span class="n">datetime</span><span class="o">.</span><span class="n">now</span><span class="p">()</span>

    <span class="c1"># Call the property. This time it's really slow...</span>
    <span class="k">assert</span> <span class="n">slow_class</span><span class="o">.</span><span class="n">very_slow</span> <span class="o">==</span> <span class="s2">"I am slooooow"</span>

    <span class="c1"># Check that it took at least a second to run</span>
    <span class="k">assert</span> <span class="n">timedelta</span><span class="p">(</span><span class="n">milliseconds</span><span class="o">=</span><span class="mi">1000</span><span class="p">)</span> <span class="o">&gt;=</span> <span class="n">start</span> <span class="o">-</span> <span class="n">datetime</span><span class="o">.</span><span class="n">now</span><span class="p">()</span>

    <span class="c1"># Call the property a second time. This time it runs fast.</span>
    <span class="k">assert</span> <span class="n">slow_class</span><span class="o">.</span><span class="n">very_slow</span> <span class="o">==</span> <span class="s2">"I am slooooow"</span>

    <span class="c1"># Second time running, should take a TINY amount of time.</span>
    <span class="c1"># Should take just a microsecond, but we'll play a test for and test</span>
    <span class="c1">#   for a maximim of at least 100 milliseconds.</span>
    <span class="k">assert</span> <span class="n">timedelta</span><span class="p">(</span><span class="n">milliseconds</span><span class="o">=</span><span class="mi">1100</span><span class="p">)</span> <span class="o">&gt;</span> <span class="n">start</span> <span class="o">-</span> <span class="n">datetime</span><span class="o">.</span><span class="n">now</span><span class="p">()</span>

</code></pre>
  </div>

  <p>Hooray! No more copy/pasting for me! I was very pleased with myself.</p>
  <p>Little did I know how fortunate I was for having released this package.</p>
  <h1 id="dont-copypaste-code">Don't Copy/Paste Code</h1>
  <p>
    The very next day after I released the cached-property package,
    <a href="https://github.com/Tinche" target="_blank">Tin Tvrtković</a> opened
    an issue asking for
    <a
      href="https://github.com/pydanny/cached-property/issues/6"
      target="_blank"
      >better multithreaded support</a
    >. To my shock and embarressment, my copy/pasted code could have been
    disastrous if brought into the wrong project. I had blindly been assuming
    that the code I hadn't bothered to try and understand worked under any
    situation, when in reality it had been designed for working within the
    context of a web framework.
  </p>
  <p>
    Ultimately, Tin
    <a href="https://github.com/pydanny/cached-property/pull/9" target="_blank"
      >submitted a pull request</a
    >, and now the <code>cached-property</code> package also includes a
    <code>@threaded_cached_property</code> decorator. Thank you Tin!
  </p>
  <p>However, the lessons of the experience had been burned into my brain.</p>
  <h1 id="lessons-learned">Lessons Learned</h1>
  <ol>
    <li>Don't copy/paste code blindly from project to project.</li>
    <li>
      If you are repeatedly moving code from project to project, take the time
      to understand what the code is actually doing.
    </li>
    <li>
      Instead of copy/pasting code from project to project, make a package and
      ask for input from others. If making a package feels like too much work,
      <a
        href="https://github.com/audreyr/cookiecutter-pypackage"
        target="_blank"
        >cookiecutter-pypackage</a
      >
      makes creating new packages really easy.
    </li>
  </ol>
  <h1 id="going-forward">Going forward</h1>
  <p>
    One exciting development has been the
    <a
      href="https://github.com/pydanny/cached-property/issues/2"
      target="_blank"
      >discussion to include a cached_property decorator in core Python</a
    >. Even if my contribution to the effort has been merely the encapsulation
    of the code, it's nice to know I may have some small part in the development
    of the language.
  </p>
  <p><img alt="image" src="https://pydanny.com/static/directions_med.png" /></p>
  <p>Published: 2014-07-01 12:00</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/django.html">django</a>
    <a href="/tag/flask.html">flask</a>
    <a href="/tag/bottle.html">bottle</a>
    <a href="/tag/ppoftw.html">ppoftw</a>
    <a href="/tag/pypi.html">pypi</a>
    <a href="/tag/pyramid.html">pyramid</a>
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
