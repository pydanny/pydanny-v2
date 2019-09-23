---
date: 2012-05-22
tag:
  - python
  - django
  - howto
  - class-based-views

author: Daniel Roy Greenfeld
location: California
title: Simple Django email form using CBV
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/simple-django-email-form.html"
        >Simple Django email form using CBV</a
      >
    </div>
  </h1>
  <p>
    Here's a simple <code>FormView</code> Class Based Views for
    <a href="http://djangoproject.com" target="_blank">Django</a>. Here is a
    sample of how to do one as a simple email form. There is no CAPTCHA in this
    example, that's the topic of a future blog post.
  </p>
  <p>
    This version requires the following packages <code>pip</code> installed into
    your <code>virtualenv</code>.
  </p>
  <ul>
    <li>
      <code>django-crispy-forms</code> so we can do Python driven layouts.
    </li>
    <li><code>django-floppyforms</code> so we get HTML5 elements for free.</li>
  </ul>
  <p>They also need to be added to your list of <code>INSTALLED_APPS</code>:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="n">INSTALLED_APPS</span> <span class="o">+=</span> <span class="p">(</span>
    <span class="s1">'crispy_forms'</span><span class="p">,</span>
    <span class="s1">'floppyforms'</span><span class="p">,</span>        
<span class="p">)</span>
</code></pre>
  </div>
  <p>In myapp.forms.py:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">crispy_forms.helper</span> <span class="kn">import</span> <span class="n">FormHelper</span>
<span class="kn">from</span> <span class="nn">crispy_forms.layout</span> <span class="kn">import</span> <span class="n">Submit</span>
<span class="kn">import</span> <span class="nn">floppyforms</span> <span class="kn">as</span> <span class="nn">forms</span>

<span class="k">class</span> <span class="nc">ContactForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">Form</span><span class="p">):</span>

    <span class="n">name</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">email</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">EmailField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">subject</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">message</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">widget</span><span class="o">=</span><span class="n">forms</span><span class="o">.</span><span class="n">Textarea</span><span class="p">)</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">helper</span> <span class="o">=</span> <span class="n">FormHelper</span><span class="p">()</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">helper</span><span class="o">.</span><span class="n">add_input</span><span class="p">(</span><span class="n">Submit</span><span class="p">(</span><span class="s1">'submit'</span><span class="p">,</span> <span class="s1">'Submit'</span><span class="p">))</span>
        <span class="nb">super</span><span class="p">(</span><span class="n">ContactForm</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="fm">__init__</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">)</span>

</code></pre>
  </div>
  <p>In myapp.views.py:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.conf</span> <span class="kn">import</span> <span class="n">settings</span>
<span class="kn">from</span> <span class="nn">django.core.mail</span> <span class="kn">import</span> <span class="n">send_mail</span>
<span class="kn">from</span> <span class="nn">django.views.generic</span> <span class="kn">import</span> <span class="n">FormView</span>

<span class="kn">from</span> <span class="nn">myapp.forms</span> <span class="kn">import</span> <span class="n">ContactForm</span>

<span class="k">class</span> <span class="nc">ContactFormView</span><span class="p">(</span><span class="n">FormView</span><span class="p">):</span>

    <span class="n">form_class</span> <span class="o">=</span> <span class="n">ContactForm</span>
    <span class="n">template_name</span> <span class="o">=</span> <span class="s2">"myapp/email_form.html"</span>
    <span class="n">success_url</span> <span class="o">=</span> <span class="s1">'/email-sent/'</span>

    <span class="k">def</span> <span class="nf">form_valid</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">form</span><span class="p">):</span>
        <span class="n">message</span> <span class="o">=</span> <span class="s2">"{name} / {email} said: "</span><span class="o">.</span><span class="n">format</span><span class="p">(</span>
            <span class="n">name</span><span class="o">=</span><span class="n">form</span><span class="o">.</span><span class="n">cleaned_data</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="s1">'name'</span><span class="p">),</span>
            <span class="n">email</span><span class="o">=</span><span class="n">form</span><span class="o">.</span><span class="n">cleaned_data</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="s1">'email'</span><span class="p">))</span>
        <span class="n">message</span> <span class="o">+=</span> <span class="s2">"</span><span class="se">\n\n</span><span class="s2">{0}"</span><span class="o">.</span><span class="n">format</span><span class="p">(</span><span class="n">form</span><span class="o">.</span><span class="n">cleaned_data</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="s1">'message'</span><span class="p">))</span>
        <span class="n">send_mail</span><span class="p">(</span>
            <span class="n">subject</span><span class="o">=</span><span class="n">form</span><span class="o">.</span><span class="n">cleaned_data</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="s1">'subject'</span><span class="p">)</span><span class="o">.</span><span class="n">strip</span><span class="p">(),</span>
            <span class="n">message</span><span class="o">=</span><span class="n">message</span><span class="p">,</span>
            <span class="n">from_email</span><span class="o">=</span><span class="s1">'contact-form@myapp.com'</span><span class="p">,</span>
            <span class="n">recipient_list</span><span class="o">=</span><span class="p">[</span><span class="n">settings</span><span class="o">.</span><span class="n">LIST_OF_EMAIL_RECIPIENTS</span><span class="p">],</span>
        <span class="p">)</span>
        <span class="k">return</span> <span class="nb">super</span><span class="p">(</span><span class="n">ContactFormView</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="n">form_valid</span><span class="p">(</span><span class="n">form</span><span class="p">)</span>

</code></pre>
  </div>
  <p>In templates/myapp/email_form.html:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code>{% extends 'base.html' %}
{% load crispy_forms_tags %}

{% block title %}Send an email{% endblock %}

{% block content %}
<span class="p">&lt;</span><span class="nt">div</span> <span class="na">class</span><span class="o">=</span><span class="s">"row"</span><span class="p">&gt;</span>
<span class="p">&lt;</span><span class="nt">div</span> <span class="na">class</span><span class="o">=</span><span class="s">"span6"</span><span class="p">&gt;</span>
<span class="p">&lt;</span><span class="nt">h1</span><span class="p">&gt;</span>Send an email<span class="p">&lt;/</span><span class="nt">h1</span><span class="p">&gt;</span>
{% crispy form form.helper %}
<span class="p">&lt;/</span><span class="nt">div</span><span class="p">&gt;</span>
<span class="p">&lt;/</span><span class="nt">div</span><span class="p">&gt;</span>
{% endblock %}

{% block extrajs %}
<span class="p">&lt;</span><span class="nt">script</span> <span class="na">src</span><span class="o">=</span><span class="s">"{{ STATIC_URL }}js/jquery-1.7.1.min.js"</span><span class="p">&gt;&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>
<span class="p">&lt;</span><span class="nt">script</span> <span class="na">type</span><span class="o">=</span><span class="s">"text/javascript"</span><span class="p">&gt;</span>
<span class="nx">$</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
    <span class="nx">$</span><span class="p">(</span><span class="s1">'#id_name'</span><span class="p">).</span><span class="nx">focus</span><span class="p">()</span>
<span class="p">});</span>
<span class="p">&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>
{% endblock %}
</code></pre>
  </div>
  <h1 id="tomorrows-blog-post">Tomorrow's blog post</h1>
  <p>
    In tomorrow's post I'll show how to add CAPTCHA into your project to help
    reduce spam messages.
  </p>
  <h1 id="want-to-learn-more">Want to learn more?</h1>
  <p>
    Check out the Django book I co-wrote,
    <a
      href="http://twoscoopspress.org/products/two-scoops-of-django-1-6"
      target="_blank"
      >Two Scoops of Django: Best Practices for Django 1.6</a
    >!
  </p>
  <p>Published: 2012-05-22 09:30</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/django.html">django</a>
    <a href="/tag/howto.html">howto</a>
    <a href="/tag/class-based-views.html">class-based-views</a>
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
