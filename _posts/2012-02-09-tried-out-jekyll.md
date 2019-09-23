---
date: 2012-02-09
tag: 
  - ruby
  - blog

author: Daniel Roy Greenfeld
location: California
title: Tried out Jekyll
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/tried-out-jekyll.html">Tried out Jekyll</a>
</div>
</h1>
<h1 id="why-jekyll">Why Jekyll?</h1>
<p>I've had issues with Blogger for some time. After my fiancee, Audrey
Roy, moved her blog to <a href="https://github.com/mojombo/jekyll" target="_blank">https://github.com/mojombo/jekyll</a>, I was
impressed enough to give it a try.</p>
<p>Why did it impress me?</p>
<h1 id="code-highlighting-made-easy">Code highlighting made easy</h1>
<p>I don't have to hand-craft HTML code to get google prettify in a post.
I just stick in a simple macro of 'highlight python' called like a
Django templatetag and I get:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="n">name</span> <span class="o">=</span> <span class="s1">'Daniel Greenfeld'</span>
<span class="k">for</span> <span class="n">letter</span> <span class="ow">in</span> <span class="n">name</span><span class="o">.</span><span class="n">split</span><span class="p">():</span>
    <span class="k">print</span><span class="p">(</span><span class="n">letter</span><span class="p">)</span>
</code></pre></div>
<p>This issue alone sums up why I don't do more blog posts with code.</p>
<h1 id="i-dont-want-to-maintain-my-own-blog-site">I don't want to maintain my own blog site</h1>
<p>A couple times I rolled out a blog on a site I stood up, but didn't
really feel like maintaining a site. I want someone else to do it. When
I write, I want someone else to worry about the details. I want to focus
on writing and nothing else.</p>
<h1 id="i-want-to-be-able-to-write-without-connection">I want to be able to write without connection</h1>
<p>I need an internet connection to get my blogger posts to format right.
With Jekyll, I can just type away.</p>
<h1 id="ability-to-publish-via-git">Ability to publish via git</h1>
<p>My <a href="https://pydanny-event-notes.rtfd.org" target="_blank">https://pydanny-event-notes.rtfd.org</a> has really exploded in my own
usage and continued because it uses the same patterns I use in software
development. I'm used to the pattern of using Git to push up content,
so why use naked HTML? Sure, there are RST-to-HTML processors that I
could use to generate that HTML, but they always require an some amount
of manual correction. Jekyll, and it's alternatives,let me just write.</p>
<h1 id="why-not-jekyll">Why not Jekyll?</h1>
<p>Jekyll is written in <a href="http://ruby-lang.org" target="_blank">ruby</a>. Nothing against ruby,
but I can't trivially work in that language the way I can in Python.
It's good to eat your own dogfood.</p>
<p>So I started looking at <a href="http://hyde.github.com/" target="_blank">hyde</a>,
<a href="http://blogofile.com/" target="_blank">blogofile</a>, and
<a href="http://pelican.readthedocs.org/" target="_blank">pelican</a> as alternatives. More on that
later.</p>
<p>Published: 2012-02-09 10:20</p>
<p>Tags:
  
    <a href="/tag/ruby.html">ruby</a>
<a href="/tag/blog.html">blog</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>