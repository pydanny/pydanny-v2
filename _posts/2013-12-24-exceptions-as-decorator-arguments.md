---
date: 2013-12-24
tag: 
  - python
  - howto

author: Daniel Roy Greenfeld
location: California
title: Exceptions as Decorator Arguments
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/exceptions-as-decorator-arguments.html">Exceptions as Decorator Arguments</a>
</div>
</h1>
<p>I wanted to see if I could have an exception as a decorator argument.
Here is what I came up with:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="kn">import</span> <span class="nn">functools</span>

<span class="k">class</span> <span class="nc">MyGoof</span><span class="p">(</span><span class="ne">Exception</span><span class="p">):</span>
    <span class="k">pass</span>

<span class="k">def</span> <span class="nf">pass_goof</span><span class="p">(</span><span class="n">exception</span><span class="p">):</span>
    <span class="k">def</span> <span class="nf">decorator</span><span class="p">(</span><span class="n">test_func</span><span class="p">):</span>
        <span class="nd">@functools.wraps</span><span class="p">(</span><span class="n">test_func</span><span class="p">)</span>
        <span class="k">def</span> <span class="nf">wrapper</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
            <span class="k">try</span><span class="p">:</span>
                <span class="k">return</span> <span class="n">test_func</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">)</span>
            <span class="k">except</span> <span class="n">exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
                <span class="k">return</span> <span class="bp">None</span>
        <span class="k">return</span> <span class="n">wrapper</span>
    <span class="k">return</span> <span class="n">decorator</span>

<span class="nd">@pass_goof</span><span class="p">(</span><span class="n">MyGoof</span><span class="p">)</span>
<span class="k">def</span> <span class="nf">test1</span><span class="p">():</span>
    <span class="k">return</span> <span class="s2">"test1"</span>

<span class="nd">@pass_goof</span><span class="p">(</span><span class="n">MyGoof</span><span class="p">)</span>
<span class="k">def</span> <span class="nf">test2</span><span class="p">():</span>
    <span class="k">raise</span> <span class="n">MyGoof</span>

<span class="k">assert</span> <span class="n">test1</span><span class="p">()</span> <span class="o">==</span> <span class="s1">'test1'</span>
<span class="k">assert</span> <span class="n">test2</span><span class="p">()</span> <span class="o">==</span> <span class="bp">None</span>
</code></pre></div>
<p>Published: 2013-12-24 13:15</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/howto.html">howto</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>