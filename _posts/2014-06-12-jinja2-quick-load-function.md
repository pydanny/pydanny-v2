---
date: 2014-06-12
tag: 
  - python
  - jinja2

author: Daniel Roy Greenfeld
location: California
title: Jinja2 Quick Load Function
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/jinja2-quick-load-function.html">Jinja2 Quick Load Function</a>
</div>
</h1>
<p>It seems like that for every few weeks I find myself needing to generate
something out of a template while working outside a framework. For this
task, my preferred solution is <a href="http://jinja.pocoo.org/" target="_blank">Jinja2</a>. I've
used Jinja2 to generate HTML, code, and text. If I were brave enough I
would even say I've used it to generate XML (<em>While my preferred xml
tool is great for parsing, even lxml is not so much fun for XML
generation</em>).</p>
<p>I frequently use this snippet of code to render templates. Since I'm
tired of digging through my code to find it, I'm placing it here for
personal reference.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="kn">from</span> <span class="nn">jinja2</span> <span class="kn">import</span> <span class="n">FileSystemLoader</span><span class="p">,</span> <span class="n">Environment</span>

<span class="k">def</span> <span class="nf">render_from_template</span><span class="p">(</span><span class="n">directory</span><span class="p">,</span> <span class="n">template_name</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
    <span class="n">loader</span> <span class="o">=</span> <span class="n">FileSystemLoader</span><span class="p">(</span><span class="n">directory</span><span class="p">)</span>
    <span class="n">env</span> <span class="o">=</span> <span class="n">Environment</span><span class="p">(</span><span class="n">loader</span><span class="o">=</span><span class="n">loader</span><span class="p">)</span>
    <span class="n">template</span> <span class="o">=</span> <span class="n">env</span><span class="o">.</span><span class="n">get_template</span><span class="p">(</span><span class="n">template_name</span><span class="p">)</span>
    <span class="k">return</span> <span class="n">template</span><span class="o">.</span><span class="n">render</span><span class="p">(</span><span class="o">**</span><span class="n">kwargs</span><span class="p">)</span>
</code></pre></div>
<p>Sample usage:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">simple_script</span> <span class="kn">import</span> <span class="n">render_from_template</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">data</span> <span class="o">=</span> <span class="p">{</span>
<span class="o">...</span>     <span class="s2">"date"</span><span class="p">:</span> <span class="s2">"June 12, 2014"</span><span class="p">,</span>
<span class="o">...</span>     <span class="s2">"items"</span><span class="p">:</span> <span class="p">[</span><span class="s2">"oranges"</span><span class="p">,</span> <span class="s2">"bananas"</span><span class="p">,</span> <span class="s2">"steak"</span><span class="p">,</span> <span class="s2">"milk"</span><span class="p">]</span>
<span class="o">...</span> <span class="p">}</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">render_from_template</span><span class="p">(</span><span class="s2">"."</span><span class="p">,</span> <span class="s2">"shopping_list.html"</span><span class="p">,</span> <span class="o">**</span><span class="n">data</span><span class="p">)</span>
</code></pre></div>
<p>I've thought about packaging this up with
<a href="https://github.com/audreyr/cookiecutter-pypackage" target="_blank">cookiecutter-pypackage</a>
and placing it on <a href="https://pypi.python.org/pypi" target="_blank">PyPI</a>, but I think it
might be overkill.</p>
<p><strong>Update 2014/06/12:</strong> Fixed cookiecutter link thanks to
<a href="https://github.com/dirn" target="_blank">https://github.com/dirn</a></p>
<p>Published: 2014-06-12 09:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/jinja2.html">jinja2</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>