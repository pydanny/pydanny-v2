---
date: 2012-04-05
tag:
  - python
  - blog

author: Daniel Roy Greenfeld
location: California
title: Choosing a new python based blog engine
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/choosing-a-new-blog-engine "
        >Choosing a new python based blog engine</a
      >
    </div>
  </h1>
  <h1 id="why-a-new-blog-engine">Why a new blog engine?</h1>
  <p>
    On my <a href="https://pydanny.blogspot.com/" target="_blank">old blog</a>,
    I had been having issues with Blogger for some time. The WYSIWYG text editor
    was annoying in that it produced wonky HTML, so I had to hand craft the
    posts. Which meant I often wrote the HTML formatted copy in a text editor
    and then copy/pasted it into the browser. A few times this blew up and I
    really wished I had version controlled back ups. Adding code examples was
    problematic, even with a stylesheet helpfully provided by Google. Finally,
    some of the changes to the blog engine itself were beginning to worry me, so
    I started looking for alternatives.
  </p>
  <p>
    After my fiancee, Audrey Roy, converted her blog to
    <a href="https://github.com/mojombo/jekyll" target="_blank"
      >https://github.com/mojombo/jekyll</a
    >
    at it's new location of
    <a href="http://audreymroy.com" target="_blank">audreymroy.com</a>, the
    static file hosting seemed so awesome I was impressed enough to
    <a href="https://pydanny.com/tried-out-jekyll " target="_blank"
      >give Jekyll a try</a
    >. Why did Jekyll and static file hosting interest me so much?
  </p>
  <h2 id="i-dont-want-to-maintain-my-own-server">
    I don't want to maintain my own server
  </h2>
  <p>
    A couple times I rolled out a blog on a site I stood up, but didn't really
    feel like maintaining a site. I want someone else to do it. When I write, I
    want someone else to worry about the details. I want to focus on writing and
    nothing else.
  </p>
  <p>Well... almost nothing else. You'll understand shortly.</p>
  <h2 id="i-want-to-be-able-to-write-without-connection">
    I want to be able to write without connection
  </h2>
  <p>
    With blogger, I needed an internet connection to get my blog posts to format
    correctly. With Jekyll and other static file systems, I can just type away.
  </p>
  <h2 id="i-want-to-publish-via-git">I want to publish via git</h2>
  <p>
    My
    <a href="https://pydanny-event-notes.rtfd.org" target="_blank"
      >https://pydanny-event-notes.rtfd.org</a
    >
    has really exploded in my own usage and continued because it uses the same
    patterns I use in software development. I'm used to the pattern of using Git
    to push up content, so why use naked HTML? Sure, there are RST-to-HTML
    processors that I could use to generate that HTML, but they always require
    some amount of manual correction. Jekyll, and it's alternatives, let me just
    write.
  </p>
  <h1 id="jekyll-wasnt-for-me">Jekyll wasn't for me</h1>
  <p>
    I found Jekyll to be good and much more fun than Blogger, but not good
    enough. To sum up:
  </p>
  <ul>
    <li>I prefer RestructuredText over Markdown.</li>
    <li>
      I don't know enough Ruby to easily customize things. I don't feel like
      diving into Ruby just to learn how to make modifications.
    </li>
    <li>
      The template engine was like Smarty/Django/Jinja2, but not as much fun.
      Debugging errors was very problematic. Which was a problem when I started
      to play with modifying the theme.
    </li>
  </ul>
  <p>
    On the second and third bullets, you might wonder why I would care about the
    underlying engine if all I wanted to do was write. Well, I'm well aware of
    the fact that I change opinions now and then. :-)
  </p>
  <p>
    It was after trying out Jekyll that I started looking for
    <a href="http://python.org" target="_blank">Python</a> based static file
    blog systems. The choices that seemed appropriate were:
  </p>
  <h1 id="blogofilehttpwwwblogofilecom">
    <a href="http://www.blogofile.com/" target="_blank">blogofile</a>
  </h1>
  <p>
    This is probably the most mature, most common Python static file generator
    around. It looks really awesome, and everyone who uses it swears by it.
    Alas, it's powered by
    <a href="http://www.makotemplates.org/" target="_blank">Mako</a> templates,
    which is... um...
    <a
      href="https://pydanny.blogspot.com/2010/12/stupid-template-languages "
      target="_blank"
      >not my friend</a
    >
    (apologies to
    <a
      href="http://techspot.zzzeek.org/2010/12/04/in-response-to-stupid-template-languages/"
      target="_blank"
      >Mike Bayer</a
    >). What I really wanted was something with templates powered by
    <a href="http://www.pocoo.org/projects/jinja2/" target="_blank">Jinja2</a>.
  </p>
  <h1 id="hydehttphydegithubcom">
    <a href="http://hyde.github.com/" target="_blank">hyde</a>
  </h1>
  <p>
    Hyde claims to have started as Jekyll's evil Python twin. On the surface it
    looks awesome. Where it fails is documentation. There are lots of wonderful
    features that appear to exist, but follow the links to those features and
    you find yourself on placeholder pages.
  </p>
  <p>
    In theory, I could have just looked at the hyde code and figured out stuff
    myself. Maybe even document out the holes.
  </p>
  <p>
    In practice, all I want to do is write blog posts. It's one thing to
    customize things to suit your needs, it's another thing to make things work.
    Or document a tool. Color me lazy if you will, but when it comes to
    blogging, that's just how I am.
  </p>
  <p>
    I think in the near future, once fully documented, Hyde is going to be
    AWESOME. For now? Well, I wanted another option.
  </p>
  <h1 id="pelicanhttppelicanreadthedocsorg">
    <a href="http://pelican.readthedocs.org/" target="_blank">pelican</a>
  </h1>
  <p>
    I was immediately hooked. Python powered engine with Jinja2 templates with
    <strong>complete documentation</strong>. In fact, every time I asked the
    author for help, he resignedly pointed me at the documentation. How cool is
    that?
  </p>
  <p>
    At some point I'll use the <code>CSS</code> setting to change the color of
    <code>pygments</code> to something with white background and black text. For
    now I'm happy as things are now.
  </p>
  <p>
    <a
      href="http://www.flickr.com/photos/77704901@N05/6831339872/"
      target="_blank"
      ><img
        alt="image"
        src="http://farm8.staticflickr.com/7043/6831339872_10d0c40171.jpg"
    /></a>
  </p>
  <p><a href="">Discuss this post on Hacker News</a></p>
</div>
