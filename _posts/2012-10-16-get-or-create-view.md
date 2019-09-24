---
date: 2012-10-16
tag:
  - python
  - django
  - howto
  - class-based-views

author: Daniel Roy Greenfeld
location: California
title: Django GetOrCreateView
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/get-or-create-view ">Django GetOrCreateView</a>
    </div>
  </h1>
  <p>
    Today I decided to use the Django class based view (CBV) CreateView, but I
    wanted to avoid duplications and submit to the view from the front page of a
    site. The reason was I needed a simple newsletter signup form. This is what
    I cooked up and should work for Django 1.3, 1.4, and the forthcoming 1.5
    release. Here is what I did:
  </p>
  <h1 id="1-installed-dependencies">1. Installed dependencies</h1>
  <p>
    This version requires the following package to be pip installed into your
    virtualenv.
  </p>
  <ul>
    <li>
      <a
        href="https://github.com/django-extensions/django-extensions"
        target="_blank"
        >django-extensions</a
      >
      so we can have easy timestamps on models.
    </li>
  </ul>
  <p>
    This also needs to be added to your list of <code>INSTALLED_APPS</code>:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="n">INSTALLED_APPS</span> <span class="o">+=</span> <span class="p">(</span>
    <span class="s1">'django_extensions'</span><span class="p">,</span>
<span class="p">)</span>
</code></pre>
  </div>
  <h1 id="2-defined-the-model">2. Defined the model</h1>
  <p>
    The model is really simple, and inherits from TimeStampedModel so we know
    when people signed up:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.db</span> <span class="kn">import</span> <span class="n">models</span>

<span class="kn">from</span> <span class="nn">django_extensions.db.models</span> <span class="kn">import</span> <span class="n">TimeStampedModel</span>

<span class="k">class</span> <span class="nc">NewsLetterSignup</span><span class="p">(</span><span class="n">TimeStampedModel</span><span class="p">):</span>

    <span class="n">email</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">EmailField</span><span class="p">(</span><span class="s2">"Email"</span><span class="p">)</span>

    <span class="k">def</span> <span class="fm">__unicode__</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">email</span>

</code></pre>
  </div>
  <h1 id="3-wrote-the-view">3. Wrote the view</h1>
  <p>
    Here's the somewhat challenging part that forced me to dive into Django's
    source code. Even with the documentation work we've done over the past few
    months, it's clear we've got a long way to go.
  </p>
  <p>
    Because of that source code diving, for this blog post I really did my best
    to document why I did things in the
    <code>NewsLetterSignupView.form_valid()</code> method.
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.http</span> <span class="kn">import</span> <span class="n">HttpResponseRedirect</span>
<span class="kn">from</span> <span class="nn">django.views.generic</span> <span class="kn">import</span> <span class="n">CreateView</span>

<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">NewsLetterSignup</span>

<span class="k">class</span> <span class="nc">NewsLetterSignupView</span><span class="p">(</span><span class="n">CreateView</span><span class="p">):</span>
<span class="sd">""" Signs up users to a newsletter """</span>

    <span class="n">model</span> <span class="o">=</span> <span class="n">NewsLetterSignup</span>
    <span class="n">success_url</span> <span class="o">=</span> <span class="s1">'/newsletter-signed-up/'</span>  <span class="c1"># replace with reverse</span>

    <span class="k">def</span> <span class="nf">form_valid</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">form</span><span class="p">):</span>
        <span class="sd">"""</span>

<span class="sd"> If the form is valid, save the associated model.</span>
<span class="sd"> (django.views.generic.edit.ModelFormMixin)</span>
<span class="sd"> If the form is valid, redirect to the supplied URL.</span>
<span class="sd"> (django.views.generic.edit.FormMixin)</span>
<span class="sd"> """</span>

        <span class="c1"># Get the email from the form.cleaned_data dictionary</span>
        <span class="n">email</span> <span class="o">=</span> <span class="n">form</span><span class="o">.</span><span class="n">cleaned_data</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="s2">"email"</span><span class="p">,</span> <span class="s2">""</span><span class="p">)</span>

        <span class="c1"># Get or create the signup. We don't need to do anything with the</span>
        <span class="c1">#   model instance or created boolean so we don't set them.</span>
        <span class="n">NewsLetterSignup</span><span class="o">.</span><span class="n">objects</span><span class="o">.</span><span class="n">get_or_create</span><span class="p">(</span><span class="n">email</span><span class="o">=</span><span class="n">email</span><span class="p">)</span>

        <span class="c1"># Don't use super() to inherit as it will do a form.save()</span>
        <span class="c1"># You could call the FormMixin's form_valid() method but I think    </span>
        <span class="c1">#   using a HttpResponseRedirect() much more explicit.</span>
        <span class="k">return</span> <span class="n">HttpResponseRedirect</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">success_url</span><span class="p">)</span>

</code></pre>
  </div>
  <h1 id="4-wired-it-together">4. Wired it together</h1>
  <p>In urls.py:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.conf.urls</span> <span class="kn">import</span> <span class="n">patterns</span><span class="p">,</span> <span class="n">url</span>
<span class="kn">from</span> <span class="nn">django.views.generic</span> <span class="kn">import</span> <span class="n">TemplateView</span>

<span class="kn">from</span> <span class="nn">.views</span> <span class="kn">import</span> <span class="n">NewsLetterSignupView</span>

<span class="n">urlpatterns</span> <span class="o">=</span> <span class="n">patterns</span><span class="p">(</span><span class="s1">''</span><span class="p">,</span>
<span class="n">url</span><span class="p">(</span><span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s1">'^newsletter-signed-up/$'</span><span class="p">,</span>
        <span class="n">view</span><span class="o">=</span><span class="n">TemplateView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(</span>
            <span class="n">template_name</span><span class="o">=</span><span class="s2">"pages/newsletter_signed_up "</span>
        <span class="p">),</span>
        <span class="n">name</span><span class="o">=</span><span class="s1">'newsletter_signedup'</span><span class="p">,</span>
    <span class="p">),</span>
    <span class="n">url</span><span class="p">(</span><span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s1">'^newsletter-signup/$'</span><span class="p">,</span>
<span class="n">view</span><span class="o">=</span><span class="n">NewsLetterSignupView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(),</span>
<span class="n">name</span><span class="o">=</span><span class="s1">'news_letter_signup'</span><span class="p">,</span>
<span class="p">),</span>
<span class="p">)</span>
</code></pre>
  </div>
  <h1 id="closing-thoughts">Closing thoughts</h1>
  <p>
    First off, you'll notice I didn't include the
    <code>pages/newsletter_signed_up </code> because for this case it's too
    trivial.
  </p>
  <p>
    Second, this is one of those very clear cases where a functional view would
    have been so much easier compared to the effort I spent writing this as a
    class based view. The line count would have been about the same, but the
    mental bandwidth involved in figuring this would have been a fraction of the
    effort I spent.
  </p>
  <p>
    Third, this is probably better served with an implementation of
    <code>django.views.generic.FormView</code>. Oh well...
  </p>
  <p>
    Fourth, I want to see a configurable version of this in the next release of
    <a href="https://github.com/brack3t/django-braces/" target="_blank"
      >django-braces</a
    >. ;-)
  </p>
  </div>
