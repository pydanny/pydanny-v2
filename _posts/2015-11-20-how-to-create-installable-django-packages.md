---
date: 2015-11-20
tag:
  - python
  - python3
  - django
  - cheatsheet
  - ppoftw
  - djangopackages

author: Daniel Roy Greenfeld
location: California
title: How To Create Installable, Reusable Django Packages
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/how-to-create-installable-django-packages "
        >How To Create Installable, Reusable Django Packages</a
      >
    </div>
  </h1>
  <p>
    <a
      href="https://www.pydanny.com/how-to-create-installable-django-packages "
      target="_blank"
      ><img
        alt="image"
        src="https://www.pydanny.com/static/django-package-470x246.png"
    /></a>
  </p>
  <p>
    What I mean by an "installable Django package": a reusable component that
    can be shared across Django projects, allowing us to combine our own efforts
    with others. Some examples include:
  </p>
  <ul>
    <li>
      <a
        href="https://www.djangopackages.com/packages/p/django-test-plus/"
        target="_blank"
        >django-test-plus</a
      >
    </li>
    <li>
      <a
        href="https://www.djangopackages.com/packages/p/django-crispy-forms/"
        target="_blank"
        >django-crispy-forms</a
      >
    </li>
    <li>
      <a
        href="https://www.djangopackages.com/packages/p/dj-stripe/"
        target="_blank"
        >dj-stripe</a
      >
    </li>
    <li>
      <a
        href="https://www.djangopackages.com/packages/p/dj-spam/"
        target="_blank"
        >dj-spam</a
      >
    </li>
  </ul>
  <p>
    Ever want to quickly create a similarly installable Django package to submit
    to <a href="pypi.python.org/pypi" target="_blank">PyPI</a> and
    <a href="https://wwww.djangopackages.com" target="_blank">Django Packages</a
    >? One that goes beyond the basics described in the
    <a
      href="https://docs.djangoproject.com/en/1.8/intro/reusable-apps/"
      target="_blank"
      >Django tutorial</a
    >? Specifically, a package that includes:
  </p>
  <ul>
    <li>
      Test runner so you don't need a example/test project (Although those can
      be useful).
    </li>
    <li>
      The important configuration in place: Travis, editorconfig, gitignore,
      etc.
    </li>
    <li>
      The important documentation in place: Readme, License, Read the Docs-ready
      Sphinx docs, etc.
    </li>
    <li>Static files ready to go.</li>
    <li>A base DTL/Jinja2 template ready to go.</li>
    <li>
      All those other fiddly bits not included in
      <code>django-admin.py startapp</code> that are hard to remember.
    </li>
  </ul>
  <p>Well, here's how I do it.</p>
  <h1 id="introducing-cookiecutter-djangopackage">
    Introducing cookiecutter-djangopackage
  </h1>
  <p>
    <a
      href="https://github.com/pydanny/cookiecutter-djangopackage"
      target="_blank"
      >cookiecutter-djangopackage</a
    >
    is a
    <a href="https://github.com/audreyr/cookiecutter" target="_blank"
      >Cookiecutter</a
    >
    template for creating reusable Django packages. Using it is easy:
  </p>
  <p>
    First, get
    <a href="https://github.com/audreyr/cookiecutter" target="_blank"
      >Cookiecutter</a
    >. Trust me, it's awesome:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code>$ pip install cookiecutter
</code></pre>
  </div>
  <p>Now run it against this repo:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code>$ cookiecutter https://github.com/pydanny/cookiecutter-djangopackage.git
</code></pre>
  </div>
  <p>
    You'll be prompted to enter some values. Enter them. Then an installable
    Django package will be built for you.
  </p>
  <p>
    <strong>Warning</strong>: <code>app_name</code> must be a valid Python
    module name or you will have issues on imports.
  </p>
  <p>
    Enter the new package (in my case, I called it 'newpackage') and look
    around. Open up the <code>AUTHORS.rst</code>, <code>setup.py</code>, or
    <code>README.rst</code> files and you'll see your input inserted into the
    appropriate locations.
  </p>
  <p>
    Speaking of the <code>README.rst</code>, that file includes instructions for
    putting the new package on
    <a href="pypi.python.org/pypi" target="_blank">PyPI</a> and
    <a href="https://wwww.djangopackages.com" target="_blank">Django Packages</a
    >.
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code>newpackage
├── .editorconfig
├── .gitignore
├── .travis.yml
├── AUTHORS.rst
├── CONTRIBUTING.rst
├── HISTORY.rst
├── LICENSE
├── MANIFEST.in
├── Makefile
├── README.rst
├── newpackage
│   ├── __init__.py
│   ├── models.py
│   ├── static
│   │   ├── css
│   │   │   └── newpackage.css
│   │   ├── img
│   │   │   └── .gitignore
│   │   └── js
│   │       └── newpackage.js
│   └── templates
│       └── cheese
│           └── base 
├── docs
│   ├── Makefile
│   ├── authors.rst
│   ├── conf.py
│   ├── contributing.rst
│   ├── history.rst
│   ├── index.rst
│   ├── installation.rst
│   ├── make.bat
│   ├── readme.rst
│   └── usage.rst
├── requirements-test.txt
├── requirements.txt
├── requirements_dev.txt
├── runtests.py
├── setup.cfg
├── setup.py
├── tests
│   ├── __init__.py
│   └── test_models.py
└── tox.ini
</code></pre>
  </div>
  <p>
    Now, instead of monkeying around for awhile doing copy/paste package setup,
    I'm immediately ready to write code.
  </p>
  <h1 id="summary">Summary</h1>
  <p>
    <a
      href="https://github.com/pydanny/cookiecutter-djangopackage"
      target="_blank"
      >cookiecutter-djangopackage</a
    >
    does a lot, but even with its tight focus on package creation it could do
    more. Some of the things I would love to see included in the future:
  </p>
  <ul>
    <li>Option for Appveyor CI support</li>
    <li>
      Option to replace <code>django.test</code> with <code>py.test</code>.
    </li>
    <li>Generation of model boilerplate, admin, and CRUD views.</li>
    <li>
      More in the
      <a
        href="https://github.com/pydanny/cookiecutter-djangopackage/issues"
        target="_blank"
        >issue tracker</a
      >.
    </li>
  </ul>
  <p>
    Try it out and let me know what you think. I'm open to new ideas and
    receiving pull requests.
  </p>
  </div>
