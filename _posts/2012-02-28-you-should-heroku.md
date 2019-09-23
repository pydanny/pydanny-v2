---
date: 2012-02-28
tag: 
  - python
  - django
  - heroku
  - consumernotebook
  - mongodb

author: Daniel Roy Greenfeld
location: California
title: You should Heroku
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/you-should-heroku.html">You should Heroku</a>
</div>
</h1>
<p>In mid-November me and my fiancee, <a href="http://audreymroy.com" target="_blank">Audrey Roy</a>
began our startup. We had been frustrated with trying to do on-line
product research and came up with an idea to take the lessons learned
from <a href="http://djangopackages.com" target="_blank">Django Packages</a> / <a href="http://opencomparison.org" target="_blank">Open
Comparison</a> and apply them to a commercial
effort. The result has been <a href="http://consumernotebook.com" target="_blank">Consumer
Notebook</a>, and it's been a steadily
growing success.</p>
<p>We've been bootstrapping the project. That means supporting it with
consulting and grinding away on it during our free time. That means
12-16 hour days of Python, Django, and Javascript coding, marketing,
system administration, graphic design, communicating with users and
vendors, and a thousand other tasks. Since we've had to explore new
techniques for making things work on the backend and front end, that
means we've needed to have a robust system that is trivial to deploy
and certain to never go down. Which, of course, requires serious sys
admin skills.</p>
<h1 id="the-big-problem">The Big Problem</h1>
<blockquote>
<p><strong>I hate system administration work.</strong></p>
</blockquote>
<p>Sys admin is boring. I find it tedious and dull. Devops doesn't make it
easier/faster, it just makes it possible to do it at a large scale.</p>
<p>Fortunately for me, my fiancee likes the sys admin side of things.
However, she's got serious programming skills in Python/Javascript,
understands CSS, is an excellent illustrator, and has good business
skills to boot. Which means <strong>I needed Audrey not to be doing sys
admin</strong>.</p>
<h1 id="solution-platform-as-a-service">Solution: Platform as a Service</h1>
<p>Platform as a Service, or <a href="http://en.wikipedia.org/wiki/PaaS" target="_blank">PaaS</a>, is
where someone else does the majority of work involved in system
administration. There are now <a href="http://www.quora.com/What-is-the-Heroku-equivalent-for-Django-applications-Edit-Question-not-relevant-anymore-as-Heroku-now-supports-Django" target="_blank">dozens of companies edging into the
Python capable PaaS
space</a>.
We've been leery of using any of them but finally settled on
<a href="http://heroku.com" target="_blank">Heroku</a> after a long period of evaluation.</p>
<h1 id="why-heroku">Why Heroku?</h1>
<p>We choose Heroku for a number of reasons:</p>
<ol>
<li>We competed in a Los Angeles area Hacking contest with <a href="http://rdegges.com/" target="_blank">Randall
Degges</a>. He was responsible for the sys admin
and went with Heroku. He got it up and it was out of the way for the
competition. He spent his time coding, adding features, and fixing
templates instead of tweaking knobs on something in the cloud. We
saw other people not deliver products at the contest because of this
issue.</li>
<li>Heroku doesn't lock you in. If I wanted to, I could take all the
pieces out in about 10 minutes, then go old school and host it
myself on my own closet server.</li>
<li>Heroku has very good
<a href="http://devcenter.heroku.com/categories/heroku-postgres" target="_blank">PostgreSQL</a>
support. Our web framework is <a href="http://djangoproject.com" target="_blank">Django</a>,
which has an ORM that works best with PostgreSQL.</li>
<li>Heroku has staff. At least seventy of them. Odds are they would have
people around 24/7 to deal with issues.</li>
<li>The add-on system means they've got many other people adding great
new features. Want <a href="https://addons.heroku.com/mongolab" target="_blank">MongoDB</a>? No
problem! How about something to <a href="https://addons.heroku.com/pandastream" target="_blank">handle
video</a>? You got it!</li>
<li>Heroku scales up trivially. If we get an upswell of users, I just
type <code>heroku ps:scale web=50</code> and I've got 50 web server things
handling the load.</li>
<li>When I think of Heroku I think of Puffer Fish. Which is awesome
because Puffer Fish are awesome.</li>
</ol>
<p><a href="http://www.flickr.com/photos/saspotato/5776592544/" target="_blank"><img alt="image" src="http://farm6.staticflickr.com/5303/5776592544_fb15a2902a_m.jpg"/></a></p>
<p>Creative Commons: Some rights reserved by
<a href="http://www.flickr.com/photos/saspotato/5776592544/" target="_blank">Saspotato</a></p>
<h2 id="things-that-we-really-liked-about-using-heroku">Things that we really liked about using Heroku</h2>
<p>As we progressed down the journey of building our site, we discovered
even more nice features about Heroku. Here are some of the things that
really make me smile:</p>
<ol>
<li><a href="http://devcenter.heroku.com/articles/releases" target="_blank">Releases</a> and
especially
<a href="http://devcenter.heroku.com/articles/releases#rollback" target="_blank">rollbacks</a>
means we deploy with a lot more confidence.</li>
<li><a href="http://devcenter.heroku.com/articles/logging" target="_blank">Logging</a> and other
diagnostic add-ons like <a href="https://addons.heroku.com/sentry" target="_blank">Sentry</a>
and <a href="https://addons.heroku.com/newrelic" target="_blank">New Relic</a> means we know
what's going on.</li>
<li>During one huge data migration effort I scaled up the workers so a 6
hour task became a 5 minute task. Cost was less then 10 cents for
workers instead of me losing hours of labor.</li>
<li>In case we go viral, we don't have to worry about load balancers
and all that high performance stuff.</li>
</ol>
<h1 id="what-does-that-mean">What does that mean?</h1>
<p>It means I'm doing the deployments. I'm the sys admin. And I'm happy
with my role because it takes minutes out of my day. Me and Audrey team
up on everything else and the results so far have been great. If you've
ever worked with me, the fact that <a href="http://consumernotebook.com" target="_blank">Consumer
Notebook</a> is administered and deployed by
me is going to be a shock.</p>
<p>We've been able to really focus on development of the project. And when
I mean development, I mean a lot of things. I mean:</p>
<ul>
<li>Python</li>
<li>Django</li>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
<li>Data Modeling</li>
<li><a href="http://api.consumernotebook.com/" target="_blank">Documenting the API</a></li>
<li>Marketing: <a href="http://insidertips.consumernotebook.com/" target="_blank">blogging on Consumer
Notebook</a>,
<a href="https://twitter.com/consumernotebk" target="_blank">Tweeting</a>, and working with
other groups</li>
<li>Trying out <a href="https://github.com/consumernotebook/tickets/issues" target="_blank">public
tickets</a></li>
<li>Iterating through the user experience by communicating to users</li>
<li>All the boring legal and business stuff</li>
</ul>
<p>What you don't see is anything about sys admin issues. That's because
what could have been a huge sink in time and resources is pretty much
gone. We deploy staging servers with a bit of code I copy/pasted from a
bash history into a Fabric script:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="kn">from</span> <span class="nn">fabric.api</span> <span class="kn">import</span> <span class="n">local</span>

<span class="n">commands</span> <span class="o">=</span> <span class="s2">"""</span>
<span class="s2">heroku create --stack cedar</span>
<span class="s2">heroku addons:add memcache</span>
<span class="s2">heroku config:add S3_KEY=HAHAHAHAHAHA S3_SECRET=NOTGIVINGITOUT</span>
<span class="s2">heroku addons:add redistogo</span>
<span class="s2">heroku addons:add sendgrid:starter</span>
<span class="s2">heroku addons:add mongolab:starter</span>
<span class="s2">heroku addons:add sentry:test</span>
<span class="s2">heroku addons:add pgbackups</span>
<span class="s2">heroku addons:add custom_domains:basic</span>
<span class="s2">heroku addons:add zerigo_dns:basic</span>
<span class="s2">heroku domains:add staging.consumernotebook.com</span>
<span class="s2">heroku addons:add ssl:piggyback</span>
<span class="s2">git push heroku master</span>
<span class="s2">heroku scale web=1</span>
<span class="s2">heroku addons:add heroku-PostgreSQL:ronin</span>
<span class="s2">heroku pg:wait</span>
<span class="s2">"""</span>

<span class="k">def</span> <span class="nf">build_staging</span><span class="p">():</span>
    <span class="k">for</span> <span class="n">command</span> <span class="ow">in</span> <span class="n">commands</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s1">'</span><span class="se">\n</span><span class="s1">'</span><span class="p">):</span>
        <span class="n">local</span><span class="p">(</span><span class="n">command</span><span class="p">)</span>
</code></pre></div>
<p>How awesome is that?</p>
<h1 id="how-much-does-heroku-really-cost">How much does Heroku really cost?</h1>
<p>You can do Heroku for free. A lot of people do. More power to them.</p>
<p>But let's face it, beyond a certain point, every PaaS, including
Heroku, is going to be more expensive then getting your own EC2,
Rackspace, Dreamhost, or Linode hosted server. For a fraction of the
cost, you can provision a server, install all the bits, configure the
database, http server, load balancers, and even write Chef/Puppet/Fabric
scripts so you can do it repeatedly at scale. Cheap!</p>
<p>So why pay more for Heroku? Why not just do it ourselves? For example,
right now we're on dedicated PostgreSQL hosting which Heroku charges us
$200/month. That's a lot, right?</p>
<blockquote>
<p><strong>Wrong.</strong></p>
</blockquote>
<p>Right now we're seeing a 50% increase in visits every day. So if we ran
our own servers, Chef/Puppet/Fabric or not, odds are we would be
spending at least 10 hours a month doing server work. And I can assure
you that when we consult that we make more than $20/hour.</p>
<blockquote>
<p><strong>$200 &lt; 10 hours of us doing consulting work to bootstrap the
  project.</strong></p>
</blockquote>
<p>Until you hit a certain point, these days the real cost of servers is
labor. If you're a developer or small effort, and you think going with
a cheap hosting provider is the way to go, think again. Think about the
hours you're losing monkeying around with servers and databases instead
of getting code done.</p>
<p>Heroku saves us money.</p>
<h1 id="the-takeaway">The Takeaway</h1>
<p>One of the problems Django and other Python web frameworks has had is
the difficulty of deployment. I can't tell you how many projects I
didn't do because of the thought of handling the sys admin side of
things. Let's face it, one of the great ongoing successes for PHP is
that deploying the majority of sites is trivial.</p>
<p>With the rise of devops we've seen a lot of developers across languages
and frameworks dive into <strong>Chef</strong> and <strong>Puppet</strong>. It's been sadly
amusing watching people muck around with these great tools to make the
deployment of 1-2 servers 'easier', when the real benefit of those
tools has been to do things at scale. Things like deployments of fifty
servers at once or deployment abstractions for hundreds of people (my
fancy talk for PaaS).</p>
<p>In any case, things have changed. Deploying Python web apps is as
trivial as deploying PHP code.</p>
<p>For developers I see great times ahead.</p>
<hr/>
<p><a href="http://news.ycombinator.com/item?id=3643910" target="_blank">Discuss this post on Hacker
News</a></p>
<p>Published: 2012-02-28 12:45</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/django.html">django</a>
<a href="/tag/heroku.html">heroku</a>
<a href="/tag/consumernotebook.html">consumernotebook</a>
<a href="/tag/mongodb.html">mongodb</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>