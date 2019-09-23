---
date: 2012-07-09
tag:
  - python
  - django
  - wsgi
  - howto

author: Daniel Roy Greenfeld
location: California
title: Simple HTTP Basic Auth Wall
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/simple-basic-auth-wall.html">Simple HTTP Basic Auth Wall</a>
    </div>
  </h1>
  <p>
    I have a client who wanted their entire unlaunched public content site
    quickly but temporarily blocked for a short period of time. He wanted a
    universal password so he could send the site to reviewers, done quickly, and
    nothing else. In a few days the site will launch, and even if someone got
    through the authentication, nothing bad will happen except for an early
    visitor. So we determined this was a job for a very simple
    <a
      href="https://en.wikipedia.org/wiki/Basic_access_authentication"
      target="_blank"
      >Basic access authentication</a
    >
    implementation.
  </p>
  <p>
    I asked around and
    <a href="http://jacobian.org/" target="_blank">Jacob Kaplan-Moss</a> gave me
    this awesome snippet using
    <a href="http://pypi.python.org/pypi/barrel" target="_blank">barrel</a>
    that I pasted right into the bottom of the
    <a href="http://djangoproject.com" target="_blank">Django</a> 1.4-style
    application's <code>wsgi.py</code> file.
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># Add to the bottom of your wsgi.py file</span>
<span class="c1"># Don't forget to add barrel to your requirements!</span>
<span class="kn">from</span> <span class="nn">barrel</span> <span class="kn">import</span> <span class="n">cooper</span>

<span class="n">REALM</span> <span class="o">=</span> <span class="s2">"PRIVATE"</span>
<span class="n">USERS</span> <span class="o">=</span> <span class="p">[(</span><span class="s1">'spam'</span><span class="p">,</span> <span class="s1">'eggs'</span><span class="p">)]</span>

<span class="n">application</span> <span class="o">=</span> <span class="n">cooper</span><span class="o">.</span><span class="n">basicauth</span><span class="p">(</span><span class="n">users</span><span class="o">=</span><span class="n">USERS</span><span class="p">,</span> <span class="n">realm</span><span class="o">=</span><span class="n">REALM</span><span class="p">)(</span><span class="n">get_wsgi_application</span><span class="p">())</span>
</code></pre>
  </div>
  <p>
    This took all of 5 minutes to implement and launch. The result is that the
    first time you visit the site the login prompt appears. If you enter 'spam'
    and 'eggs' then you can see the site fine.
  </p>
  <p>It worked and the customer was happy.</p>
  <p>
    Will this block a concerted penetration attempt? Of course not. If the site
    has/had critical or identifying information it would be implemented with
    <a href="https://en.wikipedia.org/wiki/HTTPS" target="_blank">HTTPS</a>.
    Implementing a Django site with HTTPS is something I've done many times now,
    but this use case was 'do it fast, easy, and make it temporary'.
  </p>
  <p>
    <strong>Moral of the story:</strong> Pay attention to your requirements.
  </p>
  <p>
    <strong>Note :</strong> As this is just adding in some WSGI middleware, this
    should work without much modification in Flask, Pyramid, and other WSGI
    compliant web frameworks.
  </p>
  <p>Published: 2012-07-09 12:00:00</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/django.html">django</a>
    <a href="/tag/wsgi.html">wsgi</a>
    <a href="/tag/howto.html">howto</a>
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
