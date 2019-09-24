---
date: 2018-08-03
tag:
  - python
  - django
  - twoscoops

author: Daniel Roy Greenfeld
location: California
title: Stop Using Executable Code Outside of Version Control
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/using-executable-code-outside-version-control "
        >Stop Using Executable Code Outside of Version Control</a
      >
    </div>
  </h1>
  <p>
    There's an anti-pattern in the development world, and it's for using
    executable code as a means to store configuration values. In the Python
    universe, you sometimes see things like this in settings modules:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># Warning: This is an anti-pattern!</span>
<span class="k">try</span><span class="p">:</span>
    <span class="kn">from</span> <span class="nn">.local_settings</span> <span class="kn">import</span> <span class="o">*</span>
<span class="k">except</span> <span class="ne">ImportError</span><span class="p">:</span>
    <span class="k">pass</span>
</code></pre>
  </div>
  <p>
    What people do is have a <code>local_settings.py</code> file that has been
    identified in a <code>.gitignore</code> file. Therefore, for local
    development you have your project running through an
    <strong>executable code file outside of version control</strong>.
  </p>
  <p>
    If this sounds uncomfortable to you, then you are on the right track.
    Executable code <strong>always</strong> needs to be in version control.
  </p>
  <p>
    A better approach is to place secrets and keys into environment variables.
    If you don't like that, or can't use it due to your environment, stick those
    values into JSON, YAML, or TOML files.
  </p>
  <p>
    So what can happen if you allow the <code>local_settings</code> anti-pattern
    into your project?
  </p>
  <h3 id="the-local_settings-anti-pattern">
    The <code>local_settings</code> anti-pattern
  </h3>
  <p>
    The <code>local_settings</code> anti-pattern means that you can have
    executable code in production that usually can't be viewed by developers
    trying to debug problems. If you've ever experience it, this is one of the
    worst production debugging nightmares.
  </p>
  <h3 id="it-worked-fine-on-my-laptop">It worked fine on my laptop!</h3>
  <p>
    What works locally and tests successfully can throw subtle bugs that won't
    be discovered until it's too late. Here's a real-world example of what can
    happen that I helped resolve for a client last year:
  </p>
  <ol>
    <li>
      Project had been using a third-party package for slugification for years.
      Configuration done in settings.
    </li>
    <li>
      Developer decided to write their own slugification project. Worked great
      locally, so they made changes across the site to account for the new
      behavior.
    </li>
    <li>
      Tests did not account for edge cases in the new slugification library.
    </li>
    <li>
      Appeared to work in local development, staging, and even production.
    </li>
    <li>
      A few days later customers in certain regions of the world started to
      complain about records being unreachable.
    </li>
    <li>No one can figure out why production is behaving differently.</li>
  </ol>
  <p>
    I was brought in (and I billed them). First thing I check is for this sad
    code snippet in their settings modules
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># Warning: This is an anti-pattern!</span>
<span class="k">try</span><span class="p">:</span>
    <span class="kn">from</span> <span class="nn">.local</span> <span class="kn">import</span> <span class="o">*</span>
<span class="k">except</span> <span class="ne">ImportError</span><span class="p">:</span>
    <span class="k">pass</span>
</code></pre>
  </div>
  <p>
    They had <code>executable</code> code outside of version control. What
    worked for the developer, didn't work the same everywhere else. Enough that
    it caused subtle bugs that weren't caught by humans or formal tests. Subtle
    developer bugs grew into serious bugs when encountered by real users.
  </p>
  <p>
    And what was really bad is that these serious bugs were impossible to debug
    at first because the deployed code didn't match what was in someone's
    <code>local_settings.py</code> file.
  </p>
  <h3 id="but-i-wont-make-these-mistakes">But I won't make these mistakes!</h3>
  <p>
    People often say indignantly, "I'm not stupid like you, I don't make this
    kind of mistake."
  </p>
  <p>
    Yet about once a year for the past 20 years I resolve or help resolve an
    issue stemming from executable code that wasn't tracked in version control.
  </p>
  <p>
    I believe that all of us coders, no matter how talented and experienced, can
    and will make stupid mistakes. That's why good engineers/coders follow best
    practices - to help catch ourselves when we do something stupid. If you
    believe you can personally avoid making stupid mistakes in programming, I've
    got a bridge in New York City I can sell you.
  </p>
  <p>
    With all of this in mind, why not do the <code>smart</code> thing and put
    all executable code in version control? You can put your secrets and keys in
    environment variables or configuration files. Done! Argument over!
  </p>
  <h3 id="how-to-handle-location-specific-variables">
    How to handle location specific variables
  </h3>
  <p>
    Use either either environment variables or config files. Really. And don't
    take my word for it, look at all the deployment tools and hosting services
    that recommend it (all of them do).
  </p>
  <p>
    To do this, either figure out your own process for handling them or use a
    third-party package. Personally, for Django I like the simplicity of having
    this function in my various settings modules:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># Good code!</span>
<span class="kn">from</span> <span class="nn">django.core.exceptions</span> <span class="kn">import</span> <span class="n">ImproperlyConfigured</span>

<span class="k">def</span> <span class="nf">get_env_var</span><span class="p">(</span><span class="n">var_name</span><span class="p">):</span>
<span class="k">try</span><span class="p">:</span>
<span class="k">return</span> <span class="n">os</span><span class="o">.</span><span class="n">environ</span><span class="p">[</span><span class="n">var_name</span><span class="p">]</span>
<span class="k">except</span> <span class="ne">KeyError</span><span class="p">:</span>
<span class="n">error_msg</span> <span class="o">=</span> <span class="n">f</span><span class="s2">"Set the {var_name} environment variable"</span>
<span class="k">raise</span> <span class="n">ImproperlyConfigured</span><span class="p">(</span><span class="n">error_msg</span><span class="p">)</span>

<span class="n">SECRET_KEY</span> <span class="o">=</span> <span class="n">get_env_var</span><span class="p">(</span><span class="s2">"SECRET_KEY"</span><span class="p">)</span>
</code></pre>
  </div>

  <h3 id="i-wrote-a-book-to-stop-antipatterns">
    I wrote a book to stop antipatterns
  </h3>
  <p>
    In 2012 I kept getting offered rescue projects because people were using
    anti-patterns, especially this one. It was frustrating to see the same
    mistakes again and again. So I started to write a book,
    <a
      href="https://twoscoopspress.com/products/two-scoops-of-django-1-11"
      target="_blank"
      >Two Scoops of Django</a
    >, designed to instruct people on how not to fall into anti-patterns like
    the one described in this article.
  </p>
  <p>
    If you don't want to buy my
    <a
      href="https://twoscoopspress.com/products/two-scoops-of-django-1-11"
      target="_blank"
      >book</a
    >, please read and embrace the config section of
    <a href="https://12factor.net/config" target="_blank"
      >The Twelve Factor App</a
    >. Your future self will thank me for it.
  </p>
</div>
