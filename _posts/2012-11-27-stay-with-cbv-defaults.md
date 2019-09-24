---
date: 2012-11-27
tag:
  - python
  - rant
  - django
  - python
  - howto
  - class-based-views

author: Daniel Roy Greenfeld
location: California
title: Stay with the Django CBV defaults!
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/stay-with-cbv-defaults "
        >Stay with the Django CBV defaults!</a
      >
    </div>
  </h1>
  <p>
    One virtue of Django Class Based Views (CBVs) is that they come with pretty
    good default settings. The virtue of this is you can really pare your code
    down in size and complexity.
  </p>
  <p>
    For example, here is an implementation of CBVs based on a straight-forward
    Django model , <code>stuffage.models.Stuff</code>, that has a
    <code>get_absolute_url</code> method:
  </p>
  <p><strong>stuffage/views.py</strong>:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.views</span> <span class="kn">import</span> <span class="n">generic</span>

<span class="kn">from</span> <span class="nn">stuffage.models</span> <span class="kn">import</span> <span class="n">Stuff</span>

<span class="k">class</span> <span class="nc">StuffDetailView</span><span class="p">(</span><span class="n">generic</span><span class="o">.</span><span class="n">DetailView</span><span class="p">):</span>
<span class="n">model</span> <span class="o">=</span> <span class="n">Stuff</span>

<span class="k">class</span> <span class="nc">StuffListView</span><span class="p">(</span><span class="n">generic</span><span class="o">.</span><span class="n">ListView</span><span class="p">):</span>
<span class="n">model</span> <span class="o">=</span> <span class="n">Stuff</span>

<span class="k">class</span> <span class="nc">StuffCreateView</span><span class="p">(</span><span class="n">generic</span><span class="o">.</span><span class="n">CreateView</span><span class="p">):</span>
<span class="n">model</span> <span class="o">=</span> <span class="n">Stuff</span>

<span class="k">class</span> <span class="nc">StuffUpdateView</span><span class="p">(</span><span class="n">generic</span><span class="o">.</span><span class="n">UpdateView</span><span class="p">):</span>
<span class="n">model</span> <span class="o">=</span> <span class="n">Stuff</span>
</code></pre>
  </div>
  <p><strong>stuffage/urls.py</strong>:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.conf.urls.defaults</span> <span class="kn">import</span> <span class="n">patterns</span><span class="p">,</span> <span class="n">url</span><span class="p">,</span> <span class="n">include</span>

<span class="kn">from</span> <span class="nn">stuffage</span> <span class="kn">import</span> <span class="n">views</span>

<span class="n">urlpatterns</span> <span class="o">=</span> <span class="n">patterns</span><span class="p">(</span><span class="s2">""</span><span class="p">,</span>

    <span class="n">url</span><span class="p">(</span>
        <span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s2">"^create/$"</span><span class="p">,</span>
        <span class="n">view</span><span class="o">=</span><span class="n">views</span><span class="o">.</span><span class="n">StuffCreateView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(),</span>
        <span class="n">name</span><span class="o">=</span><span class="s2">"stuff_create"</span><span class="p">,</span>
    <span class="p">),</span>
    <span class="n">url</span><span class="p">(</span>
        <span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s2">"^update/(?P&lt;pk&gt;\d+)/$"</span><span class="p">,</span>
        <span class="n">view</span><span class="o">=</span><span class="n">views</span><span class="o">.</span><span class="n">StuffUpdateView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(),</span>
        <span class="n">name</span><span class="o">=</span><span class="s2">"stuff_update"</span><span class="p">,</span>
    <span class="p">),</span>
    <span class="n">url</span><span class="p">(</span>
        <span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s2">"^(?P&lt;pk&gt;\d+)/$"</span><span class="p">,</span>
        <span class="n">view</span><span class="o">=</span><span class="n">views</span><span class="o">.</span><span class="n">StuffDetailView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(),</span>
        <span class="n">name</span><span class="o">=</span><span class="s2">"stuff_detail"</span><span class="p">,</span>
    <span class="p">),</span>
    <span class="n">url</span><span class="p">(</span>
        <span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s2">"^$"</span><span class="p">,</span>
        <span class="n">view</span><span class="o">=</span><span class="n">views</span><span class="o">.</span><span class="n">StuffListView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(),</span>
        <span class="n">name</span><span class="o">=</span><span class="s2">"stuff_list"</span><span class="p">,</span>
    <span class="p">),</span>

<span class="p">)</span>
</code></pre>
  </div>
  <p>
    These four CBVs will default to the following three templates without any
    action on my part:
  </p>
  <pre><code>stuffage/stuff_detail  (StuffDetailView)
stuffage/stuff_form  (StuffCreateView, StuffUpdateView)
stuffage/stuff_list  (StuffListView)
</code></pre>
  <p>So easy I use a simple script to render all this code!</p>
  <h1 id="what-about-doing-this-all-in-the-urlspy">
    What about doing this all in the urls.py?
  </h1>
  <p>
    Yes, I could do this all in the urls.py, but real Django code involves doing
    some logic in views, no matter how skinny you try to make said views. While
    I'm a huge proponent of logic in fat models, invariably I'm adding to the
    view context, or doing something else that requires tweaking of CBV
    settings.
  </p>
  <h1 id="the-problem">The problem</h1>
  <p>One trait of developers is we like to <strong>tinker</strong>.</p>
  <p>
    Unfortunately, I keep seeing developers tinkering on the settings for Django
    CBVs without any reason besides tinkeringWhich means you get things like:
  </p>
  <p><strong>unfortunately tinkered stuffage/views.py</strong></p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># 1. Using template_name means extra code and extra developer lookup time.</span>
<span class="c1"># 2. Changing the context_object_name means extra code  and extra developer     </span>
<span class="c1">#       lookup time.</span>
<span class="k">class</span> <span class="nc">StuffDetailView</span><span class="p">(</span><span class="n">generic</span><span class="o">.</span><span class="n">DetailView</span><span class="p">):</span>
    <span class="n">model</span> <span class="o">=</span> <span class="n">Stuff</span>
    <span class="n">template_name</span> <span class="o">=</span> <span class="s2">"stuffage/stuffs "</span>
    <span class="n">context_object_name</span> <span class="o">=</span> <span class="s1">'stuff'</span>
</code></pre>
  </div>
  <p><strong>unfortunately tinkered stuffage/urls.py</strong></p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># 1. Logic into your URLConf should be kept to a minimum</span>
<span class="c1"># 2. Unless you are using the same view more than once, specifying the</span>
<span class="c1">#       template_name here is a waste of code. And makes it harder to</span>
<span class="c1">#       understand the view.</span>
<span class="n">url</span><span class="p">(</span>
    <span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s2">"^$"</span><span class="p">,</span>
    <span class="n">view</span><span class="o">=</span><span class="n">views</span><span class="o">.</span><span class="n">StuffListView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(</span><span class="n">template_name</span><span class="o">=</span><span class="s2">"stuffage/stuffs "</span><span class="p">),</span>
    <span class="n">name</span><span class="o">=</span><span class="s2">"stuff_list"</span><span class="p">,</span>
<span class="p">),</span>

<span class="c1"># No matter how fat your models get, you always end up extending all views,</span>
<span class="c1"># so this will have to be moved into the formal views.py at some point. So</span>
<span class="c1"># why not start with it in the views.py in the first place.</span>
<span class="n">url</span><span class="p">(</span>
<span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s2">"^\$"</span><span class="p">,</span>
<span class="n">view</span><span class="o">=</span><span class="n">ListView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(</span>
<span class="n">model</span><span class="o">=</span><span class="n">Stuff</span><span class="p">,</span>
<span class="n">template_name</span><span class="o">=</span><span class="s2">"stuffage/stuffs "</span><span class="p">),</span>
<span class="n">name</span><span class="o">=</span><span class="s2">"stuff_list"</span><span class="p">,</span>
<span class="p">),</span>
</code></pre>
  </div>
  <p>
    Don't forget you can also tinker/tweak formats and slug/pk identifier
    defaults, and a ton of other things that are part of Django CBVs. While this
    gives you great power, if misused that power can cause grief in terms of
    code obfuscation and the need for additional testing.
  </p>
  <p>
    My opinion is that these defaults were meant as a standard for the CBV to
    operate, upon which developers familiar with the Django CBV API could extend
    and expand their code for minimal effort. Yes, you can tweak them to match
    your preferred patterns, but that's extra work. Work you shouldn't be doing
    if you can avoid it.
  </p>
  <h1 id="my-advice">My Advice</h1>
  <p>
    Stick with the defaults and only modify behavior that actually needs to be
    modified. For example, if you want to show multiple versions of a ListView
    you might do something like:
  </p>
  <p>
    <strong
      >stuffage/urls.py with a pydanny approved use of template_name</strong
    >
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="n">url</span><span class="p">(</span>
    <span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s2">"^$"</span><span class="p">,</span>
    <span class="n">view</span><span class="o">=</span><span class="n">views</span><span class="o">.</span><span class="n">StuffListView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(),</span>
    <span class="n">name</span><span class="o">=</span><span class="s2">"stuff_list"</span><span class="p">,</span>
<span class="p">),</span>

<span class="c1"># Same view but with a template designed to show larger list items.</span>
<span class="n">url</span><span class="p">(</span>
<span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s2">"^large/\$"</span><span class="p">,</span>
<span class="n">view</span><span class="o">=</span><span class="n">views</span><span class="o">.</span><span class="n">StuffListView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(</span><span class="n">template_name</span><span class="o">=</span><span class="s2">"stuffage/stuff_list_large "</span><span class="p">),</span>
<span class="n">name</span><span class="o">=</span><span class="s2">"stuff_list_large"</span><span class="p">,</span>
<span class="p">),</span>
</code></pre>
  </div>
  <h1 id="summary">Summary</h1>
  <p>
    This is the pattern I follow when I build projects. I stick to the framework
    standard as much as possible. Since many systems rely on convention over
    configuration, this makes it easier and faster to develop projects, be it
    Django, Twisted, or some other tool.
  </p>
  <p>
    It's the work you can see in my
    <a href="http://petcheatsheets.com" target="_blank">recent</a>
    <a href="http://movehero.io" target="_blank">public</a>
    <a href="http://lacurrents.com" target="_blank">projects</a>, and what I
    want to port to long existing sites like
    <a href="http://djangopackages.com" target="_blank">Django Packages</a>.
  </p>
  </div>
