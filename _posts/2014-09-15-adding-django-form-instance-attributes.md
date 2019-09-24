---
date: 2014-09-15
tag:
  - python
  - django
  - howto
  - class-based-views
  - forms

author: Daniel Roy Greenfeld
location: California
title: Adding Django form instance attributes
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/adding-django-form-instance-attributes "
        >Adding Django form instance attributes</a
      >
    </div>
  </h1>
  <p>
    Sometimes in the <code>clean()</code>, <code>clean_FOO</code> or
    <code>save()</code> methods of a Django form, you need to have additional
    form instance attributes available. A sample case for this is having
    <code>user_id</code> available. This is a simple example of how to do it in
    Class-Based Views.
  </p>
  <p>Assuming this form:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>

<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">MyModel</span>

<span class="k">class</span> <span class="nc">MyForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">ModelForm</span><span class="p">):</span>

    <span class="k">class</span> <span class="nc">Meta</span><span class="p">:</span>
        <span class="n">model</span> <span class="o">=</span> <span class="n">MyModel</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">user_id</span><span class="p">,</span> <span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
        <span class="nb">super</span><span class="p">(</span><span class="n">MyForm</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="fm">__init__</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">)</span>

        <span class="c1"># set the user_id as an attribute of the form</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">user_id</span> <span class="o">=</span> <span class="n">user_id</span>

</code></pre>
  </div>

  <p>
    Now that the form is defined, the view needs to inject the form with the
    user id:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.views.generic</span> <span class="kn">import</span> <span class="n">UpdateView</span>

<span class="c1"># this assumes that django-braces is installed</span>
<span class="kn">from</span> <span class="nn">braces.views</span> <span class="kn">import</span> <span class="n">LoginRequiredMixin</span>

<span class="kn">from</span> <span class="nn">.forms</span> <span class="kn">import</span> <span class="n">MyForm</span>
<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">MyModel</span>

<span class="k">class</span> <span class="nc">MyUpdateView</span><span class="p">(</span><span class="n">LoginRequiredMixin</span><span class="p">,</span> <span class="n">UpdateView</span><span class="p">):</span>
<span class="n">model</span> <span class="o">=</span> <span class="n">MyModel</span>
<span class="n">form_class</span> <span class="o">=</span> <span class="n">MyForm</span>
<span class="n">success_url</span> <span class="o">=</span> <span class="s2">"/someplace/"</span>

    <span class="k">def</span> <span class="nf">get_form_kwargs</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="sd">"""This method is what injects forms with their keyword</span>

<span class="sd"> arguments."""</span>
<span class="c1"># grab the current set of form #kwargs</span>
<span class="n">kwargs</span> <span class="o">=</span> <span class="nb">super</span><span class="p">(</span><span class="n">MyUpdateView</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="n">get_form_kwargs</span><span class="p">()</span>
<span class="c1"># Update the kwargs with the user_id</span>
<span class="n">kwargs</span><span class="p">[</span><span class="s1">'user_id'</span><span class="p">]</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">request</span><span class="o">.</span><span class="n">user</span><span class="o">.</span><span class="n">pk</span>
<span class="k">return</span> <span class="n">kwargs</span>
</code></pre>
  </div>

  <h1 id="additional-notes">Additional Notes</h1>
  <p>You can use this technique with:</p>
  <ul>
    <li><code>forms.Form</code></li>
    <li><code>forms.ModelForm</code></li>
    <li><code>CreateView</code></li>
    <li><code>FormView</code></li>
    <li><code>UpdateView</code></li>
  </ul>
  <p>
    As always,
    <a href="http://ccbv.co.uk" target="_blank">http://ccbv.co.uk</a> is a great
    resource for deliving into Django forms.
  </p>
  <p>
    While this technique is used by <code>django-braces</code> through the
    <code>UserFormKwargsMixin</code> and
    <code>UserKwargModelFormMixin</code> mixins, it's useful to know how to do
    it outside that very useful tool. The reason being that attaching the
    <code>user</code> object or <code>user_id</code> is just one option out of
    many.
  </p>
  <h1 id="django-vanilla-views">django-vanilla-views</h1>
  <p>
    This should also work with
    <a href="http://django-vanilla-views.org" target="_blank"
      >django-vanilla-views</a
    >, but I haven't tested it yet.
  </p>
  <p>
    <a href="https://twitter.com/audreyr" target="_blank"
      ><img alt="image" src="https://pydanny.com/static/form-attributes.png"
    /></a>
  </p>
  <h1 id="see-you-at-barcamp-django-sf">See you at BarCamp Django SF!</h1>
  <p>
    On October 4th and 5th I'll be at
    <a href="https://pydanny.com/barcamp-django-sf " target="_blank"
      >BarCamp Django SF</a
    >
    if you want to talk about Django, Python, or have me teach you how to do
    cartwheels.
  </p>
  </div>
