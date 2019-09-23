---
date: 2013-4-15
tag: 
  - python
  - twoscoops
  - book
  - django
  - howto

author: Daniel Roy Greenfeld
location: California
title: Generating NCX files with Python
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/generating-ncx-files-with-python.html">Generating NCX files with Python</a>
</div>
</h1>
<p>With the help of fellow Python developer Matt Harrison's excellent
<a href="http://www.amazon.com/Ebook-Formatting-Mobi-EPUB-ebook/dp/B00BWQXHU6/ref=la_B0077BQLH6_1_2?ie=UTF8&amp;qid=1366041987&amp;sr=1-2&amp;tag=ihpydanny-20" target="_blank">Ebook Formatting: KF8, Mobi &amp;
EPUB</a>,
we managed to create pretty decent looking Kindle and ePub versions of
<a href="http://django.2scoops.org/" target="_blank">Two Scoops of Django</a>.</p>
<p>One of many things we did was focus on providing an excellent table of
contents. Of course we provided one inside the content of the book, but
much like the PDF version we also provided one that various ebook
readers can display in sidebars or drop down menus. Unfortunately,
building this navigation isn't well documented (except for Matt's
book), and I've yet to see any good ways to generate it via code.</p>
<p>Which is why I present the following code. It looks at the HTML that
KindleGen and ePub generators demand and pulls from it a chapter-based
table of contents. Then constructs a .ncx file, which is what ebook
readers use to generate the sidebar/dropdown table of contents.</p>
<p>Our requirements:</p>
<pre><code>Jinja2
Django
BeautifulSoup4
</code></pre>
<p>And now the code:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="ch">#!/usr/bin/python</span>
<span class="c1"># -*- coding: utf-8 -*-</span>


<span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span>
<span class="kn">from</span> <span class="nn">django.utils.text</span> <span class="kn">import</span> <span class="n">slugify</span>
<span class="kn">from</span> <span class="nn">jinja2</span> <span class="kn">import</span> <span class="n">Template</span>

<span class="n">TEMPLATE</span> <span class="o">=</span> <span class="n">Template</span><span class="p">(</span><span class="s2">"""&lt;?xml version="1.0" encoding="UTF-8"?&gt;</span>
<span class="s2">&lt;!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd"&gt;</span>
<span class="s2">&lt;ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="en"&gt;</span>
<span class="s2">&lt;head&gt;</span>

<span class="s2">&lt;!-- The content of dtb:uid must be exactly the same as the uuid specified in the OPF file. --&gt;</span>

<span class="s2">&lt;meta name="dtb:uid" content="urn:uuid:BLAH-BLAH-BLAH"/&gt;</span>
<span class="s2">&lt;meta name="dtb:depth" content="1"/&gt;</span>
<span class="s2">&lt;meta name="dtb:totalPageCount" content="0"/&gt;</span>
<span class="s2">&lt;meta name="dtb:maxPageNumber" content="0"/&gt;</span>
<span class="s2">&lt;/head&gt;</span>

<span class="s2">&lt;docTitle&gt;&lt;text&gt;Two Scoops of Django: Best Practices for Django 1.5&lt;/text&gt;&lt;/docTitle&gt;</span>
<span class="s2">&lt;docAuthor&gt;&lt;text&gt;Greenfeld, Daniel&lt;/text&gt;&lt;/docAuthor&gt;</span>
<span class="s2">&lt;docAuthor&gt;&lt;text&gt;Roy, Audrey&lt;/text&gt;&lt;/docAuthor&gt;</span>
<span class="s2">&lt;navMap&gt;</span>
<span class="s2">&lt;/navPoint&gt;</span>
<span class="s2">{</span><span class="si">% f</span><span class="s2">or chapter in chapters %}</span>
<span class="s2">&lt;navPoint id="{{ chapter.slug }}" playOrder="{{ loop.index }}"&gt;</span>
<span class="s2">&lt;navLabel&gt;&lt;text&gt;{{ chapter.string.strip() }}&lt;/text&gt;&lt;/navLabel&gt;</span>
<span class="s2">&lt;content src="{{ chapter.href }}" /&gt;</span>
<span class="s2">&lt;/navPoint&gt;</span>
<span class="s2">{</span><span class="si">% e</span><span class="s2">ndfor %}</span>
<span class="s2">&lt;/navMap&gt;</span>
<span class="s2">&lt;/ncx&gt;</span>
<span class="s2">"""</span><span class="p">)</span>


<span class="k">def</span> <span class="nf">main</span><span class="p">(</span><span class="n">filename</span><span class="p">):</span>

    <span class="c1"># Grab the base file for review</span>
    <span class="k">with</span> <span class="nb">open</span><span class="p">(</span><span class="n">filename</span><span class="p">)</span> <span class="k">as</span> <span class="n">f</span><span class="p">:</span>
        <span class="n">text</span> <span class="o">=</span> <span class="n">f</span><span class="o">.</span><span class="n">read</span><span class="p">()</span>

    <span class="c1"># load the text into a bs4 object</span>
    <span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">text</span><span class="p">)</span>

    <span class="c1"># grab the nav element</span>
    <span class="n">nav</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s2">"nav"</span><span class="p">)</span>

    <span class="c1"># loop through the TOC for chapters. </span>
    <span class="c1"># Sections/Subsections can't be displayed, so don't worry about them</span>
    <span class="c1"># li.chapter is how we constructed our TOC. Your mileage may vary.</span>
    <span class="n">chapters</span> <span class="o">=</span> <span class="p">[]</span>
    <span class="k">for</span> <span class="n">li</span> <span class="ow">in</span> <span class="n">nav</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s2">"li"</span><span class="p">,</span> <span class="s2">"chapter"</span><span class="p">):</span>
        <span class="n">chapters</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="nb">dict</span><span class="p">(</span>
            <span class="n">href</span><span class="o">=</span><span class="n">li</span><span class="o">.</span><span class="n">a</span><span class="p">[</span><span class="s1">'href'</span><span class="p">],</span>
            <span class="n">string</span><span class="o">=</span><span class="n">li</span><span class="o">.</span><span class="n">a</span><span class="o">.</span><span class="n">text</span><span class="p">,</span>
            <span class="n">slug</span><span class="o">=</span><span class="n">slugify</span><span class="p">(</span><span class="n">li</span><span class="o">.</span><span class="n">a</span><span class="o">.</span><span class="n">string</span><span class="p">)</span>
        <span class="p">))</span>

    <span class="c1"># Render the template</span>
    <span class="n">template</span> <span class="o">=</span> <span class="n">TEMPLATE</span><span class="o">.</span><span class="n">render</span><span class="p">(</span><span class="n">chapters</span><span class="o">=</span><span class="n">chapters</span><span class="p">)</span>

    <span class="c1"># convert to ASCII</span>
    <span class="n">template</span> <span class="o">=</span> <span class="n">template</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="s2">"ascii"</span><span class="p">,</span> <span class="s2">"xmlcharrefreplace"</span><span class="p">)</span>

    <span class="c1"># Save to the toc.ncx</span>
    <span class="k">with</span> <span class="nb">open</span><span class="p">(</span><span class="s2">"toc.ncx"</span><span class="p">,</span> <span class="s2">"w"</span><span class="p">)</span> <span class="k">as</span> <span class="n">f</span><span class="p">:</span>
        <span class="n">f</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="n">template</span><span class="p">)</span>


<span class="k">if</span> <span class="vm">__name__</span> <span class="o">==</span> <span class="s1">'__main__'</span><span class="p">:</span>
    <span class="n">main</span><span class="p">(</span><span class="s1">'book.html'</span><span class="p">)</span>
</code></pre></div>
<p>There is more to adding a table of contents then just this simple
module. You also have to construct the .opf file, which is another
undocumented mess that I'll blog about.</p>
<p>Published: 2013-4-15 09:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/twoscoops.html">twoscoops</a>
<a href="/tag/book.html">book</a>
<a href="/tag/django.html">django</a>
<a href="/tag/howto.html">howto</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>