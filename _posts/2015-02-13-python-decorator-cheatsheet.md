---
date: 2015-02-13
tag:
  - python
  - python3
  - cheatsheet
  - ppoftw

author: Daniel Roy Greenfeld
location: California
title: Python Decorator Cheatsheet
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/python-decorator-cheatsheet.html"
        >Python Decorator Cheatsheet</a
      >
    </div>
  </h1>
  <p>
    I can never remember the syntax for writing
    <a
      href="http://en.wikipedia.org/wiki/Python_syntax_and_semantics#Decorators"
      target="_blank"
      >decorators</a
    >. I always have to look it up. Worse, I always have to remember where to
    look to find references. Hence the reason for this article. I'll never lose
    this reference: It's on my laptop and the internet.
  </p>
  <p>
    Each type will include a basic version, a
    <code>functools.wraps</code> version, and a
    <a href="https://github.com/GrahamDumpleton/wrapt" target="_blank">wrapt</a>
    version.
  </p>
  <h1 id="decorators-without-arguments">Decorators Without Arguments</h1>
  <p>These are decorators that do not accept arguments.</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">import</span> <span class="nn">functools</span>  <span class="c1"># Part of Python standard library</span>

<span class="k">def</span> <span class="nf">decorator</span><span class="p">(</span><span class="n">wrapped*function</span><span class="p">):</span>
<span class="k">def</span> <span class="nf">\_wrapper</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">\*\*</span><span class="n">kwargs</span><span class="p">):</span>
<span class="c1"># do something before the function call</span>
<span class="n">result</span> <span class="o">=</span> <span class="n">wrapped*function</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">\*\*</span><span class="n">kwargs</span><span class="p">)</span>
<span class="c1"># do something after the function call</span>
<span class="k">return</span> <span class="n">result</span>
<span class="k">return</span> <span class="n">\_wrapper</span>

<span class="c1"># decorator with functools.wraps added</span>
<span class="k">def</span> <span class="nf">decorator*with_wraps</span><span class="p">(</span><span class="n">wrapped_function</span><span class="p">):</span>
<span class="nd">@functools.wraps</span><span class="p">(</span><span class="n">wrapped_function</span><span class="p">)</span>
<span class="k">def</span> <span class="nf">\_wrapper</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">\*\*</span><span class="n">kwargs</span><span class="p">):</span>
<span class="c1"># do something before the function call</span>
<span class="n">result</span> <span class="o">=</span> <span class="n">wrapped*function</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">\*\*</span><span class="n">kwargs</span><span class="p">)</span>
<span class="c1"># do something after the function call</span>
<span class="k">return</span> <span class="n">result</span>
<span class="k">return</span> <span class="n">\_wrapper</span>

<span class="kn">import</span> <span class="nn">wrapt</span> <span class="c1"># Requires installing the 'wrapt' library</span>

<span class="c1"># decorator powered by wrapt</span>
<span class="nd">@wrapt.decorator</span>
<span class="k">def</span> <span class="nf">decorator_with_wrapt</span><span class="p">(</span><span class="n">wrapped_function</span><span class="p">,</span> <span class="n">instance</span><span class="p">,</span> <span class="n">args</span><span class="p">,</span> <span class="n">kwargs</span><span class="p">):</span>
<span class="c1"># do something before the function call</span>
<span class="n">result</span> <span class="o">=</span> <span class="n">wrapped_function</span><span class="p">(</span><span class="o">\*</span><span class="n">args</span><span class="p">,</span> <span class="o">\*\*</span><span class="n">kwargs</span><span class="p">)</span>
<span class="c1"># do something after the function call</span>
<span class="k">return</span> <span class="n">result</span>

<span class="k">def</span> <span class="nf">test_decorators</span><span class="p">():</span>

    <span class="nd">@decorator</span>
    <span class="k">def</span> <span class="nf">func1</span><span class="p">():</span>
        <span class="k">return</span> <span class="s1">'I'</span>

    <span class="nd">@decorator_with_wraps</span>
    <span class="k">def</span> <span class="nf">func2</span><span class="p">():</span>
        <span class="k">return</span> <span class="s1">'code'</span>

    <span class="nd">@decorator_with_wrapt</span>
    <span class="k">def</span> <span class="nf">func3</span><span class="p">():</span>
        <span class="k">return</span> <span class="s1">'python'</span>

    <span class="k">assert</span> <span class="n">func1</span><span class="p">()</span> <span class="o">==</span> <span class="s1">'I'</span>
    <span class="k">assert</span> <span class="n">func2</span><span class="p">()</span> <span class="o">==</span> <span class="s1">'code'</span>
    <span class="k">assert</span> <span class="n">func3</span><span class="p">()</span> <span class="o">==</span> <span class="s1">'python'</span>

</code></pre>
  </div>

  <h1 id="decorators-with-arguments">Decorators With Arguments</h1>
  <p>These are decorators that accept arguments.</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="k">def</span> <span class="nf">arguments_decorator</span><span class="p">(</span><span class="n">arg1</span><span class="p">,</span> <span class="n">arg2</span><span class="p">):</span>
    <span class="k">def</span> <span class="nf">_outer_wrapper</span><span class="p">(</span><span class="n">wrapped_function</span><span class="p">):</span>
        <span class="k">def</span> <span class="nf">_wrapper</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
            <span class="c1"># do something before the function call</span>
            <span class="n">result</span> <span class="o">=</span> <span class="n">wrapped_function</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">)</span>
            <span class="c1"># do something after the function call</span>

            <span class="c1"># Demonstrating what you can do with decorator arguments</span>
            <span class="n">result</span> <span class="o">=</span> <span class="n">result</span> <span class="o">*</span> <span class="n">arg1</span> <span class="o">*</span> <span class="n">arg2</span>

            <span class="k">return</span> <span class="n">result</span>
        <span class="k">return</span> <span class="n">_wrapper</span>
    <span class="k">return</span> <span class="n">_outer_wrapper</span>

<span class="k">def</span> <span class="nf">arguments*decorator_with_wraps</span><span class="p">(</span><span class="n">arg1</span><span class="p">,</span> <span class="n">arg2</span><span class="p">):</span>
<span class="k">def</span> <span class="nf">\_outer_wrapper</span><span class="p">(</span><span class="n">wrapped_function</span><span class="p">):</span>
<span class="nd">@functools.wraps</span><span class="p">(</span><span class="n">wrapped_function</span><span class="p">)</span>
<span class="k">def</span> <span class="nf">\_wrapper</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">\*\*</span><span class="n">kwargs</span><span class="p">):</span>
<span class="c1"># do something before the function call</span>
<span class="n">result</span> <span class="o">=</span> <span class="n">wrapped*function</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">\*\*</span><span class="n">kwargs</span><span class="p">)</span>
<span class="c1"># do something after the function call</span>

            <span class="c1"># Demonstrating what you can do with decorator arguments</span>
            <span class="n">result</span> <span class="o">=</span> <span class="n">result</span> <span class="o">*</span> <span class="n">arg1</span> <span class="o">*</span> <span class="n">arg2</span>

            <span class="k">return</span> <span class="n">result</span>
        <span class="k">return</span> <span class="n">_wrapper</span>
    <span class="k">return</span> <span class="n">_outer_wrapper</span>

<span class="k">def</span> <span class="nf">arguments_decorator_with_wrapt</span><span class="p">(</span><span class="n">arg1</span><span class="p">,</span> <span class="n">arg2</span><span class="p">):</span>
<span class="nd">@wrapt.decorator</span>
<span class="k">def</span> <span class="nf">\_wrapper</span><span class="p">(</span><span class="n">wrapped_function</span><span class="p">,</span> <span class="n">instance</span><span class="p">,</span> <span class="n">args</span><span class="p">,</span> <span class="n">kwargs</span><span class="p">):</span>
<span class="c1"># do something before the function call</span>
<span class="n">result</span> <span class="o">=</span> <span class="n">wrapped_function</span><span class="p">(</span><span class="o">\*</span><span class="n">args</span><span class="p">,</span> <span class="o">\*\*</span><span class="n">kwargs</span><span class="p">)</span>
<span class="c1"># do something after the function call</span>

        <span class="c1"># Demonstrating what you can do with decorator arguments</span>
        <span class="n">result</span> <span class="o">=</span> <span class="n">result</span> <span class="o">*</span> <span class="n">arg1</span> <span class="o">*</span> <span class="n">arg2</span>

        <span class="k">return</span> <span class="n">result</span>
    <span class="k">return</span> <span class="n">_wrapper</span>

<span class="k">def</span> <span class="nf">test_arguments_decorators</span><span class="p">():</span>

    <span class="nd">@arguments_decorator</span><span class="p">(</span><span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">)</span>
    <span class="k">def</span> <span class="nf">func4</span><span class="p">():</span>
        <span class="k">return</span> <span class="s1">'We'</span>

    <span class="nd">@arguments_decorator_with_wraps</span><span class="p">(</span><span class="mi">2</span><span class="p">,</span> <span class="mi">2</span><span class="p">)</span>
    <span class="k">def</span> <span class="nf">func5</span><span class="p">():</span>
        <span class="k">return</span> <span class="s1">'code'</span>

    <span class="nd">@arguments_decorator_with_wrapt</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span> <span class="mi">2</span><span class="p">)</span>
    <span class="k">def</span> <span class="nf">func6</span><span class="p">():</span>
        <span class="k">return</span> <span class="s1">'python'</span>

    <span class="k">assert</span> <span class="n">func4</span><span class="p">()</span> <span class="o">==</span> <span class="s1">'WeWeWeWeWeWe'</span>
    <span class="k">assert</span> <span class="n">func5</span><span class="p">()</span> <span class="o">==</span> <span class="s1">'codecodecodecode'</span>
    <span class="k">assert</span> <span class="n">func6</span><span class="p">()</span> <span class="o">==</span> <span class="s1">'pythonpythonpythonpythonpythonpython'</span>

</code></pre>
  </div>

  <h1 id="summary">Summary</h1>
  <p>This article is a cheatsheet, not a tutorial.</p>
  <p>
    Instead of explaining why Python has
    <a
      href="http://en.wikipedia.org/wiki/Python_syntax_and_semantics#Decorators"
      target="_blank"
      >decorators</a
    >, how to use them, how they work, or why to use them, this article is a
    reference. Nothing more.
  </p>
  <p>References:</p>
  <ul>
    <li>
      Graham Dumpleton's
      <a
        href="https://github.com/GrahamDumpleton/wrapt/tree/develop/blog"
        target="_blank"
        >voluminious series on decorators</a
      >
    </li>
    <li>
      Graham Dumpleton's
      <a
        href="https://github.com/GrahamDumpleton/wrapt/blob/develop/blog/01-how-you-implemented-your-python-decorator-is-wrong.md#introspecting-a-function"
        target="_blank"
        >Introspecting a function</a
      >
      article on decorators for concerns about <code>functools.wraps</code>)
    </li>
    <li>
      <a
        href="https://wiki.python.org/moin/PythonDecoratorLibrary"
        target="_blank"
        >https://wiki.python.org/moin/PythonDecoratorLibrary</a
      >
    </li>
  </ul>
  <p><img alt="image" src="https://pydanny.com/static/sample-rst.png" /></p>
  <p>Published: 2015-02-13 18:20</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/python3.html">python3</a>
    <a href="/tag/cheatsheet.html">cheatsheet</a>
    <a href="/tag/ppoftw.html">ppoftw</a>
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
