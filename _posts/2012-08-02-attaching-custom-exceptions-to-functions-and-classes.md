---
date: 2012-08-02
tag: 
  - python
  - functions
  - howto
  - django

author: Daniel Roy Greenfeld
location: California
title: Attaching custom exceptions to functions and classes
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/attaching-custom-exceptions-to-functions-and-classes.html">Attaching custom exceptions to functions and classes</a>
</div>
</h1>
<p>Having too many custom exceptions on a project can be a pain, but a few
choices ones are really nice. The problem is that in complex libraries
having to import both functions and exceptions becomes a drag. To
mitigate having to remember to import custom exceptions, this is a handy
pattern you can use in a project and can be done on both functions and
classes.</p>
<h1 id="attaching-a-custom-exception-to-a-function">Attaching a custom exception to a function</h1>
<p>This works because <a href="http://python.org" target="_blank">Python</a> functions are first-class
objects. They can be passed around as things, and in this case, have
things assigned to them.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># logic.py</span>
<span class="k">class</span> <span class="nc">DoesNotCompute</span><span class="p">(</span><span class="ne">Exception</span><span class="p">):</span>
    <span class="sd">""" Easy to understand naming conventions work best! """</span>
    <span class="k">pass</span>

<span class="k">def</span> <span class="nf">this_function</span><span class="p">(</span><span class="n">x</span><span class="p">):</span>
    <span class="sd">""" This function only works on numbers."""</span>
    <span class="k">try</span><span class="p">:</span>
        <span class="k">return</span> <span class="n">x</span> <span class="o">**</span> <span class="n">x</span> 
    <span class="k">except</span> <span class="ne">TypeError</span><span class="p">:</span>
        <span class="k">raise</span> <span class="n">DoesNotCompute</span>

<span class="c1"># Assign DoesNotCompute exception to this_function</span>
<span class="n">this_function</span><span class="o">.</span><span class="n">DoesNotCompute</span> <span class="o">=</span> <span class="n">DoesNotCompute</span>
</code></pre></div>
<p>Now I can import the function, and it won't just through
<code>DoesNotCompute</code> exceptions, it will also carry the function along with
the import:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">logic</span> <span class="kn">import</span> <span class="n">this_function</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">this_function</span><span class="p">(</span><span class="mi">5</span><span class="p">)</span>
<span class="mi">3125</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">this_function</span><span class="p">(</span><span class="mf">4.5</span><span class="p">)</span>
<span class="mf">869.8739233809259</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">this_function</span><span class="p">(</span><span class="s1">'will throw an error.'</span><span class="p">)</span>
<span class="n">Traceback</span> <span class="p">(</span><span class="n">most</span> <span class="n">recent</span> <span class="n">call</span> <span class="n">last</span><span class="p">):</span>
  <span class="n">File</span> <span class="s2">"&lt;input&gt;"</span><span class="p">,</span> <span class="n">line</span> <span class="mi">1</span><span class="p">,</span> <span class="ow">in</span> <span class="o">&lt;</span><span class="n">module</span><span class="o">&gt;</span>
  <span class="n">File</span> <span class="s2">"logic.py"</span><span class="p">,</span> <span class="n">line</span> <span class="mi">10</span><span class="p">,</span> <span class="ow">in</span> <span class="n">this_function</span>
    <span class="k">raise</span> <span class="n">DoesNotCompute</span>
<span class="n">DoesNotCompute</span>
</code></pre></div>
<p>Alright, that doesn't seem like much, but let's add in some exception
handling:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="k">try</span><span class="p">:</span>
<span class="o">...</span>     <span class="n">this_function</span><span class="p">(</span><span class="s1">'is an example'</span><span class="p">)</span>
<span class="o">...</span> <span class="k">except</span> <span class="n">this_function</span><span class="o">.</span><span class="n">DoesNotCompute</span><span class="p">:</span>
<span class="o">...</span>     <span class="k">print</span><span class="p">(</span><span class="s1">'See what attaching custom exceptions to functions can do?'</span><span class="p">)</span>
<span class="o">...</span>     
<span class="o">...</span> 
<span class="n">See</span> <span class="n">what</span> <span class="n">attaching</span> <span class="n">custom</span> <span class="n">exceptions</span> <span class="n">to</span> <span class="n">functions</span> <span class="n">can</span> <span class="n">do</span><span class="err">?</span>
</code></pre></div>
<h1 id="attaching-the-custom-exception-to-a-class">Attaching the custom exception to a class</h1>
<p>All we have to do is enhance our existing logic.py file by adding
<code>ThisClass</code>:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># logic.py</span>
<span class="k">class</span> <span class="nc">DoesNotCompute</span><span class="p">(</span><span class="ne">Exception</span><span class="p">):</span>
    <span class="sd">""" Easy to understand naming conventions work best! """</span>
    <span class="k">pass</span>

<span class="c1"># removed the function example for clarity</span>

<span class="k">class</span> <span class="nc">ThisClass</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>
    <span class="c1"># Since the DoesNotCompute exception exists, let's just assign it</span>
    <span class="c1"># as an attribute of ThisClass</span>
    <span class="n">DoesNotCompute</span> <span class="o">=</span> <span class="n">DoesNotCompute</span> 

    <span class="k">def</span> <span class="nf">this_method</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">x</span><span class="p">):</span>
        <span class="sd">""" This method only works on numbers."""</span>
        <span class="k">try</span><span class="p">:</span>
            <span class="k">return</span> <span class="n">x</span> <span class="o">**</span> <span class="n">x</span> 
        <span class="k">except</span> <span class="ne">TypeError</span><span class="p">:</span>
            <span class="k">raise</span> <span class="n">DoesNotCompute</span>
</code></pre></div>
<p>Now to demonstrate in the shell (Python REPL for the semantic purists):</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">t</span> <span class="kn">import</span> <span class="n">ThisClass</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">this_class</span> <span class="o">=</span> <span class="n">ThisClass</span><span class="p">()</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">this_class</span><span class="o">.</span><span class="n">this_method</span><span class="p">(</span><span class="mf">3.3</span><span class="p">)</span>
<span class="mf">51.415729444066585</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">this_class</span><span class="o">.</span><span class="n">this_method</span><span class="p">(</span><span class="s1">'Jack Diederich warned against custom exceptions'</span><span class="p">)</span>
<span class="n">Traceback</span> <span class="p">(</span><span class="n">most</span> <span class="n">recent</span> <span class="n">call</span> <span class="n">last</span><span class="p">):</span>
  <span class="n">File</span> <span class="s2">"&lt;input&gt;"</span><span class="p">,</span> <span class="n">line</span> <span class="mi">1</span><span class="p">,</span> <span class="ow">in</span> <span class="o">&lt;</span><span class="n">module</span><span class="o">&gt;</span>
  <span class="n">File</span> <span class="s2">"logic.py"</span><span class="p">,</span> <span class="n">line</span> <span class="mi">24</span><span class="p">,</span> <span class="ow">in</span> <span class="n">this_method</span>
    <span class="k">raise</span> <span class="n">DoesNotCompute</span>
<span class="n">DoesNotCompute</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">try</span><span class="p">:</span>
<span class="o">...</span>     <span class="n">this_class</span><span class="o">.</span><span class="n">this_method</span><span class="p">(</span><span class="s1">'I need to write a follow-up on my OAuth post'</span><span class="p">)</span>
<span class="o">...</span> <span class="k">except</span> <span class="n">ThisClass</span><span class="o">.</span><span class="n">DoesNotCompute</span><span class="p">:</span>
<span class="o">...</span>     <span class="k">print</span><span class="p">(</span><span class="s1">'Waiting to see how the OAuth stuff pans out'</span><span class="p">)</span>
<span class="o">...</span>
<span class="o">...</span> 
<span class="n">Waiting</span> <span class="n">to</span> <span class="n">see</span> <span class="n">how</span> <span class="n">the</span> <span class="n">OAuth</span> <span class="n">stuff</span> <span class="n">pans</span> <span class="n">out</span>
</code></pre></div>
<h1 id="admonition-dont-go-crazy">Admonition: Don't go crazy</h1>
<p>Rather than use this trick all over the place, considering using it in a
few places to powerful effect. For example,
<a href="http://djangoproject.com" target="_blank">Django</a> uses it only in a few places, and
publicly only on <code>MyModelClass.DoesNotExist</code> and
<code>MyModelClass.MultipleObjectsReturned</code>. By limiting Django's use of
this technique, Django libraries are that much easier to comprehend. In
this case, less complexity means more.</p>
<p>I say this because this pattern lends itself to creating custom
exceptions to the point of effectively replacing Python's stock
exceptions with your own. This makes for harder-to-maintain and
harder-to-learn projects.</p>
<p>Not that I've ever done that. Ahem.</p>
<p>Published: 2012-08-02 09:30</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/functions.html">functions</a>
<a href="/tag/howto.html">howto</a>
<a href="/tag/django.html">django</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>