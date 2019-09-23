---
date: 2015-05-14
tag:
  - python
  - LaTeX
  - RestructuredText
  - markdown
  - faceoff
  - django

author: Daniel Roy Greenfeld
location: California
title: "Markup Language Faceoff: Lists"
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/markup-language-faceoff-lists.html"
        >Markup Language Faceoff: Lists</a
      >
    </div>
  </h1>
  <p>
    Today I want to talk about lists. Not for shopping, not the programming data
    type, but the display of items in both unordered and ordered fashion.
  </p>
  <p>
    <a
      href="https://www.pydanny.com/markup-language-faceoff-lists.html"
      target="_blank"
      ><img alt="Bullets faceoff" src="https://pydanny.com/static/bullets.png"
    /></a>
  </p>
  <p>Specifically this:</p>
  <ul>
    <li>Item A</li>
    <li>
      Item B
      <ol>
        <li>First Numbered Inner Item</li>
        <li>Second Numbered Inner Item</li>
      </ol>
    </li>
    <li>Item C</li>
  </ul>
  <p>
    In other words, lists of bullets and numbers. This article explores some of
    the different tools used by the programming world to render display lists,
    specifically <strong>HTML</strong>, <strong>reStructuredText</strong>,
    <strong>Markdown</strong>, and <strong>LaTeX</strong>.
  </p>
  <h1 id="html">HTML</h1>
  <p>
    If you view the
    <a href="http://en.wikipedia.org/wiki/HTML" target="_blank">HTML</a> source
    of this web page, you'll find this:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="p">&lt;</span><span class="nt">ul</span> <span class="na">class</span><span class="o">=</span><span class="s">"simple"</span><span class="p">&gt;</span>
<span class="p">&lt;</span><span class="nt">li</span><span class="p">&gt;</span>Item A<span class="p">&lt;/</span><span class="nt">li</span><span class="p">&gt;</span>
<span class="p">&lt;</span><span class="nt">li</span><span class="p">&gt;</span>Item B<span class="p">&lt;</span><span class="nt">ol</span> <span class="na">class</span><span class="o">=</span><span class="s">"arabic"</span><span class="p">&gt;</span>
<span class="p">&lt;</span><span class="nt">li</span><span class="p">&gt;</span>First Numbered Inner Item<span class="p">&lt;/</span><span class="nt">li</span><span class="p">&gt;</span>
<span class="p">&lt;</span><span class="nt">li</span><span class="p">&gt;</span>Second Numbered Inner Item<span class="p">&lt;/</span><span class="nt">li</span><span class="p">&gt;</span>
<span class="p">&lt;/</span><span class="nt">ol</span><span class="p">&gt;</span>
<span class="p">&lt;/</span><span class="nt">li</span><span class="p">&gt;</span>
<span class="p">&lt;</span><span class="nt">li</span><span class="p">&gt;</span>Item C<span class="p">&lt;/</span><span class="nt">li</span><span class="p">&gt;</span>
<span class="p">&lt;/</span><span class="nt">ul</span><span class="p">&gt;</span>
</code></pre>
  </div>
  <p>Or more clearly:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="p">&lt;</span><span class="nt">ul</span> <span class="na">class</span><span class="o">=</span><span class="s">"simple"</span><span class="p">&gt;</span>
    <span class="p">&lt;</span><span class="nt">li</span><span class="p">&gt;</span>Item A<span class="p">&lt;/</span><span class="nt">li</span><span class="p">&gt;</span>
    <span class="p">&lt;</span><span class="nt">li</span><span class="p">&gt;</span>Item B
        <span class="p">&lt;</span><span class="nt">ol</span> <span class="na">class</span><span class="o">=</span><span class="s">"arabic"</span><span class="p">&gt;</span>
            <span class="p">&lt;</span><span class="nt">li</span><span class="p">&gt;</span>First Numbered Inner Item<span class="p">&lt;/</span><span class="nt">li</span><span class="p">&gt;</span>
            <span class="p">&lt;</span><span class="nt">li</span><span class="p">&gt;</span>Second Numbered Inner Item<span class="p">&lt;/</span><span class="nt">li</span><span class="p">&gt;</span>
        <span class="p">&lt;/</span><span class="nt">ol</span><span class="p">&gt;</span>
    <span class="p">&lt;/</span><span class="nt">li</span><span class="p">&gt;</span>
    <span class="p">&lt;</span><span class="nt">li</span><span class="p">&gt;</span>Item C<span class="p">&lt;/</span><span class="nt">li</span><span class="p">&gt;</span>
<span class="p">&lt;/</span><span class="nt">ul</span><span class="p">&gt;</span>
</code></pre>
  </div>
  <p>
    This works, but is incredibly verbose. <strong>HTML</strong> requires
    closing tags on every element (keep in mind browsers are not the same as
    specifications). Working with lists in HTML becomes tedious quickly. Which
    is why so many people use
    <a href="http://en.wikipedia.org/wiki/WYSIWYG" target="_blank">WYSIWYG</a>
    tools or mark up languages like <strong>reStructuredText</strong> and
    <strong>Markdown</strong>, as it expedites creation of lists (and many other
    things).
  </p>
  <h1 id="restructuredtext">reStructuredText</h1>
  <p>
    This blog is written in
    <a href="http://en.wikipedia.org/wiki/ReStructuredText" target="_blank"
      >reStructuredText</a
    >
    and transformed into <strong>HTML</strong>. Let's see the markup for this
    blog post:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="m">*</span> Item A
<span class="m">*</span> Item B

<span class="m">#.</span> First Numbered Inner Item
<span class="m">#.</span> Second Numbered Inner Item

<span class="m">\*</span> Item C
</code></pre>
  </div>

  <p>
    Notice the extra lines between bullets and numbers? A behavior of
    <strong>reStructuredText</strong> is that you have to put those in nested
    lists in order to make things display correctly. Also, 2 spaces indentation
    generates a different result than 4 spaces, the former creating sub-bullets,
    the latter creating an indented block quote with bullets. They are there to
    remove ambiguity.
  </p>
  <p>
    Interestingly enough, I did not know this until the day after I wrote this
    article. Since understanding these behaviors can be challenging, myself and
    Eric Holscher of
    <a href="ttp://readthedocs.org" target="_blank">ReadTheDocs</a> fame began a
    project last year to
    <a href="http://restructuredtext.readthedocs.org/" target="_blank"
      >clearly index and document</a
    >
    all the details of <strong>reStructuredText</strong> from the user's point
    of view. Our plan was to provide this as an adjunct to the
    <a href="http://docutils.sourceforge.net/docs/" target="_blank"
      >formal documentation</a
    >
    of <strong>reStructuredText</strong>. Alas, time and work considerations got
    in the way. If you want to help expand our effort, you can contribute at
    <a href="https://github.com/pydanny/restructuredtext" target="_blank"
      >https://github.com/pydanny/restructuredtext</a
    >.
  </p>
  <p>
    One thing to note about <strong>reStructuredText</strong> is that it's
    pretty much Python only. Outside the Python world if you are writing
    plaintext markup then odds are you are using <strong>Markdown</strong>.
  </p>
  <h1 id="markdown">Markdown</h1>
  <p>
    <a href="http://en.wikipedia.org/wiki/Markdown" target="_blank">Markdown</a>
    does lists really well. Terse and no weird quirks:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="m">*</span> Item A
<span class="m">*</span> Item B
    <span class="m">1.</span> First Numbered Inner Item
    <span class="m">1.</span> Second Numbered Inner Item
<span class="m">*</span> Item C
</code></pre>
  </div>
  <p>
    Another nice feature about <strong>Markdown</strong> is that it's in use
    everywhere. GitHub, Stack Overflow, my favorite tablet writing app, and a
    lot more.
  </p>
  <h1 id="markdown-vs-restructuredtext">Markdown vs. reStructuredText</h1>
  <p>
    Why don't I switch from <strong>reStructuredText</strong> to
    <strong>Markdown</strong>? Here are my reasons against switching:
  </p>
  <ol>
    <li>Force of habit.</li>
    <li>
      <a href="http://pypi.python.org/pypi" target="_blank">PyPI</a> requires it
      to display package long descriptions nicely on Package pages.
    </li>
    <li>
      <a
        href="http://en.wikipedia.org/wiki/Sphinx_(documentation_generator)"
        target="_blank"
        >Sphinx</a
      >
      is based on it.
    </li>
    <li>
      <strong>reStructuredText</strong> has one concrete standard, with
      extensions that people add. Markdown has many standards, which may or may
      not have shared features.
    </li>
    <li>
      I can use <a href="http://pandoc.org" target="_blank">Pandoc</a> to help
      transform <strong>reStructuredText</strong> to <strong>Markdown</strong>.
    </li>
  </ol>
  <h1 id="latex">LaTeX</h1>
  <p>
    Finally, let's discuss
    <a href="http://en.wikipedia.org/wiki/LaTeX" target="_blank">LaTeX</a>.
    While not a markup language it bears mentioning, and I'll explain why later
    in this section.
  </p>
  <p>
    Up to about 8-10 years ago <strong>LaTeX</strong> was used in a lot of
    technical writing, including the Python core documentation. That ended with
    the rise of mark up languages, relegating <strong>LaTeX</strong> to the
    world of academics, mathematicians and computer scientists - anywhere
    complex equations need to be specified.
  </p>
  <p>
    LaTeX belongs in this article because it is so commonly used with markup. In
    fact, as far as I can tell, in order to render
    <strong>reStructuredText</strong> and <strong>Markdown</strong> content into
    the PDF format, the most common approach is:
  </p>
  <ol>
    <li>Use a script to transform the markup into <strong>LaTeX</strong>.</li>
    <li>
      Use a tool like
      <a href="http://en.wikipedia.org/wiki/XeTeX" target="_blank">XeTeX</a> to
      render the <strong>LaTeX</strong> into PDF.
    </li>
  </ol>
  <p>
    Why the extra step? Why not just go directly from markup to PDF? Well, the
    content in <strong>reStructuredText</strong> and
    <strong>Markdown</strong> have to be formatted in order for them to be
    displayed, or they will just look like plaintext markup. When they are
    converted to <strong>HTML</strong>, the browser does the formatting for us.
    When they are translated to PDF, LaTeX is a very common choice. That is
    because <strong>LaTeX</strong> isn't a markup language, but a typesetting
    tool. Unlike <strong>reStructuredText</strong> and
    <strong>Markdown</strong> which are designed for ease of use,
    <strong>LaTeX</strong> is designed to make documents look good.
  </p>
  <p>Here is how I define my sample list in <strong>LaTeX</strong></p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="k">\begin</span><span class="nb">{</span>itemize<span class="nb">}</span>
    <span class="k">\item</span> Item A
    <span class="k">\item</span> Item A
        <span class="k">\begin</span><span class="nb">{</span>enumerate<span class="nb">}</span>
            <span class="k">\item</span> First Numbered Inner Item
            <span class="k">\item</span> Second Numbered Inner Item
        <span class="k">\end</span><span class="nb">{</span>enumerate<span class="nb">}</span>
    <span class="k">\item</span> Item C
<span class="k">\end</span><span class="nb">{</span>itemize<span class="nb">}</span>
</code></pre>
  </div>
  <p>
    Halfway between the markup languages and HTML in verbosity,
    <strong>LaTeX</strong> lists are of medium difficulty to write. If this
    example makes <strong>LaTeX</strong> look easy, please realize that while
    lists are easy to understand, other structures like <strong>LaTeX</strong>
    <a href="http://en.wikibooks.org/wiki/LaTeX/Tables" target="_blank"
      >tables</a
    >
    can quickly get out of hand. <strong>LaTeX</strong>'s reputation for being
    an arcane tool is a well deserved one.
  </p>
  <h1 id="modifying-generated-latex">Modifying Generated LaTeX</h1>
  <p>
    Several book authors, including ourselves, have written books using
    <strong>reStructuredText</strong> or <strong>Markdown</strong>, generated
    the <strong>LaTeX</strong>, then modified the <strong>LaTeX</strong> before
    rendering the PDF. The approach is seductive: You get the ease of a markup
    language combined with the formatting precision of <strong>LaTeX</strong>.
  </p>
  <p>Or do you?</p>
  <p>
    The problem my wife and I have faced is that the combination of
    <strong>LaTeX</strong> packages and tools we've assembled for ourselves to
    write books like
    <a
      href="http://twoscoopspress.com/products/two-scoops-of-django-1-8"
      target="_blank"
      >Two Scoops of Django</a
    >
    is very, very different than what is rendered via
    <a href="https://pypi.python.org/pypi/docutils" target="_blank">docutils</a
    >' <code>rst2latex</code> or Sphinx <code>make latex</code>. We've tried to
    write migration scripts, but have found that we end up spending too much of
    our time on formatting. That's why we have stuck with hand-crafted artisan
    <strong>LaTeX</strong>.
  </p>
  <p>
    That isn't to say it isn't possible. In fact, Matt Harrison has
    <a
      href="http://www.amazon.com/Brief-Introduction-Python-Testing-Harrison-ebook/dp/B00AY4VE8E/?tag=mlinar-20"
      target="_blank"
      >released</a
    >
    a number
    <a
      href="http://www.amazon.com/Guide-Learning-Iteration-Generators-Python/dp/1492333514/ref=sr_1_7?tag=mlinar-20"
      target="_blank"
      >handsome</a
    >
    <a
      href="http://www.amazon.com/Treading-Python-1-Foundations/dp/1475266413/ref=sr_1_2?tag=mlinar-20"
      target="_blank"
      >Python</a
    >
    <a
      href="http://www.amazon.com/Treading-Python-2-Intermediate/dp/149055095X/ref=sr_1_1?tag=mlinar-20"
      target="_blank"
      >books</a
    >
    following this path (<strong>reStructuredText</strong> to
    <strong>LaTeX</strong>). I'm certain there are
    <strong>Markdown</strong> books that follow this path too.
  </p>
  <h1 id="closing-thoughts">Closing Thoughts</h1>
  <p>
    For better or for worse, lists of bullets and numbers are a foundation of
    how we communicate via the written medium. They allow for terse
    communication of ideas and thought, but that same terseness can mean we skip
    over details. Interestingly enough, the very tools that we use to create
    lists can color our ability and desire to use them.
  </p>
  <ul>
    <li>
      Update 2015/05/14 - Added note about closing <code>&lt;/li&gt;</code> tags
      thanks to Ivan Sagalaev.
    </li>
    <li>
      Update 2015/05/14 - Made Markdown list more cross-compatible thanks to
      Tzu-ping Chung.
    </li>
    <li>
      Update 2015/05/14 - Fixed LaTeX list definition thanks to Mark van Lent.
    </li>
    <li>
      Update 2015/05/15 - Explained the behaviors of
      <strong>reStructuredText</strong> thanks to David Goodger.
    </li>
  </ul>
  <p>Published: 2015-05-14 10:00</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/LaTeX.html">LaTeX</a>
    <a href="/tag/RestructuredText.html">RestructuredText</a>
    <a href="/tag/markdown.html">markdown</a>
    <a href="/tag/faceoff.html">faceoff</a>
    <a href="/tag/django.html">django</a>
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
