---
date: 2013-6-13
tag: 
  - python
  - django
  - forms

author: Daniel Roy Greenfeld
location: California
title: Core Concepts of Django ModelForms
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/core-concepts-django-modelforms.html">Core Concepts of Django ModelForms</a>
</div>
</h1>
<p>In my opinion, the concepts behind Django's model forms can be listed
in just six (6) bullets. The bullets I've marked in <strong>bold</strong> at the top
are the topic of this blog post, while the two of these that were
<a href="https://pydanny.com/core-concepts-django-forms.html" target="_blank">covered in a previous blog post on Django
forms</a> are at
bottom of my list.</p>
<ul>
<li><strong>ModelForms render Model fields as HTML.</strong></li>
<li><strong>ModelForms select validators based off of Model field
definitions.</strong></li>
<li><strong>ModelForms don't have to display/change all available fields.</strong></li>
<li><strong>ModelForms save dictionaries to SQL tables.</strong></li>
<li>Forms are "just" Python constructs. (covered previous)</li>
<li>Forms validate Python dictionaries. (covered previous)</li>
</ul>
<h1 id="modelforms-render-model-fields-as-html">ModelForms render Model fields as HTML.</h1>
<p>If I create a Django model:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># myapp/models.py</span>
<span class="kn">from</span> <span class="nn">django.db</span> <span class="kn">import</span> <span class="n">models</span>

<span class="k">class</span> <span class="nc">MyModel</span><span class="p">(</span><span class="n">models</span><span class="o">.</span><span class="n">Model</span><span class="p">):</span>

    <span class="n">title</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mi">100</span><span class="p">)</span>
</code></pre></div>
<p>Then attach it to a ModelForm:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># myapp/forms.py</span>
<span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>

<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">MyModel</span>

<span class="k">class</span> <span class="nc">MyModelForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">ModelForm</span><span class="p">):</span>

    <span class="k">class</span> <span class="nc">Meta</span><span class="p">:</span>

        <span class="n">model</span> <span class="o">=</span> <span class="n">MyModel</span>
</code></pre></div>
<p>I can render it in a template, or for better clarity in this post, the
Python REPL:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">myapp.forms</span> <span class="kn">import</span> <span class="n">MyModelForm</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">mf</span> <span class="o">=</span> <span class="n">MyModelForm</span><span class="p">()</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">mf</span>
<span class="o">&lt;</span><span class="n">__main__</span><span class="o">.</span><span class="n">MyForm</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x1023c8bd0</span><span class="o">&gt;</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">print</span><span class="p">(</span><span class="n">mf</span><span class="p">)</span>
<span class="o">&lt;</span><span class="n">tr</span><span class="o">&gt;&lt;</span><span class="n">th</span><span class="o">&gt;&lt;</span><span class="n">label</span> <span class="k">for</span><span class="o">=</span><span class="s2">"id_title"</span><span class="o">&gt;</span><span class="n">Title</span><span class="p">:</span><span class="o">&lt;/</span><span class="n">label</span><span class="o">&gt;&lt;/</span><span class="n">th</span><span class="o">&gt;</span>
<span class="o">&lt;</span><span class="n">td</span><span class="o">&gt;&lt;</span><span class="nb">input</span> <span class="nb">id</span><span class="o">=</span><span class="s2">"id_title"</span> <span class="n">name</span><span class="o">=</span><span class="s2">"title"</span> <span class="n">maxlength</span><span class="o">=</span><span class="s2">"100"</span> <span class="nb">type</span><span class="o">=</span><span class="s2">"text"</span> <span class="o">/&gt;&lt;/</span><span class="n">td</span><span class="o">&gt;&lt;/</span><span class="n">tr</span><span class="o">&gt;</span>
</code></pre></div>
<h1 id="modelforms-select-validators-based-off-of-model-field-definitions">ModelForms select validators based off of Model field definitions.</h1>
<p>One of the nice things about Django is that its forms library protects
your models. It does this by assigning one or more of Django's many
built-in validators to the form fields it generates, and using them to
check incoming data. Let's dive in:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">myapp.forms</span> <span class="kn">import</span> <span class="n">MyModelForm</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">mf</span> <span class="o">=</span> <span class="n">MyModelForm</span><span class="p">()</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">mf</span>
<span class="o">&lt;</span><span class="n">__main__</span><span class="o">.</span><span class="n">MyForm</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x1023c8bd0</span><span class="o">&gt;</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">mf</span><span class="o">.</span><span class="n">fields</span>
<span class="p">{</span><span class="s1">'title'</span><span class="p">:</span> <span class="o">&lt;</span><span class="n">django</span><span class="o">.</span><span class="n">forms</span><span class="o">.</span><span class="n">fields</span><span class="o">.</span><span class="n">CharField</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x102474bd0</span><span class="o">&gt;</span><span class="p">}</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">field</span> <span class="o">=</span> <span class="n">mf</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s1">'title'</span><span class="p">]</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">field</span><span class="o">.</span><span class="n">max_length</span>
<span class="mi">100</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">field</span><span class="o">.</span><span class="n">validators</span>
<span class="p">[</span><span class="o">&lt;</span><span class="n">django</span><span class="o">.</span><span class="n">core</span><span class="o">.</span><span class="n">validators</span><span class="o">.</span><span class="n">MaxLengthValidator</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x102403b10</span><span class="o">&gt;</span><span class="p">]</span>
</code></pre></div>
<p>Each individual field contains a list of validators (in this case, just
one validator) supplied by Django and any ModelForm customizations that
might have been done.</p>
<p>If you want to add more validators to a ModelForm (perhaps we want our
title field to require at least 20 characters) one way to do it is by
overriding the field definition in the ModelForm class's <code>__init__</code>
method. That's a mouthful, so I'll just demonstrate in code:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># myapp/forms.py</span>
<span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>
<span class="kn">from</span> <span class="nn">django.core.validators</span> <span class="kn">import</span> <span class="n">MinLengthValidator</span>

<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">MyModel</span>

<span class="k">class</span> <span class="nc">MyModelForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">ModelForm</span><span class="p">):</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
        <span class="nb">super</span><span class="p">(</span><span class="n">MyModelForm</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="fm">__init__</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">)</span>     
        <span class="bp">self</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s2">"title"</span><span class="p">]</span><span class="o">.</span><span class="n">min_length</span> <span class="o">=</span> <span class="mi">20</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s2">"title"</span><span class="p">]</span><span class="o">.</span><span class="n">validators</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">MinLengthValidator</span><span class="p">)</span>

    <span class="k">class</span> <span class="nc">Meta</span><span class="p">:</span>

        <span class="n">model</span> <span class="o">=</span> <span class="n">MyModel</span>
</code></pre></div>
<p>If we stop/start the shell, we now see some new elements added to the
form object:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="c1"># Don't forget to stop/start the Django shell!</span>
<span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">myapp.forms</span> <span class="kn">import</span> <span class="n">MyModelForm</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">mf</span> <span class="o">=</span> <span class="n">MyModelForm</span><span class="p">()</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">mf</span>
<span class="o">&lt;</span><span class="n">__main__</span><span class="o">.</span><span class="n">MyForm</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x1023c8bd0</span><span class="o">&gt;</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">mf</span><span class="o">.</span><span class="n">fields</span>
<span class="p">{</span><span class="s1">'title'</span><span class="p">:</span> <span class="o">&lt;</span><span class="n">django</span><span class="o">.</span><span class="n">forms</span><span class="o">.</span><span class="n">fields</span><span class="o">.</span><span class="n">CharField</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x1023ee810</span><span class="o">&gt;</span><span class="p">}</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">field</span> <span class="o">=</span> <span class="n">mf</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s1">'title'</span><span class="p">]</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">field</span><span class="o">.</span><span class="n">max_length</span>
<span class="mi">100</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">field</span><span class="o">.</span><span class="n">min_length</span>
<span class="mi">20</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">field</span><span class="o">.</span><span class="n">validators</span>
<span class="p">[</span><span class="o">&lt;</span><span class="n">django</span><span class="o">.</span><span class="n">core</span><span class="o">.</span><span class="n">validators</span><span class="o">.</span><span class="n">MaxLengthValidator</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x10240c7d0</span><span class="o">&gt;</span><span class="p">,</span> <span class="o">&lt;</span><span class="n">django</span><span class="o">.</span><span class="n">core</span><span class="o">.</span><span class="n">validators</span><span class="o">.</span><span class="n">MinLengthValidator</span> <span class="nb">object</span> <span class="n">at</span> <span class="mh">0x1023eef90</span><span class="o">&gt;</span><span class="p">]</span>
</code></pre></div>
<p>Now we have two validators for the field!</p>
<p>There are other ways to override the title field validators. The easiest
but not necessarily the best way is to replicate the ModelForm
definition of the field in the form like so:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># myapp/forms.py</span>
<span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>

<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">MyModel</span>

<span class="k">class</span> <span class="nc">MyModelForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">ModelForm</span><span class="p">):</span>

    <span class="n">title</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mi">100</span><span class="p">,</span> <span class="n">min_length</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>

    <span class="k">class</span> <span class="nc">Meta</span><span class="p">:</span>

        <span class="n">model</span> <span class="o">=</span> <span class="n">MyModel</span>
</code></pre></div>
<p>I don't like this technique. This makes it so we are defining the title
field in two places, once in the model and once in the form. I go into
more of the details and problems of this approach in my previous blog
post at <a href="https://pydanny.com/overloading-form-fields.html" target="_blank">Overloading Django Form
Fields</a>.</p>
<h1 id="modelforms-dont-have-to-displaychange-all-available-fields">ModelForms don't have to display/change all available fields.</h1>
<p>Before we dive into this section, let's increase our model to have two
fields as shown below:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># myapp/models.py</span>
<span class="kn">from</span> <span class="nn">django.db</span> <span class="kn">import</span> <span class="n">models</span>

<span class="k">class</span> <span class="nc">MyModel</span><span class="p">(</span><span class="n">models</span><span class="o">.</span><span class="n">Model</span><span class="p">):</span>

    <span class="n">title</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mi">100</span><span class="p">)</span>
    <span class="n">slug</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">SlugField</span><span class="p">()</span>
</code></pre></div>
<p>Let's say that we don't want to allow users the ability to change
slugs on existing content, otherwise URLs will be broken. In this case,
we rely on the <code>fields</code> attribute of <code>ModelForm.Meta</code> to make it so we
only display what we want to display:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># myapp/forms.py</span>
<span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>

<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">MyModel</span>

<span class="k">class</span> <span class="nc">MyModelForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">ModelForm</span><span class="p">):</span>

    <span class="k">class</span> <span class="nc">Meta</span><span class="p">:</span>

        <span class="n">model</span> <span class="o">=</span> <span class="n">MyModel</span>
        <span class="n">fields</span> <span class="o">=</span> <span class="p">(</span><span class="s1">'title'</span><span class="p">,</span> <span class="p">)</span>
</code></pre></div>
<p>Easy!</p>
<h2 id="but-what-about-modelformmetaexcludes">But what about ModelForm.Meta.excludes?</h2>
<p>We advocate strongly against using <code>ModelForm.Meta.excludes</code>.</p>
<p>In fact, when we were writing <a href="http://django.2scoops.org" target="_blank">Two Scoops of
Django</a> the majority of our technical
reviewers as well as our security reviewer fervently insisted that we
advocate against use of <code>ModelForm.Meta.excludes</code>. We provide numerous
warnings about it's usage, and go in-depth as to why in <em>section
21.12</em>. For reference, Django's own documentation is now including a
rather mild warning (no warning box) on the subject at <a href="https://docs.djangoproject.com/en/dev/topics/forms/modelforms/#modelforms-selecting-fields" target="_blank">selecting the
fields to
use</a>.
I might try and get that addressed in the next few days...</p>
<p>In any case, the problem with <code>ModelForm.Meta.excludes</code> is similar to
but worse than duplicating field functionality. It means that changes to
models (new fields for example) will display in associated forms
<strong>unless</strong> you remember to modify the associated forms. Since a single
model can have multiple forms, and we developers forget or leave
projects, you can understanding what sort of security nightmare this can
cause.</p>
<p>Do yourself a favor and stay away from <code>ModelForm.Meta.excludes</code>.</p>
<h1 id="modelforms-save-dictionaries-to-sql-tables">ModelForms save dictionaries to SQL tables</h1>
<p>In my <a href="https://pydanny.com/core-concepts-django-forms.html" target="_blank">previous post of Django
forms</a> I covered
<em>forms validate dictionaries</em>. Well, ModelForms do the same thing AND
give us the power to save that validated dictionary to SQL tables. We
don't even need to involve web pages!</p>
<p>This is really useful because it means that we can take data from any
source, be it user input from the web, JSON data fetched from an API,
and even CSVs generated from Excel reports and transform that into data
that resides in SQL.</p>
<p>Let's go over using our ModelForm with title/slug fields used with all
those methods. In our samples (web page, json, csv), we'll use
generating a timestamp to demonstrate how we can modify the model data
before it's saved, and we'll base all three examples off the model and
ModelForm combination listed below.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># myapp/models.py</span>
<span class="kn">from</span> <span class="nn">django.db</span> <span class="kn">import</span> <span class="n">models</span>


<span class="k">class</span> <span class="nc">MyModel</span><span class="p">(</span><span class="n">models</span><span class="o">.</span><span class="n">Model</span><span class="p">):</span>

    <span class="n">title</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mi">100</span><span class="p">)</span>
    <span class="n">timestamp</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">DateTimeField</span><span class="p">()</span>
</code></pre></div>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># myapp/forms.py</span>
<span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">Forms</span>

<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">MyModel</span>


<span class="k">class</span> <span class="nc">MyModel</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">ModelForm</span><span class="p">):</span>

    <span class="k">class</span> <span class="nc">Meta</span><span class="p">:</span>

        <span class="n">model</span> <span class="o">=</span> <span class="n">MyModel</span>
        <span class="n">fields</span> <span class="o">=</span> <span class="p">(</span><span class="s1">'title'</span><span class="p">,</span> <span class="p">)</span>
</code></pre></div>
<p>And now to our three examples!</p>
<h2 id="example-1-web-page">Example #1 Web Page</h2>
<p>This should look pretty familiar to many Django developers. it's the
traditional Django view pattern of processing simple model forms.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># myapp/views.py</span>
<span class="kn">from</span> <span class="nn">django.core.shortcuts</span> <span class="kn">import</span> <span class="n">render</span><span class="p">,</span> <span class="n">redirect</span>
<span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>
<span class="kn">from</span> <span class="nn">django.utils</span> <span class="kn">import</span> <span class="n">timezone</span>

<span class="kn">from</span> <span class="nn">.forms</span> <span class="kn">import</span> <span class="n">MyModelForm</span>


<span class="k">def</span> <span class="nf">add_model</span><span class="p">(</span><span class="n">request</span><span class="p">):</span>

    <span class="k">if</span> <span class="n">request</span><span class="o">.</span><span class="n">method</span> <span class="o">==</span> <span class="s2">"POST"</span><span class="p">:</span>
        <span class="n">form</span> <span class="o">=</span> <span class="n">MyModelForm</span><span class="p">(</span><span class="n">request</span><span class="o">.</span><span class="n">POST</span><span class="p">)</span>
        <span class="k">if</span> <span class="n">form</span><span class="o">.</span><span class="n">is_valid</span><span class="p">():</span>

            <span class="c1"># commit=False means the form doesn't save at this time.</span>
            <span class="c1"># commit defaults to True which means it normally saves.</span>
            <span class="n">model_instance</span> <span class="o">=</span> <span class="n">form</span><span class="o">.</span><span class="n">save</span><span class="p">(</span><span class="n">commit</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>
            <span class="n">model_instance</span><span class="o">.</span><span class="n">timestamp</span> <span class="o">=</span> <span class="n">timezone</span><span class="o">.</span><span class="n">now</span><span class="p">()</span>
            <span class="n">model_instance</span><span class="o">.</span><span class="n">save</span><span class="p">()</span>
            <span class="k">return</span> <span class="n">redirect</span><span class="p">(</span><span class="s1">'victory'</span><span class="p">)</span>
    <span class="k">else</span><span class="p">:</span>
        <span class="n">form</span> <span class="o">=</span> <span class="n">MyModelForm</span><span class="p">()</span>

    <span class="k">return</span> <span class="n">render</span><span class="p">(</span><span class="n">request</span><span class="p">,</span> <span class="s2">"my_template.html"</span><span class="p">,</span> <span class="p">{</span><span class="s1">'form'</span><span class="p">:</span> <span class="n">form</span><span class="p">})</span>
</code></pre></div>
<h2 id="example-2-apijson">Example #2 API/JSON</h2>
<p>In this example, we're validating the output of a RESTful API before
letting it touch our database. It's critical that such APIs are not
allowed to touch our systems without proper validation - don't make my
mistakes! Also, even internally within a project it's really important
to validate all data coming from different databases. And Django makes
it easy!</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># myapp/api/reitz.py</span>
<span class="kn">from</span> <span class="nn">django.utils</span> <span class="kn">import</span> <span class="n">timezone</span>

<span class="kn">import</span> <span class="nn">requests</span>  <span class="c1"># You are using requests-python, right?</span>

<span class="kn">from</span> <span class="nn">.forms</span> <span class="kn">import</span> <span class="n">MyModelForm</span>


<span class="k">class</span> <span class="nc">ReitzApiException</span><span class="p">(</span><span class="ne">Exception</span><span class="p">):</span>
    <span class="k">pass</span>


<span class="k">def</span> <span class="nf">fetch_reitz_data</span><span class="p">(</span><span class="n">target_url</span><span class="p">):</span>
    <span class="n">response</span> <span class="o">=</span> <span class="n">requests</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">target_url</span><span class="p">)</span>
    <span class="k">if</span> <span class="n">response</span><span class="o">.</span><span class="n">status_code</span> <span class="o">==</span> <span class="mi">200</span><span class="p">:</span>

        <span class="c1"># generate the form from the response</span>
        <span class="n">form</span> <span class="o">=</span> <span class="n">MyModelForm</span><span class="p">(</span><span class="n">response</span><span class="o">.</span><span class="n">json</span><span class="p">())</span>
        <span class="k">if</span> <span class="n">form</span><span class="o">.</span><span class="n">is_valid</span><span class="p">():</span>
            <span class="n">model_instance</span> <span class="o">=</span> <span class="n">form</span><span class="o">.</span><span class="n">save</span><span class="p">(</span><span class="n">commit</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>
            <span class="n">model_instance</span><span class="o">.</span><span class="n">timestamp</span> <span class="o">=</span> <span class="n">timezone</span><span class="o">.</span><span class="n">now</span><span class="p">()</span>
            <span class="n">model_instance</span><span class="o">.</span><span class="n">save</span><span class="p">()</span>
            <span class="k">return</span> <span class="n">model_instance</span>

        <span class="c1"># Simplistic exception handling</span>
        <span class="k">raise</span> <span class="n">ReitzApiException</span><span class="p">(</span><span class="n">form</span><span class="o">.</span><span class="n">errors</span><span class="p">)</span>

    <span class="c1"># Simplistic exception handling</span>
    <span class="k">raise</span> <span class="n">ReitzApiException</span><span class="p">(</span><span class="n">response</span><span class="o">.</span><span class="n">status_code</span><span class="p">)</span>
</code></pre></div>
<h2 id="example-3-csv-import">Example #3 CSV Import</h2>
<p>I'll admit my mistake again: I've written my own validation tools to
handle data coming from CSVs and Excel documents into Django projects.
My validation scripts always seem fragile, and they are. What I'm doing
going forward is I'm leaning on form libraries to do the hard work of
validating data and saving it to models.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="kn">import</span> <span class="nn">csv</span>

<span class="kn">from</span> <span class="nn">django.utils</span> <span class="kn">import</span> <span class="n">timezone</span>

<span class="kn">from</span> <span class="nn">.forms</span> <span class="kn">import</span> <span class="n">MyModelForm</span>


<span class="k">def</span> <span class="nf">import_csv</span><span class="p">(</span><span class="n">filename</span><span class="p">):</span>
    <span class="n">rows</span> <span class="o">=</span> <span class="nb">open</span><span class="p">(</span><span class="n">filename</span><span class="p">)</span>
    <span class="n">records_added</span> <span class="o">=</span> <span class="mi">0</span>
    <span class="n">errors</span> <span class="o">=</span> <span class="p">[]</span>
    <span class="c1"># Generate a dict per row, with the first CSV row being the keys.</span>
    <span class="k">for</span> <span class="n">row</span> <span class="ow">in</span> <span class="n">csv</span><span class="o">.</span><span class="n">DictReader</span><span class="p">(</span><span class="n">rows</span><span class="p">,</span> <span class="n">delimiter</span><span class="o">=</span><span class="s2">","</span><span class="p">):</span>

        <span class="c1"># Bind the row data to the MyModelForm</span>
        <span class="n">form</span> <span class="o">=</span> <span class="n">MyModelForm</span><span class="p">(</span><span class="n">row</span><span class="p">)</span>
        <span class="k">if</span> <span class="n">form</span><span class="o">.</span><span class="n">is_valid</span><span class="p">():</span>
            <span class="n">model_instance</span> <span class="o">=</span> <span class="n">form</span><span class="o">.</span><span class="n">save</span><span class="p">(</span><span class="n">commit</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>
            <span class="n">model_instance</span><span class="o">.</span><span class="n">timestamp</span> <span class="o">=</span> <span class="n">timezone</span><span class="o">.</span><span class="n">now</span><span class="p">()</span>
            <span class="n">model_instance</span><span class="o">.</span><span class="n">save</span><span class="p">()</span>
            <span class="n">records_added</span> <span class="o">+=</span> <span class="mi">1</span>
        <span class="k">else</span><span class="p">:</span>
            <span class="n">errors</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">form</span><span class="o">.</span><span class="n">errors</span><span class="p">)</span>

    <span class="k">return</span> <span class="n">records_added</span><span class="p">,</span> <span class="n">errors</span>
</code></pre></div>
<h1 id="closing-thoughts">Closing Thoughts</h1>
<p>I can think of three things:</p>
<p><strong>Forget the HTML</strong>: For nearly every sort of occasion where new data is
coming into your system, form libraries save you from doing extra work
and cover your behind. While my experience is with Django forms, there
are many form libraries out there. The patterns explored in this post
are certainly available in other web frameworks (see
<a href="http://flask.pocoo.org/snippets/category/forms/" target="_blank">http://flask.pocoo.org/snippets/category/forms/</a> for proof).</p>
<p><strong>HTML Rendering Issues</strong>: No form library is going to do everything,
and because of evolving standards, decent HTML rendering is a pain for
form library authors. For example, Django's default form HTML rendering
remains stuck in 2005 because if they had kept up with modern trends of
HTML form layout we would have many different flavors of forms in Django
core (a testing nightmare). Which means, as a developer, it's important
when using a new form library to learn how to override the default form
HTML rendering.</p>
<p><strong>What about AJAX?</strong>: Whoops! Does this mean I have to write another
blog post? Not at all. In Django, AJAX is just another view, either
function- or class-based. The secret is to validate the incoming data
the same way as you would any other view request by using forms.</p>
<p>Published: 2013-6-13 15:33</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/django.html">django</a>
<a href="/tag/forms.html">forms</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>