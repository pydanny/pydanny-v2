---
date: 2012-09-01
tag: 
  - python
  - howto

author: Daniel Roy Greenfeld
location: California
title: Python dictionary as a class
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/python-dictionary-as-class.html">Python dictionary as a class</a>
</div>
</h1>
<p>A long time ago, circa 1999, when I was working in a certain procedural
language I found a library that added objects to the language. It did so
by playing interesting tricks with key/value structures, which in
<a href="http://python.org" target="_blank">Python</a> are called dictionaries. In 2005, as a new
Python user, I read something about how objects in Python are
essentially dictionaries with <a href="http://en.wikipedia.org/wiki/Syntactic_sugar" target="_blank">syntactical
sugar</a>.</p>
<p>Well, today while driving from Los Angeles to San Francisco, I started
to try and figure out how to replicate object or class-like behavior
using Python dictionaries. In this exercise, I wanted to code out the
following:</p>
<blockquote>
<ul>
<li>methods with ability to write to self/this/whatever</li>
<li>inheritance</li>
</ul>
</blockquote>
<p>The result isn't something I would use in production code, but it was
fun to write. Without further ado...</p>
<h1 id="i-present-the-newclass-function">I present the 'newclass' function!</h1>
<p>What <code>newclass</code> does is simple:</p>
<blockquote>
<ul>
<li>Document implementation of inheritance.</li>
<li>Include a simple <code>set</code> method for setting attribute values to
  self/this/whatever.</li>
</ul>
</blockquote>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">def</span> <span class="nf">newclass</span><span class="p">(</span><span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
    <span class="sd">""" Use kwargs.update() method to handle inheritance """</span>

    <span class="k">def</span> <span class="nf">set</span><span class="p">(</span><span class="n">key</span><span class="p">,</span> <span class="n">value</span><span class="p">):</span>
        <span class="sd">""" Sets key/value to the kwargs.</span>
<span class="sd">            Replicates self/this clumsily</span>
<span class="sd">        """</span>
        <span class="n">kwargs</span><span class="p">[</span><span class="n">key</span><span class="p">]</span> <span class="o">=</span> <span class="n">value</span>
    <span class="n">kwargs</span><span class="p">[</span><span class="s1">'set'</span><span class="p">]</span> <span class="o">=</span> <span class="nb">set</span>
    <span class="k">return</span> <span class="n">kwargs</span>
</code></pre></div>
<p>Now that you've seen the code, let's try it out.</p>
<h2 id="demonstration-methods-with-ability-to-write-to-selfthiswhatever">Demonstration: Methods with ability to write to self/this/whatever</h2>
<p>Instantiating a <code>newclass</code> 'object' is straight-forward. See below:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="n">person</span> <span class="o">=</span> <span class="n">newclass</span><span class="p">(</span>
<span class="o">...</span>     <span class="n">name</span><span class="o">=</span><span class="s2">"Danny"</span><span class="p">,</span>
<span class="o">...</span>     <span class="n">mental_age</span><span class="o">=</span><span class="mi">4</span><span class="p">,</span>
<span class="o">...</span> <span class="p">)</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">print</span><span class="p">(</span><span class="n">person</span><span class="p">)</span>
<span class="p">{</span><span class="s1">'mental_age'</span><span class="p">:</span> <span class="mi">4</span><span class="p">,</span> <span class="s1">'set'</span><span class="p">:</span> <span class="o">&lt;</span><span class="n">function</span> <span class="nb">set</span> <span class="n">at</span> <span class="mh">0x10bc902a8</span><span class="o">&gt;</span><span class="p">,</span> <span class="s1">'name'</span><span class="p">:</span> <span class="s1">'Danny'</span><span class="p">}</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">person</span><span class="p">[</span><span class="s1">'set'</span><span class="p">](</span><span class="s2">"languages"</span><span class="p">,</span> <span class="p">[</span><span class="s1">'Python'</span><span class="p">,</span> <span class="s1">'JavaScript'</span><span class="p">])</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">print</span><span class="p">(</span><span class="n">person</span><span class="p">)</span>
<span class="p">{</span><span class="s1">'languages'</span><span class="p">:</span> <span class="p">[</span><span class="s1">'Python'</span><span class="p">,</span> <span class="s1">'JavaScript'</span><span class="p">],</span> <span class="s1">'mental_age'</span><span class="p">:</span> <span class="mi">4</span><span class="p">,</span> <span class="s1">'set'</span><span class="p">:</span> <span class="o">&lt;</span><span class="n">function</span> <span class="nb">set</span> <span class="n">at</span> <span class="mh">0x10bc902a8</span><span class="o">&gt;</span><span class="p">,</span> <span class="s1">'name'</span><span class="p">:</span> <span class="s1">'Danny'</span><span class="p">}</span>    
</code></pre></div>
<p>Setting a value to an attribute can be done via the <code>set</code> method is not
pretty, but it works. Yes, you can shortcut <code>set</code>, but I wanted to see
if it worked. That it's working is important because since <code>set</code> works,
it means we can create much more complicated methods that touch on many
parts of the newclass object context.</p>
<p>Just like a normal Python <code>class</code> and <code>method</code>.</p>
<h2 id="demonstration-inheritance">Demonstration: Inheritance</h2>
<p>Here I show how to use the <code>dict.update()</code> method to display
inheritance. I'll demonstrate via the use of the Mammal/Cat/Dog
example.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">def</span> <span class="nf">Mammal</span><span class="p">(</span><span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
    <span class="sd">""" The mammal base class """</span>

    <span class="c1"># dict.update handles the role of inheritance</span>
    <span class="n">kwargs</span><span class="o">.</span><span class="n">update</span><span class="p">(</span><span class="n">newclass</span><span class="p">())</span>

    <span class="c1"># Mammals have 4 legs</span>
    <span class="n">kwargs</span><span class="p">[</span><span class="s1">'legs'</span><span class="p">]</span> <span class="o">=</span> <span class="mi">4</span>

    <span class="c1"># Using lambda cause I'm lazy.</span>
    <span class="n">kwargs</span><span class="p">[</span><span class="s1">'say'</span><span class="p">]</span> <span class="o">=</span> <span class="k">lambda</span><span class="p">:</span> <span class="bp">NotImplemented</span>
    <span class="k">return</span> <span class="n">kwargs</span>

<span class="k">def</span> <span class="nf">Cat</span><span class="p">(</span><span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>

    <span class="c1"># dict.update handles the role of inheritance</span>
    <span class="n">kwargs</span><span class="o">.</span><span class="n">update</span><span class="p">(</span><span class="n">Mammal</span><span class="p">())</span>

    <span class="c1"># Make a sound</span>
    <span class="n">kwargs</span><span class="p">[</span><span class="s1">'say'</span><span class="p">]</span> <span class="o">=</span> <span class="k">lambda</span><span class="p">:</span> <span class="s2">"Meow"</span>
    <span class="k">return</span> <span class="n">kwargs</span>

<span class="k">def</span> <span class="nf">Dog</span><span class="p">(</span><span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>

    <span class="c1"># dict.update handles the role of inheritance</span>
    <span class="n">kwargs</span><span class="o">.</span><span class="n">update</span><span class="p">(</span><span class="n">Mammal</span><span class="p">())</span> <span class="c1"># dict.update handles the role of inheritance</span>

    <span class="c1"># Make a sound</span>
    <span class="n">kwargs</span><span class="p">[</span><span class="s1">'say'</span><span class="p">]</span> <span class="o">=</span> <span class="k">lambda</span><span class="p">:</span> <span class="s2">"Bark"</span>
    <span class="k">return</span> <span class="n">kwargs</span>
</code></pre></div>
<p>Alright, we have our code. What happens when we try it out?</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="c1"># first we try just the Mammal</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">mammal</span> <span class="o">=</span> <span class="n">Mammal</span><span class="p">()</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">print</span><span class="p">(</span><span class="n">mammal</span><span class="p">[</span><span class="s1">'say'</span><span class="p">]())</span>
<span class="bp">NotImplemented</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">print</span><span class="p">(</span><span class="n">mammal</span><span class="p">[</span><span class="s1">'legs'</span><span class="p">])</span>
<span class="mi">4</span>
<span class="o">&gt;&gt;&gt;</span> <span class="c1"># Now the Cat</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">cat</span> <span class="o">=</span> <span class="n">Cat</span><span class="p">()</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">print</span><span class="p">(</span><span class="n">cat</span><span class="p">[</span><span class="s1">'say'</span><span class="p">]())</span>
<span class="n">Meow</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">print</span><span class="p">(</span><span class="n">cat</span><span class="p">[</span><span class="s1">'legs'</span><span class="p">])</span>
<span class="mi">4</span>
<span class="o">&gt;&gt;&gt;</span> <span class="c1"># Finally the dog</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">dog</span> <span class="o">=</span> <span class="n">Dog</span><span class="p">()</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">print</span><span class="p">(</span><span class="n">dog</span><span class="p">[</span><span class="s1">'say'</span><span class="p">]())</span>
<span class="n">Bark</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">print</span><span class="p">(</span><span class="n">dog</span><span class="p">[</span><span class="s1">'legs'</span><span class="p">])</span>
<span class="mi">4</span>
</code></pre></div>
<h1 id="conclusion">Conclusion</h1>
<p>Compared to normal Python classes the syntax is a little bit on the ugly
side. Yet this works and as I said earlier, it was fun to write.</p>
<p>Some questions...</p>
<ul>
<li>Should I change the name of the internal context variable from
<code>kwargs</code> to <code>self</code>?</li>
<li>How fast is <code>newclass</code> compared to the standard Python <code>class</code>
system?</li>
<li>What happens if you use <code>newclass</code> in a complex project?</li>
<li>Shouldn't I implement some way to track inheritance chains?
Wouldn't it be nice to know the parent of an object?</li>
</ul>
<p>Published: 2012-09-01 01:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/howto.html">howto</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>