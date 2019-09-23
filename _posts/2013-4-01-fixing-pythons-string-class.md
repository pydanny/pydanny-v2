---
date: 2013-4-01
tag:
  - python
  - joke

author: Daniel Roy Greenfeld
location: California
title: Fixing Python's String class
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/fixing-pythons-string-class.html"
        >Fixing Python's String class</a
      >
    </div>
  </h1>
  <p>
    Ever wonder why Python's <code>str</code> or <code>unicode</code> types lack
    obvious length methods? Yes, we can get the length via the special
    <code>__len__()</code> method, but instead as Python developers we get the
    so-called 'luxury' of discovering length via the Python's built-in
    <code>len()</code> function. So instead of calling the length of objects the
    way Rubyists or Javascripters do...
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;</span> <span class="c1"># ruby</span>
<span class="o">&gt;&gt;</span> <span class="n">s</span> <span class="o">=</span> <span class="s2">"Hello, World!"</span>
<span class="o">=&gt;</span> <span class="s2">"Hello, World!"</span>
<span class="o">&gt;&gt;</span> <span class="n">s</span><span class="o">.</span><span class="n">length</span>
<span class="mi">13</span>
</code></pre>
  </div>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1">// javascript</span>
<span class="kd">var</span> <span class="nx">s</span> <span class="o">=</span> <span class="s2">"Hello, world!"</span>
<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">s</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span>
<span class="mi">13</span>
</code></pre>
  </div>
  <p>...as Python developers we suffer through it like this:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="c1"># python</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">s</span> <span class="o">=</span> <span class="s2">"Hello, World!"</span>
<span class="o">&gt;&gt;&gt;</span> <span class="nb">len</span><span class="p">(</span><span class="n">s</span><span class="p">)</span>
<span class="mi">13</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">s</span><span class="o">.</span><span class="fm">__len__</span><span class="p">()</span>  <span class="c1"># This is what len() calls to get the length</span>
<span class="mi">13</span>
</code></pre>
  </div>
  <p>
    I'm sure Python luminaries like Guido Van Rossum, Alex Gaynor, David
    Beazley, and Raymond Hettiger can explain why Python works this way. Their
    opinions are probably full of logic, history, and grand reasoning.
  </p>
  <p>None of that applies to this blog post.</p>
  <h1 id="fixing-the-string-class">Fixing the String Class</h1>
  <p>
    Clearly, it's time for Python to catch up with the other hip dynamic
    languages. Therefore, after years of careful study, I give you a Fixed
    String class.
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="k">class</span> <span class="nc">String</span><span class="p">(</span><span class="nb">str</span><span class="p">):</span>
    <span class="sd">""" Adding critically unimportant functionality to Python's str type """</span>

    <span class="k">def</span> <span class="nf">len</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="fm">__len__</span><span class="p">()</span>

</code></pre>
  </div>
  <p>
    As you can see it improves on Python's <code>str</code> type by adding a
    built-in <code>len()</code> method. Total success!
  </p>
  <h1 id="improving-the-string-class">Improving the String Class</h1>
  <p>
    Now that I've fixed things in Python by creating the
    <code>String</code> class, it's time to improve it. Ruby and Javascript both
    have a length property/attribute/method/thingee that even my
    <code>String</code> class lacks. Ruby's String object even beats up
    Javascript's String Prototype by including a handy <code>size</code> method
    that serves as an alias for it's own <code>length</code> method.
  </p>
  <p>
    Fortunately, I come armed with the knowledge of how to use Python's
    <code>property</code> decorator:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="k">class</span> <span class="nc">String</span><span class="p">(</span><span class="nb">str</span><span class="p">):</span>
    <span class="sd">""" Adding critically unimportant functionality to Python's str type """</span>

    <span class="k">def</span> <span class="nf">len</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="fm">__len__</span><span class="p">()</span>

    <span class="nd">@property</span>
    <span class="k">def</span> <span class="nf">length</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">len</span><span class="p">()</span>

    <span class="nd">@property</span>
    <span class="k">def</span> <span class="nf">size</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">length</span>

</code></pre>
  </div>
  <p>Bam! Python is now equal to Ruby!</p>
  <h1 id="winning-with-the-string-class">Winning with the String Class</h1>
  <p>
    It's time for Python to take the lead. We've suffered for too long as second
    class citizens in terms of string length discovery. Let's add some more
    utility methods to our String class:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="k">class</span> <span class="nc">String</span><span class="p">(</span><span class="nb">str</span><span class="p">):</span>
    <span class="sd">""" Adding critically unimportant functionality to Python's str type """</span>

    <span class="k">def</span> <span class="nf">len</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="fm">__len__</span><span class="p">()</span>

    <span class="nd">@property</span>
    <span class="k">def</span> <span class="nf">length</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">len</span><span class="p">()</span>

    <span class="nd">@property</span>
    <span class="k">def</span> <span class="nf">size</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">length</span>

    <span class="nd">@property</span>
    <span class="k">def</span> <span class="nf">width</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">length</span>

    <span class="nd">@property</span>
    <span class="k">def</span> <span class="nf">height</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">length</span>

    <span class="nd">@property</span>
    <span class="k">def</span> <span class="nf">area</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">height</span> <span class="o">*</span> <span class="bp">self</span><span class="o">.</span><span class="n">width</span>

</code></pre>
  </div>
  <p>
    Boom! Python now dominates with invaluable properties that provide
    developers with the width, height, and area of a string. And to think I'm
    just getting started...
  </p>
  <h1 id="conquering-with-the-string-class">
    Conquering with the String Class
  </h1>
  <p>
    So far I've carefully changed the Python ecosystem with my brilliant
    addition to the language. What if I want to get stupidly dangerous? What if
    I want to allow developers the
    <strong
      >dangerous capability to alter the returned length of a String</strong
    >? Fortunately for me, and unfortunately for anyone who uses this code on a
    real project, I know how to be this stupidly dangerous.
  </p>
  <p>I present to you the <code>ConqueringString</code> class:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">import</span> <span class="nn">math</span>

<span class="k">class</span> <span class="nc">ConqueringString</span><span class="p">(</span><span class="n">String</span><span class="p">):</span>
<span class="sd">""" Adding stupidly dangerous functionality to Python's str type """</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">text</span><span class="p">):</span>
        <span class="nb">super</span><span class="p">(</span><span class="n">ConqueringString</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="fm">__init__</span><span class="p">(</span><span class="n">text</span><span class="p">)</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_length</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="fm">__len__</span><span class="p">()</span>

    <span class="k">def</span> <span class="fm">__len__</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">try</span><span class="p">:</span>
            <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">_length</span>
        <span class="k">except</span> <span class="ne">AttributeError</span><span class="p">:</span>
            <span class="k">return</span> <span class="nb">super</span><span class="p">(</span><span class="n">ConqueringString</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="fm">__len__</span><span class="p">()</span>

    <span class="k">def</span> <span class="nf">len</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">value</span><span class="o">=</span><span class="bp">None</span><span class="p">):</span>
        <span class="k">if</span> <span class="n">value</span> <span class="ow">is</span> <span class="bp">None</span><span class="p">:</span>
            <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">_length</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_length</span> <span class="o">=</span> <span class="n">value</span>

    <span class="nd">@property</span>
    <span class="k">def</span> <span class="nf">length</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">len</span><span class="p">()</span>

    <span class="nd">@length.setter</span>
    <span class="k">def</span> <span class="nf">length</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">value</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_length</span> <span class="o">=</span> <span class="n">value</span>

    <span class="nd">@property</span>
    <span class="k">def</span> <span class="nf">size</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">length</span>

    <span class="nd">@size.setter</span>
    <span class="k">def</span> <span class="nf">size</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">value</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">length</span> <span class="o">=</span> <span class="n">value</span>

    <span class="nd">@property</span>
    <span class="k">def</span> <span class="nf">area</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">height</span> <span class="o">*</span> <span class="bp">self</span><span class="o">.</span><span class="n">width</span>

    <span class="nd">@area.setter</span>
    <span class="k">def</span> <span class="nf">area</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">value</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">length</span> <span class="o">=</span> <span class="n">math</span><span class="o">.</span><span class="n">sqrt</span><span class="p">(</span><span class="n">value</span><span class="p">)</span>

</code></pre>
  </div>
  <p>Does it work?</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="k">if</span> <span class="vm">__name__</span> <span class="o">==</span> <span class="s2">"__main__"</span><span class="p">:</span>
    <span class="n">s</span> <span class="o">=</span> <span class="n">ConqueringString</span><span class="p">(</span><span class="s2">"Hello, World!"</span><span class="p">)</span>
    <span class="k">print</span><span class="p">(</span><span class="n">s</span><span class="p">)</span>
    <span class="k">print</span><span class="p">(</span><span class="n">s</span><span class="o">.</span><span class="n">length</span><span class="p">)</span>
    <span class="n">s</span><span class="o">.</span><span class="n">length</span> <span class="o">=</span> <span class="mi">5</span>
    <span class="k">print</span><span class="p">(</span><span class="n">s</span><span class="o">.</span><span class="n">length</span><span class="p">)</span>
    <span class="k">print</span><span class="p">(</span><span class="n">s</span><span class="o">.</span><span class="n">area</span><span class="p">)</span>
    <span class="n">s</span><span class="o">.</span><span class="n">area</span> <span class="o">=</span> <span class="mi">50</span>
    <span class="k">print</span><span class="p">(</span><span class="n">s</span><span class="o">.</span><span class="n">area</span><span class="p">)</span>
    <span class="k">print</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">s</span><span class="p">))</span>
    <span class="k">print</span><span class="p">(</span><span class="n">s</span><span class="p">[</span><span class="mi">5</span><span class="p">:</span><span class="mi">10</span><span class="p">])</span> <span class="c1"># slicing still works!</span>
    <span class="k">print</span><span class="p">(</span><span class="n">s</span><span class="o">.</span><span class="n">upper</span><span class="p">())</span> <span class="c1"># other methods still work!</span>
</code></pre>
  </div>
  <p>
    Run it and see. Or grab it off PyPI with
    <code>pip install stringtheory</code>.
  </p>
  <h1 id="summary">Summary</h1>
  <p>Don't forget <code>pip install stringtheory</code>!</p>
  <p>
    We can implement this power using Python lists, tuples, dictionaries, and
    everything else we can imagine. Let's do it!
  </p>
  <p>Resources:</p>
  <ul>
    <li>
      <a href="http://github.com/pydanny/stringtheory" target="_blank"
        >http://github.com/pydanny/stringtheory</a
      >
    </li>
    <li>
      <a href="https://pypi.python.org/pypi/stringtheory" target="_blank"
        >https://pypi.python.org/pypi/stringtheory</a
      >
    </li>
  </ul>
  <h1 id="april-fools-joke">April Fool's Joke</h1>
  <p>
    This was my 2013
    <a
      href="https://pydanny.com/fixing-pythons-string-class.html#april-fool-s-joke"
      target="_blank"
      >April Fool's Joke</a
    >.
  </p>
  <p>
    However, the code was a lot of fun to write and after Mike Bayer's comment
    about <code>__new__</code> and a number of serious questions that people
    emailed me yesterday, I plan to follow this post with some more discussion
    on how to expand on native types in Python.
  </p>
  <p>Published: 2013-4-01 00:01</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/joke.html">joke</a>
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
