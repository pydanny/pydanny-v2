---
date: 2012-05-10
tag: 
  - python
  - django
  - api
  - review

author: Daniel Roy Greenfeld
location: California
title: Choosing an API framework for Django
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/choosing-api-framework-for-django.html">Choosing an API framework for Django</a>
</div>
</h1>
<p>First off, out of the box, <a href="http://djangoproject.com" target="_blank">Django</a> lets you
construct API responses with a little work. All you need to do is
something like this:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># Copied from https://docs.djangoproject.com/en/1.4/topics/class-based-views/#more-than-just-html</span>
<span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">http</span>
<span class="kn">from</span> <span class="nn">django.utils</span> <span class="kn">import</span> <span class="n">simplejson</span> <span class="k">as</span> <span class="n">json</span>

<span class="k">class</span> <span class="nc">JSONResponseMixin</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>
    <span class="k">def</span> <span class="nf">render_to_response</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">context</span><span class="p">):</span>
        <span class="s2">"Returns a JSON response containing 'context' as payload"</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">get_json_response</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">convert_context_to_json</span><span class="p">(</span><span class="n">context</span><span class="p">))</span>

    <span class="k">def</span> <span class="nf">get_json_response</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">content</span><span class="p">,</span> <span class="o">**</span><span class="n">httpresponse_kwargs</span><span class="p">):</span>
        <span class="s2">"Construct an `HttpResponse` object."</span>
        <span class="k">return</span> <span class="n">http</span><span class="o">.</span><span class="n">HttpResponse</span><span class="p">(</span><span class="n">content</span><span class="p">,</span>
                                 <span class="n">content_type</span><span class="o">=</span><span class="s1">'application/json'</span><span class="p">,</span>
                                 <span class="o">**</span><span class="n">httpresponse_kwargs</span><span class="p">)</span>

    <span class="k">def</span> <span class="nf">convert_context_to_json</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">context</span><span class="p">):</span>
        <span class="s2">"Convert the context dictionary into a JSON object"</span>
        <span class="c1"># Note: This is *EXTREMELY* naive; in reality, you'll need</span>
        <span class="c1"># to do much more complex handling to ensure that arbitrary</span>
        <span class="c1"># objects -- such as Django model instances or querysets</span>
        <span class="c1"># -- can be serialized as JSON.</span>
        <span class="k">return</span> <span class="n">json</span><span class="o">.</span><span class="n">dumps</span><span class="p">(</span><span class="n">context</span><span class="p">)</span>
</code></pre></div>
<p>Once you get that mixin, use it in your views like so:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># modified from djangoproject.com sample code</span>
<span class="kn">from</span> <span class="nn">django.utils</span> <span class="kn">import</span> <span class="n">simplejson</span> <span class="k">as</span> <span class="n">json</span>

<span class="k">class</span> <span class="nc">JSONDetailView</span><span class="p">(</span><span class="n">JSONResponseMixin</span><span class="p">,</span> <span class="n">MyCustomUserView</span><span class="p">):</span>
    <span class="k">def</span> <span class="nf">convert_context_to_json</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">context</span><span class="p">):</span>

        <span class="n">context</span><span class="p">[</span><span class="s1">'objects'</span><span class="p">]</span> <span class="o">=</span> <span class="n">User</span><span class="o">.</span><span class="n">objects</span><span class="o">.</span><span class="n">values</span><span class="p">(</span><span class="s1">'first_name'</span><span class="p">,</span><span class="s1">'last_name'</span><span class="p">,</span><span class="s1">'is_active'</span><span class="p">)</span>
        <span class="k">return</span> <span class="n">json</span><span class="o">.</span><span class="n">dumps</span><span class="p">(</span><span class="n">context</span><span class="p">)</span>
</code></pre></div>
<p>This works pretty well in a number of simple cases, but doing things
like pagination, posting of data, metadata, API discovery, and other
important things ends up being a bit more work. This is where the
resource oriented API frameworks come in.</p>
<h1 id="what-makes-a-decent-api-framework">What makes a decent API Framework?</h1>
<p>These features:</p>
<ul>
<li>pagination</li>
<li>posting of data with validation</li>
<li>Publishing of metadata along with querysets</li>
<li>API discovery</li>
<li>proper HTTP response handling</li>
<li>caching</li>
<li>serialization</li>
<li>throttling</li>
<li>permissions</li>
<li>authentication</li>
</ul>
<p>Proper API frameworks also need:</p>
<ul>
<li>Really good test coverage of their code</li>
<li>Decent performance</li>
<li>Documentation</li>
<li>An active community to advance and support the framework</li>
</ul>
<p>If you take these factors, at this time there are only two API
frameworks worth using, <a href="#django-tastypie">django-tastypie</a> and
<a href="#django-rest-framework">django-rest-framework</a>.</p>
<h1 id="which-one-is-better-django-tastypie-or-django-rest-framework">Which one is better? django-tastypie or django-rest-framework?</h1>
<p>I say they are equal.</p>
<p>You simply can't go wrong with either one. The authors and communities
behind both of them are active, the code is solid and tested. And here
are my specific thoughts about both of them:</p>
<h1 id="django-tastypie">django-tastypie</h1>
<p>Using django-tastypie is like playing with pure Python while using the
Django ORM. I find it very comfortable. Seems really fast too. The
documentation is incredible, and I rarely have any problems figuring
anything out. It also supports OAuth 1.0a out of the box, which is
mighty awesome these days.</p>
<p>In fact, I wrote a custom OAuth2 handler for django-tastypie for
<a href="http://consumer.io" target="_blank">consumer.io</a> that I'm working to extract for
publication.</p>
<h1 id="django-rest-framework">django-rest-framework</h1>
<p>As it's based off Django 1.3 style Class Based Views (CBVs), it has a
very familiar pattern. Actually, because of the quality of the
documentation, I really prefer using django-rest-framework CBVs more
than using Django's actual CBVs.</p>
<p>Maybe I should make an HTML renderer for django-rest-framework? :-)</p>
<h1 id="but-what-about-django-piston">But what about django-piston?</h1>
<p><strong>Don't use django-piston</strong>.</p>
<p>I don't want to say anything negative, but let's face it:
<strong>django-piston is dead</strong>. Besides a critical security release last
year, nothing has been done for it in about 3 years. The documentation
is weak, the code mostly untested, and the original author left. He has
gone on to do some amazing things. Django-piston was amazing in its
time, but its time has passed and so should you.</p>
<p>The only reason for using django-piston for years has been that it
supported OAuth, but django-tastypie now addresses that use case. I've
used django-tastypie's basic OAuth class and rolled custom
Authentication modules to support some extra OAuth flavors and found it
wonderful.</p>
<p>Use django-tastypie or django-rest-framework instead. You'll be much,
much happier for it.</p>
<hr/>
<p><a href="http://news.ycombinator.com/item?id=3954314" target="_blank">Discuss this on Hacker
News</a></p>
<p>Published: 2012-05-10 08:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/django.html">django</a>
<a href="/tag/api.html">api</a>
<a href="/tag/review.html">review</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>