---
date: 2016-05-26
tag:
  - python
  - django
  - cheatsheet
  - ppoftw
  - postgresql

author: Daniel Roy Greenfeld
location: California
title: Pretty Formatting JSON in the Django Admin
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/pretty-formatting-json-django-admin "
        >Pretty Formatting JSON in the Django Admin</a
      >
    </div>
  </h1>
  <p>
    Recently I was writing code to interact with a third-party API. The API
    changes frequently, especially the data contained in responses. However,
    that data has to be saved and periodically needs to be audited. I wanted a
    data model flexible enough to handle these periodic changes without a lot of
    anguish, yet queryable. Since the API serves out queryable JSON, this made
    it a no-brainer for using <code>django.contrib.postgres</code>'s JSONField.
  </p>
  <p>
    After a little bit of work, I had data samples to play with. Quickly my
    admin filled with chunks of JSON that looked something like this:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">{</span><span class="s2">"field_12"</span>: <span class="m">8</span>, <span class="s2">"field_16"</span>: <span class="m">4</span>, <span class="s2">"field_6"</span>: <span class="m">14</span>, <span class="s2">"field_7"</span>: <span class="m">13</span>, <span class="s2">"field_18"</span>: <span class="m">2</span>, <span class="s2">"field_2"</span>: <span class="m">18</span>, <span class="s2">"field_4"</span>: <span class="m">16</span>, <span class="s2">"field_15"</span>: <span class="m">5</span>, <span class="s2">"field_9"</span>: <span class="m">11</span>, <span class="s2">"field_3"</span>: <span class="m">17</span>, <span class="s2">"field_8"</span>: <span class="m">12</span>, <span class="s2">"field_11"</span>: <span class="m">9</span>, <span class="s2">"field_17"</span>: <span class="m">3</span>, <span class="s2">"field_10"</span>: <span class="m">10</span>, <span class="s2">"field_0"</span>: <span class="m">20</span>, <span class="s2">"field_1"</span>: <span class="m">19</span>, <span class="s2">"field_13"</span>: <span class="m">7</span>, <span class="s2">"field_5"</span>: <span class="m">15</span>, <span class="s2">"field_14"</span>: <span class="m">6</span><span class="o">}</span>
</code></pre>
  </div>
  <p>
    Kind of illegible, right? And that's a simple, flat example with just 20
    keys. Imagine if this were a nested dictionary with 100 or 200 fields. For
    reference, that's the kind of data that I had that makes this kind of
    display nigh useless.
  </p>
  <p>So I cooked up this quick fix:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">import</span> <span class="nn">json</span>
<span class="kn">from</span> <span class="nn">pygments</span> <span class="kn">import</span> <span class="n">highlight</span>
<span class="kn">from</span> <span class="nn">pygments.lexers</span> <span class="kn">import</span> <span class="n">JsonLexer</span>
<span class="kn">from</span> <span class="nn">pygments.formatters</span> <span class="kn">import</span> <span class="n">HtmlFormatter</span>

<span class="kn">from</span> <span class="nn">django.contrib</span> <span class="kn">import</span> <span class="n">admin</span>
<span class="kn">from</span> <span class="nn">django.utils.safestring</span> <span class="kn">import</span> <span class="n">mark_safe</span>

<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">APIData</span>

<span class="k">class</span> <span class="nc">APIDataAdmin</span><span class="p">(</span><span class="n">admin</span><span class="o">.</span><span class="n">ModelAdmin</span><span class="p">):</span>
<span class="n">readonly_fields</span> <span class="o">=</span> <span class="p">(</span><span class="s1">'data_prettified'</span><span class="p">,)</span>

    <span class="k">def</span> <span class="nf">data_prettified</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">instance</span><span class="p">):</span>
        <span class="sd">"""Function to display pretty version of our data"""</span>

        <span class="c1"># Convert the data to sorted, indented JSON</span>
        <span class="n">response</span> <span class="o">=</span> <span class="n">json</span><span class="o">.</span><span class="n">dumps</span><span class="p">(</span><span class="n">instance</span><span class="o">.</span><span class="n">data</span><span class="p">,</span> <span class="n">sort_keys</span><span class="o">=</span><span class="bp">True</span><span class="p">,</span> <span class="n">indent</span><span class="o">=</span><span class="mi">2</span><span class="p">)</span>

        <span class="c1"># Truncate the data. Alter as needed</span>
        <span class="n">response</span> <span class="o">=</span> <span class="n">response</span><span class="p">[:</span><span class="mi">5000</span><span class="p">]</span>

        <span class="c1"># Get the Pygments formatter</span>
        <span class="n">formatter</span> <span class="o">=</span> <span class="n">HtmlFormatter</span><span class="p">(</span><span class="n">style</span><span class="o">=</span><span class="s1">'colorful'</span><span class="p">)</span>

        <span class="c1"># Highlight the data</span>
        <span class="n">response</span> <span class="o">=</span> <span class="n">highlight</span><span class="p">(</span><span class="n">response</span><span class="p">,</span> <span class="n">JsonLexer</span><span class="p">(),</span> <span class="n">formatter</span><span class="p">)</span>

        <span class="c1"># Get the stylesheet</span>
        <span class="n">style</span> <span class="o">=</span> <span class="s2">"&lt;style&gt;"</span> <span class="o">+</span> <span class="n">formatter</span><span class="o">.</span><span class="n">get_style_defs</span><span class="p">()</span> <span class="o">+</span> <span class="s2">"&lt;/style&gt;&lt;br&gt;"</span>

        <span class="c1"># Safe the output</span>
        <span class="k">return</span> <span class="n">mark_safe</span><span class="p">(</span><span class="n">style</span> <span class="o">+</span> <span class="n">response</span><span class="p">)</span>

    <span class="n">data_prettified</span><span class="o">.</span><span class="n">short_description</span> <span class="o">=</span> <span class="s1">'data prettified'</span>

<span class="n">admin</span><span class="o">.</span><span class="n">site</span><span class="o">.</span><span class="n">register</span><span class="p">(</span><span class="n">APIData</span><span class="p">,</span> <span class="n">APIDataAdmin</span><span class="p">)</span>
</code></pre>
  </div>

  <p>
    The field remains the same, but we also get a display of nicely formatted
    data:
  </p>
  <p>
    <img
      alt="Admin Pretty JSON"
      class="align-center img-responsive"
      id="admin-pretty-json"
      src="https://www.pydanny.com/static/admin-pretty-json.png"
    />
    Much better!
  </p>
  <p>
    There may be a package out there that does this already, perhaps even using
    a JavaScript library like hightlight.js instead of pygments. If not, it
    shouldn't be hard to create one using
    <a
      href="https://www.pydanny.com/how-to-create-installable-django-packages "
      target="_blank"
      >Cookiecutter Django Package</a
    >. Let me know if you package this and I'll add it to this blog post.
  </p>
  <hr />
  <h1 id="see-you-at-pycon">See you at PyCon!</h1>
  <p>
    I'll be at PyCon with
    <a href="https://twitter.com/audreyr" target="_blank"
      >Audrey Roy Greenfeld</a
    >. You can easily find us at the
    <a href="https://github.com/audreyr/cookiecutter" target="_blank"
      >Cookiecutter</a
    >
    booth during the main conference days or at the
    <a
      href="https://us.pycon.org/2016/community/sprints/#cookiecutter"
      target="_blank"
      >Cookiecutter sprint</a
    >. Stop by and say hi!
  </p>
  </div>
