---
date: 2014-01-15
tag:
  - python
  - django
  - testing
  - ppoftw

author: Daniel Roy Greenfeld
location: California
title: "pytest: no-boilerplate testing"
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/pytest-no-boilerplate-testing "
        >pytest: no-boilerplate testing</a
      >
    </div>
  </h1>
  <p>
    When I first encountered Holger Krekel's
    <a href="http://pytest.org/" target="_blank">pytest</a> this summer on
    <a
      href="http://www.jeffknupp.com/blog/2013/08/16/open-sourcing-a-python-project-the-right-way/"
      target="_blank"
      >Jeff Knupp's blog</a
    >
    I felt like I had been living under a rock for years. I've been using
    Python's
    <a href="http://docs.python.org/2/library/unittest " target="_blank"
      >unittest</a
    >
    framework since 2006 and
    <a href="https://pypi.python.org/pypi/nose" target="_blank">nose</a> to find
    tests since 2008, but here was another test framework that actually predates
    <strong>nose</strong>! <strong>pytest</strong> is a very mature testing tool
    for testing Python. My favorite features:
  </p>
  <ul>
    <li>
      It can run <strong>unittest</strong>, <strong>doctest</strong>, and
      <strong>nose</strong>, style tests suites, making it ideal for new and
      legacy projects.
    </li>
    <li>
      It includes an intuitively named <code>raises</code>
      <strong>context manager</strong> for testing exceptions.
    </li>
    <li>
      You can define fixture arguments to generate baseline data. This is very,
      very different from Django-style fixtures.
    </li>
    <li>Via <code>pytest.ini</code> you can change the behavior of pytest.</li>
    <li>Integrates nicely with <code>setup.py</code>.</li>
  </ul>
  <p>Alright, lets dive into usage.</p>
  <h1 id="test-discovery">Test Discovery</h1>
  <p>
    The first thing that <strong>pytest</strong> provides is test discovery.
    Like <strong>nose</strong>, starting from the directory where it is run, it
    will find any Python module prefixed with <code>test_</code> and will
    attempt to run any defined <strong>unittest</strong> or function prefixed
    with <code>test_</code>. <strong>pytest</strong> explores properly defined
    Python packages, searching recursively through directories that include
    <code>__init__.py</code> modules. Since an image is probably easier to read,
    here's a sample directory structure annotated with which files are checked
    for tests:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code>address/
    __init__.py
    envelope.py 
    geo.py 
    test_envelope.py <span class="c1"># checked for tests</span>
    test_geo.py <span class="c1"># checked for tests</span>
records/
    <span class="c1"># pytest WON'T look here because it lacks __init__.py</span>
    records.csv
    records.py
    test_records.py <span class="c1"># skipped because records/ lacks __init__.py</span>
__init__.py
main.py
test_main.py  <span class="c1"># checked for tests</span>
</code></pre>
  </div>
  <p>
    Now that I've explained which files are checked for tests, here is how
    <strong>pytest</strong> determines what in each Python module is run as a
    test.
  </p>
  <ol>
    <li>
      <strong>pytest</strong> <em>just runs</em> <strong>doctests</strong> and
      <strong>unittests</strong>.
    </li>
    <li>
      <strong>pytest</strong> runs any function prefixed with
      <code>test_</code> as a test.
    </li>
    <li>
      <strong>pytest</strong> does
      <a
        href="http://pytest.org/latest/nose #unsupported-idioms-known-issues"
        target="_blank"
        >its best</a
      >
      to run tests written for <strong>nose</strong>.
    </li>
  </ol>
  <p>
    Yes, <strong>pytest</strong> behaves similarly to <strong>nose</strong> in
    test discovery. Next is another feature that it shares with
    <strong>nose</strong> that I really enjoy.
  </p>
  <h1 id="writing-tests-as-functions">Writing Tests as Functions</h1>
  <p>
    Python's <strong>unittest</strong> framework works, but it's always felt
    like too much boilerplate. I admit I like to write tests, but working with
    the <strong>unittest</strong> framework always dimmed that fun. I suppose
    this is why the assert keyword is useful, because it changes this:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">import</span> <span class="nn">unittest</span>

<span class="k">class</span> <span class="nc">TestMyStuff</span><span class="p">(</span><span class="n">unittest</span><span class="o">.</span><span class="n">TestCase</span><span class="p">):</span>

    <span class="k">def</span> <span class="nf">test_the_obvious</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">assertEqual</span><span class="p">(</span><span class="bp">True</span><span class="p">,</span> <span class="bp">True</span><span class="p">)</span>

<span class="k">if</span> <span class="vm">**name**</span> <span class="o">==</span> <span class="s1">'**main**'</span><span class="p">:</span>
<span class="n">unittest</span><span class="o">.</span><span class="n">main</span><span class="p">()</span>
</code></pre>
  </div>

  <p>to this:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="k">assert</span> <span class="bp">True</span> <span class="o">==</span> <span class="bp">True</span>
</code></pre>
  </div>
  <p>
    The former is nine lines of code (seven if you are using
    <strong>pytest</strong> to find this test) to do what the assert statement
    does in one. However, the nine lines of <strong>unittest</strong> code has a
    couple major advantages:
  </p>
  <ol>
    <li>Not automatically run when stumbled on by the Python interpreter.</li>
    <li>
      Produces a more illuminating response than an uninformative
      AssertionError.
    </li>
  </ol>
  <p>
    Fortunately, tools like <strong>pytest</strong> (and <strong>nose</strong>)
    provide the ability to write tests as functions. This means we can combine
    the advantages of both <code>unittest</code> and <code>assert</code> thus:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="k">def</span> <span class="nf">test_the_obvious</span><span class="p">():</span>
    <span class="k">assert</span> <span class="bp">True</span> <span class="o">==</span> <span class="bp">True</span>
</code></pre>
  </div>
  <p>
    Now we are down to just two lines of code! That could be increased to five
    if we called <strong>pytest</strong> the same as we did in the
    <strong>unittest</strong> example:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">import</span> <span class="nn">pytest</span>

<span class="k">def</span> <span class="nf">test_the_obvious</span><span class="p">():</span>
<span class="k">assert</span> <span class="bp">True</span> <span class="o">==</span> <span class="bp">True</span>

<span class="k">if</span> <span class="vm">**name**</span> <span class="o">==</span> <span class="s1">'**main**'</span><span class="p">:</span>
<span class="n">pytest</span><span class="o">.</span><span class="n">main</span><span class="p">()</span>
</code></pre>
  </div>

  <p>
    The next part is wonderful. If an <code>assert</code> statement fails, then
    <strong>pytest</strong> provides a very informative response. Let's check it
    out by running the following code:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">import</span> <span class="nn">pytest</span>

<span class="k">def</span> <span class="nf">test_gonna_fail</span><span class="p">():</span>
<span class="k">assert</span> <span class="bp">True</span> <span class="o">==</span> <span class="bp">False</span> <span class="c1"># Going to fail here on line 4</span>

<span class="k">if</span> <span class="vm">**name**</span> <span class="o">==</span> <span class="s1">'**main**'</span><span class="p">:</span>
<span class="n">pytest</span><span class="o">.</span><span class="n">main</span><span class="p">()</span>
</code></pre>
  </div>

  <p>When I run this code, I get the following response:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">====================</span> <span class="nv">FAILURES</span> <span class="o">=====================</span>
----------------- test_gonna_fail -----------------

    def test_gonna_fail<span class="o">()</span>:

&gt; assert <span class="nv">True</span> <span class="o">==</span> False
E assert <span class="nv">True</span> <span class="o">==</span> False

samples.py:4: <span class="nv">AssertionError</span>
<span class="o">========</span> <span class="m">1</span> failed, <span class="m">0</span> passed in <span class="m">0</span>.1 <span class="nv">seconds</span> <span class="o">========</span>
</code></pre>
  </div>

  <p>
    As you can see, pytest identified where the <code>assert</code> statement
    failed on line 4 and displays exactly caused the failure (<code>True</code>
    did not equal <code>False</code>). Very nice indeed.
  </p>
  <h1 id="whats-next">What's Next?</h1>
  <p>
    In my next
    <a
      href="https://pydanny.com/pytest-no-boilerplate-testing-2 "
      target="_blank"
      >blog post</a
    >
    I describe the following features of writing tests with
    <strong>pytest</strong>.
  </p>
  <ul>
    <li>The <code>raises</code> <strong>context manager</strong></li>
    <li>Fixtures</li>
    <li>Fixture Teardown</li>
  </ul>
  </div>
