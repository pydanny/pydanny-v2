---
date: 2013-3-29
tag:
  - python
  - django
  - forms
  - class-based-views

author: Daniel Roy Greenfeld
location: California
title: Core Concepts of Django Forms
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/core-concepts-django-forms "
        >Core Concepts of Django Forms</a
      >
    </div>
  </h1>
  <p>
    In my opinion, the concepts behind Django's non-model forms can be listed in
    just three (3) bullets:
  </p>
  <ul>
    <li>Forms render HTML.</li>
    <li>Forms are "just" Python constructs.</li>
    <li>Forms validate dictionaries (Python's Key/Value structure).</li>
  </ul>
  <p>Let's dig in!</p>
  <h1 id="forms-render-html">Forms render HTML.</h1>
  <p>If I construct a Django form:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># myapp/forms.py</span>
<span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>

<span class="k">class</span> <span class="nc">MyForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">Form</span><span class="p">):</span>

    <span class="n">title</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>

</code></pre>
  </div>
  <p>
    I can render it in a template, or for better clarity in this post, the
    Python REPL:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">myapp.forms</span> <span class="kn">import</span> <span class="n">MyForm</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">f</span> <span class="o">=</span> <span class="n">MyForm</span><span class="p">()</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">f</span>
<span class="o">&lt;</span><span class="n">__main__</span><span class="o">.</span><span class="n">MyForm</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x1016c6990</span><span class="o">&gt;</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">print</span><span class="p">(</span><span class="n">f</span><span class="p">)</span>
<span class="o">&lt;</span><span class="n">tr</span><span class="o">&gt;&lt;</span><span class="n">th</span><span class="o">&gt;&lt;</span><span class="n">label</span> <span class="k">for</span><span class="o">=</span><span class="s2">"id_title"</span><span class="o">&gt;</span><span class="n">Title</span><span class="p">:</span><span class="o">&lt;/</span><span class="n">label</span><span class="o">&gt;&lt;/</span><span class="n">th</span><span class="o">&gt;</span>
<span class="o">&lt;</span><span class="n">td</span><span class="o">&gt;&lt;</span><span class="nb">input</span> <span class="nb">id</span><span class="o">=</span><span class="s2">"id_title"</span> <span class="n">name</span><span class="o">=</span><span class="s2">"title"</span> <span class="nb">type</span><span class="o">=</span><span class="s2">"text"</span> <span class="o">/&gt;&lt;/</span><span class="n">td</span><span class="o">&gt;&lt;/</span><span class="n">tr</span><span class="o">&gt;</span>
</code></pre>
  </div>
  <p>
    You can even see this done with initial values in the Django docs:
    <a
      href="https://docs.djangoproject.com/en/1.5/ref/forms/api/#django.forms.Form.initial"
      target="_blank"
      >https://docs.djangoproject.com/en/1.5/ref/forms/api/#django.forms.Form.initial</a
    >
  </p>
  <h1 id="forms-are-just-python-constructs">
    Forms are "just" Python constructs.
  </h1>
  <p>
    I believe it was
    <a href="https://twitter.com/alex_gaynor" target="_blank">Alex</a>
    <a href="http://alexgaynor.net/" target="_blank">Gaynor</a> who said back in
    2008 that Django forms were "just" Python constructs. He's right:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">myapp.forms</span> <span class="kn">import</span> <span class="n">MyForm</span>
<span class="o">&gt;&gt;&gt;</span> <span class="c1"># class</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">MyForm</span>
<span class="o">&lt;</span><span class="k">class</span> <span class="err">'</span><span class="nc">myapp</span><span class="o">.</span><span class="n">forms</span><span class="o">.</span><span class="n">MyForm</span><span class="s1">'&gt;</span>
<span class="o">&gt;&gt;&gt;</span> <span class="c1"># object</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">form</span> <span class="o">=</span> <span class="n">MyForm</span><span class="p">()</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">form</span>
<span class="o">&lt;</span><span class="n">myapp</span><span class="o">.</span><span class="n">forms</span><span class="o">.</span><span class="n">MyForm</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x1023f1450</span><span class="o">&gt;</span>
<span class="o">&gt;&gt;&gt;</span> <span class="c1"># iterable</span>
<span class="o">&gt;&gt;&gt;</span> <span class="p">[</span><span class="n">x</span> <span class="k">for</span> <span class="n">x</span> <span class="ow">in</span> <span class="n">form</span><span class="p">]</span>
<span class="p">[</span><span class="o">&lt;</span><span class="n">django</span><span class="o">.</span><span class="n">forms</span><span class="o">.</span><span class="n">forms</span><span class="o">.</span><span class="n">BoundField</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x102495990</span><span class="o">&gt;</span><span class="p">]</span>
<span class="o">&gt;&gt;&gt;</span> <span class="p">[</span><span class="n">x</span> <span class="k">for</span> <span class="n">x</span> <span class="ow">in</span> <span class="n">form</span><span class="o">.</span><span class="n">fields</span><span class="p">]</span>
<span class="p">[</span><span class="s1">'title'</span><span class="p">]</span>
<span class="o">&gt;&gt;&gt;</span> <span class="c1"># dictionary-like</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">form</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s1">'title'</span><span class="p">]</span>
<span class="o">&lt;</span><span class="n">django</span><span class="o">.</span><span class="n">forms</span><span class="o">.</span><span class="n">fields</span><span class="o">.</span><span class="n">CharField</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x1024a17d0</span><span class="o">&gt;</span>
</code></pre>
  </div>
  <p>
    Understanding the structure of Django forms is really useful. This structure
    is what allows the modification mechanism that I described in my
    <a href="https://pydanny.com/overloading-form-fields " target="_blank"
      >previous post</a
    >.
  </p>
  <p>
    We don't have to stop in just the <code>forms.py</code> module. You can also
    modify forms in views (either the classic <code>views.py</code> module or in
    whatever API library you might be using):
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>
<span class="kn">from</span> <span class="nn">django.shortcuts</span> <span class="kn">import</span> <span class="n">redirect</span>
<span class="kn">from</span> <span class="nn">django.views.generic</span> <span class="kn">import</span> <span class="n">FormView</span>

<span class="k">class</span> <span class="nc">MyFormView</span><span class="p">(</span><span class="n">FormView</span><span class="p">):</span>

    <span class="n">form_class</span> <span class="o">=</span> <span class="n">MyForm</span>

    <span class="k">def</span> <span class="nf">get_form</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">form_class</span><span class="p">):</span>
        <span class="n">form</span> <span class="o">=</span> <span class="n">form_class</span><span class="p">(</span><span class="o">**</span><span class="bp">self</span><span class="o">.</span><span class="n">get_form_kwargs</span><span class="p">())</span>
        <span class="n">form</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s1">'favorite_icecream'</span><span class="p">]</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">ChoiceField</span><span class="p">(</span>
            <span class="n">label</span><span class="o">=</span><span class="s2">"What is your favorite flavor from this list?"</span><span class="p">,</span>
            <span class="n">choices</span><span class="o">=</span><span class="p">((</span><span class="mi">0</span><span class="p">,</span> <span class="s2">"Chocolate"</span><span class="p">),</span> <span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="s2">"Vanilla"</span><span class="p">),</span> <span class="p">(</span><span class="mi">2</span><span class="p">,</span> <span class="s2">"Berry"</span><span class="p">)),</span>
            <span class="n">widget</span><span class="o">=</span><span class="n">forms</span><span class="o">.</span><span class="n">RadioSelect</span><span class="p">,</span>
            <span class="n">required</span><span class="o">=</span><span class="bp">True</span>
        <span class="p">)</span>
        <span class="k">return</span> <span class="n">form</span>

    <span class="k">def</span> <span class="nf">form_valid</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">form</span><span class="p">):</span>
        <span class="c1"># Get user's favorite ice cream.</span>
        <span class="c1"># You can do anything you want with it</span>
        <span class="n">favorite_icecream</span> <span class="o">=</span> <span class="n">form</span><span class="o">.</span><span class="n">cleaned_data</span><span class="p">[</span><span class="s1">'favorite_icecream'</span><span class="p">]</span>

        <span class="c1"># return the anticipated redirect</span>
        <span class="k">return</span> <span class="n">redirect</span><span class="p">(</span><span class="s2">"home"</span><span class="p">)</span>

</code></pre>
  </div>
  <p>
    As you can see, with an understanding of basic Python types and some
    experience with Django forms you can become very creative in applications of
    forms. Please keep in mind that the devil is in the details, and overly
    creative use of forms (or anything) is a road you should carefully tread.
    It's always good to remember that simplicity is best and that the goal isn't
    to just write code, but to write maintainable code.
  </p>
  <h1 id="forms-validate-dictionaries">Forms validate dictionaries.</h1>
  <p>
    One of the primary functions of any HTTP-friendly form libraries is
    validating dictionary-like data objects. HTTP query strings are key/value
    structures and in order to avoid corruption in the persistence layer of any
    project, regardless of framework or language, validation needs to occur.
  </p>
  <p>
    During it's request/response cycle Django converts
    <code>HTTP POST</code> (and <code>HTTP GET</code>) objects into something
    called a <code>QueryDict</code>, which is an merely an extended Django
    dictionary. See the comments in the code example below for proof:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">import</span> <span class="nn">logging</span>

<span class="kn">from</span> <span class="nn">django.http</span> <span class="kn">import</span> <span class="n">HttpResponse</span>
<span class="kn">from</span> <span class="nn">django.http.request</span> <span class="kn">import</span> <span class="n">QueryDict</span>
<span class="kn">from</span> <span class="nn">django.utils.datastructures</span> <span class="kn">import</span> <span class="n">MultiValueDict</span>

<span class="n">logger</span> <span class="o">=</span> <span class="n">logging</span><span class="o">.</span><span class="n">getLogger</span><span class="p">(</span><span class="n">**main**</span><span class="p">)</span>

<span class="k">def</span> <span class="nf">my_form_view</span><span class="p">(</span><span class="n">request</span><span class="p">):</span>

    <span class="n">logging</span><span class="o">.</span><span class="n">debug</span><span class="p">(</span>
        <span class="c1"># logs True because request.POST is an instance of QueryDict</span>
        <span class="nb">isinstance</span><span class="p">(</span><span class="n">request</span><span class="o">.</span><span class="n">POST</span><span class="p">,</span> <span class="n">QueryDict</span><span class="p">)</span>
    <span class="p">)</span>
    <span class="n">logging</span><span class="o">.</span><span class="n">debug</span><span class="p">(</span>
        <span class="c1"># logs True because QueryDict is a dictionary</span>
        <span class="nb">issubclass</span><span class="p">(</span><span class="n">QueryDict</span><span class="p">,</span> <span class="nb">dict</span><span class="p">)</span>
    <span class="p">)</span>

    <span class="k">return</span> <span class="n">HttpResponse</span><span class="p">()</span>

</code></pre>
  </div>
  <p>
    This is all fine and good, but what does it mean for developers trying to
    solve problems? Well, it means that Django forms serve quite handily as a
    means for validation of dictionaries:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">myapp.forms</span> <span class="kn">import</span> <span class="n">MyForm</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">good_form</span> <span class="o">=</span> <span class="n">MyForm</span><span class="p">({</span><span class="s2">"title"</span><span class="p">:</span> <span class="s2">"Two Scoops of Django"</span><span class="p">})</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">good_form</span><span class="o">.</span><span class="n">is_valid</span><span class="p">()</span>
<span class="bp">True</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">good_form</span><span class="o">.</span><span class="n">errors</span>
<span class="p">{}</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">bad_form</span> <span class="o">=</span> <span class="n">MyForm</span><span class="p">({})</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">bad_form</span><span class="o">.</span><span class="n">is_valid</span><span class="p">()</span>
<span class="bp">False</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">bad_form</span><span class="o">.</span><span class="n">errors</span>
<span class="p">{</span><span class="s1">'title'</span><span class="p">:</span> <span class="p">[</span><span class="sa">u</span><span class="s1">'This field is required.'</span><span class="p">]}</span>
</code></pre>
  </div>
  <p>
    The power of this can't be understated. In fact, I'll be exploring this
    particular facet of Django forms more in at least one upcoming blog post.
  </p>
  <h1 id="epilogue">Epilogue</h1>
  <p>ModelForms adds at least three more bullets...</p>
  <ul>
    <li>ModelForms render Model fields as HTML</li>
    <li>
      ModelForms automatically choose validators based off of Model field
      definitions.
    </li>
    <li>ModelForms save dictionaries to SQL tables.</li>
  </ul>
  <p>
    ... and I touch on them in
    <a
      href="https://pydanny.com/core-concepts-django-modelforms "
      target="_blank"
      >my post on ModelForms</a
    >.
  </p>
  <p>Published: 2013-3-29 11:00</p>
  </div>
