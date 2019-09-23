---
date: 2014-01-21
tag: 
  - python
  - django
  - unicode
  - i18n
  - ppoftw

author: Daniel Roy Greenfeld
location: California
title: "awesome-slugify: Human-readable URL slugs from any string"
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/awesome-slugify-human-readable-url-slugs-from-any-string.html">awesome-slugify: Human-readable URL slugs from any string</a>
</div>
</h1>
<p><em>note: The introduction mentions Django and Plone. However, this is not
an article about Django or Plone.</em></p>
<h1 id="introduction">Introduction</h1>
<p>Years ago, when I was working with <a href="http://plone.org" target="_blank">Plone</a> at
<a href="http://nasa.gov" target="_blank">NASA</a>, one thing I dreaded was when content editors
would copy-and-paste from Microsoft Word into the title bar. All kinds
of funny characters would appear in the title bar and URL. I would have
to go into the database (ZODB) and fix things. Things didn't get better
until <a href="https://github.com/reedobrien" target="_blank">Reed O'Brien</a> turned on a title
validator (probably in <code>Plone.i18n</code>).</p>
<p>When we started using <a href="https://www.djangoproject.com" target="_blank">Django</a>, one thing
that made it nice was the presence of it's
<a href="https://docs.djangoproject.com/en/dev/ref/utils/#module-django.utils.text" target="_blank">slugify()</a>
function and template filter. Inspired by the newspaper industry, this
function it easier on both content editors and software engineers. In
any case, using <code>slugify()</code> we completed a number of projects, with
<a href="http://science.nasa.gov/" target="_blank">NASA Science</a> being the only public one I
worked on.</p>
<p>As much as the <code>slugify()</code> function was useful, there were problems. As
I discovered time and time again over the years, it didn't handle
<a href="https://en.wikipedia.org/wiki/Unicode" target="_blank">unicode</a>. Or rather, it handled
them by simply vanishing non-ASCII unicode characters. For example:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">django.utils.text</span> <span class="kn">import</span> <span class="n">slugify</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">slugify</span><span class="p">(</span><span class="sa">u</span><span class="s2">"straße"</span><span class="p">)</span> <span class="c1"># German for road</span>
<span class="sa">u</span><span class="s2">"strae"</span>
</code></pre></div>
<p>If you read German, you'll know that the default Django <code>slugify()</code>
function is converting the word 'road' to nonsense. For sites dealing
with internationalization, this won't do. So over three years ago while
at <a href="http://www.mozilla.org/" target="_blank">Mozilla</a>, <a href="http://pinterest.com" target="_blank">Pinterest</a>
engineer <a href="https://twitter.com/davedash" target="_blank">Dave Dash</a> created
<a href="https://pypi.python.org/pypi/unicode-slugify" target="_blank">unicode-slugify</a>. From
then on we could do this:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">from</span> <span class="nn">slugify</span> <span class="kn">import</span> <span class="n">slugify</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">slugify</span><span class="p">(</span><span class="sa">u</span><span class="s2">"straße"</span><span class="p">)</span> <span class="c1"># Again with the German word for road</span>
<span class="sa">u</span><span class="s2">"straße"</span>
</code></pre></div>
<h2 id="what-if-im-not-using-django">What If I'm Not Using Django?</h2>
<p>While a very nice tool, this package is dependent on Django's internal
machinery to operate, which is a problem for non-Django users. While we
could use Python's <a href="http://flask.pocoo.org/snippets/5/" target="_blank">unicodedata library to resolve unicode to
slugs</a>, wouldn't it be nice if
there was a nicely packaged/tested solution?</p>
<p>Fortunately, such a nicely packaged/tested solution exists, and it's
awesome!</p>
<p><img alt="An Awesome Django slug" src="https://s3.amazonaws.com/pydanny/awesome_slugify_django.jpg"/></p>
<h1 id="introducing-awesome-slugify">Introducing awesome-slugify</h1>
<p>Created and maintained by <a href="https://github.com/dimka665" target="_blank">Dmitry Voronin</a>,
<a href="https://pypi.python.org/pypi/awesome-slugify" target="_blank">awesome-slugify</a> is easy
to use and <strong>100% independent from Django</strong>. You call it thus:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">import</span> <span class="nn">slugify</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">slugify</span><span class="o">.</span><span class="n">slugify</span><span class="p">(</span><span class="sa">u</span><span class="s2">"straße"</span><span class="p">)</span> <span class="c1"># Yet again the German for road</span>
<span class="sa">u</span><span class="s1">'strasse'</span>
</code></pre></div>
<p>Works! Hooray!</p>
<p>However, please note that unlike the Django-only <strong>unicode-slugify</strong>
package which preserves the non-ASCII characters, <strong>awesome-slugify</strong>
transformed the German 'ß' into an ASCII substitution of 'ss'. This
is similar to how the popular
<a href="https://pypi.python.org/pypi/python-slugify" target="_blank">python-slugify</a> package
works. While this behavior of translating unicode to ASCII might work
for English-only sites, it's not so useful for the rest of the world.
Fortunately, <strong>awesome-slugify</strong> also provides the incredibly useful
<code>slugify_unicode()</code> function:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="kn">import</span> <span class="nn">slugify</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">slugify</span><span class="o">.</span><span class="n">slugify_unicode</span><span class="p">(</span><span class="sa">u</span><span class="s2">"straße"</span><span class="p">)</span> <span class="c1"># What is it with German Roads?</span>
<span class="sa">u</span><span class="s1">'stra</span><span class="se">\xdf</span><span class="s1">e'</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">slugify</span><span class="o">.</span><span class="n">slugify_unicode</span><span class="p">(</span><span class="sa">u</span><span class="s2">"straße"</span><span class="p">)</span> <span class="o">==</span> <span class="sa">u</span><span class="s2">"straße"</span>
<span class="bp">True</span>
</code></pre></div>
<h2 id="using-awesome-slugify">Using awesome-slugify</h2>
<p>Rather than describe <strong>awesome-slugify</strong> in paragraph format, here is
working test code (<a href="https://pydanny.com/pytest-no-boilerplate-testing.html" target="_blank">using pytest which I described
before</a>) that
explains what we can do:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># -*- coding: utf-8 -*-</span>
<span class="c1"># test_awesome_slugify.py</span>
<span class="kn">from</span> <span class="nn">__future__</span> <span class="kn">import</span> <span class="n">unicode_literals</span>
<span class="kn">import</span> <span class="nn">pytest</span>
<span class="kn">from</span> <span class="nn">slugify</span> <span class="kn">import</span> <span class="n">slugify</span><span class="p">,</span> <span class="n">slugify_unicode</span>

<span class="k">def</span> <span class="nf">test_simple</span><span class="p">():</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="s2">"This is basic functionality!!!    "</span>
    <span class="k">assert</span> <span class="n">slugify</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"This-is-basic-functionality"</span>

<span class="k">def</span> <span class="nf">test_remove_special_characters</span><span class="p">():</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="s2">"special characters (#?@$%^&amp;*) are also ASCII"</span>
    <span class="k">assert</span> <span class="n">slugify</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"special-characters-are-also-ASCII"</span>

<span class="k">def</span> <span class="nf">test_basic_accents_and_backslash_escapes</span><span class="p">():</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="s1">'Where I'</span><span class="n">ve</span> <span class="n">gone</span> <span class="n">before</span><span class="s1">'</span>
    <span class="k">assert</span> <span class="n">slugify</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"Where-Ive-gone-before"</span>

<span class="nd">@pytest.fixture</span>
<span class="k">def</span> <span class="nf">accents</span><span class="p">():</span>
    <span class="k">return</span> <span class="sa">u</span><span class="s1">'Àddîñg áçćèńtš tô Éñgłïśh íš śīłłÿ!'</span>

<span class="k">def</span> <span class="nf">test_accents</span><span class="p">(</span><span class="n">accents</span><span class="p">):</span>
    <span class="k">assert</span> <span class="n">slugify</span><span class="p">(</span><span class="n">accents</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"Adding-accents-to-English-is-silly"</span>

<span class="k">def</span> <span class="nf">test_keep_accents</span><span class="p">(</span><span class="n">accents</span><span class="p">):</span>
    <span class="k">assert</span> <span class="n">slugify_unicode</span><span class="p">(</span><span class="n">accents</span><span class="p">)</span> <span class="o">==</span> \
                        <span class="s1">'Àddîñg-áçćèńtš-tô-Éñgłïśh-íš-śīłłÿ'</span>

<span class="k">def</span> <span class="nf">test_keep_accents_lower</span><span class="p">(</span><span class="n">accents</span><span class="p">):</span>
    <span class="c1"># Because awesome-slugify doesn't lower() while slugify, we</span>
    <span class="c1">#   have to do it ourselves. I'm torn if I like this or hate it</span>
    <span class="k">assert</span> <span class="n">slugify_unicode</span><span class="p">(</span><span class="n">accents</span><span class="p">)</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span> <span class="o">==</span> \
                        <span class="s1">'àddîñg-áçćèńtš-tô-éñgłïśh-íš-śīłłÿ'</span>

<span class="k">def</span> <span class="nf">test_musical_notes</span><span class="p">():</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="s2">"Is ♬ ♫ ♪ ♩ a melody or just noise?"</span>
    <span class="k">assert</span> <span class="n">slugify</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"Is-a-melody-or-just-noise"</span>
    <span class="k">assert</span> <span class="n">slugify_unicode</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"Is-a-melody-or-just-noise"</span>

<span class="k">def</span> <span class="nf">test_chinese</span><span class="p">():</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="s2">"美国"</span> <span class="c1"># Chinese for 'America'</span>
    <span class="k">assert</span> <span class="n">slugify</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"Mei-Guo"</span>
    <span class="k">assert</span> <span class="n">slugify_unicode</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span> <span class="o">==</span>  <span class="s2">"美国"</span> 

<span class="k">def</span> <span class="nf">test_separator</span><span class="p">():</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="s2">"Separator is a word I frequently mispell."</span>
    <span class="n">result</span> <span class="o">=</span> <span class="n">slugify</span><span class="p">(</span><span class="n">txt</span><span class="p">,</span> <span class="n">separator</span><span class="o">=</span><span class="s2">"_"</span><span class="p">,</span> <span class="n">capitalize</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>
    <span class="k">assert</span> <span class="n">result</span> <span class="o">==</span> <span class="s2">"Separator_is_a_word_I_frequently_mispell"</span>

<span class="k">if</span> <span class="vm">__name__</span> <span class="o">==</span> <span class="s2">"__main__"</span><span class="p">:</span>
    <span class="n">pytest</span><span class="o">.</span><span class="n">main</span><span class="p">()</span>
</code></pre></div>
<p>Easy to use as any good <code>slugify()</code> function!</p>
<h2 id="restricting-the-length-of-a-returned-slug">Restricting the length of a returned slug</h2>
<p>When using <strong>awesome-slugify</strong>'s <code>slugify()</code> and <code>slugify_unicode()</code>
functions, the <code>max_length</code> argument acts in an interesting fashion. On
very short strings it removes longer words to make things fit. As the
author of <strong>awesome-slugify</strong> is Russian, and the Russian language, as
far as I know, doesn't have prepositions (words like 'the' and 'a')
this makes sense.</p>
<p>Let's take a look, shall we?</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="c1"># -*- coding: utf-8 -*-</span>
<span class="c1"># test_awesome_slugify_max_length.py</span>
<span class="kn">import</span> <span class="nn">pytest</span>
<span class="kn">from</span> <span class="nn">slugify</span> <span class="kn">import</span> <span class="n">slugify</span><span class="p">,</span> <span class="n">slugify_unicode</span>

<span class="k">def</span> <span class="nf">test_max_length_tiny</span><span class="p">():</span>
    <span class="c1"># Removes the longer words to fit smaller words in.</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="s2">"$ is a special character, as is #."</span>
    <span class="k">assert</span> <span class="n">slugify</span><span class="p">(</span><span class="n">txt</span><span class="p">,</span> <span class="n">max_length</span><span class="o">=</span><span class="mi">10</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"is-a-as-is"</span>

<span class="k">def</span> <span class="nf">test_max_length_medium</span><span class="p">():</span>
    <span class="c1"># Keeps in prepositions, but removes meaningful words.</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="s2">"$ is a special character, as is #."</span>
    <span class="k">assert</span> <span class="n">slugify</span><span class="p">(</span><span class="n">txt</span><span class="p">,</span> <span class="n">max_length</span><span class="o">=</span><span class="mi">15</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"is-a-special-as"</span>

<span class="k">def</span> <span class="nf">test_max_length_realistic</span><span class="p">():</span>
    <span class="c1"># Long enough that long words are not removed from the string in favor </span>
    <span class="c1">#   of shorter words.</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="s2">"""This sentence illuminates the method that this package</span>
<span class="s2">                handles truncation of longer strings.</span>
<span class="s2">    """</span>
    <span class="k">assert</span> <span class="n">slugify</span><span class="p">(</span><span class="n">txt</span><span class="p">,</span> <span class="n">max_length</span><span class="o">=</span><span class="mi">50</span><span class="p">)</span> <span class="o">==</span> \
        <span class="s2">"This-sentence-illuminates-the-method-that-this-of"</span>

<span class="c1"># The next few tests cover how the max_length argument handles truncation</span>
<span class="c1">#   inside of a word. When working with longer word languages, like German,</span>
<span class="c1">#   understanding how your chosen slugify() function works is important.</span>

<span class="k">def</span> <span class="nf">test_truncating_word</span><span class="p">():</span>
    <span class="c1"># This demonstrates taking a long German word and truncating it.</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="sa">u</span><span class="s2">"Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz"</span>
    <span class="k">assert</span> <span class="n">slugify</span><span class="p">(</span><span class="n">txt</span><span class="p">,</span> <span class="n">max_length</span><span class="o">=</span><span class="mi">40</span><span class="p">)</span> <span class="o">==</span> \
                <span class="s2">"Rindfleischetikettierungsuberwachungsauf"</span>
    <span class="k">assert</span> <span class="n">slugify_unicode</span><span class="p">(</span><span class="n">txt</span><span class="p">,</span> <span class="n">max_length</span><span class="o">=</span><span class="mi">40</span><span class="p">)</span> <span class="o">==</span> \
                <span class="sa">u</span><span class="s2">"Rindfleischetikettierungsüberwachungsauf"</span>

<span class="k">def</span> <span class="nf">test_truncating_varying_letter_size</span><span class="p">():</span>
    <span class="c1"># Truncating unicode slugs is challenging. For example, the German </span>
    <span class="c1">#   letter 'ß' is 'ss' in English. Should a slugify's max_length</span>
    <span class="c1">#   argument use the German or the English length? In the case of </span>
    <span class="c1">#   awesome-slugify, it uses the length of English letter for both the </span>
    <span class="c1">#   slugify() and slugify_unicode() functions.</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="sa">u</span><span class="s2">"straße"</span> <span class="c1"># I really can't stop using German roads.</span>
    <span class="k">assert</span> <span class="n">slugify</span><span class="p">(</span><span class="n">txt</span><span class="p">,</span> <span class="n">max_length</span><span class="o">=</span><span class="mi">5</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"stras"</span>
    <span class="k">assert</span> <span class="n">slugify_unicode</span><span class="p">(</span><span class="n">txt</span><span class="p">,</span> <span class="n">max_length</span><span class="o">=</span><span class="mi">5</span><span class="p">)</span> <span class="o">==</span> <span class="sa">u</span><span class="s2">"straß"</span>

<span class="k">if</span> <span class="vm">__name__</span> <span class="o">==</span> <span class="s2">"__main__"</span><span class="p">:</span>
    <span class="n">pytest</span><span class="o">.</span><span class="n">main</span><span class="p">()</span>
</code></pre></div>
<h1 id="whats-next">What's Next?</h1>
<p>As demonstrated, <strong>awesome-slugify</strong> covers many common use cases.
Nevertheless, in <a href="https://pydanny.com/awesome-slugify-human-readable-url-slugs-from-any-string-2.html" target="_blank">my next blog
post</a>
I cover how to write custom language <code>slugify()</code> translation functions
using <strong>awesome-slugify</strong>.</p>
<p><strong>Update 2013/01/23</strong> Thanks to
<a href="http://www.reddit.com/user/flying-sheep" target="_blank">flying-sheep</a>, I Changed
'equivalent' to 'substitution' in describing the unicode-to-ASCII
translation. This is because 'ss' is not a precise translation of
'ß'.</p>
<p>Published: 2014-01-21 12:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/django.html">django</a>
<a href="/tag/unicode.html">unicode</a>
<a href="/tag/i18n.html">i18n</a>
<a href="/tag/ppoftw.html">ppoftw</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>