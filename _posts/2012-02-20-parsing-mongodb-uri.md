---
date: 2012-02-20
tag:
  - python
  - mongodb
  - howto

author: Daniel Roy Greenfeld
location: California
title: Parsing MongoDB URI
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/parsing-mongodb-uri ">Parsing MongoDB URI</a>
    </div>
  </h1>
  <p>
    Rather than hard-code the configuration into a Python based settings file,
    when using a PaaS such as Heroku you want to pick up the MongoDB URI from
    the system settings. Here's what I do:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># get the dynamic elements from the MongoURI</span>
<span class="kn">import</span> <span class="nn">os</span>
<span class="kn">import</span> <span class="nn">re</span>
<span class="n">r</span> <span class="o">=</span> <span class="sa">r</span><span class="s1">'^mongodb\:\/\/(?P&lt;username&gt;[_\w]+):(?P&lt;password&gt;[\w]+)@(?P&lt;host&gt;[\.\w]+):(?P&lt;port&gt;\d+)/(?P&lt;database&gt;[_\w]+)$'</span>
<span class="n">regex</span> <span class="o">=</span> <span class="n">re</span><span class="o">.</span><span class="n">compile</span><span class="p">(</span><span class="n">r</span><span class="p">)</span>
<span class="n">mongolab_url</span> <span class="o">=</span> <span class="n">os</span><span class="o">.</span><span class="n">environ</span><span class="p">[</span><span class="s1">'MONGOLAB_URI'</span><span class="p">]</span>
<span class="n">match</span> <span class="o">=</span> <span class="n">regex</span><span class="o">.</span><span class="n">search</span><span class="p">(</span><span class="n">mongolab_url</span><span class="p">)</span>
<span class="n">data</span> <span class="o">=</span> <span class="n">match</span><span class="o">.</span><span class="n">groupdict</span><span class="p">()</span>

<span class="c1"># Save the data to settings</span>
<span class="n">MONGO_HOST</span> <span class="o">=</span> <span class="n">data</span><span class="p">[</span><span class="s1">'host'</span><span class="p">]</span>
<span class="n">MONGO_PORT</span> <span class="o">=</span> <span class="nb">int</span><span class="p">(</span><span class="n">data</span><span class="p">[</span><span class="s1">'port'</span><span class="p">])</span>
<span class="n">MONGO_NAME</span> <span class="o">=</span> <span class="n">data</span><span class="p">[</span><span class="s1">'username'</span><span class="p">]</span>
<span class="n">MONGO_DATABASE</span> <span class="o">=</span> <span class="n">data</span><span class="p">[</span><span class="s1">'database'</span><span class="p">]</span>
<span class="n">MONGO_PASSWORD</span> <span class="o">=</span> <span class="n">data</span><span class="p">[</span><span class="s1">'password'</span><span class="p">]</span>

<span class="c1"># Connect to MongoEngine</span>
<span class="kn">from</span> <span class="nn">mongoengine</span> <span class="kn">import</span> <span class="n">connect</span> <span class="k">as</span> <span class="n">me_connect</span>
<span class="n">me_connect</span><span class="p">(</span>
<span class="n">data</span><span class="p">[</span><span class="s1">'database'</span><span class="p">],</span>
<span class="n">host</span><span class="o">=</span><span class="n">data</span><span class="p">[</span><span class="s1">'host'</span><span class="p">],</span>
<span class="n">port</span><span class="o">=</span><span class="nb">int</span><span class="p">(</span><span class="n">data</span><span class="p">[</span><span class="s1">'port'</span><span class="p">]),</span>
<span class="n">username</span><span class="o">=</span><span class="n">data</span><span class="p">[</span><span class="s1">'username'</span><span class="p">],</span>
<span class="n">password</span><span class="o">=</span><span class="n">data</span><span class="p">[</span><span class="s1">'password'</span><span class="p">])</span>  
</code></pre>
  </div>
   
</div>
