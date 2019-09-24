---
date: 2012-08-15
tag:
  - python
  - django
  - djangodash
  - setup

author: Daniel Roy Greenfeld
location: California
title: Django Requirements 2012-08-15
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/django-reqs ">Django Requirements 2012-08-15</a>
    </div>
  </h1>
  <p>
    A little over three months ago
    <a
      href="https://pydanny.com/django-requirements-for-a-project "
      target="_blank"
      >I blogged about my preferred requirements</a
    >
    list. It's now nearly the eve of
    <a href="http://djangodash.com" target="_blank">Django Dash</a>, and I feel
    it's time to update the list. I'm going to bump the versions on some of the
    existing packages and add some new ones to the list.
  </p>
  <h1 id="new-packages">New Packages</h1>
  <h2 id="django-braces013httppypipythonorgpypidjango-braces">
    <a href="http://pypi.python.org/pypi/django-braces/" target="_blank"
      >django-braces==0.1.3</a
    >
  </h2>
  <p>
    Want to use Django Class Based Views but unhappy with the missing components
    like <code>LoginRequiredMixin</code>, <code>SelectRelatedMixin</code>, and
    even <code>StaffuserRequiredMixin</code>? Not to worry, as this library will
    make Django CBVs <strong>134% easier to use</strong>.
  </p>
  <h2 id="django-secure012httppypipythonorgpypidjango-secure">
    <a href="http://pypi.python.org/pypi/django-secure/" target="_blank"
      >django-secure==0.1.2</a
    >
  </h2>
  <p>
    Django is rather secure, but there is a checklist of things that the
    security experts want you to do. Save yourself forgetting something and use
    this library to do all those little things.
  </p>
  <h2 id="django-profiletools013httppypipythonorgpypidjango-profiletools">
    <a href="http://pypi.python.org/pypi/django-profiletools/" target="_blank"
      >django-profiletools==0.1.3</a
    >
  </h2>
  <p>
    Have you ever used the django-debug-toolbar and noticed that you did that
    same <code>request.user.get_profile()</code> call a dozen times? Ever want
    to just call that once? This library, by yours truly, resolves the issue. It
    loads the user's profile object once, and then passes it down the request
    chain.
  </p>
  <hr />
  <h1 id="existing-packages">Existing Packages</h1>
  <h2 id="django141httppypipythonorgpypidjango141">
    <a href="http://pypi.python.org/pypi/Django/1.4.1" target="_blank"
      >Django==1.4.1</a
    >
  </h2>
  <p>
    If you need sessions, forms, templates, and relational database models, then
    I can argue you've got the ideal
    <a href="http://djangoproject.com" target="_blank">Django</a> project. Make
    certain you are running the latest Django version (1.4.1). If you have any
    reason to stick to the Django 1.3 series, I advise bumping it up to Django
    1.3.2.
  </p>
  <h2 id="psycopg2245httppypipythonorgpypipsycopg2">
    <a href="http://pypi.python.org/pypi/psycopg2" target="_blank"
      >psycopg2==2.4.5</a
    >
  </h2>
  <p>
    This is the database connector to PostgreSQL, which is what you should be
    using. Django is known for playing 'nicer' with PostgreSQL than say...
    MySQL.
  </p>
  <h2 id="django-debug-toolbar094httppypipythonorgpypidjango-debug-toolbar">
    <a href="http://pypi.python.org/pypi/django-debug-toolbar" target="_blank"
      >django-debug-toolbar==0.9.4</a
    >
  </h2>
  <p>Because not using this tool is insane.</p>
  <h2 id="django-extensions08httppypipythonorgpypidjango-extensions">
    <a href="http://pypi.python.org/pypi/django-extensions" target="_blank"
      >django-extensions==0.8</a
    >
  </h2>
  <p>
    Because amongst other things this library gives you, I never want to write
    my own <code>TimeStampedModel</code> ever again. :-)
  </p>
  <h2 id="south076httppypipythonorgpypisouth">
    <a href="http://pypi.python.org/pypi/South" target="_blank">South==0.7.6</a>
  </h2>
  <p>
    Django gives you the freedom to migrate data in the way you want. The way I
    want to do it is via South.
  </p>
  <h2 id="django-registration080httppypipythonorgpypidjango-registration">
    <a href="http://pypi.python.org/pypi/django-registration" target="_blank"
      >django-registration==0.8.0</a
    >
  </h2>
  <p>The common go-to tool for non-Social registration.</p>
  <p>
    This is a very solid tool, but you do have to make your own templates or
    find someone's fork that has a copy of templates that match.
  </p>
  <h2 id="django-social-auth-074">django-social-auth== 0.7.4</h2>
  <p>
    Want to authenticate via Twitter, Facebook, or GitHub? Then use this very
    useful package.
  </p>
  <h2 id="django-floppyforms10httppypipythonorgpypidjango-floppyforms">
    <a href="http://pypi.python.org/pypi/django-floppyforms" target="_blank"
      >django-floppyforms==1.0</a
    >
  </h2>
  <p>
    An excellent tool for making your forms HTML5-ish out of the box. It allows
    full control of form rendering in the templates.
  </p>
  <h2 id="django-crispy-forms114httppypipythonorgpypidjango-crispy-forms">
    <a href="http://pypi.python.org/pypi/django-crispy-forms" target="_blank"
      >django-crispy-forms==1.1.4</a
    >
  </h2>
  <p>
    The child of my own django-uni-forms, this will let me create forms using
    div-based controls super fast, and do layout customizations if I need them.
  </p>
  <h2
    id="django-heroku-postgresify02httppypipythonorgpypidjango-heroku-postgresify"
  >
    <a
      href="http://pypi.python.org/pypi/django-heroku-postgresify"
      target="_blank"
      >django-heroku-postgresify==0.2</a
    >
  </h2>
  <p>This tool makes getting the PostGreSQL settings out of Heroku trivial.</p>
  <h2
    id="django-heroku-memcacheify03httppypipythonorgpypidjango-heroku-memcacheify"
  >
    <a
      href="http://pypi.python.org/pypi/django-heroku-memcacheify"
      target="_blank"
      >django-heroku-memcacheify==0.3</a
    >
  </h2>
  <p>This tool makes getting the memcache settings for Heroku trivial.</p>
  <h2 id="gunicorn0146httppypipythonorgpypigunicorn">
    <a href="http://pypi.python.org/pypi/gunicorn" target="_blank"
      >gunicorn==0.14.6</a
    >
  </h2>
  <p>All the cool kids who play in devops swear by Gunicorn.</p>
  <hr />
  <h1 id="installing-the-above-packages">Installing the above packages</h1>
  <p>
    Never copy/paste these libraries directly into your projects. Do it the
    right way: <strong>use proper Python dependency management</strong>.
  </p>
  <p>
    Create a <code>requirements.txt</code> file and install them as proper
    dependencies. The file should contain the following text:
  </p>
  <pre><code>Django==1.4.1
South==0.7.5   
django-braces==0.1.3    
django-crispy-forms==1.1.4
django-debug-toolbar==0.9.4
django-extensions==0.8
django-floppyforms==1.0
django-social-auth==0.7.4
django-heroku-memcacheify==0.3
django-heroku-postgresify==0.2
django-profiletools==0.1.3
django-registration==0.8.0   
django-secure==0.1.2
gunicorn==0.14.2
psycopg2==2.4.5
</code></pre>
  <p>
    Once you have that, you install them thus in your
    <a href="http://pypi.python.org/pypi/virtualenv" target="_blank"
      >virtualenv</a
    >:
  </p>
  <pre><code>pip install -r requirements.txt
</code></pre>
  <p>Now that I have all this, it's time to code!</p>
  </div>
