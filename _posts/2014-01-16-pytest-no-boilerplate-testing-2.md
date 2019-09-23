---
date: 2014-01-16
tag: 
  - python
  - django
  - testing
  - ppoftw

author: Daniel Roy Greenfeld
location: California
title: "pytest: no-boilerplate testing (part 2)"
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/pytest-no-boilerplate-testing-2.html">pytest: no-boilerplate testing (part 2)</a>
</div>
</h1>
<p>In my previous <a href="https://pydanny.com/pytest-no-boilerplate-testing.html" target="_blank">blog
post</a> I covered
test discovery and writing basic tests using
<a href="http://pytest.org/" target="_blank">pytest</a>. Today I'm going to cover a few more
features that I really enjoy: <code>raises</code> and <code>fixtures</code>.</p>
<h1 id="the-intuitively-named-raises-context-manager">The Intuitively Named <code>raises</code> <strong>context manager</strong></h1>
<p>When using <strong>pytest</strong>, you can assert whether or not an exception
occurred via the following:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># test_exceptions.py</span>
<span class="kn">from</span> <span class="nn">pytest</span> <span class="kn">import</span> <span class="n">raises</span>

<span class="k">def</span> <span class="nf">test_an_exception</span><span class="p">():</span>
    <span class="k">with</span> <span class="n">raises</span><span class="p">(</span><span class="ne">IndexError</span><span class="p">):</span>
        <span class="c1"># Indexing the 30th item in a 3 item list</span>
        <span class="p">[</span><span class="mi">5</span><span class="p">,</span> <span class="mi">10</span><span class="p">,</span> <span class="mi">15</span><span class="p">][</span><span class="mi">30</span><span class="p">]</span>

<span class="k">class</span> <span class="nc">CustomException</span><span class="p">(</span><span class="ne">Exception</span><span class="p">):</span>
    <span class="k">pass</span>

<span class="k">def</span> <span class="nf">test_my_exception</span><span class="p">():</span>
    <span class="k">with</span> <span class="n">raises</span><span class="p">(</span><span class="n">CustomException</span><span class="p">):</span>
        <span class="k">raise</span> <span class="n">CustomException</span>
</code></pre></div>
<p>This is similar to, but just a bit easier to remember than the
implementation in
<a href="http://docs.python.org/2/library/unittest.html" target="_blank">unittest</a>.</p>
<p>What I like about it is that even if I step away from code and tests for
enough time to go on vacation and <a href="https://pydanny.com/i-married-audrey-roy.html" target="_blank">get
married</a>, when I come
back I always remember the precise name of the <strong>context manager</strong> used
to raise exceptions.</p>
<h1 id="fixtures-as-function-arguments">Fixtures as Function Arguments</h1>
<p>When writing tests, it's not uncommon to need common objects used
between tests. However, if you have a complicated process to generate
these common objects, then you have to write tests for your tests. When
using Python's venerable <strong>unittest</strong> framework, this always causes a
spaghetti-code headache. However, via the virtue of simplicity,
<strong>pytest</strong> helps keep our test code cleaner and more maintainable.</p>
<p>Rather than try and explain that further, I'll write some code to get
my point across:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># test_fixtures.py</span>
<span class="kn">from</span> <span class="nn">pytest</span> <span class="kn">import</span> <span class="n">fixture</span>

<span class="nd">@fixture</span>  <span class="c1"># Registering this function as a fixture.</span>
<span class="k">def</span> <span class="nf">complex_data</span><span class="p">():</span>
    <span class="c1"># Creating test data entirely in this function to isolate it</span>
    <span class="c1">#   from the rest of this module.</span>
    <span class="k">class</span> <span class="nc">DataTypes</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>
        <span class="n">string</span> <span class="o">=</span> <span class="nb">str</span>
        <span class="nb">list</span> <span class="o">=</span> <span class="nb">list</span>
    <span class="k">return</span> <span class="n">DataTypes</span><span class="p">()</span>

<span class="k">def</span> <span class="nf">test_types</span><span class="p">(</span><span class="n">complex_data</span><span class="p">):</span> <span class="c1"># fixture is passed as an argument</span>
    <span class="k">assert</span> <span class="nb">isinstance</span><span class="p">(</span><span class="s2">"Elephant"</span><span class="p">,</span> <span class="n">complex_data</span><span class="o">.</span><span class="n">string</span><span class="p">)</span>
    <span class="k">assert</span> <span class="nb">isinstance</span><span class="p">([</span><span class="mi">5</span><span class="p">,</span> <span class="mi">10</span><span class="p">,</span> <span class="mi">15</span><span class="p">],</span> <span class="n">complex_data</span><span class="o">.</span><span class="n">list</span><span class="p">)</span>
</code></pre></div>
<p>Nice and simple, which is how I think test harnesses should operate.</p>
<h2 id="writing-tests-for-fixtures">Writing Tests for Fixtures</h2>
<p>Let's pretend that the <code>complex_data()</code> is a terribly sophisticated
function in it's own right. It's so sophisticated that I can't
determine what it's actually doing, and I start to get worried.
Fortunately, because the <code>complex_data()</code> argument itself is written as
a function, I can easily write a test for it.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># test_fixtures.py</span>
<span class="c1"># note: this version of test_fixtures.py is built off the previous example</span>

<span class="k">def</span> <span class="nf">test_complex_data</span><span class="p">(</span><span class="n">complex_data</span><span class="p">):</span>
    <span class="k">assert</span> <span class="nb">isinstance</span><span class="p">(</span><span class="n">complex_data</span><span class="p">,</span> <span class="nb">object</span><span class="p">)</span>
    <span class="k">assert</span> <span class="n">complex_data</span><span class="o">.</span><span class="n">string</span> <span class="o">==</span> <span class="nb">str</span>
    <span class="k">assert</span> <span class="n">complex_data</span><span class="o">.</span><span class="n">list</span> <span class="o">==</span> <span class="nb">list</span>
</code></pre></div>
<p>Now that I can easily write tests for my fixtures, that means I can
refactor them! I can replace difficult-to-use libraries with easier
ones, break up giant functions into little ones, and generally simplify
the unnecessarily complex.</p>
<p>If you've ever been in that weird place where a <strong>unittest</strong> <code>setUp()</code>
method is indecipherable, you know just how useful this can be.</p>
<h2 id="scoping-fixtures">Scoping Fixtures</h2>
<p>What if I want a fixture that shares it's scope across several test
functions?</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># test_fixtures_with_scope.py</span>
<span class="kn">from</span> <span class="nn">pytest</span> <span class="kn">import</span> <span class="n">fixture</span>

<span class="nd">@fixture</span><span class="p">(</span><span class="n">scope</span><span class="o">=</span><span class="s2">"module"</span><span class="p">)</span>  <span class="c1"># Registering fixture with module-level scope</span>
<span class="k">def</span> <span class="nf">scope_data</span><span class="p">():</span>
    <span class="k">return</span> <span class="p">{</span><span class="s2">"count"</span><span class="p">:</span> <span class="mi">0</span><span class="p">}</span>

<span class="k">def</span> <span class="nf">test_first</span><span class="p">(</span><span class="n">scope_data</span><span class="p">):</span>
    <span class="k">assert</span> <span class="n">scope_data</span><span class="p">[</span><span class="s2">"count"</span><span class="p">]</span> <span class="o">==</span> <span class="mi">0</span>
    <span class="n">scope_data</span><span class="p">[</span><span class="s2">"count"</span><span class="p">]</span> <span class="o">+=</span> <span class="mi">1</span>

<span class="k">def</span> <span class="nf">test_second</span><span class="p">(</span><span class="n">scope_data</span><span class="p">):</span>
    <span class="k">assert</span> <span class="n">scope_data</span><span class="p">[</span><span class="s2">"count"</span><span class="p">]</span> <span class="o">==</span> <span class="mi">1</span>
</code></pre></div>
<h2 id="executing-teardown-code">Executing Teardown Code</h2>
<p>I can tear down data structures in them. This is useful for any sort of
data binding, including file management.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># test_fixtures_with_teardown.py</span>
<span class="kn">from</span> <span class="nn">pytest</span> <span class="kn">import</span> <span class="n">fixture</span>

<span class="nd">@fixture</span>
<span class="k">def</span> <span class="nf">file_data</span><span class="p">(</span><span class="n">request</span><span class="p">):</span> <span class="c1"># The fixture MUST have a 'request' argument</span>
    <span class="n">text</span> <span class="o">=</span> <span class="nb">open</span><span class="p">(</span><span class="s2">"data.txt"</span><span class="p">,</span> <span class="s2">"w"</span><span class="p">)</span>

    <span class="nd">@request.addfinalizer</span>
    <span class="k">def</span> <span class="nf">teardown</span><span class="p">():</span>
        <span class="n">text</span><span class="o">.</span><span class="n">close</span><span class="p">()</span>
    <span class="k">return</span> <span class="n">text</span>

<span class="k">def</span> <span class="nf">test_data_type</span><span class="p">(</span><span class="n">file_data</span><span class="p">):</span>
    <span class="k">assert</span> <span class="nb">isinstance</span><span class="p">(</span><span class="n">file_data</span><span class="p">,</span> <span class="nb">file</span><span class="p">)</span>
</code></pre></div>
<p>What's really nice about this teardown feature is that when combined
with the fixture decorator's <code>scope</code> argument, I can exactly control
when fixtures are taken down. This is an amazing piece of control. While
I can and have duplicated this behavior using <strong>unittest</strong>, with
<strong>pytest</strong> I can do it with more obvious code.</p>
<h2 id="more-pytext-fixture-features">More <strong>pytext</strong> Fixture Features</h2>
<p>Want to know more things you can do with <strong>pytest</strong> fixtures? Please
read the <a href="http://pytest.org/latest/fixture.html" target="_blank">pytest fixtures
documentation</a></p>
<h1 id="more-to-come">More to Come</h1>
<p>In my <a href="https://pydanny.com/pytest-no-boilerplate-testing-3.html" target="_blank">next blog
post</a> I
describe usage of the following <strong>pytest</strong> features:</p>
<ul>
<li>Changing behavior of <strong>pytest</strong> with <code>pytest.ini</code> and plug-ins.</li>
<li>Integration with <strong>Django</strong> and other frameworks.</li>
<li>Integration with <code>setup.py</code></li>
</ul>
<p>Published: 2014-01-16 12:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/django.html">django</a>
<a href="/tag/testing.html">testing</a>
<a href="/tag/ppoftw.html">ppoftw</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>