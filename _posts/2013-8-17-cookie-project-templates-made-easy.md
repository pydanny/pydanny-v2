---
date: 2013-8-17
tag:
  - python
  - django
  - rant
  - flask
  - pypi
  - pypy
  - python3
  - javascript
  - audrey
  - cookiecutter

author: Daniel Roy Greenfeld
location: California
title: "Cookiecutter: Project Templates Made Easy"
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/cookie-project-templates-made-easy.html"
        >Cookiecutter: Project Templates Made Easy</a
      >
    </div>
  </h1>
  <p>
    Yesterday, Jeff Knupp wrote an amazing how-to article called "<a
      href="http://www.jeffknupp.com/blog/2013/08/16/open-sourcing-a-python-project-the-right-way/"
      target="_blank"
      >Open Sourcing a Python Project the Right Way</a
    >". While I was reading it, I was rather pleased by just how close it is to
    my own practices. Considering Jeff's amazing
    <a
      href="http://www.amazon.com/gp/product/B00B5KG0F8/ref=as_li_ss_tl?ie=UTF8&amp;camp=1789&amp;creative=390957&amp;creativeASIN=B00B5KG0F8&amp;linkCode=as2&amp;tag=mlinar-20"
      target="_blank"
      >Writing</a
    >
    <a
      href="http://www.amazon.com/gp/product/B00B5VXMRG/ref=as_li_ss_tl?ie=UTF8&amp;camp=1789&amp;creative=390957&amp;creativeASIN=B00B5VXMRG&amp;linkCode=as2&amp;tag=mlinar-20"
      target="_blank"
      >Idiomatic</a
    >
    <a
      href="http://www.jeffknupp.com/writing-idiomatic-python-ebook/"
      target="_blank"
      >Python</a
    >, it meant I was on the right track.
  </p>
  <p>
    The downside, of course, is implementation. Creating reusable Python
    packages has always been annoying. There are no defined/maintained best
    practices (especially for <code>setup.py</code>), so you end up cutting and
    pasting hacky, poorly understood, often legacy code from one project to the
    other. Some of it does nothing and some of it fails catastrophically on
    Python 3. There's a term for this sort of behavior, and it's called
    <a
      href="http://en.wikipedia.org/wiki/Cargo_cult_programming"
      target="_blank"
      >Cargo Cult programming</a
    >.
  </p>
  <p>
    Fortunately, while I was
    <a
      href="https://pydanny.com/made-up-statistics.html#debate-statistics"
      target="_blank"
      >ranting</a
    >
    and
    <a
      href="http://www.jeffknupp.com/blog/2013/08/16/open-sourcing-a-python-project-the-right-way/"
      target="_blank"
      >Jeff</a
    >
    (and
    <a
      href="http://hynek.me/articles/sharing-your-labor-of-love-pypi-quick-and-dirty/"
      target="_blank"
      >Hynek Schlawack</a
    >) was writing, someone was making
    <a href="https://github.com/audreyr/cookiecutter" target="_blank"
      >cookiecutter</a
    >.
  </p>
  <h1 id="cookiecutter-does-one-thing-and-it-does-it-well">
    cookiecutter does one thing and it does it well
  </h1>
  <p>
    What
    <a href="https://github.com/audreyr/cookiecutter" target="_blank"
      >cookiecutter</a
    >
    does is make creating and maintaining project templates easy and intuitive.
    This allow developers of all languages (not just Python) the ability to
    break free from cargo-cult configuration and follow patterns dictated by the
    experts who present their own cookiecutter templates. So if you don't like
    how the author of cookiecutter's creates her projects, you can use someone
    else's or roll your own.
  </p>
  <p>
    Okay, enough talk, let's use cookiecutter to build a Python project.
    Assuming you have
    <a href="http://www.virtualenv.org/" target="_blank">virtualenv</a>
    installed:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code>$ pip install cookiecutter
</code></pre>
  </div>
  <p>
    <strong>note</strong>: In the works is a
    <a href="https://github.com/mxcl/homebrew" target="_blank">Homebrew</a>
    package, and possibly packages for the various Linux distributions as well.
  </p>
  <p>
    Done? Okay, now use cookiecutter to create your Python project. For this
    example, I'm going to create a sample project called "<em>cheese</em>".:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code>$ cookiecutter https://github.com/audreyr/cookiecutter-pypackage.git
Cloning into <span class="s1">'cookiecutter-pypackage'</span>...
remote: Counting objects: <span class="m">183</span>, <span class="k">done</span>.
remote: Compressing objects: <span class="m">100</span>% <span class="o">(</span><span class="m">100</span>/100<span class="o">)</span>, <span class="k">done</span>.
remote: Total <span class="m">183</span> <span class="o">(</span>delta <span class="m">87</span><span class="o">)</span>, reused <span class="m">161</span> <span class="o">(</span>delta <span class="m">70</span><span class="o">)</span>
Receiving objects: <span class="m">100</span>% <span class="o">(</span><span class="m">183</span>/183<span class="o">)</span>, <span class="m">29</span>.36 KiB <span class="p">|</span> <span class="m">0</span> bytes/s, <span class="k">done</span>.
Resolving deltas: <span class="m">100</span>% <span class="o">(</span><span class="m">87</span>/87<span class="o">)</span>, <span class="k">done</span>.
Checking connectivity... <span class="k">done</span>
full_name <span class="o">(</span>default is <span class="s2">"Audrey Roy"</span><span class="o">)</span>? Daniel Greenfeld
project_name <span class="o">(</span>default is <span class="s2">"your project"</span><span class="o">)</span>? cheese
... snip <span class="k">for</span> brevity
</code></pre>
  </div>
  <p>
    See how it asks my full name? Well, at this point,
    <a href="https://github.com/audreyr/cookiecutter" target="_blank"
      >cookiecutter</a
    >
    begins to ask a number of questions. These questions are actually specified
    in the
    <a
      href="https://github.com/audreyr/cookiecutter-pypackage/blob/master/cookiecutter.json"
      target="_blank"
      >cookiecutter.json</a
    >
    file for
    <a href="https://github.com/audreyr/cookiecutter-pypackage" target="_blank"
      >cookiecutter-pypackage</a
    >.
  </p>
  <p>
    Once you've answered everything that
    <a href="https://github.com/audreyr/cookiecutter-pypackage" target="_blank"
      >cookiecutter-pypackage</a
    >
    wants, it generates your project. Let's go and check:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code>$ tree cheese
cheese/
├── AUTHORS.rst
├── CONTRIBUTING.rst
├── HISTORY.rst
├── LICENSE
├── MANIFEST.in
├── README.rst
├── docs
│   ├── Makefile
│   ├── authors.rst
│   ├── conf.py
│   ├── contributing.rst
│   ├── history.rst
│   ├── index.rst
│   ├── installation.rst
│   ├── make.bat
│   ├── readme.rst
│   └── usage.rst
├── requirements.txt
├── setup.py
├── simplicity
│   ├── __init__.py
│   └── simplicity.py
├── tests
│   ├── __init__.py
│   └── test_simplicity.py
└── tox.ini
</code></pre>
  </div>
  <p>
    While there are <em>some</em> differences from Jeff Knupp's example in his
    <a
      href="http://www.jeffknupp.com/blog/2013/08/16/open-sourcing-a-python-project-the-right-way/"
      target="_blank"
      >article</a
    >
    (ReStructuredText vs Markdown, location of tests, etc), I would argue that
    the general vision is the same. Better yet, if Jeff (or someone) wants to
    implement Jeff's pattern, they can.
  </p>
  <p>In fact...</p>
  <h1 id="creating-cookiecutter-templates-is-easy-and-intuitive">
    Creating cookiecutter templates is easy and intuitive
  </h1>
  <p>All you have to do is:</p>
  <ol>
    <li>
      <strong>Fork</strong>
      <a
        href="https://github.com/audreyr/cookiecutter-pypackage"
        target="_blank"
        >cookiecutter-pypackage</a
      >
      <strong>and rename it</strong>.
    </li>
    <li>
      <strong>Make the changes you desire.</strong> You can change anything you
      want, the setup.py, the test handling, or perhaps add or remove from the
      questions specified in
      <a
        href="https://github.com/audreyr/cookiecutter-pypackage/blob/master/cookiecutter.json"
        target="_blank"
        >cookiecutter.json</a
      >. Right now <strong>repo_name</strong> is a mandatory
      <a
        href="https://github.com/audreyr/cookiecutter-pypackage/blob/master/cookiecutter.json"
        target="_blank"
        >cookiecutter.json</a
      >
      field, but there is an issue submitted to have that changed.
    </li>
    <li>
      <strong>Remember that renders everything in</strong>
      <a href="http://jinja.pocoo.org/" target="_blank">Jinja2</a>. Questions
      asked by
      <a
        href="https://github.com/audreyr/cookiecutter-pypackage/blob/master/cookiecutter.json"
        target="_blank"
        >cookiecutter.json</a
      >
      are rendered to the project's files (be those files in Python, Javascript,
      HTML, etc). So if you add a field to
      <a
        href="https://github.com/audreyr/cookiecutter-pypackage/blob/master/cookiecutter.json"
        target="_blank"
        >cookiecutter.json</a
      >, all you have to do to see it in a templates is write:
    </li>
  </ol>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="x"># Place in Python, HTML. Javascript, CSS, Markdown, or any other plaintext format.</span>
<span class="cp">{{</span><span class="nv">cookiecutter.my_new_field</span><span class="cp">}}</span><span class="x"></span>
</code></pre>
  </div>
  <ol>
    <li>
      <strong>Submit a pull request to</strong>
      <a href="https://github.com/audreyr/cookiecutter" target="_blank"
        >cookiecutter</a
      >
      asking for their project to be listed on the README.
    </li>
  </ol>
  <p>
    It's not hard. In fact, there is already a growing ecosystem of
    <a
      href="https://github.com/audreyr/cookiecutter#available-templates"
      target="_blank"
      >cookiecutter templates</a
    >, including Python,
    <a href="https://github.com/sloria/cookiecutter-flask" target="_blank"
      >Flask</a
    >,
    <a
      href="https://www.djangopackages.com/grids/g/cookiecutter/"
      target="_blank"
      >Django</a
    >
    and
    <a href="https://github.com/audreyr/cookiecutter-jquery" target="_blank"
      >JQuery</a
    >
    templates.
  </p>
  <p>
    <strong>Note</strong>: There is already a
    <a href="https://github.com/Nekroze/cookiecutter-pypackage" target="_blank"
      >fork</a
    >
    of cookiecutter-pypackage that even more closely matches Jeff Knupp's
    design.
  </p>
  <h1 id="additional-cookiecutter-features">
    Additional cookiecutter features
  </h1>
  <p>Here are more things to like about cookiecutter:</p>
  <h2 id="cookiecutter-is-focused">cookiecutter is focused</h2>
  <p>
    It doesn't handle deployment, serving of HTTP, testing, or anything else.
    All it does is project templates. It follows those classic words, "<em
      >It's programmed to do one thing and do it well</em
    >".
  </p>
  <h2 id="supports-all-modern-versions-of-python">
    Supports all modern versions of Python
  </h2>
  <ul>
    <li>Python 2.6</li>
    <li>Python 2.7</li>
    <li>Python 3.3</li>
    <li>Even PyPy!</li>
  </ul>
  <h2 id="cookiecutter-is-modular">cookiecutter is modular</h2>
  <p>
    It's not built off a single giant function, or a complex architecture.
    Instead, it's comprised of a number of relatively simple functions. Why?
    Well this way you can import easily elements of cookiecutter into other
    projects, and it plays into the next feature:
  </p>
  <h2 id="cookiecutter-is-tested">cookiecutter is tested</h2>
  <p>
    The project has as of August 20th 2013,
    <a
      href="https://coveralls.io/r/audreyr/cookiecutter?branch=master"
      target="_blank"
      >98% test coverage</a
    >, with an intention to increase it to 100%. This makes handling the
    following things much easier/safer:
  </p>
  <ol>
    <li>Implementing new features without breaking existing ones.</li>
    <li>Handling new versions of Python as they emerge.</li>
  </ol>
  <h2 id="cookiecutter-isnt-just-for-python-packages">
    cookiecutter isn't just for Python packages
  </h2>
  <p>
    That's correct. While at the moment there is only
    <a href="https://github.com/audreyr/cookiecutter-jquery" target="_blank"
      >cookiecutter-jquery</a
    >, there is nothing to stop developers from using
    <a href="https://github.com/audreyr/cookiecutter" target="_blank"
      >cookiecutter</a
    >
    to create templates for anything. The way it renders output is designed to
    accommodate customizations for any tool.
  </p>
  <p>Which brings me to my next point...</p>
  <h2 id="cookiecutter-isnt-just-for-python-developers">
    cookiecutter isn't just for Python developers
  </h2>
  <p>
    Even if you don't know Python you can use
    <a href="https://github.com/audreyr/cookiecutter" target="_blank"
      >cookiecutter</a
    >. The templating is done via
    <a href="http://jinja.pocoo.org/" target="_blank">Jinja2</a>, which isn't
    far off from other template languages like Mustache, Handlebars, or Liquid.
    if you are worried about collisions between templating systems, just use
    Jinja2's <code>{% raw %}</code> template tag:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c">{# Jinja2's raw template to escape the Liquid template inside #}</span><span class="x"></span>
<span class="cp">{%</span> <span class="k">raw</span> <span class="cp">%}</span> {# Liquid template from here on #}
&lt;ul id="products"&gt;
{% for product in products %}
&lt;li&gt;
  &lt;h2&gt;{{ product.title }}&lt;/h2&gt;
  Only {{ product.price | format_as_money }}

&lt;p&gt;{{ product.description | prettyprint | truncate: 200  }}&lt;/p&gt;

&lt;/li&gt;
{% endfor %}
&lt;/ul&gt;
<span class="cp">{%</span> <span class="k">endraw</span> <span class="cp">%}</span><span class="x"></span>
</code></pre>
  </div>

  <p>
    <a href="https://github.com/audreyr/cookiecutter" target="_blank"
      ><img
        alt="image"
        src="https://raw.github.com/audreyr/cookiecutter/aa309b73bdc974788ba265d843a65bb94c2e608e/cookiecutter_medium.png"
    /></a>
  </p>
  <ul>
    <li>
      <strong>Update 09/20/2013</strong>: Test coverage increased to 98% from
      91%.
    </li>
  </ul>
  <p>Published: 2013-8-17 12:00</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/django.html">django</a>
    <a href="/tag/rant.html">rant</a>
    <a href="/tag/flask.html">flask</a>
    <a href="/tag/pypi.html">pypi</a>
    <a href="/tag/pypy.html">pypy</a>
    <a href="/tag/python3.html">python3</a>
    <a href="/tag/javascript.html">javascript</a>
    <a href="/tag/audrey.html">audrey</a>
    <a href="/tag/cookiecutter.html">cookiecutter</a>
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
