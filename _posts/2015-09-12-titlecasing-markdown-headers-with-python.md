---
date: 2015-09-12
tag: 
  - python
  - markdown
  - ppoftw

author: Daniel Roy Greenfeld
location: California
title: Titlecasing Markdown Headers with Python
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/titlecasing-markdown-headers-with-python.html">Titlecasing Markdown Headers with Python</a>
</div>
</h1>
<p><a href="https://www.pydanny.com/static/title-case.png" target="_blank"><img alt="Markdown" src="https://pydanny.com/static/title-case.png"/></a></p>
<p>Recently I've been writing a lot of Markdown. While not as
sophisticated as ReStructuredText, it's simplicity is nice for
accelerated writing. The problem is that I like to put section headings
in <em>titlecase</em>.</p>
<p>What do I mean by titlecase?</p>
<pre><code>go to the room
</code></pre>
<p>becomes:</p>
<pre><code>Go to the Room
</code></pre>
<p>See how verb 'Go' and the noun 'Room' have their first letter
capitalized? And the 'small words', specifically 'to' (preposition)
and 'the' (definate article) are not? That's how title casing works
(at least in English). That's what I like to see in my section
headings.</p>
<p>In theory one could just use Python's <code>str.title()</code> method to perform
this transformation. However, that method is too global in reach. We
would end up with:</p>
<pre><code>Go To The Room  # 'to' and 'the' have titlecase, when they should not.
</code></pre>
<p>So how do I programmatically (i.e. quickly) ensure that dozens of files
scattered across multiple directories have section headers that are
accurately titlecased?</p>
<h1 id="accurately-titlecasing-programmatically">Accurately Titlecasing Programmatically</h1>
<p>The solution to this is a handy library called
<a href="https://pypi.python.org/pypi/titlecase" target="_blank">titlecase</a>. Empowered by this
tool I wrote the following script that allows me to transforms all my
markdown files to have titlecased section headings.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="sd">"""</span>
<span class="sd">Titlecases all markdown section headers in a directory.</span>
<span class="sd">Confirmed to work with Python 2.7, 3.3, and 3.4.</span>

<span class="sd">Usage:</span>

<span class="sd">  python titlemd.py a-directory/</span>
<span class="sd">  python titlemd.py  # defaults to '.'</span>
<span class="sd">"""</span>

<span class="kn">import</span> <span class="nn">fnmatch</span>
<span class="kn">import</span> <span class="nn">os</span>
<span class="kn">import</span> <span class="nn">sys</span>

<span class="k">try</span><span class="p">:</span>
  <span class="kn">from</span> <span class="nn">titlecase</span> <span class="kn">import</span> <span class="n">titlecase</span>
<span class="k">except</span> <span class="ne">ImportError</span><span class="p">:</span>
  <span class="k">print</span><span class="p">(</span><span class="s2">"Please install titlecase"</span><span class="p">)</span>

<span class="k">def</span> <span class="nf">main</span><span class="p">(</span><span class="n">location</span><span class="p">):</span>
  <span class="k">for</span> <span class="n">root</span><span class="p">,</span> <span class="n">dirs</span><span class="p">,</span> <span class="n">files</span> <span class="ow">in</span> <span class="n">os</span><span class="o">.</span><span class="n">walk</span><span class="p">(</span><span class="n">location</span><span class="p">):</span>
      <span class="k">for</span> <span class="n">item</span> <span class="ow">in</span> <span class="n">fnmatch</span><span class="o">.</span><span class="n">filter</span><span class="p">(</span><span class="n">files</span><span class="p">,</span> <span class="s2">"*.md"</span><span class="p">):</span>
          <span class="n">file_path</span> <span class="o">=</span> <span class="n">os</span><span class="o">.</span><span class="n">path</span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="n">root</span><span class="p">,</span> <span class="n">item</span><span class="p">)</span>
          <span class="k">print</span><span class="p">(</span><span class="n">file_path</span><span class="p">)</span>

          <span class="c1"># Open the file and read the lines as a list</span>
          <span class="k">with</span> <span class="nb">open</span><span class="p">(</span><span class="n">file_path</span><span class="p">)</span> <span class="k">as</span> <span class="n">f</span><span class="p">:</span>
              <span class="n">lines</span> <span class="o">=</span> <span class="n">f</span><span class="o">.</span><span class="n">readlines</span><span class="p">()</span>

          <span class="k">with</span> <span class="nb">open</span><span class="p">(</span><span class="n">file_path</span><span class="p">,</span> <span class="s1">'w'</span><span class="p">)</span> <span class="k">as</span> <span class="n">f</span><span class="p">:</span>
              <span class="c1"># Loop through the list of lines and titlecase</span>
              <span class="c1"># any line beginning with '#'.</span>
              <span class="k">for</span> <span class="n">line</span> <span class="ow">in</span> <span class="n">lines</span><span class="p">:</span>
                  <span class="k">if</span> <span class="n">line</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span><span class="o">.</span><span class="n">startswith</span><span class="p">(</span><span class="s1">'#'</span><span class="p">):</span>
                      <span class="n">line</span> <span class="o">=</span> <span class="n">titlecase</span><span class="p">(</span><span class="n">line</span><span class="p">)</span>
                  <span class="n">f</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="n">line</span><span class="p">)</span>

<span class="k">if</span> <span class="vm">__name__</span> <span class="o">==</span> <span class="s2">"__main__"</span><span class="p">:</span>
  <span class="k">try</span><span class="p">:</span>
      <span class="n">main</span><span class="p">(</span><span class="n">sys</span><span class="o">.</span><span class="n">argv</span><span class="p">[</span><span class="mi">1</span><span class="p">])</span>
  <span class="k">except</span> <span class="ne">IndexError</span><span class="p">:</span>
      <span class="n">main</span><span class="p">(</span><span class="s1">'.'</span><span class="p">)</span>
</code></pre></div>
<p>Published: 2015-09-12 09:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/markdown.html">markdown</a>
<a href="/tag/ppoftw.html">ppoftw</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>