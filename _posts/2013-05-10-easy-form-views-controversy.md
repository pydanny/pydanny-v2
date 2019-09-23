---
date: 2013-05-10
tag:
  - python
  - django
  - howto

author: Daniel Roy Greenfeld
location: California
title: The Easy Form Views Pattern Controversy
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/easy-form-views-controversy.html"
        >The Easy Form Views Pattern Controversy</a
      >
    </div>
  </h1>
  <p>
    In the summer of 2010
    <a href="http://twitter.com/fwiles" target="_blank">Frank Wiles</a> of
    <a href="http://revsys.com" target="_blank">Revsys</a> exposed me to what I
    later called the "<strong>Easy Form Views</strong>" pattern when creating
    Django form function views. I used this technique in a variety of places,
    including
    <a href="https://www.djangopackages.com" target="_blank">Django Packages</a>
    and the documentation for django-uni-form (which is rebooted as
    <a href="https://github.com/maraujop/django-crispy-forms" target="_blank"
      >django-crispy-forms</a
    >). At DjangoCon 2011
    <a href="http://tothinkornottothink.com/" target="_blank">Miguel Araujo</a>
    and I opened our
    <a href="http://lanyrd.com/2011/djangocon-us/shbrd/" target="_blank"
      >Advanced Django Forms Usage</a
    >
    talk at DjangoCon 2011 with this technique. It's a pattern that reduces the
    complexity of using forms in Django function-based views by flattening the
    form handling code.
  </p>
  <h1 id="how-the-easy-form-views-pattern-works">
    How the Easy Form Views pattern works
  </h1>
  <p>
    Normally, function-based views in Django that handle form processing look
    something like this:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="k">def</span> <span class="nf">my_view</span><span class="p">(</span><span class="n">request</span><span class="p">,</span> <span class="n">template_name</span><span class="o">=</span><span class="s2">"my_app/my_form.html"</span><span class="p">):</span>

    <span class="k">if</span> <span class="n">request</span><span class="o">.</span><span class="n">method</span> <span class="o">==</span> <span class="s1">'POST'</span><span class="p">:</span>
        <span class="n">form</span> <span class="o">=</span> <span class="n">MyForm</span><span class="p">(</span><span class="n">request</span><span class="o">.</span><span class="n">POST</span><span class="p">)</span>
        <span class="k">if</span> <span class="n">form</span><span class="o">.</span><span class="n">is_valid</span><span class="p">():</span>
            <span class="n">do_x</span><span class="p">()</span> <span class="c1"># custom logic here</span>
            <span class="k">return</span> <span class="n">redirect</span><span class="p">(</span><span class="s1">'home'</span><span class="p">)</span>
    <span class="k">else</span><span class="p">:</span>
        <span class="n">form</span> <span class="o">=</span> <span class="n">MyForm</span><span class="p">()</span>
    <span class="k">return</span> <span class="n">render</span><span class="p">(</span><span class="n">request</span><span class="p">,</span> <span class="n">template_name</span><span class="p">,</span> <span class="p">{</span><span class="s1">'form'</span><span class="p">:</span> <span class="n">form</span><span class="p">})</span>

</code></pre>
  </div>
  <p>In contrast, the Easy Form Views pattern works like this:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="k">def</span> <span class="nf">my_view</span><span class="p">(</span><span class="n">request</span><span class="p">,</span> <span class="n">template_name</span><span class="o">=</span><span class="s2">"my_app/my_form.html"</span><span class="p">):</span>

    <span class="n">form</span> <span class="o">=</span> <span class="n">MyForm</span><span class="p">(</span><span class="n">request</span><span class="o">.</span><span class="n">POST</span> <span class="ow">or</span> <span class="bp">None</span><span class="p">)</span>
    <span class="k">if</span> <span class="n">form</span><span class="o">.</span><span class="n">is_valid</span><span class="p">():</span>
        <span class="n">do_x</span><span class="p">()</span> <span class="c1"># custom logic here</span>
        <span class="k">return</span> <span class="n">redirect</span><span class="p">(</span><span class="s1">'home'</span><span class="p">)</span>
    <span class="k">return</span> <span class="n">render</span><span class="p">(</span><span class="n">request</span><span class="p">,</span> <span class="n">template_name</span><span class="p">,</span> <span class="p">{</span><span class="s1">'form'</span><span class="p">:</span> <span class="n">form</span><span class="p">})</span>

</code></pre>
  </div>
  <p>
    The way this works is that the <code>django.http.HttpRequest</code> object
    has a POST attribute that defaults to an empty dictionary-like object, even
    if the request's method is equal to "GET". Since we know that request.POST
    exists in every Django view, and os at least as an empty dictionary-like
    object, we can skip the <code>request.method == 'POST'</code> by doing a
    simple boolean check on the <code>request.POST</code> dictionary.
  </p>
  <p>In other words:</p>
  <ul>
    <li>
      If <code>request.POST</code> dictionary evaluates as <code>True</code>,
      then instantiate the form bound with <code>request.POST</code>.
    </li>
    <li>
      If <code>the request.POST</code> dictionary evaluates as
      <code>False</code>, then instantiate an unbound form.
    </li>
  </ul>
  <p>
    Great! Faster to write and shallower code! What could possibly be wrong with
    that?
  </p>
  <h1 id="the-controversy">The Controversy</h1>
  <p>
    Before you jump to convert all your function based forms to this pattern,
    consider the following argument raised against it by a good friend:
  </p>
  <blockquote>
    <p>
      This one of those things where "empty dictionary and null both evaluate as
      false" can bite you.
    </p>
    <p>
      There's a difference between "There is no POST data", and "This wasn't a
      POST".
    </p>
    <p>
      -- by
      <a href="http://cecinestpasun.com/" target="_blank"
        >Russell Keith-Magee</a
      >
      (paraphrased)
    </p>
  </blockquote>
  <p>
    The problem he is talking about is data besides
    <code>multipart/form-data</code> or
    <code>application/x-www-form-urlencoded</code> would still end up in the
    <code>request.POST</code> dictionary-like attribute.
  </p>
  <p>
    Where is the controversy? Well, I didn't write a retraction until now.
    Arguably I should have done it earlier. However, since I never ran into the
    edge case, I didn't see the need. Yet when it comes down to it, the "Easy
    Forms" approach has an implicit assumption about the incoming object, which
    in Python terms is not a good thing.
  </p>
  <h1 id="getting-bit-by-the-easy-form-views-method">
    Getting bit by the Easy Form Views method
  </h1>
  <p>Here's how it happens:</p>
  <p>
    <strong>Before Django 1.5</strong> HTTP methods such as DELETE or PUT would
    see their data placed into Django's <code>request.POST</code> attribute. The
    form would fail, but it might not be clear to the developer or user why.
    HTTP GET and POST methods work as expected.
  </p>
  <p>
    <strong>For Django 1.5 (and later)</strong> if a non-POST comes in then the
    form fails because request.POST is empty. HTTP GET and POST methods also
    work as expected.
  </p>
  <h1 id="conclusion">Conclusion</h1>
  <p>
    Going forward, I prefer to use Django's class-based views or
    <a href="http://djangorestframework.com" target="_blank"
      >Django Rest Framework</a
    >
    which make the issue of this pattern moot. When I do dip into function-based
    views handling classic HTML forms, I'm leery of using this pattern anymore.
    Yes, it is an edge case, but to inaccurately paraphrase Russell, "edge cases
    are where you get bit".
  </p>
  <p>
    What I'm not going to do is rush to change existing views on existing
    projects. That's because personally I've yet to run into an actual problem
    with using this pattern. As they say, "<em
      >If it ain't broke, don't fix it.</em
    >" While I'm not saying my code isn't broken, I'm also aware that 'fixing'
    things that aren't reporting errors is a dangerous path to tread.
  </p>
  <p>
    Also, next time I get called on something by a person I respect, I'll
    respond more quickly. Nearly two years is too long a wait.
  </p>
  <p>
    <strong>Update:</strong> Changed some of the text to be more succinct and
    took out the leading sentence.
  </p>
  <p>Published: 2013-05-10 12:00:00</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/django.html">django</a>
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
