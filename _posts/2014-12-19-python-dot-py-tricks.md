---
date: 2014-12-19
tag: 
  - python
  - ppoftw

author: Daniel Roy Greenfeld
location: California
title: setup.py tricks
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/python-dot-py-tricks.html">setup.py tricks</a>
</div>
</h1>
<p><img alt="Setup.py tricks" src="https://pydanny.com/static/setup.png"/></p>
<p>Seasons greetings!</p>
<p>Before I begin, I want to make very clear that most of what I'm about
to explain are <strong>'tricks'</strong>. They aren't "best practices", and in
at least one case, is possibly inadvisable.</p>
<p>Speaking of inadvisable practices, at some point I'll write a
<strong>'setup.py traps'</strong> blog post, which are things I believe you should
never, ever do in a <strong>setup.py</strong> module.</p>
<h1 id="tricks">Tricks</h1>
<p>These are tricks I have to make package management in
<a href="http://python.org" target="_blank">python</a> a tiny bit easier. Before you attempt to
implement them, I recommend you have at least basic experience with
creating new packages. Two ways to learn about python packaging are the
<a href="http://audreyr.gitbooks.io/new-library-sprint/content/" target="_blank">New Library
Sprint</a>
(beginner friendly) and the <a href="https://python-packaging-user-guide.readthedocs.org" target="_blank">Python Packaging User
Guide</a> (more
advanced).</p>
<h2 id="python-setuppy-publish">'python setup.py publish'</h2>
<p>This is where it all started. One day I was looking at some of <a href="https://github.com/tomchristie" target="_blank">Tom
Christie's code</a> and discovered the
<a href="https://github.com/tomchristie/django-rest-framework/blob/971578ca345c3d3bae7fd93b87c41d43483b6f05/setup.py#L61-L67" target="_blank">python setup.py
publish</a>
command inside the <strong>setup.py</strong> module of <strong>Django Rest Framework</strong>. It
goes something like this:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># setup.py</span>
<span class="kn">import</span> <span class="nn">os</span>
<span class="kn">import</span> <span class="nn">sys</span>

<span class="c1"># I'll discuss version tricks in a future blog post.</span>
<span class="n">version</span> <span class="o">=</span> <span class="s2">"42.0.0"</span>

<span class="k">if</span> <span class="n">sys</span><span class="o">.</span><span class="n">argv</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span> <span class="o">==</span> <span class="s1">'publish'</span><span class="p">:</span>
    <span class="n">os</span><span class="o">.</span><span class="n">system</span><span class="p">(</span><span class="s2">"python setup.py sdist upload"</span><span class="p">)</span>
    <span class="n">os</span><span class="o">.</span><span class="n">system</span><span class="p">(</span><span class="s2">"python setup.py bdist_wheel upload"</span><span class="p">)</span>
    <span class="k">print</span><span class="p">(</span><span class="s2">"You probably want to also tag the version now:"</span><span class="p">)</span>
    <span class="k">print</span><span class="p">(</span><span class="s2">"  git tag -a </span><span class="si">%s</span><span class="s2"> -m 'version </span><span class="si">%s</span><span class="s2">'"</span> <span class="o">%</span> <span class="p">(</span><span class="n">version</span><span class="p">,</span> <span class="n">version</span><span class="p">))</span>
    <span class="k">print</span><span class="p">(</span><span class="s2">"  git push --tags"</span><span class="p">)</span>
    <span class="n">sys</span><span class="o">.</span><span class="n">exit</span><span class="p">()</span>

<span class="c1"># Below this point is the rest of the setup() function</span>
</code></pre></div>
<p>What's awesome about this is that using this technique I don't have to
look up the somewhat cryptic <strong>python setup.py sdist upload</strong> command,
or the actually cryptic <strong>python setup.py bdist_wheel upload</strong>.
Instead, when it's time to push one of my packages to
<a href="https://pypi.python.org/pypi" target="_blank">PyPI</a>, I just type:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ python setup.py publish
</code></pre></div>
<p>Much easier to remember!</p>
<h2 id="python-setuppy-tag">'python setup.py tag'</h2>
<p>The problem with Tom Christie's <strong>python setup.py publish</strong> command is
that it forces me to type out the <strong>git tag</strong> command. Okay, let's be
honest, it forces me to copy/paste the output of my screen. Therefore,
all on my very own, I 'invented' the <strong>python setup.py tag</strong> command:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># setup.py</span>

<span class="k">if</span> <span class="n">sys</span><span class="o">.</span><span class="n">argv</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span> <span class="o">==</span> <span class="s1">'tag'</span><span class="p">:</span>
    <span class="n">os</span><span class="o">.</span><span class="n">system</span><span class="p">(</span><span class="s2">"git tag -a </span><span class="si">%s</span><span class="s2"> -m 'version </span><span class="si">%s</span><span class="s2">'"</span> <span class="o">%</span> <span class="p">(</span><span class="n">version</span><span class="p">,</span> <span class="n">version</span><span class="p">))</span>
    <span class="n">os</span><span class="o">.</span><span class="n">system</span><span class="p">(</span><span class="s2">"git push --tags"</span><span class="p">)</span>
    <span class="n">sys</span><span class="o">.</span><span class="n">exit</span><span class="p">()</span>
</code></pre></div>
<p>Pretty nifty, eh? Now I don't have to remember so many cryptic git
commands. And I get to shorten the python setup.py publish command:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">if</span> <span class="n">sys</span><span class="o">.</span><span class="n">argv</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span> <span class="o">==</span> <span class="s1">'publish'</span><span class="p">:</span>
    <span class="n">os</span><span class="o">.</span><span class="n">system</span><span class="p">(</span><span class="s2">"python setup.py sdist upload"</span><span class="p">)</span>
    <span class="n">os</span><span class="o">.</span><span class="n">system</span><span class="p">(</span><span class="s2">"python setup.py bdist_wheel upload"</span><span class="p">)</span>
    <span class="n">sys</span><span class="o">.</span><span class="n">exit</span><span class="p">()</span>
</code></pre></div>
<p>When I need to do a version release, I commit my code then type:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ python setup.py publish
$ python setup.py tag
</code></pre></div>
<p>Why don't I combine the commands? Well, you aren't supposed to put
things like 'RC1' or '-alpha' in your PyPI version names. By
seperating the commands I have finer grained control over my package
releases. I'm encouraged to place alpha, beta, and release candidates
in git tags, rather than formal PyPI releases.</p>
<h2 id="python-setuppy-test">'python setup.py test'</h2>
<p>I'm fairly certain some of my readers are going to have a seriously
problem with this trick. In fact, depending on the the response of those
who manage Python's packaging infrastructure, it might be moved to my
forthcoming 'traps' blog post.</p>
<p>Alrighty then...</p>
<p>I like <a href="http://pytest.org" target="_blank">py.test</a>. I've <a href="https://www.pydanny.com/pytest-no-boilerplate-testing.html" target="_blank">blogged about the use of
py.test</a>. I
try to use it everywhere. Yet, I'm really not a fan of how we're
supposed tie it into <strong>python setup.py test</strong>. The precise moment I get
uncomfortable with <strong>py.test</strong> is when it makes me add special classes
into <strong>setup.py</strong>.</p>
<p>Fortunately, there is another way:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">if</span> <span class="n">sys</span><span class="o">.</span><span class="n">argv</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span> <span class="o">==</span> <span class="s1">'test'</span><span class="p">:</span>
    <span class="n">test_requirements</span> <span class="o">=</span> <span class="p">[</span>
        <span class="s1">'pytest'</span><span class="p">,</span>
        <span class="s1">'flake8'</span><span class="p">,</span>
        <span class="s1">'coverage'</span>
    <span class="p">]</span>
    <span class="k">try</span><span class="p">:</span>
        <span class="n">modules</span> <span class="o">=</span> <span class="nb">map</span><span class="p">(</span><span class="nb">__import__</span><span class="p">,</span> <span class="n">test_requirements</span><span class="p">)</span>
    <span class="k">except</span> <span class="ne">ImportError</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
        <span class="n">err_msg</span> <span class="o">=</span> <span class="n">e</span><span class="o">.</span><span class="n">message</span><span class="o">.</span><span class="n">replace</span><span class="p">(</span><span class="s2">"No module named "</span><span class="p">,</span> <span class="s2">""</span><span class="p">)</span>
        <span class="n">msg</span> <span class="o">=</span> <span class="s2">"</span><span class="si">%s</span><span class="s2"> is not installed. Install your test requirments."</span> <span class="o">%</span> <span class="n">err_msg</span>
        <span class="k">raise</span> <span class="ne">ImportError</span><span class="p">(</span><span class="n">msg</span><span class="p">)</span>
    <span class="n">os</span><span class="o">.</span><span class="n">system</span><span class="p">(</span><span class="s1">'py.test'</span><span class="p">)</span>
    <span class="n">sys</span><span class="o">.</span><span class="n">exit</span><span class="p">()</span>
</code></pre></div>
<p>Which means I get to use <strong>py.test</strong> and <strong>python setup.py test</strong> with a
trivial addition of code:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ python setup.py <span class="nb">test</span>
</code></pre></div>
<p>In theory, one could run <strong>pip install</strong> on the missing requirements, or
call them from a requirements file. However, since these are 'tricks',
I like to keep things short and sweet. If I get enough positive results
for this one I'll update this example to include calling of <strong>pip</strong> for
missing requirements.</p>
<p><strong>note</strong>: This doesn't mean I'm not using
<a href="https://pypi.python.org/pypi/tox" target="_blank">tox</a>. In fact, I use tox to call my
version of <strong>python setup.py test</strong>.</p>
<h1 id="what-about-subprocess">What about subprocess?</h1>
<p>There are those who will ask, "Why aren't you using the
<a href="https://docs.python.org/2/library/subprocess.html" target="_blank">subprocess</a> library
for these shell commands?"</p>
<p>My answer to that question is, "Because if I need a nuclear weapon to
kill a rabbit maybe I'm overdoing things." For these simple tricks,
the <strong>os.system()</strong> function is good enough.</p>
<h1 id="why-not-just-use-a-makefile">Why not just use a Makefile?</h1>
<p>While I code primarily on Mac OSX and Linux, most of my open source
packages are used Windows. Thanks to <a href="http://appveyor.com" target="_blank">AppVeyor</a>,
I'm testing more and more of them in that environment. In fact, I'll
probably be modifying these "tricks" to work better for Windows users.</p>
<h1 id="traps">Traps!</h1>
<p>Stay tuned for my 'traps' blog post to come out early in 2015.</p>
<h1 id="updates">Updates</h1>
<ul>
<li>2014/12/21 - Added a note about using tox.</li>
<li>2014/12/21 - Added a note about Makefile and Windows</li>
</ul>
<p>Published: 2014-12-19 12:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/ppoftw.html">ppoftw</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>