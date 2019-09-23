---
date: 2017-04-27
tag:
  - twoscoops
  - python
  - django
  - python
  - python3

author: Daniel Roy Greenfeld
location: California
title: Python F-Strings Are Fun!
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/python-f-strings-are-fun.html">Python F-Strings Are Fun!</a>
    </div>
  </h1>
  <p>
    <a
      href="https://www.pydanny.com/python-f-strings-are-fun.html"
      target="_blank"
      ><img
        alt="Python F-Strings Are Fun!"
        src="https://raw.githubusercontent.com/pydanny/pydanny.github.com/master/static/python-tip-from-pydanny.png"
    /></a>
  </p>
  <p>
    In python 3.6 we saw the adoption of
    <a href="https://www.python.org/dev/peps/pep-0498/" target="_blank"
      >Literal String Interpolation</a
    >, or as they are known more commonly,
    <a
      href="https://docs.python.org/3.6/reference/lexical_analysis.html#f-strings"
      target="_blank"
      >f-strings</a
    >. At first I was hesitant because... well... we've got multiple string
    tools already available:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="n">one</span><span class="p">,</span> <span class="n">two</span> <span class="o">=</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">2</span>
<span class="n">_format</span> <span class="o">=</span> <span class="s1">'{},{}'</span><span class="o">.</span><span class="n">format</span><span class="p">(</span><span class="n">one</span><span class="p">,</span> <span class="n">two</span><span class="p">)</span>
<span class="n">_percent</span> <span class="o">=</span> <span class="s1">'</span><span class="si">%s</span><span class="s1">,</span><span class="si">%s</span><span class="s1">'</span> <span class="o">%</span> <span class="p">(</span><span class="n">one</span><span class="p">,</span> <span class="n">two</span><span class="p">)</span>
<span class="n">_concatenation</span> <span class="o">=</span> <span class="nb">str</span><span class="p">(</span><span class="n">one</span><span class="p">)</span> <span class="o">+</span> <span class="s1">','</span> <span class="o">+</span> <span class="nb">str</span><span class="p">(</span><span class="n">two</span><span class="p">)</span>
<span class="n">_join</span> <span class="o">=</span> <span class="s1">','</span><span class="o">.</span><span class="n">join</span><span class="p">((</span><span class="nb">str</span><span class="p">(</span><span class="n">one</span><span class="p">),</span><span class="nb">str</span><span class="p">(</span><span class="n">two</span><span class="p">)))</span>
<span class="k">assert</span> <span class="n">_format</span> <span class="o">==</span> <span class="n">_percent</span> <span class="o">==</span> <span class="n">_concatenation</span> <span class="o">==</span> <span class="n">_join</span>
</code></pre>
  </div>
  <p>Adding f-strings to this mix didn't seem all that useful:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="n">_fstring</span> <span class="o">=</span> <span class="n">f</span><span class="s1">'{one},{two}'</span>
<span class="k">assert</span> <span class="n">_fstring</span> <span class="o">==</span> <span class="n">_format</span> <span class="o">==</span> <span class="n">_percent</span> <span class="o">==</span> <span class="n">_concatenation</span> <span class="o">==</span> <span class="n">_join</span>
</code></pre>
  </div>
  <p>
    I was doubtful, but then I tried out f-strings on a non-trivial example. Now
    I'm hooked. Be it on local utility scripts or production code, I now
    instinctively gravitate toward their usage. In fact, f-strings are so useful
    that going back to earlier versions of Python now feels cumbersome.
  </p>
  <p>
    The reason why I feel this way is that f-strings are concise but easy to
    understand. Thanks to intuitive expression evaluation I can compress more
    verbose commands into smaller lines of code that are more legible. Take a
    look:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="n">_fstring</span> <span class="o">=</span> <span class="n">f</span><span class="s1">'Total: {one + two}'</span>  <span class="c1"># Go f-string!</span>
<span class="n">_format</span> <span class="o">=</span> <span class="s1">'Total: {}'</span><span class="o">.</span><span class="n">format</span><span class="p">(</span><span class="n">one</span> <span class="o">+</span> <span class="n">two</span><span class="p">)</span>
<span class="n">_percent</span> <span class="o">=</span> <span class="s1">'Total: </span><span class="si">%s</span><span class="s1">'</span> <span class="o">%</span> <span class="p">(</span><span class="n">one</span> <span class="o">+</span> <span class="n">two</span><span class="p">)</span>
<span class="n">_concatenation</span> <span class="o">=</span> <span class="s1">'Total: '</span> <span class="o">+</span> <span class="nb">str</span><span class="p">(</span><span class="n">one</span> <span class="o">+</span> <span class="n">two</span><span class="p">)</span>
<span class="k">assert</span> <span class="n">_fstring</span> <span class="o">==</span> <span class="n">_format</span> <span class="o">==</span> <span class="n">_percent</span> <span class="o">==</span> <span class="n">_concatenation</span>
</code></pre>
  </div>
  <p>
    The f-string example is four characters shorter than the closest alternative
    and is extremely easy to read. Indeed, put the f-string example in front of
    a non-programmer and they'll understand it fast. The same won't apply to the
    alternatives, odds are they'll ask what <code>.format()</code>,
    <code>str()</code>, and the <code>%</code> mean.
  </p>
  <h1 id="f-strings-are-addictive">F-Strings Are Addictive</h1>
  <p>
    The conciseness and power of the intuitive expression evaluation can't be
    understated. On the surface f-strings seem like a small step forward for
    Python, but once I started using them I realized they were a huge step in
    codability for the language.
  </p>
  <p>
    Now I'm hooked. I'm addicted to f-strings. When I step back to Python 3.5 or
    lower I feel like less of a Python coder. Yes, I have a problem with how
    much I lean on f-strings now, but I acknowledge my problem. I would go to
    therapy for it, but I believe I can manage the addiction for now.
  </p>
  <p>Okay, enough joking, f-strings are awesome. Try them out.</p>
  <h1 id="a-utility-script-example">A Utility Script Example</h1>
  <p>
    We just released
    <a
      href="https://www.twoscoopspress.com/products/two-scoops-of-django-1-11"
      target="_blank"
      >Two Scoops of Django 1.11</a
    >, which is written in
    <a href="https://en.wikipedia.org/wiki/LaTeX" target="_blank">LaTeX</a>.
    Like most programming books we provide
    <a
      href="https://github.com/twoscoops/two-scoops-of-django-1.11/tree/master/code"
      target="_blank"
      >code examples in a repo</a
    >
    for our readers. However, as we completey revised the code-highlighting, we
    had to rewrite our code extractor from the ground up. In a flurry of cowboy
    coding, I did so in thirty minutes using Python 3.6 while leaning on
    f-strings:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="sd">"""Two Scoops of Django 1.11 Code Extractor"""</span>
<span class="kn">import</span> <span class="nn">os</span>
<span class="kn">import</span> <span class="nn">shutil</span>
<span class="kn">from</span> <span class="nn">glob</span> <span class="kn">import</span> <span class="n">glob</span>

<span class="k">try</span><span class="p">:</span>
<span class="n">shutil</span><span class="o">.</span><span class="n">rmtree</span><span class="p">(</span><span class="s1">'code'</span><span class="p">)</span>
<span class="k">print</span><span class="p">(</span><span class="s1">'Removed old code directory'</span><span class="p">)</span>
<span class="k">except</span> <span class="n">FileNotFoundError</span><span class="p">:</span>
<span class="k">pass</span>
<span class="n">os</span><span class="o">.</span><span class="n">mkdir</span><span class="p">(</span><span class="s1">'code'</span><span class="p">)</span>
<span class="k">print</span><span class="p">(</span><span class="s1">'Created new code directory'</span><span class="p">)</span>

<span class="n">STAR</span> <span class="o">=</span> <span class="s1">'\*'</span>

<span class="n">LEGALESE</span> <span class="o">=</span> <span class="s2">"""LEGAL TEXT GOES HERE"""</span>

<span class="n">LANGUAGE_START</span> <span class="o">=</span> <span class="p">{</span>
<span class="s1">'</span><span class="se">\\</span><span class="s1">begin{python}'</span><span class="p">:</span> <span class="s1">'.py'</span><span class="p">,</span>
<span class="s1">'</span><span class="se">\\</span><span class="s1">begin{badpython}'</span><span class="p">:</span> <span class="s1">'.py'</span><span class="p">,</span>
<span class="s1">'</span><span class="se">\\</span><span class="s1">begin{django}'</span><span class="p">:</span> <span class="s1">'.html'</span><span class="p">,</span>
<span class="s1">'</span><span class="se">\\</span><span class="s1">begin{baddjango}'</span><span class="p">:</span> <span class="s1">'.html'</span><span class="p">,</span>
<span class="s1">'</span><span class="se">\\</span><span class="s1">begin{plaintext}'</span><span class="p">:</span> <span class="s1">'.txt'</span><span class="p">,</span>
<span class="s1">'</span><span class="se">\\</span><span class="s1">begin{badplaintext}'</span><span class="p">:</span> <span class="s1">'.txt'</span><span class="p">,</span>
<span class="s1">'</span><span class="se">\\</span><span class="s1">begin{sql}'</span><span class="p">:</span> <span class="s1">'.sql'</span><span class="p">,</span>
<span class="s1">'</span><span class="se">\\</span><span class="s1">begin{makefile}'</span><span class="p">:</span> <span class="s1">''</span><span class="p">,</span>
<span class="s1">'</span><span class="se">\\</span><span class="s1">begin{json}'</span><span class="p">:</span> <span class="s1">'.json'</span><span class="p">,</span>
<span class="s1">'</span><span class="se">\\</span><span class="s1">begin{bash}'</span><span class="p">:</span> <span class="s1">'.txt'</span><span class="p">,</span>
<span class="s1">'</span><span class="se">\\</span><span class="s1">begin{xml}'</span><span class="p">:</span> <span class="s1">'.html'</span><span class="p">,</span>
<span class="p">}</span>

<span class="n">LANGUAGE_END</span> <span class="o">=</span> <span class="p">{</span><span class="n">x</span><span class="o">.</span><span class="n">replace</span><span class="p">(</span><span class="s1">'begin'</span><span class="p">,</span> <span class="s1">'end'</span><span class="p">):</span><span class="n">y</span> <span class="k">for</span> <span class="n">x</span><span class="p">,</span><span class="n">y</span> <span class="ow">in</span> <span class="n">LANGUAGE_START</span><span class="o">.</span><span class="n">items</span><span class="p">()}</span>

<span class="k">def</span> <span class="nf">is_example</span><span class="p">(</span><span class="n">line</span><span class="p">,</span> <span class="n">SWITCH</span><span class="p">):</span>
<span class="k">for</span> <span class="n">key</span> <span class="ow">in</span> <span class="n">SWITCH</span><span class="p">:</span>
<span class="k">if</span> <span class="n">line</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span><span class="o">.</span><span class="n">startswith</span><span class="p">(</span><span class="n">key</span><span class="p">):</span>
<span class="k">return</span> <span class="n">SWITCH</span><span class="p">[</span><span class="n">key</span><span class="p">]</span>
<span class="k">return</span> <span class="bp">None</span>

<span class="k">def</span> <span class="nf">makefilename</span><span class="p">(</span><span class="n">chapter*num</span><span class="p">,</span> <span class="n">in_example</span><span class="p">):</span>
<span class="k">return</span> <span class="n">f</span><span class="s1">'code/chapter*{chapter*num}\_example*{str(example_num).zfill(2)}{in_example}'</span>

<span class="k">if</span> <span class="vm">**name**</span> <span class="o">==</span> <span class="s1">'**main**'</span><span class="p">:</span>

    <span class="n">in_example</span> <span class="o">=</span> <span class="bp">False</span>
    <span class="n">starting</span> <span class="o">=</span> <span class="bp">False</span>
    <span class="k">for</span> <span class="n">path</span> <span class="ow">in</span> <span class="n">glob</span><span class="p">(</span><span class="s1">'chapters/*.tex'</span><span class="p">):</span>
        <span class="k">try</span><span class="p">:</span>
            <span class="n">chapter_num</span> <span class="o">=</span> <span class="nb">int</span><span class="p">(</span><span class="n">path</span><span class="p">[</span><span class="mi">9</span><span class="p">:</span><span class="mi">11</span><span class="p">])</span>
            <span class="n">chapter_num</span> <span class="o">=</span> <span class="n">path</span><span class="p">[</span><span class="mi">9</span><span class="p">:</span><span class="mi">11</span><span class="p">]</span>
        <span class="k">except</span> <span class="ne">ValueError</span><span class="p">:</span>
            <span class="k">if</span> <span class="ow">not</span> <span class="n">path</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span><span class="o">.</span><span class="n">startswith</span><span class="p">(</span><span class="s1">'appendix'</span><span class="p">):</span>
                <span class="k">print</span><span class="p">(</span><span class="n">f</span><span class="s1">'{STAR*40}</span><span class="se">\n</span><span class="s1">{path}</span><span class="se">\n</span><span class="s1">{STAR*40}'</span><span class="p">)</span>
            <span class="k">continue</span>
        <span class="n">example_num</span> <span class="o">=</span> <span class="mi">1</span>
        <span class="k">with</span> <span class="nb">open</span><span class="p">(</span><span class="n">path</span><span class="p">)</span> <span class="k">as</span> <span class="n">f</span><span class="p">:</span>
            <span class="n">lines</span> <span class="o">=</span> <span class="p">(</span><span class="n">x</span> <span class="k">for</span> <span class="n">x</span> <span class="ow">in</span> <span class="n">f</span><span class="o">.</span><span class="n">readlines</span><span class="p">())</span>
        <span class="k">for</span> <span class="n">line</span> <span class="ow">in</span> <span class="n">lines</span><span class="p">:</span>
            <span class="k">if</span> <span class="n">starting</span><span class="p">:</span>
                <span class="c1"># Crazy long string interpolation that should probably</span>
                <span class="c1"># be broken up but remains because it's easy for me to read</span>
                <span class="n">filename</span> <span class="o">=</span>  <span class="n">f</span><span class="s1">'code/chapter_{chapter_num}_example_{str(example_num).zfill(2)}{in_example}'</span>
                <span class="n">dafile</span> <span class="o">=</span> <span class="nb">open</span><span class="p">(</span><span class="n">filename</span><span class="p">,</span> <span class="s1">'w'</span><span class="p">)</span>
                <span class="k">if</span> <span class="n">in_example</span> <span class="ow">in</span> <span class="p">(</span><span class="s1">'.py'</span><span class="p">,</span> <span class="s1">'.html'</span><span class="p">):</span>
                    <span class="n">dafile</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="n">f</span><span class="s1">'"""</span><span class="se">\n</span><span class="s1">{LEGALESE}"""</span><span class="se">\n\n</span><span class="s1">'</span><span class="p">)</span>
                <span class="k">else</span><span class="p">:</span>
                    <span class="n">dafile</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="n">f</span><span class="s1">'{LEGALESE}</span><span class="se">\n</span><span class="s1">{STAR*20}</span><span class="se">\n\n</span><span class="s1">'</span><span class="p">)</span>
                <span class="k">print</span><span class="p">(</span><span class="n">filename</span><span class="p">)</span>
            <span class="k">if</span> <span class="ow">not</span> <span class="n">in_example</span><span class="p">:</span>
                <span class="n">mime</span> <span class="o">=</span> <span class="bp">None</span>
                <span class="n">in_example</span> <span class="o">=</span> <span class="n">is_example</span><span class="p">(</span><span class="n">line</span><span class="p">,</span> <span class="n">LANGUAGE_START</span><span class="p">)</span>
                <span class="k">if</span> <span class="n">in_example</span><span class="p">:</span>
                    <span class="n">starting</span> <span class="o">=</span> <span class="bp">True</span>
                <span class="k">continue</span>
            <span class="n">mime</span> <span class="o">=</span> <span class="n">is_example</span><span class="p">(</span><span class="n">line</span><span class="p">,</span> <span class="n">LANGUAGE_END</span><span class="p">)</span>
            <span class="n">starting</span> <span class="o">=</span> <span class="bp">False</span>
            <span class="k">if</span> <span class="n">mime</span><span class="p">:</span>
                <span class="k">print</span><span class="p">(</span><span class="n">mime</span><span class="p">)</span>
                <span class="n">in_example</span> <span class="o">=</span> <span class="bp">False</span>
                <span class="n">example_num</span> <span class="o">+=</span> <span class="mi">1</span>
                <span class="n">dafile</span><span class="o">.</span><span class="n">close</span><span class="p">()</span>
            <span class="k">else</span><span class="p">:</span>
                <span class="n">dafile</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="n">line</span><span class="p">)</span>

</code></pre>
  </div>

  <p>Published: 2017-04-27 00:05</p>
  <p>
    Tags:

    <a href="/tag/twoscoops.html">twoscoops</a>
    <a href="/tag/python.html">python</a>
    <a href="/tag/django.html">django</a>
    <a href="/tag/python.html">python</a>
    <a href="/tag/python3.html">python3</a>
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
