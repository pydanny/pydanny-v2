---
date: 2012-05-11
tag: 
  - python
  - django
  - css
  - usability

author: Daniel Roy Greenfeld
location: California
title: CSS Hacking to make my code samples legible
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/css-hacking.html">CSS Hacking to make my code samples legible</a>
</div>
</h1>
<p>I've been very happy with <a href="http://pelican.readthedocs.org/" target="_blank">Pelican</a> as
a blog engine so far, and haven't even moved off the sample theme.
There's just been one problem: Myself and others have had a lot of
trouble reading the code snippets.</p>
<p>I didn't have time to cook up a full Pelican theme, so instead I just
hacked the local CSS files. The problem with this hack is that every
time I regenerate the blog I have to copy the right CSS files into
place. So next week when I have time I'll do a proper Pelican theme.</p>
<p>In the meantime, enjoy!</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="kn">from</span> <span class="nn">random</span> <span class="kn">import</span> <span class="n">shuffle</span>

<span class="k">class</span> <span class="nc">Meal</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>
    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">food_type</span> <span class="o">=</span> <span class="p">[</span><span class="s1">'Beef'</span><span class="p">,</span> <span class="s1">'Fish'</span><span class="p">,</span> <span class="s1">'Vegetarian'</span><span class="p">,</span> <span class="s1">'Chicken'</span><span class="p">]</span>
        <span class="n">shuffle</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">food_type</span><span class="p">)</span>
</code></pre></div>
<p>Published: 2012-05-11 08:30</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/django.html">django</a>
<a href="/tag/css.html">css</a>
<a href="/tag/usability.html">usability</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>