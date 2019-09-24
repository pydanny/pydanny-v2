---
date: 2018-03-29
tag:
  - python
  - django
  - flask
  - blog
  - mountain

author: Daniel Roy Greenfeld
location: California
title: Writing A New Blog Engine
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/writing-new-blog-engine ">Writing A New Blog Engine</a>
    </div>
  </h1>
  <p>
    <img src="https://www.pydanny.com/static/EverestfromKalarPatarcrop.jpeg" />
  </p>
  <p>
    Since around February of 2012, I've been publishing this blog as a static
    HTML site using
    <a href="https://blog.getpelican.com/" target="_blank">Pelican</a>. The
    experience was pretty good, but over time I ran into a few problems with the
    fact that I never upgraded the site to match current versions of Pelican.
    Which meant the following:
  </p>
  <ul>
    <li>
      My RSS feed didn't follow the modern W3C RSS/Atom specifications. So I
      haven't been published in
      <a href="http://http://planetpython.org/" target="_blank"
        >Planet Python</a
      >
      in years.
    </li>
    <li>
      As time went by, upgrading to modern Pelican became harder and harder. And
      trying to get it to work wasn't much fun either.
    </li>
  </ul>
  <p>So I started looking at other options. My requirements:</p>
  <ul>
    <li>
      All my old page links needed to work. I didn't want to have to cook up
      some kind of redirect system.
    </li>
    <li>
      I wanted to be able to make customizations without fighting through a
      complex extension system.
    </li>
    <li>Theming needed to be easy.</li>
    <li>
      Markdown needed to be supported. While I like RestructuredText, the honest
      truth is that I can pour out my thoughts faster with Markdown.
    </li>
  </ul>
  <p>
    With those requirements in mind, I got started reviewing other tools. I
    tried a bunch of options (Hugo, Lektor, Pelican again, etc) but none of them
    met my requirements to the degree I wanted.
  </p>
  <h2 id="climbing-the-moutain">Climbing the Moutain</h2>
  <p>
    Eventually, I decided the best course of action was to write my own blog
    engine with <a href="http://flask.pocoo.org/" target="_blank">Flask</a> and
    host it on AWS Lambda via
    <a href="https://github.com/miserlou/zappa" target="_blank">Zappa</a> with a
    JSON and Markdown backend. Using Flask and Zappa seemed like a good fit for
    me.
  </p>
  <p>
    The reason is that while our core engine at work is always Django, we use
    Flask on AWS Lambda to power many microservices. For persistence we have
    DynamoDB/Redis or Django-powered APIs.
  </p>
  <p>
    So one day this month I wrote up a blog engine that suited my requirements.
    I flung a theme on it and deployed it to AWS Lambda.
  </p>
  <p>Hooray! Mission accomplished!</p>
  <h2 id="falling-off-the-mountain">Falling Off the Mountain</h2>
  <p>
    With pleasure, I asked friends to take a look at my new blog system.
    Immediately these friends started to tell me it was running slow.
  </p>
  <p>
    You see, it turns out if you load a <strong>huge JSON</strong> file for each
    page load AND render markdown on the server side, your site is going to be
    slow. Even after numerous optimizations the pages still loaded in seconds.
  </p>
  <h2 id="climbing-a-frozen-mountain">Climbing a Frozen Mountain</h2>
  <p>
    I thought about writing something to convert the JSON to native python
    objects. Or using an S3-located SQLite3 backend. But that felt like a lot of
    work to me and I wanted to get to writing.
  </p>
  <p>
    That's when my awesome wife suggested I render the blog out as static HTML
    and just put that on S3. She said if I needed custom elements, that's what I
    could host those on AWS Lambda via Zappa and load them with Javascript.
  </p>
  <p>
    Inspired by her idea, I installed
    <a href="http://pythonhosted.org/Frozen-Flask/" target="_blank"
      >Frozen-Flask</a
    >
    and a few minutes later I had a static version of my blog. I removed the
    pagination and was done.
  </p>
  <h2 id="inside-the-mountain">Inside the Mountain</h2>
  <p>
    My new blog is built and deployed with the following backend components:
  </p>
  <ul>
    <li>Python</li>
    <li>Flask</li>
    <li>Boto3</li>
    <li>Markdown2</li>
    <li>feedgen</li>
    <li>
      Django (because it has the best <code>truncatewords_html</code> tools)
    </li>
  </ul>
  <p>
    The markdown files that make up the content have metadata stored as JSON.
    That makes it easy to read and parse, but I have considered switching to
    <a href="https://en.m.wikipedia.org/wiki/TOML" target="_blank">TOML</a>.
  </p>
  <p>
    Looking out the window a few days ago I came up with a name for my blog
    engine: "Mountain".
  </p>
  <h2 id="why-flask-why-not-django">Why Flask? Why Not Django?</h2>
  <p>
    Because Flask is better at doing work that doesn't involve SQL. And I don't
    want a SQL-powered blog. I want something that lets me write in markdown
    using my text editor. Mountain lets me do precisely that.
  </p>
  <h2 id="whats-next">What's Next?</h2>
  <p>Here are some things I plan to do:</p>
  <ul>
    <li>Switch from Disqus-powered comments to GitHub issue powered ones.</li>
    <li>Take a look at switching the metadata from JSON to TOML.</li>
    <li>Write an AWS Lambda-powered search backend for the blog.</li>
  </ul>
  <h2 id="summary">Summary</h2>
  <p>
    The end result of this is you'll probably see me writing more blog entries
    in the days to come. Mountain works exactly how I want it. It has removed
    some of the hindrances that slowed me down.
  </p>
  <p>
    In fact, this is my first blog post written in Markdown on the new blog. How
    cool is that?
  </p>
  </div>
