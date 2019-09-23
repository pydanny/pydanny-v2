---
date: 2018-02-01
tag:
  - python
  - django
  - django-rest-framework
  - cheatsheet
  - howto
  - coreapi

author: Daniel Roy Greenfeld
location: California
title: Implemementing Manual Schema with Django REST Framework
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/manual-schema-django-rest-framework.html"
        >Implemementing Manual Schema with Django REST Framework</a
      >
    </div>
  </h1>
  <p>
    <a
      href="https://www.pydanny.com/manual-schema-django-rest-framework.html"
      target="_blank"
      ><img
        alt="BitCoin and Two Scoops of Django!"
        src="https://raw.githubusercontent.com/pydanny/pydanny.github.com/master/static/drf.png"
    /></a>
  </p>
  <p>
    This is what will hopefully be the first in a series of reference articles
    for using
    <a href="http://www.coreapi.org/" target="_blank">Core API</a> libraries
    with Django REST Framework (<a
      href="http://www.django-rest-framework.org/"
      target="_blank"
      >DRF</a
    >).
  </p>
  <p>
    This is an extraction from an existing production view running Django
    1.11/2.0 on Python 3.6. The original code did something else, but for
    contract reasons I'm demonstrating this code with sending email.
  </p>
  <p>
    Please note that this article is very terse, with almost no description, no
    tests, and no URL routing. Just enough code so that if you have a decent
    understand of DRF, you can make custom views work with Core API.
  </p>
  <p>First, the serializer:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># serializers.py</span>
<span class="kn">from</span> <span class="nn">django.core.mail</span> <span class="kn">import</span> <span class="n">send_mail</span>
<span class="kn">from</span> <span class="nn">markdown</span> <span class="kn">import</span> <span class="n">markdown</span>
<span class="kn">from</span> <span class="nn">rest_framework</span> <span class="kn">import</span> <span class="n">serializers</span>

<span class="k">class</span> <span class="nc">EmailSerializer</span><span class="p">(</span><span class="n">serializers</span><span class="o">.</span><span class="n">Serializer</span><span class="p">):</span>
<span class="n">to_addresses</span> <span class="o">=</span> <span class="n">serializers</span><span class="o">.</span><span class="n">ListField</span><span class="p">(</span>
<span class="n">child</span><span class="o">=</span><span class="n">serializers</span><span class="o">.</span><span class="n">EmailField</span><span class="p">(),</span>
<span class="n">required</span><span class="o">=</span><span class="bp">True</span>
<span class="p">)</span>
<span class="n">from_email</span> <span class="o">=</span> <span class="n">serializers</span><span class="o">.</span><span class="n">EmailField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>  
 <span class="n">subject</span> <span class="o">=</span> <span class="n">serializers</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
<span class="n">message</span> <span class="o">=</span> <span class="n">serializers</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
<span class="n">htmlize</span> <span class="o">=</span> <span class="n">serializer</span><span class="o">.</span><span class="n">BooleanField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">False</span><span class="p">,</span> <span class="n">default</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>

    <span class="k">def</span> <span class="nf">create</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">validated_data</span><span class="p">):</span>
        <span class="k">if</span> <span class="n">validated_data</span><span class="p">[</span><span class="s1">'htmlize'</span><span class="p">]:</span>
            <span class="n">validated_data</span><span class="p">[</span><span class="s1">'html_message'</span><span class="p">]</span> <span class="o">=</span> <span class="n">markdown</span><span class="p">(</span><span class="n">validated_data</span><span class="p">[</span><span class="s1">'message'</span><span class="p">])</span>
        <span class="n">send_mail</span><span class="p">(</span><span class="o">**</span><span class="n">validated_data</span><span class="p">)</span>

</code></pre>
  </div>

  <p>Now the view:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># views.py</span>
<span class="kn">import</span> <span class="nn">coreapi</span>
<span class="kn">import</span> <span class="nn">coreschema</span>
<span class="kn">from</span> <span class="nn">rest_framework</span> <span class="kn">import</span> <span class="n">schemas</span>
<span class="kn">from</span> <span class="nn">rest_framework.views</span> <span class="kn">import</span> <span class="n">APIView</span>

<span class="kn">from</span> <span class="nn">.serializers</span> <span class="kn">import</span> <span class="n">EmailSerializer</span>

<span class="k">class</span> <span class="nc">EmailCreateAPIView</span><span class="p">(</span><span class="n">APIView</span><span class="p">):</span>
<span class="sd">""" Assumes you have set permissions and authentication in `settings.py`"""</span>
<span class="n">serializers</span> <span class="o">=</span> <span class="n">EmailSerializer</span>
<span class="n">schema</span> <span class="o">=</span> <span class="n">schemas</span><span class="o">.</span><span class="n">ManualSchema</span><span class="p">(</span><span class="n">fields</span><span class="o">=</span><span class="p">[</span>
<span class="n">coreapi</span><span class="o">.</span><span class="n">Field</span><span class="p">(</span>
<span class="s2">"to_addresses"</span><span class="p">,</span>
<span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">,</span>
<span class="n">location</span><span class="o">=</span><span class="s2">"form"</span><span class="p">,</span>
<span class="n">schema</span><span class="o">=</span><span class="n">coreschema</span><span class="o">.</span><span class="n">Array</span><span class="p">(</span>
<span class="n">description</span><span class="o">=</span><span class="s2">"List of email addresses"</span>
<span class="p">)</span>
<span class="p">),</span>
<span class="n">coreapi</span><span class="o">.</span><span class="n">Field</span><span class="p">(</span>
<span class="s2">"from_email"</span><span class="p">,</span>
<span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">,</span>
<span class="n">location</span><span class="o">=</span><span class="s2">"form"</span><span class="p">,</span>
<span class="n">schema</span><span class="o">=</span><span class="n">coreschema</span><span class="o">.</span><span class="n">String</span><span class="p">()</span>
<span class="p">),</span>
<span class="n">coreapi</span><span class="o">.</span><span class="n">Field</span><span class="p">(</span>
<span class="s2">"subject"</span><span class="p">,</span>
<span class="n">required</span><span class="o">=</span><span class="bp">False</span><span class="p">,</span>
<span class="n">location</span><span class="o">=</span><span class="s2">"form"</span><span class="p">,</span>
<span class="n">schema</span><span class="o">=</span><span class="n">coreschema</span><span class="o">.</span><span class="n">String</span><span class="p">()</span>
<span class="p">),</span>
<span class="n">coreapi</span><span class="o">.</span><span class="n">Field</span><span class="p">(</span>
<span class="s2">"message"</span><span class="p">,</span>
<span class="n">required</span><span class="o">=</span><span class="bp">False</span><span class="p">,</span>
<span class="n">location</span><span class="o">=</span><span class="s2">"form"</span><span class="p">,</span>
<span class="n">schema</span><span class="o">=</span><span class="n">coreschema</span><span class="o">.</span><span class="n">String</span><span class="p">()</span>
<span class="p">),</span>
<span class="p">])</span>

    <span class="k">def</span> <span class="nf">post</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">request</span><span class="p">,</span> <span class="n">format</span><span class="o">=</span><span class="bp">None</span><span class="p">):</span>
        <span class="n">serializer</span> <span class="o">=</span> <span class="n">EmailSerializer</span><span class="p">(</span><span class="n">data</span><span class="o">=</span><span class="n">request</span><span class="o">.</span><span class="n">data</span><span class="p">)</span>
        <span class="k">if</span> <span class="n">serializer</span><span class="o">.</span><span class="n">is_valid</span><span class="p">():</span>
            <span class="n">serializer</span><span class="o">.</span><span class="n">save</span><span class="p">()</span>
            <span class="k">return</span> <span class="n">Response</span><span class="p">(</span><span class="n">serializer</span><span class="o">.</span><span class="n">data</span><span class="p">,</span> <span class="n">status</span><span class="o">=</span><span class="n">status</span><span class="o">.</span><span class="n">HTTP_201_CREATED</span><span class="p">)</span>
        <span class="k">return</span> <span class="n">Response</span><span class="p">(</span><span class="n">serializer</span><span class="o">.</span><span class="n">errors</span><span class="p">,</span> <span class="n">status</span><span class="o">=</span><span class="n">status</span><span class="o">.</span><span class="n">HTTP_400_BAD_REQUEST</span><span class="p">)</span>

</code></pre>
  </div>

  <h1 id="stay-tuned">Stay Tuned!</h1>
  <p>
    I've decided to start posting my coding notes online again. These aren't
    tutorials, and may not be beginner friendly. Rather, these are code examples
    extracted from production systems that I'm putting up in a location I can
    reference easily that's 100% under my control.
  </p>
  <p>
    If you like what I'm doing, hit me up on
    <a href="https://www.patreon.com/danielroygreenfeld" target="_blank"
      >Patreon</a
    >.
  </p>
  <p>Published: 2018-02-01 20:00</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/django.html">django</a>
    <a href="/tag/django-rest-framework.html">django-rest-framework</a>
    <a href="/tag/cheatsheet.html">cheatsheet</a>
    <a href="/tag/howto.html">howto</a>
    <a href="/tag/coreapi.html">coreapi</a>
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
