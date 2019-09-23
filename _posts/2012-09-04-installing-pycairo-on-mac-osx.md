---
date: 2012-09-04
tag: 
  - python
  - tools
  - howto
  - setup

author: Daniel Roy Greenfeld
location: California
title: Installing Pycairo on Mountain Lion
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/installing-pycairo-on-mac-osx.html">Installing Pycairo on Mountain Lion</a>
</div>
</h1>
<p><a href="http://cairographics.org/pycairo/" target="_blank">Pycairo</a> is the binding for the
<a href="http://cairographics.org/" target="_blank">cairo graphics library</a>. It's also not
something you can get running with a simple <code>pip install py2cairo</code>.
After many hours of working the search engines and dancing to the
configure/make/make install melody, I figured out an answer that worked
for me.</p>
<h1 id="step-1-install-gcc">Step 1 - Install GCC</h1>
<p>If you don't have it yet, go get
<a href="https://github.com/downloads/kennethreitz/osx-gcc-installer/GCC-10.7-v2.pkg" target="_blank">https://github.com/downloads/kennethreitz/osx-gcc-installer/GCC-10.7-v2.pkg</a>
and install it. It's 200 MB so make sure you have a fast connection
and/or a good place to wait.</p>
<h1 id="step-2-install-homebrew">Step 2 - Install Homebrew</h1>
<p>I use Homebrew instead of Macports. If you don't have it yet, paste
this in a terminal prompt:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>ruby &lt;<span class="o">(</span>curl -fsSkL raw.github.com/mxcl/homebrew/go<span class="o">)</span>
</code></pre></div>
<h1 id="step-3-install-cairo">Step 3 - Install Cairo</h1>
<p>In your terminal prompt, type the following:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ brew install cairo --use-clang
</code></pre></div>
<p>You'll get some messages about LDFLAGS and CPPFLAGS in build variables,
but that's only important if you skip Homebrew and build your own
software later that interacts with <strong>cairo</strong>.</p>
<h1 id="step-4-install-pycairo-itself">Step 4 - Install Pycairo itself</h1>
<p>The nasty little trick to this is to remember that <strong>Pycairo</strong> is
packaged on it's site and other places as <strong>py2cairo</strong>. When they get
around to releasing version 3 of Pycairo, I'm going to beg and plead
that they follow an obvious naming system for their bundles. I know this
is done in other communities, but it's frustrating and a real barrier
for getting into a project.</p>
<p>In case, in your terminal prompt, type the following:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ brew install py2cairo
</code></pre></div>
<p>If you are using a non-Homebrew installed Python like I do, you have to
set the PYTHONPATH to find pycairo. Set your PYTHONPATH in your
.bashrc/.profile/.whatever to the following:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="nv">PYTHONPATH</span><span class="o">=</span>/usr/local/lib/python2.7/site-packages:<span class="nv">$PYTHONPATH</span>.
</code></pre></div>
<p>Yes, it's the system Python, but for now I'm okay with it. If someone
has an easy recipe for alternative Python installations, I would love to
link to it.</p>
<p>Published: 2012-09-04 10:30</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/tools.html">tools</a>
<a href="/tag/howto.html">howto</a>
<a href="/tag/setup.html">setup</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>