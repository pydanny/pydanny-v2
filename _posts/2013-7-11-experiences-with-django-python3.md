---
date: 2013-7-11
tag: 
  - python
  - django
  - python3

author: Daniel Roy Greenfeld
location: California
title: My experiences with Django and Python 3
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/experiences-with-django-python3.html">My experiences with Django and Python 3</a>
</div>
</h1>
<p>The following are my notes, observations, and resources on the subject
of working with Python 3 (with or without Django).</p>
<p>Recently I've become involved in a couple of Django efforts that used
Python 3.3. The quick summary of what I learned is pretty much what I
expected: Out of the box Django 1.5 (and the pending 1.6 release) works
fine with Python 3.3.2.</p>
<h1 id="use-python-332">Use Python 3.3.2!</h1>
<p>Myself and others have encountered problems with using Django 1.5+ and
earlier versions of Python 3. The issues can be tricky; for example
<code>syncdb</code> fails in curious ways on Python 3.3.0.</p>
<p>The answer, for me, is to use Python 3.3.2 and don't look back.</p>
<h1 id="checking-for-python-3-compatibility">Checking for Python 3 Compatibility</h1>
<p>The steps I use are below. They are in rough order:</p>
<ul>
<li>Look up the package on <a href="https://pypi.python.org/pypi/" target="_blank">PyPI</a> and see
if any of it's trove classifiers mention Python 3 status.</li>
<li>See if a pull request for Python 3 support is outstanding.</li>
<li>Run the test suite using Python 3.3</li>
<li>Use <a href="http://docs.python.org/2/library/2to3.html" target="_blank">2to3</a> to scan the
code for issues.</li>
<li>If a Django project, check the models for <code>__str__()</code> methods. If it
has them, it's a pretty good indicator it's Python 3.3 friendly.</li>
<li>Make a judgement call.</li>
</ul>
<h1 id="important-packages-that-work-with-python-3">Important Packages that work with Python 3</h1>
<p>In this section I'm listing a few of the Python and Django packages
I'm using that worked without me having to do anything sort of
modification or pull request:</p>
<ul>
<li>Django 1.5 and 1.6 beta</li>
<li>Pillow (drop-in replacement for PIL)</li>
<li>South</li>
<li>django-bootstrap-registration (templates for django-registration)</li>
<li>django-braces</li>
<li>django-crispy-forms</li>
<li>requests</li>
</ul>
<h1 id="conversion-process">Conversion process</h1>
<p>How I convert Python 2 code to Python 3:</p>
<ul>
<li>Use 2to3 until you get used to not using it.</li>
<li>Fix any problems you find in the code. Try to keep solutions as
simple as possible.</li>
<li>Submit the pull request.</li>
<li>Politely poke the package owner to accept the pull request.</li>
<li>Once the owner accepts the pull request, gently poke the package
owner to push the update to PyPI.</li>
</ul>
<h1 id="packages-that-needed-conversion">Packages that needed conversion</h1>
<p>Here are four packages worth noting that had to be converted:</p>
<ul>
<li>unicode-slugify</li>
<li>django-registration</li>
<li>django-stripe-payments (in progress)</li>
<li>django-nose</li>
</ul>
<p>Let's get into some detail for each package:</p>
<h2 id="unicode-slugifyhttpspypipythonorgpypiunicode-slugify"><a href="https://pypi.python.org/pypi/unicode-slugify" target="_blank">unicode-slugify</a></h2>
<p>This is a handy, more unicode friendly replacement for Django's
django.utils.text.slugify function. It failed on Django 1.6 beta, so I
forked it, submitted a successful pull request after testing it on
Python 2.6, 2.7, and Python 3.3.2. The Mozilla team pushed it to PyPI
and even gave me
<a href="https://badges.mozilla.org/en-US/profiles/profile/pydanny" target="_blank">badges</a> for
my efforts!</p>
<p>In the future I would like to see this little package work without the
dependency of Django itself, and I've had a couple replacement
dependencies suggested.</p>
<h2 id="django-registration">django-registration</h2>
<p>With the 1.0 release, it's been updated for Django 1.5, <em>unless</em> you
use customized User models or Python 3. I really needed this on PyPI,
but the maintainer is very busy. Therefore, I forked the project,
renamed it to <a href="https://pypi.python.org/pypi/django-reg" target="_blank">django-reg</a>
while referencing the original, and pushed it to PyPI. Not ideal, but
sometimes you have to do what you have to do.</p>
<p>Lesson learned: In the future skip these issues and just use
<a href="https://pypi.python.org/pypi/django-allauth" target="_blank">django-allauth</a>.</p>
<p><strong>Update 08/08/2013</strong>: All my Python 3 work is now on django-allauth.
This way I don't have to do the work of maintaining a compatibility
branch.</p>
<h2 id="django-stripe-paymentshttpspypipythonorgpypidjango-stripe-payments-in-progress"><a href="https://pypi.python.org/pypi/django-stripe-payments" target="_blank">django-stripe-payments</a> (in progress)</h2>
<p>While django-zebra is better known for handling stripe payments, I
prefer to use Eldarion's excellent, well-maintained and tested
django-stripe-payments. It was delayed because django-nose wasn't
Python 3 compatible, but that's been fixed as of at least 7/28/2013.
Unfortunately, it's Travis-CI tests fail with the Django 1.5 era custom
user model because of what might be a linter misconfiguration. In
theory, the just released version of pylint (1.0) should work without
any problems.</p>
<p>Of course, I informed the maintainers of my efforts and problems.</p>
<p><strong>Update 07/30/2013</strong>: Updated the text to reflect the current status of
the linter problems I'm having.</p>
<p><strong>Update 08/08/2013</strong>: While django-stripe-payments is useful, it
doesn't do everything that I need. I tried extending it's logic into a
third app, but that was proving unweildy. Therefore, I forked the
project to <a href="https://pypi.python.org/pypi/dj-stripe" target="_blank">dj-stripe</a>, which
has the features and compatibility that I need.</p>
<h2 id="django-nosehttpspypipythonorgpypidjango-nose"><a href="https://pypi.python.org/pypi/django-nose" target="_blank">django-nose</a></h2>
<p>Today, I asked the maintainer to visit an outstanding pull request that
adds Python 3 compatibility. It's a good idea to do this since they
might already be working on it, or may have observations they want to
share.</p>
<p><strong>Update 7/28/2013</strong>: Jeff Balogh pushed a Python 3.3.2+ compatible
version up to PyPI a few days ago. Makes everything so much better!</p>
<h1 id="dealing-with-slow-maintainers">Dealing with Slow Maintainers</h1>
<p>For what it's worth, from experience ranting to or about slow-moving
maintainers is absolutely counter-productive. People have lives and jobs
that sometimes get in the way of open source. It's more productive to
be patient, be polite, and if necessary do an absolutely minimal fork or
find a working alternative.</p>
<h1 id="handy-resources">Handy Resources</h1>
<p>The following are two useful resources on converting Python 2 to Python
3. I don't follow their methods exactly, I just use them as rough
guidelines for my own workflow.</p>
<ul>
<li><a href="http://youtu.be/cJMGvAYYUyY" target="_blank">Porting Django apps to Python 3</a> video
by Jacob Kaplan-Moss</li>
<li><a href="http://python3porting.com/" target="_blank">Porting to Python 3</a> book (free HTML or
paid PDF, Kindle, ePub) by Lennart Regebro</li>
</ul>
<p>For various Python 3 recipes, I keep my kindle reader open to this
priceless gem:</p>
<ul>
<li><a href="http://www.amazon.com/Python-Cookbook-ebook/dp/B00DQV4GGY/?tag=ihpydanny" target="_blank">Python Cookbook, 3rd
Edition</a>
book by David Beazley and Brian K. JOnes.</li>
</ul>
<h1 id="closing-thoughts">Closing Thoughts</h1>
<p>This blog post makes it seems like I've put in a lot of work getting
things to Python 3, but that isn't the case at all. In fact, for the
most part the transition has been trivial. There are a few minor
hiccups, but nothing that's killing a whole day or destroying a
deadline.</p>
<p><strong>Benefit of using Python 3?</strong> I get to call myself a <strong>Python 3
Hipster</strong>.</p>
<p><strong>Downside of using Python 3?</strong> A little bit of extra homework on each
project. However, each time I fix something it's done and I've made
the world a better place.</p>
<p>Published: 2013-7-11 16:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/django.html">django</a>
<a href="/tag/python3.html">python3</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>