---
date: 2012-02-18
tag:
  - django
  - python

author: Daniel Roy Greenfeld
location: California
title: django-uni-form end of life
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/django-uni-form-end-of-life.html"
        >django-uni-form end of life</a
      >
    </div>
  </h1>
  <p>
    I started on django-uni-form in January 2009. In order to use
    <a href="http://pinaxproject.com" target="_blank">Pinax</a> on an internal
    social network for
    <a href="http://www.nasa.gov" target="_blank">NASA</a> HQ, we had to render
    all content, including forms,
    <a
      href="http://django-uni-form.readthedocs.org/en/latest/concepts.html#section-508"
      target="_blank"
      >Section 508</a
    >
    compliant. Rather than rewrite the html for all 50+ forms that existed in
    the Pinax 0.5.x framework at that time, I decided to minimize my work and
    automate things.
    <a href="http://jtauber.com" target="_blank">James Tauber</a> gave guidance
    and insight, my co-workers were supportive, and
    <a href="http://enn.io" target="_blank">Jannis Leidel</a> suggested the
    Uni-form library. The name <strong>Django Uni-Form</strong> was obvious, and
    lo the project was named.
  </p>
  <p>
    Looking at the old, extremely deprecated
    <a href="http://code.google.com/p/django-uni-form/" target="_blank"
      >Google Code site for django-uni-form</a
    >, I see that the first commit happened on January 7th, 2009. That was for
    version 0.1, with some core code that was literally a merger between the
    Django form example on how to integrate divs into forms and the simplest
    template tag I could figure out.
  </p>
  <p>The python code in <code>uni_form/templatetags/uni_form.py</code>:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.template</span> <span class="kn">import</span> <span class="n">Context</span><span class="p">,</span> <span class="n">Template</span>
<span class="kn">from</span> <span class="nn">django.template.loader</span> <span class="kn">import</span> <span class="n">get_template</span>
<span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">template</span>

<span class="n">register</span> <span class="o">=</span> <span class="n">template</span><span class="o">.</span><span class="n">Library</span><span class="p">()</span>

<span class="nd">@register.filter</span>
<span class="k">def</span> <span class="nf">as_uni_form</span><span class="p">(</span><span class="n">form</span><span class="p">):</span>
<span class="n">template</span> <span class="o">=</span> <span class="n">get_template</span><span class="p">(</span><span class="s1">'templates/uni_form.html'</span><span class="p">)</span>
<span class="n">c</span> <span class="o">=</span> <span class="n">Context</span><span class="p">({</span><span class="s1">'form'</span><span class="p">:</span><span class="n">form</span><span class="p">})</span>

    <span class="k">return</span> <span class="n">template</span><span class="o">.</span><span class="n">render</span><span class="p">(</span><span class="n">c</span><span class="p">)</span>

</code></pre>
  </div>
  <p>
    The template tag code was nearly exactly copy/pasted from the starter
    <a
      href="https://docs.djangoproject.com/en/1.0/topics/forms/#looping-over-the-form-s-fields"
      target="_blank"
      >Django docs on forms</a
    >:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="cp">{%</span> <span class="k">for</span> <span class="nv">field</span> <span class="k">in</span> <span class="nv">form</span> <span class="cp">%}</span><span class="x"></span>
<span class="x">    &lt;div class="ctrlHolder </span><span class="cp">{%</span> <span class="k">if</span> <span class="nv">field.errors</span> <span class="cp">%}</span><span class="x">error</span><span class="cp">{%</span> <span class="k">endif</span> <span class="cp">%}</span><span class="x">"&gt;</span>
<span class="x">        </span><span class="cp">{%</span> <span class="k">for</span> <span class="nv">error</span> <span class="k">in</span> <span class="nv">field.errors</span> <span class="cp">%}</span><span class="x"></span>
<span class="x">            &lt;p class="errorField"&gt;</span>
<span class="x">                &lt;strong&gt;</span><span class="cp">{{</span> <span class="nv">error</span> <span class="cp">}}</span><span class="x">&lt;/strong&gt;</span>
<span class="x">            &lt;/p&gt;       </span>
<span class="x">        </span><span class="cp">{%</span> <span class="k">endfor</span> <span class="cp">%}</span><span class="x"></span>
<span class="x">        </span><span class="cp">{{</span> <span class="nv">field.label_tag</span> <span class="cp">}}</span><span class="x"></span>
<span class="x">        </span><span class="cp">{{</span> <span class="nv">field</span> <span class="cp">}}</span><span class="x"></span>
<span class="x">        </span><span class="cp">{%</span> <span class="k">if</span> <span class="nv">field.help_text</span> <span class="cp">%}</span><span class="x"></span>
<span class="x">        &lt;p class="formHint"&gt;</span>
<span class="x">            </span><span class="cp">{{</span> <span class="nv">field.help_text</span> <span class="cp">}}</span><span class="x"></span>
<span class="x">        &lt;/p&gt;</span>
<span class="x">        </span><span class="cp">{%</span> <span class="k">endif</span> <span class="cp">%}</span><span class="x"></span>

<span class="x"> &lt;/div&gt;</span>
<span class="cp">{%</span> <span class="k">endfor</span> <span class="cp">%}</span><span class="x"></span>
</code></pre>
  </div>
  <p>Using it was trivial, you just wrote out:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="cp">{%</span> <span class="k">load</span> <span class="nv">uni_form</span> <span class="cp">%}</span><span class="x"></span>

<span class="x">&lt;form&gt;</span>
<span class="x"> </span><span class="cp">{{</span> <span class="nv">form</span><span class="o">|</span><span class="nf">as_uni_form</span> <span class="cp">}}</span><span class="x"></span>
<span class="x">&lt;/form&gt;</span>
</code></pre>
  </div>
  <h1 id="days-of-django-uni-form">Days of django-uni-form</h1>
  <p>
    Leading up to PyCon 2009 James Tauber suggested some things that lead to the
    <a
      href="http://django-uni-form.readthedocs.org/en/latest/concepts.html#form-helpers"
      target="_blank"
      >FormHelpers</a
    >, and we hammered out the API on IRC. We knew it crossed the rigid lines
    between Model-View-Template, but sometimes it's advantageous to break a few
    rules and abstractions in order to get better things down the road
  </p>
  <p>
    At PyCon 2009 with the mentoring of Jannis, James, and
    <a href="http://twitter.com/brosner" target="_blank">Brian Rosner</a>, I
    moved the project from google code to
    <a href="https://github.com/pydanny/django-uni-form" target="_blank"
      >Github</a
    >. Jannis released it on
    <a href="http://pypi.python.org/pypi/" target="_blank">PyPI</a> and I
    followed the pattern he showed me for two years. Yeah, I learned tons under
    those guys.
  </p>
  <p>
    After PyCon 2009 a pull request with the
    <a
      href="http://django-uni-form.readthedocs.org/en/latest/helpers.html#layouts"
      target="_blank"
      >Layout</a
    >
    helper was provided. It took some work to make it pass all the tests and use
    cases, but the end result was definition of form layout in the Python. This
    broke the rigid battle lines of Model-View-Template and left purists
    screaming in agony, but it certainly made working with forms in Django
    trivially easy.
  </p>
  <p>
    Lots of people started to use the project across projects like Pinax and
    organizations like NASA, <a href="http://pbs.org" target="_blank">PBS</a>,
    Discovery Channel, various newspapers and many others. Lots of pull requests
    came in and the features grew.
  </p>
  <p>
    In 2010,
    <a href="http://twitter.com/arowla" target="_blank">Alice Rowland</a>
    submitted the first
    <a href="http://sphinx.pocoo.org/" target="_blank">Sphinx</a> docs, and it
    was her work that really helped get me started on doing lots of Sphinx work.
  </p>
  <p>
    And, all the way into 2011, pull requests for Django Form Sets started to
    come rolling in, and almost none were of acceptable quality. They never came
    with documentation, tests, and almost always broke existing tests really
    hard. Since I'm not a huge fan of Django FormSets, I didn't want to put in a
    ton of effort making them work. I believe one of them was pretty good, but
    life was crazy busy at the time and I let it slide. Apologies to whoever it
    was gave me a working FormSet pull request with documentation, tests, and
    working code.
  </p>
  <p>
    Long periods were going by without new versions. I admit I often slow about
    accepting pull requests. Life was busy and reviewing the incoming code took
    a lot of time. Browser cross-checking, running tests, and more was really
    time consuming. I tried to get others to become co-leads on the project, but
    invariably they didn't have time to do it. Note: If someone asks you to
    co-lead something, respond in 24 hours.
  </p>
  <h1 id="enter-miguel-araujo">Enter Miguel Araujo</h1>
  <p>
    After PyCon 2011, when there was some unpleasant stress in my life, I woke
    up cranky one morning and mouthed off on twitter to this guy who asked me to
    accept a pull request on django-uni-form. This guy tweeted back to me saying
    I ought to be nicer since I had a library people liked.
  </p>
  <p>He was right.</p>
  <p>
    I apologized to the guy (<a
      href="http://twitter.com/maraujop"
      target="_blank"
      >Miguel Araujo</a
    >) and remembered my manners. Over the next couple of months we chatted via
    Twitter and Github's messaging system. He was smart, trustworthy, and
    passionate about everything he did. I knew I had found my co-lead. He
    responded promptly and I gave him commit rights.
  </p>
  <p>
    Working together (with him doing the vast majority of the work), we moved
    the project into new releases. The architecture and design changed, driven
    by discussions we had together. The code was cleaned up, gnarly bits in
    there to support old versions of Python and Django kicked out, and the
    documentation revised. The project had new life!
  </p>
  <p>
    The only blip I saw with Miguel is my own fault of sometimes being too nice
    as a project leader when it comes to accepting pull requests.
    <a
      href="http://django-uni-form.readthedocs.org/en/latest/contributing.html#how-to-get-your-pull-request-accepted"
      target="_blank"
      >I believe pull requests should be really atomic</a
    >
    - for one thing and one thing only with support tests and documentation.
    Otherwise it becomes nigh impossible to incorporate them and these days I
    reject multi-purpose pull requests. One pull request in particular took a
    huge amount of debate and discussion to work in. I think after that Miguel
    is much better at being upfront at the beginning about rejecting pull
    requests with giant scopes.
  </p>
  <p>
    During all this I asked Miguel to take over the project, he accepted, and
    <a
      href="https://pydanny.blogspot.com/2011/06/announcing-django-uni-form-080-beta.html"
      target="_blank"
      >I even blogged my announcement his role as project leader</a
    >. Miguel is indeed very nice and after that fact he asked me to remain on
    board as co-lead.
  </p>
  <p>
    We finally met in September of 2011 and co-presented on
    <a
      href="http://www.slideshare.net/pydanny/advanced-django-forms-usage"
      target="_blank"
      >Advanced Django Form Usage at DjangoCon 2011</a
    >. The deepest technical material we presented was authored by Miguel.
    During our research he uncovered at least one bug in Django and got an
    ancient bug closed. It was a great experience and I hope he'll co-present
    with me in the future.
  </p>
  <h1 id="django-uni-form-is-dead-long-live-django-crispy-forms">
    django-uni-form is dead, long live django-crispy-forms
  </h1>
  <p>
    The upside of django-uni-form is that it grew in features organically thanks
    to my own needs and general community effort. The downside of
    django-uni-form is that it grew in features organically thanks to my own
    needs and general community effort. In any long running project there is
    cruft and weird patterns that start to hurt after a while. django-uni-form
    was no different.
  </p>
  <p>
    So I'm making this absolutely official as of now.
    <strong>django-uni-form is at it's end of life</strong>. It's done and
    kaput. No more pull requests will be accepted and the issue tracker will be
    turned off shortly. Just so no one is mistaken:
  </p>
  <blockquote>
    <p>
      <strong>django-uni-form is deprecated. Use django-crispy-forms</strong>
    </p>
  </blockquote>
  <p>
    Miguel asked if he could start the project anew, under a different name. We
    both had been uncomfortable with the name <em>django-uni-form</em> for some
    time, especially since it had almost nothing to do with Uni-form anymore. In
    fact, I often using template overrides to avoid the Uni-form HTML layout -
    the most common alternative being
    <a href="http://twitter.github.com/bootstrap/" target="_blank"
      >Twitter Bootstrap</a
    >.
  </p>
  <p>
    We tossed around names for the project, but all of them were stupid,
    especially mine. We are both huge fans and users of
    <a href="https://github.com/brutasse/django-floppyforms" target="_blank"
      >django-floppyforms</a
    >
    (HTML5 form widget app), so my fiancee,
    <a href="http://audreymroy.com" target="_blank">Audrey Roy</a>, suggested
    django-crispy-forms. And lo, the project was named.
  </p>
  <p>
    Right now
    <a href="https://github.com/maraujop/django-crispy-forms" target="_blank"
      >django-crispy-forms</a
    >
    has an improved API, better performance, and supports both Twitter bootstrap
    forms 2.0 and UniForm. Adding new form layouts will be easier, and feature
    controls will be better.
  </p>
  <p>
    What you should be using now is
    <a href="https://github.com/maraujop/django-crispy-forms" target="_blank"
      >django-crispy-forms</a
    >. Don't worry about changing over as there are
    <a
      href="http://django-crispy-forms.readthedocs.org/en/d-0/migration.html"
      target="_blank"
      >migration instructions</a
    >
    on the
    <a href="http://django-crispy-forms.readthedocs.org/" target="_blank"
      >excellent documentation</a
    >.
  </p>
  <p>Try it. You'll like it. :-)</p>
  <p>Published: 2012-02-18 01:00</p>
  <p>
    Tags:

    <a href="/tag/django.html">django</a>
    <a href="/tag/python.html">python</a>
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
