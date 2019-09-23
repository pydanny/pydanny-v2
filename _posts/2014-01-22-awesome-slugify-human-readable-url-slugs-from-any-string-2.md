---
date: 2014-01-22
tag:
  - python
  - django
  - unicode
  - i18n
  - ppoftw

author: Daniel Roy Greenfeld
location: California
title: "awesome-slugify: Human-readable URL slugs from any string (part 2)"
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/awesome-slugify-human-readable-url-slugs-from-any-string-2.html"
        >awesome-slugify: Human-readable URL slugs from any string (part 2)</a
      >
    </div>
  </h1>
  <p>
    In my previous
    <a
      href="https://pydanny.com/awesome-slugify-human-readable-url-slugs-from-any-string.html"
      target="_blank"
      >blog post</a
    >
    I covered using
    <a href="https://pypi.python.org/pypi/awesome-slugify" target="_blank"
      >awesome-slugify</a
    >
    to capture slugs in both ASCII and unicode. Today I'm covering the
    definition custom language <code>slugify</code> translation functions.
  </p>
  <h1 id="defining-custom-language-slugify-translation-functions">
    Defining Custom Language <code>slugify</code> Translation Functions
  </h1>
  <p>
    For those times we need ASCII representation of unicode characters, we can't
    always use the default unicode-to-ASCII mappings. A powerful feature of
    <strong>awesome-slugify</strong> is we can quickly and easily create our own
    translation functions. Just follow these two steps:
  </p>
  <ol>
    <li>
      Define a translation dictionary. Keys are the names of things you want
      translated, and the associated values are what the keys are translated
      into.
    </li>
    <li>
      Generate a translation function using
      <code>slugify.main.get_slugify()</code>.
    </li>
  </ol>
  <p>
    Explaining this in depth will take paragraphs of text, so I'll just
    demonstrate it using
    <a href="https://en.wikipedia.org/wiki/Emoji" target="_blank">emoji</a>:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># -*- coding: utf-8 -*-</span>
<span class="c1"># test_slugify_emoji.py</span>

<span class="kn">from</span> <span class="nn">slugify</span> <span class="kn">import</span> <span class="n">get_slugify</span>
<span class="kn">import</span> <span class="nn">pytest</span>

<span class="c1"># Step 1: Define the translation dictionary</span>
<span class="n">ALT*EMOJI</span> <span class="o">=</span> <span class="p">{</span>
<span class="sa">u</span><span class="s1">'ʘ‿ʘ'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'smiling'</span><span class="p">,</span>
<span class="sa">u</span><span class="s1">'ಠ*ಠ'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'disapproval'</span><span class="p">,</span>
<span class="sa">u</span><span class="s1">'♥‿♥'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'enamored'</span><span class="p">,</span>
<span class="sa">u</span><span class="s1">'♥'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'love'</span><span class="p">,</span>
<span class="p">}</span>

<span class="c1"># Step 2: Generate a translation function</span>
<span class="n">slugify_emoji</span> <span class="o">=</span> <span class="n">get_slugify</span><span class="p">(</span><span class="n">pretranslate</span><span class="o">=</span><span class="n">ALT_EMOJI</span><span class="p">)</span>

<span class="k">def</span> <span class="nf">test*basic_emoji</span><span class="p">():</span>
<span class="k">assert</span> <span class="n">slugify_emoji</span><span class="p">(</span><span class="sa">u</span><span class="s2">"ʘ‿ʘ"</span><span class="p">)</span> <span class="o">==</span> <span class="sa">u</span><span class="s2">"smiling"</span>
<span class="k">assert</span> <span class="n">slugify_emoji</span><span class="p">(</span><span class="sa">u</span><span class="s2">"ಠ*ಠ"</span><span class="p">)</span> <span class="o">==</span> <span class="sa">u</span><span class="s2">"disapproval"</span>

<span class="k">def</span> <span class="nf">test_sentence</span><span class="p">():</span>
<span class="n">txt</span> <span class="o">=</span> <span class="sa">u</span><span class="s2">"I ♥ Audrey Roy Greenfeld"</span>
<span class="k">assert</span> <span class="n">slugify_emoji</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span> <span class="o">==</span> <span class="sa">u</span><span class="s2">"I-love-Audrey-Roy-Greenfeld"</span>

<span class="k">if</span> <span class="vm">**name**</span> <span class="o">==</span> <span class="s2">"**main**"</span><span class="p">:</span>
<span class="n">pytest</span><span class="o">.</span><span class="n">main</span><span class="p">()</span>
</code></pre>
  </div>

  <p>
    <img
      alt="I ♥ your unicode smile"
      src="https://s3.amazonaws.com/pydanny/i-♥-your-unicode-smile.png"
    />
  </p>
  <h2 id="more-practical-applications">More Practical Applications</h2>
  <p>
    While writing an <strong>emoji</strong>-based translation function is fun,
    most of the time we need more practical translation functions. Built into
    <strong>awesome-slugify</strong> is a cyrillic translation function that
    works like this:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># -*- coding: utf-8 -*-</span>
<span class="c1"># test_slugify_cyrillic.py</span>
<span class="kn">from</span> <span class="nn">slugify</span> <span class="kn">import</span> <span class="n">get_slugify</span>
<span class="kn">import</span> <span class="nn">pytest</span>

<span class="c1"># The following code is nearly identical to the source code of</span>
<span class="c1"># awesome-slugify. All credit goes to Dmitry Voronin.</span>

<span class="c1"># Step 1: Define the translation dictionary</span>
<span class="n">ALT_CYRILLIC</span> <span class="o">=</span> <span class="p">{</span>
<span class="sa">u</span><span class="s1">'ё'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'e'</span><span class="p">,</span> <span class="c1"># instead of 'io' / 'yo'</span>
<span class="sa">u</span><span class="s1">'ж'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'j'</span><span class="p">,</span> <span class="c1"># instead of 'zh'</span>
<span class="sa">u</span><span class="s1">'у'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'y'</span><span class="p">,</span> <span class="c1"># instead of 'u'</span>
<span class="sa">u</span><span class="s1">'х'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'h'</span><span class="p">,</span> <span class="c1"># instead of 'kh'</span>
<span class="sa">u</span><span class="s1">'щ'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'sch'</span><span class="p">,</span> <span class="c1"># instead of 'shch'</span>
<span class="sa">u</span><span class="s1">'ю'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'u'</span><span class="p">,</span> <span class="c1"># instead of 'iu' / 'yu'</span>
<span class="sa">u</span><span class="s1">'я'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'ya'</span><span class="p">,</span> <span class="c1"># instead of 'ia'</span>
<span class="p">}</span>

<span class="c1"># Step 2: Generate a translation function</span>
<span class="n">slugify_ru</span> <span class="o">=</span> <span class="n">get_slugify</span><span class="p">(</span><span class="n">pretranslate</span><span class="o">=</span><span class="n">ALT_CYRILLIC</span><span class="p">)</span>

<span class="k">def</span> <span class="nf">test_some_cyrillic</span><span class="p">():</span>
<span class="n">txt</span> <span class="o">=</span> <span class="sa">u</span><span class="s2">"ж and я are really fun letters."</span>
<span class="k">assert</span> <span class="n">slugify_ru</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span> <span class="o">==</span> <span class="sa">u</span><span class="s2">"j-and-ya-are-really-fun-letters"</span>

<span class="k">if</span> <span class="vm">**name**</span> <span class="o">==</span> <span class="s2">"**main**"</span><span class="p">:</span>
<span class="n">pytest</span><span class="o">.</span><span class="n">main</span><span class="p">()</span>
</code></pre>
  </div>

  <p>
    <a href="http://bikeshedder.com/" target="_blank">Michael P. Jung</a>
    created a German translation function, which I've included below:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># -*- coding: utf-8 -*-</span>
<span class="c1"># test_slugify_german.py</span>
<span class="kn">from</span> <span class="nn">slugify</span> <span class="kn">import</span> <span class="n">get_slugify</span>
<span class="kn">import</span> <span class="nn">pytest</span>

<span class="c1"># Step 1: Define the translation dictionary</span>
<span class="n">ALT_GERMAN</span> <span class="o">=</span> <span class="p">{</span>
<span class="sa">u</span><span class="s1">'ä'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'ae'</span><span class="p">,</span>
<span class="sa">u</span><span class="s1">'Ä'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'Ae'</span><span class="p">,</span>
<span class="sa">u</span><span class="s1">'ö'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'oe'</span><span class="p">,</span>
<span class="sa">u</span><span class="s1">'Ö'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'Oe'</span><span class="p">,</span>
<span class="sa">u</span><span class="s1">'ü'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'ue'</span><span class="p">,</span>
<span class="sa">u</span><span class="s1">'Ü'</span><span class="p">:</span> <span class="sa">u</span><span class="s1">'Ue'</span>
<span class="p">}</span>

<span class="c1"># Step 2: Generate a translation function</span>
<span class="n">slugify_de</span> <span class="o">=</span> <span class="n">get_slugify</span><span class="p">(</span><span class="n">pretranslate</span><span class="o">=</span><span class="n">ALT_GERMAN</span><span class="p">)</span>

<span class="k">def</span> <span class="nf">test_german_dumpling</span><span class="p">():</span>
<span class="c1"># According to Michael P. Jung, this looks like ice cream.</span>
<span class="k">assert</span> <span class="n">slugify_de</span><span class="p">(</span><span class="sa">u</span><span class="s1">'Thüringer Klöße'</span><span class="p">)</span> <span class="o">==</span> <span class="sa">u</span><span class="s2">"Thueringer-Kloesse"</span>

<span class="k">def</span> <span class="nf">test_german_road</span><span class="p">():</span>
<span class="n">txt</span> <span class="o">=</span> <span class="sa">u</span><span class="s2">"I've never been in a car on a German straße"</span>
<span class="k">assert</span> <span class="n">slugify_de</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span> <span class="o">==</span> <span class="sa">u</span><span class="s2">"Ive-never-been-in-a-car-on-a-German-strasse"</span>

<span class="k">if</span> <span class="vm">**name**</span> <span class="o">==</span> <span class="s2">"**main**"</span><span class="p">:</span>
<span class="n">pytest</span><span class="o">.</span><span class="n">main</span><span class="p">()</span>
</code></pre>
  </div>

  <h1 id="summary">Summary</h1>
  <p>
    I really like the flexibility and power of <strong>awesome-slugify</strong>.
    During slugification it provides functions to preserve unicode characters,
    convert unicode characters to ASCII, and even define new translation
    functions. As <strong>awesome-slugify</strong> is a relatively new project,
    there are
    <a href="https://github.com/dimka665/awesome-slugify/issues" target="_blank"
      >a few issues</a
    >, but most of those are for my quirky edge cases (such as when trying to
    use parenthesis in translation dictionaries for
    <a href="https://en.wikipedia.org/wiki/Emoticons" target="_blank"
      >emoticons</a
    >) or perhaps stem from my poor understanding of how unicode-to-ASCII
    functions.
  </p>
  <p>In any case, this is a very useful package.</p>
  <p>
    <strong>Update 2013/01/23</strong> Thanks to
    <a href="https://github.com/dimka665" target="_blank">Dmitry Voronin</a>, I
    removed references to a couple issues with <strong>awesome-slugify</strong>.
    It no longer forces capitalization in custom translation functions and the
    <code>get_slugify()</code> can be imported directly from the base
    <code>slugify</code> package.
  </p>
  <p>Published: 2014-01-22 12:00</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/django.html">django</a>
    <a href="/tag/unicode.html">unicode</a>
    <a href="/tag/i18n.html">i18n</a>
    <a href="/tag/ppoftw.html">ppoftw</a>
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
