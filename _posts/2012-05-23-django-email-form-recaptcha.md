---
date: 2012-05-23
tag:
  - python
  - django
  - howto
  - class-based-views

author: Daniel Roy Greenfeld
location: California
title: "Django Class Based View: email form with CAPTCHA"
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/django-email-form-recaptcha.html"
        >Django Class Based View: email form with CAPTCHA</a
      >
    </div>
  </h1>
  <p>
    <a
      href="https://pydanny.com/simple-django-email-form-using-cbv.html"
      target="_blank"
      >Yesterday I showed how to implement a simple email form</a
    >
    for <a href="http://djangoproject.com" target="_blank">Django</a> using
    Class Based Views. Today I'm going to extend yesterday's work to use the
    excellent
    <a href="http://www.google.com/recaptcha" target="_blank">RECAPTCHA</a>
    service to help reduce spam content.
  </p>
  <p>
    This version requires <code>pip</code> installing the following into your
    <code>virtualenv</code>.
  </p>
  <ul>
    <li>
      <code>pip install django-crispy-forms</code> so we can do Python driven
      layouts.
    </li>
    <li>
      <code>pip install django-floppyforms</code> so we get HTML5 elements for
      free.
    </li>
    <li><code>pip install django-recaptcha</code> to do the RECAPTCHA work.</li>
  </ul>
  <p>Don't forget to add the app to your INSTALLED_APPS in settings.py:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="n">INSTALLED_APPS</span> <span class="o">+=</span> <span class="p">(</span>
    <span class="s1">'crispy_forms'</span><span class="p">,</span>
    <span class="s1">'floppyforms'</span><span class="p">,</span>    
    <span class="s1">'captcha'</span><span class="p">,</span>
<span class="p">)</span>
</code></pre>
  </div>
  <p>Generate your KEYs from the RECAPTCHA site and add them in settings.py:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="n">RECAPTCHA_PUBLIC_KEY</span> <span class="o">=</span> <span class="s1">'6LcVu9ESAAAAANVWwbM5-PLuLES94GQ2bIYmSNTG'</span>
<span class="n">RECAPTCHA_PRIVATE_KEY</span> <span class="o">=</span> <span class="s1">'6LcVu9ESAAAAAGxz7aEIACWRa3CVnXN3mFd-cajP'</span>
</code></pre>
  </div>
  <p>In myapp.forms.py:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">captcha.fields</span> <span class="kn">import</span> <span class="n">ReCaptchaField</span>  <span class="c1"># Only import different from yesterday</span>
<span class="kn">from</span> <span class="nn">crispy_forms.helper</span> <span class="kn">import</span> <span class="n">FormHelper</span>
<span class="kn">from</span> <span class="nn">crispy_forms.layout</span> <span class="kn">import</span> <span class="n">Submit</span>
<span class="kn">import</span> <span class="nn">floppyforms</span> <span class="kn">as</span> <span class="nn">forms</span>

<span class="k">class</span> <span class="nc">ContactForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">Form</span><span class="p">):</span>

    <span class="n">name</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">email</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">EmailField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">subject</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">message</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">widget</span><span class="o">=</span><span class="n">forms</span><span class="o">.</span><span class="n">Textarea</span><span class="p">)</span>
    <span class="n">captcha</span> <span class="o">=</span> <span class="n">ReCaptchaField</span><span class="p">()</span>  <span class="c1"># Only field different from yesterday</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">helper</span> <span class="o">=</span> <span class="n">FormHelper</span><span class="p">()</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">helper</span><span class="o">.</span><span class="n">add_input</span><span class="p">(</span><span class="n">Submit</span><span class="p">(</span><span class="s1">'submit'</span><span class="p">,</span> <span class="s1">'Submit'</span><span class="p">))</span>
        <span class="nb">super</span><span class="p">(</span><span class="n">ContactForm</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="fm">__init__</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">)</span>

</code></pre>
  </div>
  <p>In myapp.views.py:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># Unchanged from yesterday. :-)</span>
<span class="kn">from</span> <span class="nn">django.conf</span> <span class="kn">import</span> <span class="n">settings</span>
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
  <p>In <code>templates/myapp/email_form.html</code>:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code>{# Also unchanged from yesterday. :-)  #}
{% extends 'base.html' %}
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
  <h1 id="what-i-did">What I did</h1>
  <ul>
    <li>
      Using <code>pip</code> I installed three packages into my Python
      environment.
    </li>
    <li>
      Added those three packages into the <code>INSTALLED_APPS</code> setting.
    </li>
    <li>Set the RECAPTCHA keys for my site.</li>
    <li>
      Modified the <code>forms.py</code> file from yesterday to include the
      RECAPTCHA field.
    </li>
    <li>Reduced spam content.</li>
  </ul>
  <h1 id="what-i-could-do">What I could do</h1>
  <ul>
    <li>
      Pin the app versions for a particular release. This is what you should be
      doing in normal development and in production, but for a blog entry I'm
      avoiding it because release numbers become quickly dated.
    </li>
    <li>
      Rather than change the <code>ContactForm</code> from yesterday, I could
      have extended it via inheritance.
    </li>
  </ul>
  <h1 id="want-to-learn-more">Want to learn more?</h1>
  <p>
    Check out the Django book I co-wrote,
    <a
      href="http://twoscoopspress.org/products/two-scoops-of-django-1-6"
      target="_blank"
      >Two Scoops of Django: Best Practices for Django 1.6</a
    >!
  </p>
  <p>Published: 2012-05-23 09:30</p>
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
