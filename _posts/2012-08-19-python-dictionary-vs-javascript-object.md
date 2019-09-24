---
date: 2012-08-19
tag:
  - python
  - javascript
  - vs

author: Daniel Roy Greenfeld
location: California
title: "Python dictionary vs JavaScript object: Dynamic Keys"
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/python-dictionary-vs-javascript-object "
        >Python dictionary vs JavaScript object: Dynamic Keys</a
      >
    </div>
  </h1>
  <p>
    One of the things I noticed a long time ago with JavaScript is that when you
    create objects you can define keys outside of strings:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;</span> <span class="kd">var</span> <span class="nx">o</span> <span class="o">=</span> <span class="p">{</span><span class="nx">city</span><span class="o">:</span> <span class="s2">"San Francisco"</span><span class="p">}</span>
  <span class="nb">Object</span>
</code></pre>
  </div>
  <p>
    In JavaScript, this is valid. In Python, you'll get a
    <code>NameError</code>:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="n">o</span> <span class="o">=</span> <span class="p">{</span><span class="n">city</span><span class="p">:</span> <span class="s2">"San Francisco"</span><span class="p">}</span>
<span class="n">Traceback</span> <span class="p">(</span><span class="n">most</span> <span class="n">recent</span> <span class="n">call</span> <span class="n">last</span><span class="p">):</span>
  <span class="n">File</span> <span class="s2">"&lt;input&gt;"</span><span class="p">,</span> <span class="n">line</span> <span class="mi">1</span><span class="p">,</span> <span class="ow">in</span> <span class="o">&lt;</span><span class="n">module</span><span class="o">&gt;</span>
<span class="ne">NameError</span><span class="p">:</span> <span class="n">name</span> <span class="s1">'city'</span> <span class="ow">is</span> <span class="ow">not</span> <span class="n">defined</span>
</code></pre>
  </div>
  <p>
    Normally this isn't too big of an issue, except when you want to use
    JavaScript to create object keys based off of values in a variable. Which
    means that while this code works fine in Python...
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="n">region_name</span> <span class="o">=</span> <span class="s1">'state'</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">o</span> <span class="o">=</span> <span class="p">{</span><span class="n">region_name</span><span class="p">:</span> <span class="s2">"Californa"</span><span class="p">,</span> <span class="s2">"city"</span><span class="p">:</span> <span class="s2">"San Francisco"</span><span class="p">}</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">o</span><span class="p">[</span><span class="s2">"state"</span><span class="p">]</span>
<span class="s1">'Californa'</span>
</code></pre>
  </div>
  <p>...it fails in JavaScript:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;</span> <span class="kd">var</span> <span class="nx">region_name</span> <span class="o">=</span> <span class="s1">'state'</span>
  <span class="s2">"state"</span>
<span class="o">&gt;</span> <span class="kd">var</span> <span class="nx">o</span> <span class="o">=</span> <span class="p">{</span><span class="nx">region_name</span><span class="o">:</span> <span class="s2">"Californa"</span><span class="p">,</span> <span class="s2">"city"</span><span class="o">:</span> <span class="s2">"San Francisco"</span><span class="p">}</span>
  <span class="nb">Object</span>
<span class="o">&gt;</span> <span class="nx">o</span><span class="p">[</span><span class="s2">"state"</span><span class="p">]</span>
  <span class="kc">undefined</span>
<span class="o">&gt;</span> <span class="nx">o</span><span class="p">[</span><span class="s2">"region_name"</span><span class="p">]</span>
  <span class="s2">"Californa"</span>
</code></pre>
  </div>
  <p>
    What this means is that if you want to define object keys dynamically in
    JavaScript, you need to add an extra line(s) of code:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;</span> <span class="kd">var</span> <span class="nx">region_name</span> <span class="o">=</span> <span class="s2">"state""</span>
<span class="s2">  "</span><span class="nx">state</span><span class="s2">"</span>
<span class="s2">&gt; var o = {"</span><span class="nx">city</span><span class="s2">": "</span><span class="nx">San</span> <span class="nx">Francisco</span><span class="s2">"}</span>
<span class="s2">  Object     </span>
<span class="s2">&gt; o[region_name] = "</span><span class="nx">California</span><span class="s2">" // Add dynamic key here</span>
<span class="s2">  "</span><span class="nx">California</span><span class="s2">"</span>
<span class="s2">&gt; o["</span><span class="nx">state</span><span class="s2">"]</span>
<span class="s2">  "</span><span class="nx">California</span><span class="err">"</span>
</code></pre>
  </div>
  <h1 id="summary">Summary</h1>
  <ul>
    <li>
      Python is consistent in how it deals with named objects. If you haven't
      named something, Python throws the <code>NameError</code>.
    </li>
    <li>
      JavaScript seems to send out an <code>undefined</code> unless you are
      defining an object.
    </li>
  </ul>
  </div>
