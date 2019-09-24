---
date: 2012-07-28
tag:
  - python
  - django
  - howto
  - class-based-views

author: Daniel Roy Greenfeld
location: California
title: Django Update View without slug in the url
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/django-update-view-no-slug "
        >Django Update View without slug in the url</a
      >
    </div>
  </h1>
  <p>
    Today I wanted to use the Django Class Based View (CBV) UpdateView but
    without a slug identifier in the URL. For example, instead of
    <code>/profiles/pydanny/</code> I would go to
    <code>/my-crazy-profile/</code>. Also, I needed to force authentication.
  </p>
  <p>
    I've done this with Django functional views a few times times, but today I
    did it in Django. This is what I did:
  </p>
  <h1 id="1-added-django-braces-to-my-project">
    1. Added django-braces to my project
  </h1>
  <p>
    <a href="https://twitter.com/kennethlove" target="_blank">Kenneth Love</a>
    and <a href="https://twitter.com/tehjones" target="_blank">Chris Jones</a>'
    awesome
    <a href="https://github.com/brack3t/django-braces/" target="_blank"
      >django-braces</a
    >
    package has some very handy mixins for working with Django CBVs. Kenneth and
    Chris really understand CBVs, specifically on how to extend them, and have
    provided a bunch of really useful utility methods in the django-braces
    library. Yeah, I could figure this stuff out on my own, but since those guys
    already did the hard work I might as well just lean on them.
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code>pip install django-braces<span class="o">==</span><span class="m">0</span>.1.3
</code></pre>
  </div>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># settings.py</span>
<span class="n">INSTALLED_APPS</span> <span class="o">=</span> <span class="p">(</span>
<span class="o">...</span>
<span class="s1">'braces'</span><span class="p">,</span>
<span class="o">...</span>
<span class="p">)</span>
</code></pre>
  </div>
  <h1 id="2-wrote-the-view">2. Wrote the view</h1>
  <p>
    Assuming a very simple profile Model and Form (which they weren't - but
    that's not what this post is about), this is how I implemented the view:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># profiles/views.py</span>
<span class="kn">from</span> <span class="nn">django.views.generic</span> <span class="kn">import</span> <span class="n">UpdateView</span>

<span class="kn">from</span> <span class="nn">braces.views</span> <span class="kn">import</span> <span class="n">LoginRequiredMixin</span> <span class="c1"># handles authentication</span>

<span class="kn">from</span> <span class="nn">profiles.forms</span> <span class="kn">import</span> <span class="n">ProfileForm</span>
<span class="kn">from</span> <span class="nn">profiles.models</span> <span class="kn">import</span> <span class="n">Profile</span>

<span class="k">class</span> <span class="nc">ProfileUpdateView</span><span class="p">(</span><span class="n">LoginRequiredMixin</span><span class="p">,</span> <span class="n">UpdateView</span><span class="p">):</span>

    <span class="n">form_class</span> <span class="o">=</span> <span class="n">ProfileForm</span>
    <span class="n">success_url</span> <span class="o">=</span> <span class="s2">"/my-crazy-profile/"</span>  <span class="c1"># You should be using reverse here</span>

    <span class="k">def</span> <span class="nf">get_object</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="n">Profile</span><span class="o">.</span><span class="n">objects</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">user</span><span class="o">=</span><span class="bp">self</span><span class="o">.</span><span class="n">request</span><span class="o">.</span><span class="n">user</span><span class="p">)</span>

</code></pre>
  </div>
  <h1 id="3-wrote-the-urlconf">3. Wrote the URLconf</h1>
  <p>The URL pretty much wrote itself:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.conf.urls.defaults</span> <span class="kn">import</span> <span class="n">patterns</span><span class="p">,</span> <span class="n">url</span>

<span class="kn">from</span> <span class="nn">profiles</span> <span class="kn">import</span> <span class="n">views</span>

<span class="n">urlpatterns</span> <span class="o">=</span> <span class="n">patterns</span><span class="p">(</span><span class="s2">""</span><span class="p">,</span>
<span class="n">url</span><span class="p">(</span><span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s1">'^my-crazy-profile/\$'</span><span class="p">,</span>
<span class="n">view</span><span class="o">=</span><span class="n">views</span><span class="o">.</span><span class="n">ProfileUpdateView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(),</span>
<span class="n">name</span><span class="o">=</span><span class="s1">'profile_update'</span><span class="p">),</span>
<span class="p">)</span>
</code></pre>
  </div>
  <h1 id="closing-thoughts">Closing Thoughts</h1>
  <p>
    For a while, I've used django-braces for anything that involves CBVs. I
    can't imagine working on projects using CBVs without them. In fact, some of
    the mixins such as <code>LoginRequiredMixin</code> are things that I could
    argue ought to be in core Django.
  </p>
  <p>
    This pattern really nails the sweet spot of Django CBVs. Thanks to the use
    of mixins and model forms, I get an amazing amount of stuff done in a 5 line
    CBV.
  </p>
  </div>
