---
date: 2013-4-23
tag:
  - django
  - python
  - howto

author: Daniel Roy Greenfeld
location: California
title: Filepicker.io and South
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/filepicker-and-south ">Filepicker.io and South</a>
    </div>
  </h1>
  <p>
    I've heard good things about filepicker.io, which is a service that makes
    file uploading a much better experience. Unfortunately, the Django package
    for filepicker.io doesn't work with South. When I try to create a migration
    using the filepicker.io field using code like the following...
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># products/models.py</span>
<span class="kn">from</span> <span class="nn">django.db</span> <span class="kn">import</span> <span class="n">models</span>
<span class="kn">from</span> <span class="nn">django_filepicker.models</span> <span class="kn">import</span> <span class="n">FPFileField</span>

<span class="k">class</span> <span class="nc">Product</span><span class="p">(</span><span class="n">models</span><span class="o">.</span><span class="n">Model</span><span class="p">):</span>
<span class="n">title</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mi">255</span><span class="p">)</span>
<span class="nb">file</span> <span class="o">=</span> <span class="n">FPFileField</span><span class="p">(</span><span class="n">upload_to</span><span class="o">=</span><span class="s1">'uploads'</span><span class="p">)</span>
</code></pre>
  </div>
  <p>...when I try to run the command:</p>
  <pre><code>(tsd)$ python manage.py schemamigration products --initial
</code></pre>
  <p>It results in this unpleasant looking response:</p>
  <pre><code>(tsd)$ python manage.py schemamigration products --initial
Creating migrations directory at '/Users/danielgreenfeld/code/tsp/tsp/products/migrations'...
Creating __init__.py in '/Users/danielgreenfeld/code/tsp/tsp/products/migrations'...
 ! Cannot freeze field 'products.product.fpfile'
 ! (this field has class django_filepicker.models.FPFileField)
 ! Cannot freeze field 'products.release.fpfile'
 ! (this field has class django_filepicker.models.FPFileField)

! South cannot introspect some fields; this is probably because they are custom
! fields. If they worked in 0.6 or below, this is because we have removed the
! models parser (it often broke things).
! To fix this, read http://south.aeracode.org/wiki/MyFieldsDontWork
</code></pre>

  <p>
    The last line in the error report is important. I'll repeat it to illustrate
    it more clearly:
  </p>
  <pre><code>! To fix this, read http://south.aeracode.org/wiki/MyFieldsDontWork
</code></pre>
  <p>
    Experience working on other projects has taught me I can simply add two
    lines of code to <code>products/models.py</code> and everything should just
    work:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># South migration rules for the FPFileField field</span>
<span class="kn">from</span> <span class="nn">south.modelsinspector</span> <span class="kn">import</span> <span class="n">add_introspection_rules</span>
<span class="n">add_introspection_rules</span><span class="p">([],</span> <span class="p">[</span><span class="s2">"django_filepicker.models.FPFileField"</span><span class="p">])</span>
</code></pre>
  </div>
  <p>
    In case it's not clear, here's my new <code>products/models.py</code> file:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># products/models.py</span>
<span class="kn">from</span> <span class="nn">django.db</span> <span class="kn">import</span> <span class="n">models</span>
<span class="kn">from</span> <span class="nn">django_filepicker.models</span> <span class="kn">import</span> <span class="n">FPFileField</span>

<span class="c1"># South migration rules for the FPFileField field</span>
<span class="kn">from</span> <span class="nn">south.modelsinspector</span> <span class="kn">import</span> <span class="n">add_introspection_rules</span>
<span class="n">add_introspection_rules</span><span class="p">([],</span> <span class="p">[</span><span class="s2">"django_filepicker.models.FPFileField"</span><span class="p">])</span>

<span class="k">class</span> <span class="nc">Product</span><span class="p">(</span><span class="n">models</span><span class="o">.</span><span class="n">Model</span><span class="p">):</span>
<span class="n">title</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mi">255</span><span class="p">)</span>
<span class="nb">file</span> <span class="o">=</span> <span class="n">FPFileField</span><span class="p">(</span><span class="n">upload_to</span><span class="o">=</span><span class="s1">'uploads'</span><span class="p">)</span>
</code></pre>
  </div>
  <p>Now I can create South migrations and they'll just work.</p>
  <p>
    Unfortunately, the problem is that for any model where I need to use
    filepicker's FPFileField I need to add those two lines of code. I don't like
    this approach, since it violates
    <strong>Don't Repeat Yourself</strong> (DRY).
  </p>
  <p>
    At some point I'll demonstrate how to fix this violation of DRY with an easy
    fix. In fact, I plan submit that fix as a pull request to django-filepicker.
  </p>
  <p>
    <strong>Update 2013/12/24:</strong> django-filepicker has been patched to
    address this issue. This blog post therefore describes a historical version
    of the package.
  </p>
  </div>
