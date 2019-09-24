---
date: 2014-01-17
tag:
  - python
  - django
  - testing
  - ppoftw

author: Daniel Roy Greenfeld
location: California
title: "pytest: no-boilerplate testing (part 3)"
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/pytest-no-boilerplate-testing-3 "
        >pytest: no-boilerplate testing (part 3)</a
      >
    </div>
  </h1>
  <p>
    In my previous
    <a
      href="https://pydanny.com/pytest-no-boilerplate-testing-2 "
      target="_blank"
      >blog post</a
    >
    I covered writing exception-based assertions and fixtures. Today I'm going
    to close things out by demonstrating how to change the behavior of
    <a href="http://pytest.org/" target="_blank">pytest</a> and how to integrate
    it with <strong>Django</strong> and <code>setup.py</code>.
  </p>
  <h1 id="changing-the-behavior-of-pytest">
    Changing the Behavior of <strong>pytest</strong>
  </h1>
  <p>
    When <strong>pytest</strong> is called, either via the command-line or by
    <code>pytest.main()</code>, it
    <a
      href="http://pytest.org/latest/customize #how-test-configuration-is-read-from-configuration-ini-files"
      target="_blank"
      >looks for a configuration file</a
    >
    called either <code>pytest.ini</code>, <code>tox.ini</code>, and
    <code>setup.cfg</code>. If it finds a configuration file, it follows
    standard practices for those things. In the following example, I
    demonstrating searching for tests inside of all Python files while ignoring
    the <code>**_build**</code> directories:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># pytest.ini (or tox.ini or setup.cfg)</span>
<span class="na">[pytest] # You must put pytest-related controls in a 'pytest' block</span>
<span class="na">python_files</span><span class="o">=</span><span class="s">*.py  # Run tests against all python modules</span>
<span class="na">norecursedirs</span> <span class="o">=</span> <span class="s">_build # Don't look inside of _build directories</span>
</code></pre>
  </div>
  <h2 id="changing-pytest-behavior-dynamically">
    Changing <strong>pytest</strong> Behavior Dynamically
  </h2>
  <p>
    This is pretty nice, but if I need to ignore certain Python modules like
    <code>setup.py</code>? I can do this by creating a
    <code>conftest.py</code> module and defining a
    <code>collect_ignore</code> variable.
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># conftest.py</span>
<span class="n">collect_ignore</span> <span class="o">=</span> <span class="p">[</span><span class="s2">"setup.py"</span><span class="p">,</span> <span class="s2">"conftest.py"</span><span class="p">]</span>
</code></pre>
  </div>
  <p>
    The <code>conftest.py</code> module can actually be defined per directory.
    So if test behavior needs to change in different packages, just create
    additional <code>conftest.py</code> modules. It's simple to do, but really
    powerful.
  </p>
  <p>
    The <code>conftest</code> module is capable of a lot of other things. Right
    now there doesn't seem to be a page that documents it in full, so I'm
    considering submitting a documentation pull request. In the meantime, I live
    off the <code>conftest.py</code>
    <a
      href="http://pytest.org/latest/search ?q=conftest&amp;check_keywords=yes&amp;area=default"
      target="_blank"
      >search results</a
    >.
  </p>
  <h2 id="pytest-is-plug-in-driven">
    <strong>pytest</strong> is Plug-In Driven
  </h2>
  <p>
    One feature I really like about <strong>pytest</strong> is that much of it's
    default capabilities are driven by about 20 plug-ins. It's a sign of
    maturity that not only does it have plug-ins, but that most of the time this
    feature is transparent. You can add new plug-ins to your project in a
    <a
      href="http://pytest.org/latest/plugins #plugin-discovery-order-at-tool-startup"
      target="_blank"
      >number of ways</a
    >, including <code>pip</code> installation from
    <a href="https://pypi.python.org/pypi/" target="_blank">PyPI</a>. For
    locally defined plug-ins I prefer to rely on explicit
    <code>conftest.py</code> declarations:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># conftest.py</span>
<span class="n">collect_ignore</span> <span class="o">=</span> <span class="p">[</span><span class="s2">"setup.py"</span><span class="p">,</span> <span class="s2">"conftest.py"</span><span class="p">]</span>
<span class="n">pytest_plugins</span> <span class="o">=</span> <span class="p">[</span><span class="s2">"dream_plugin"</span><span class="p">,</span> <span class="s2">"dream.utils.testplugin"</span><span class="p">]</span>
</code></pre>
  </div>
  <p>
    There are a lot of
    <a
      href="https://pypi.python.org/pypi?%3Aaction=search&amp;term=pytest-&amp;submit=search"
      target="_blank"
      >third-party pytest plug-ins</a
    >, which brings me to the next major section: Integration with other tools
    and frameworks.
  </p>
  <h1 id="django-integration-is-just-a-plug-in-away">
    Django Integration is Just a Plug-In Away
  </h1>
  <p>
    If you want to use <strong>pytest</strong> instead of
    <strong>Django</strong>'s test runner and also get the power of
    function-based tests, fixture functions, improved test discover, and all the
    stuff I haven't covered, then check out and/or <code>pip</code> install
    <a href="https://pypi.python.org/pypi/pytest-django" target="_blank"
      >pytest-django</a
    >. My <em>admittedly brief</em> usage on some of my existing projects has
    demonstrating that my existing <strong>unittest</strong>-style tests work.
  </p>
  <p>
    That previous tests still function means that as with a pure Python project,
    I can rely on existing <strong>unittests</strong> and write all my new tests
    as functions. I guess I could say that my existing Django projects just got
    much easier to maintain.
  </p>
  <p>
    A good example of using <strong>pytest</strong> with
    <strong>Django</strong> can be found in
    <a
      href="https://github.com/brack3t/django-braces/blob/master/tox.ini"
      target="_blank"
      >django-braces' tox.ini file</a
    >.
  </p>
  <h2 id="twisted-and-more-integration-is-just-a-plug-in-away">
    Twisted (and more) Integration is Just a Plug-In Away
  </h2>
  <p>
    The same goes for
    <a href="http://twistedmatrix.com/" target="_blank">Twisted</a> thanks to
    <a href="https://pypi.python.org/pypi/pytest-twisted" target="_blank"
      >pytest-twisted</a
    >. There is also a
    <a href="http://www.pylonsproject.org/" target="_blank">Pyramid</a> plug-in
    that was just
    <a href="https://pypi.python.org/pypi/pytest_pyramid" target="_blank"
      >released</a
    >. I'm not sure if
    <a href="http://flask.pocoo.org/" target="_blank">Flask</a> needs it, but I
    guess there will be <strong>Flask</strong> plug-in soon.
  </p>
  <h1 id="integration-with-setuppy">Integration With <code>setup.py</code></h1>
  <p>
    Fortunately, the documentation for <strong>pytest</strong> covers both
    adding a new
    <a
      href="http://pytest.org/latest/goodpractises #integrating-with-distutils-python-setup-py-test"
      target="_blank"
      >setup.py command-classes for pytest</a
    >
    and
    <a
      href="http://pytest.org/latest/goodpractises #integration-with-setuptools-test-commands"
      target="_blank"
      >actual integration</a
    >. That's handy, but what I've found even more useful is the
    <a
      href="https://github.com/jeffknupp/sandman/blob/develop/setup.py"
      target="_blank"
      >setup.py that Jeff Knupp wrote for his Sandman project</a
    >.
  </p>
  <p>
    <strong>Note:</strong> If you aren't experienced with writing Python
    packages and readying them for <strong>PyPI</strong>, I recommend you read
    <a
      href="http://www.jeffknupp.com/blog/2013/08/16/open-sourcing-a-python-project-the-right-way/"
      target="_blank"
      >Jeff Knupp's blog post on open sourcing projects</a
    >. Amongst other things, it has an in-depth discussion about integration of
    <strong>pytest</strong> with <code>setup.py</code>. Anything I would write
    on the subject of <code>setup.py</code> integration would be just a cheap
    knock-off of Jeff's excellent work.
  </p>
  <h1 id="summary">Summary</h1>
  <p>
    Tests are an important part of any project. While they increase the
    stability of a project, that unfortunately can come at the cost of the
    boredom of writing tests. Fortunately, <strong>pytest</strong> goes a long
    way to alleviating that boredom while also empowering Python code authors
    with lots of additional useful tools. I'm delighted to have finally
    discovered <strong>pytest</strong>. In the short time I've used
    <strong>pytest</strong>, it's saved me days, if not weeks, of tedious work.
  </p>
  </div>
