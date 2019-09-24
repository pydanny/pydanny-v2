---
date: 2012-03-05
tag:
  - python
  - django
  - OAuth
  - api
  - Consumer-Notebook
  - rant

author: Daniel Roy Greenfeld
location: California
title: The sorry state of Python OAuth providers
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/sorry-state-python-oauth-providers "
        >The sorry state of Python OAuth providers</a
      >
    </div>
  </h1>
  <p>
    This is one of those challenging posts to write. The people whose projects
    I'm going to describe have put in a lot of dedicated, hard work to overcome
    a challenging subject. Writing an OAuth consumer is a hard problem and
    writing an OAuth provider is an even harder problem. The efforts put in by
    the authors of these projects has been nothing short of incredible. The
    problem, however, is that the existing projects are not usable as-is, and
    need the support of the community in order to improve.
  </p>
  <p>
    The terrible thing is that this is a solved problem within our community.
    Python based projects are successfully implementing OAuth providers, and
    often using internally hacked versions of the efforts I'm about to describe.
    However, they aren't giving this back to the community. It might be that
    they want to protect their competitive edge, but I'm going to be nice and
    say that it's because their too busy to find time to send pull requests
    back.
  </p>
  <p>
    In any case, let me present our use case. For
    <a href="http://consumernotebook.com" target="_blank">Consumer Notebook</a>
    we want an
    <a href="http://api.consumernotebook.com" target="_blank">API</a>. We want
    to be able to track usernames, passwords, and the application using our
    <a href="http://api.consumernotebook.com" target="_blank">API</a> - which is
    the OAuth use case. Much as BasicAuth or DigestAuth is the easier way to go
    in terms of implementation, OAuth was designed for our use case: allowing
    third-party developers to build apps using our API without having to store
    credentials. In fact, it's a critical security issue: Twitter dealt with
    malicious "Twitter apps" stealing usernames and passwords before they
    switched to OAuth. As an API provider, being an OAuth provider might be more
    challenging, but it's the responsible thing to do.
  </p>
  <h1 id="existing-oauth-providers">Existing OAuth Providers</h1>
  <p>
    Time to get into the meat of the issue. Let's look at the current
    implementations of OAuth providing within the Python community. Again, I
    wish I didn't have to be negative, but I'm up against the wall:
  </p>
  <h2 id="oauth2app-django">OAuth2app (Django)</h2>
  <p>
    <a href="https://github.com/hiidef/OAuth2app" target="_blank"
      >https://github.com/hiidef/OAuth2app</a
    >
  </p>
  <p>OAuth version: 2.0</p>
  <ul>
    <li>Strange URL construction that might be a security hole.</li>
    <li>
      Bitwise operators in the logic making it harder to debug. Security is
      hard. Don't complicate your security code because your mistakes will cost.
    </li>
    <li>Uncommented code. Security is hard. Comment your code.</li>
    <li>Documentation outdated and insufficient.</li>
    <li>
      Doesn't work without serious hacking and adding of undocumented
      parameters. Which means I have to worry if I'm breaking anything.
    </li>
    <li>
      We managed to get it working with GET requests. Then we realized that we
      were using GET requests, which seems like a bad idea.
    </li>
  </ul>
  <h2 id="django-piston-django">django-piston (Django)</h2>
  <p>
    <a href="https://bitbucket.org/jespern/django-piston" target="_blank"
      >https://bitbucket.org/jespern/django-piston</a
    >
  </p>
  <p>OAuth version: 1.0</p>
  <ul>
    <li>Stalled project.</li>
    <li>Documentation insufficient.</li>
  </ul>
  <h2 id="django-oauth-plus-django">django-oauth-plus (Django)</h2>
  <p>
    <a href="http://code.larlet.fr/django-oauth-plus" target="_blank"
      >http://code.larlet.fr/django-oauth-plus</a
    >
  </p>
  <p>OAuth version: 1.0a</p>
  <ul>
    <li>Tutorial doesn't work.</li>
    <li>Documentation insufficient.</li>
    <li>
      Doesn't work without serious hacking. Which means I have to worry if I'm
      breaking anything.
    </li>
    <li>We could not get it to work.</li>
  </ul>
  <h2 id="lastuser-flask">lastuser (Flask)</h2>
  <p>
    <a href="https://github.com/hasgeek/lastuser" target="_blank"
      >https://github.com/hasgeek/lastuser</a
    >
  </p>
  <p>OAuth version: 2.0</p>
  <ul>
    <li>No documentation</li>
    <li>No tests to serve as documentation</li>
    <li>
      Lack of documentation means I'm not sure if it is actually a OAuth
      provider.
    </li>
  </ul>
  <h2 id="python-oauth2-python">python-oauth2 (Python)</h2>
  <p>
    <a href="https://github.com/dgouldin/python-OAuth2" target="_blank"
      >https://github.com/dgouldin/python-OAuth2</a
    >
    (best example)
  </p>
  <p>OAuth version: 1.0</p>
  <ul>
    <li>
      Called 'OAuth2' but only works with OAuth 1? Really?
      <strong>WTF?</strong> This needs to fixed.
    </li>
    <li>Documentation insufficient.</li>
    <li>Provides only a skeleton of a provider. Not a turnkey solution.</li>
    <li>
      Doesn't work as a provider without serious hacking. Which means I have to
      worry if I'm breaking anything.
    </li>
    <li>
      Many, many forks of the project, with various blog posts advising people
      to use various particular forks rather than the main one.
    </li>
  </ul>
  <h1 id="how-about-a-solution">How about a solution?</h1>
  <p>
    Alright, I've ranted and laid out out a bunch of bullets identifying a
    problem. Time to try and fix the problem.
  </p>
  <p>
    For starters, a production-usable OAuth provider should meet certain
    standards:
  </p>
  <ul>
    <li>Near turnkey solution</li>
    <li>Working code (duplicates above bullet but I'm making a point)</li>
    <li>Working tutorials</li>
    <li>Documentation</li>
    <li>Commented code</li>
    <li>Linted code</li>
    <li>Test coverage &gt; 80%</li>
  </ul>
  <p>
    This is my specification. If your project for any Python framework matches
    it, I'll list it on a forthcoming website that also covers Python based
    OAuth consumers.
  </p>
  <p>
    For what it's worth, Idan Gazit has been working on something to help
    address the problem, specifically
    <a href="https://github.com/idan/oauthlib" target="_blank"
      >https://github.com/idan/oauthlib</a
    >. It also is intended to cover the Python OAuth consumption issue I didn't
    cover in this article. It and related efforts need a lot of work, so...
  </p>
  <p>
    The PyCon US 2012 sprints start on March 12. I think as a community, we
    Pythonistas should band together and make things right. I think we'll have
    the brainpower and enough eyes on the problem to make serious headway on the
    issue, either by fixing existing solutions or creating new ones. Right now
    I've got interest from people to join in and help, including Idan Gazit,
    Audrey Roy, George Hickman, and others.
  </p>
  <p>
    We're willing to put in the time to make OAuth in Python better, how about
    you?
  </p>
  <p>
    Join us at the PyCon US sprints either in person or on-line.
    <a
      href="https://us.pycon.org/2012/community/sprints/projects/"
      target="_blank"
      >Details of the sprint are near the bottom of this PyCon Sprint page</a
    >.
  </p>
  <p>
    <a href="http://oauth.net/" target="_blank"
      ><img
        alt="image"
        src="http://farm8.staticflickr.com/7201/6803475636_f34fb400eb_m.jpg"
    /></a>
  </p>
  <hr />
  <h2 id="updates">Updates</h2>
  <ul>
    <li>
      03/05/2012 - Removed Velruse from the list of providers as it's lead,
      Michael Merickel, clarified that it is not a provider.
    </li>
    <li>03/06/2012 - Added a link to the PyCon OAuth sprints.</li>
    <li>
      6/24/2013 - This article has been translated by Anja Skrba to
      Serbo-Croatian:
      <a
        href="http://science.webhostinggeeks.com/lose-stanje-python"
        target="_blank"
        >http://science.webhostinggeeks.com/lose-stanje-python</a
      >
    </li>
    <li>
      07/07/2013 - Please consider
      <a href="https://github.com/evonove/django-oauth-toolkit" target="_blank"
        >https://github.com/evonove/django-oauth-toolkit</a
      >
      for use as a Django-powered OAuth provider. The team behind it is doing it
      right!
    </li>
    <li>
      01/16/2014 - Please consider
      <a href="https://github.com/lepture/flask-oauthlib" target="_blank"
        >https://github.com/lepture/flask-oauthlib</a
      >
      for use as a Flask-powered OAuth provider.
    </li>
  </ul>
  <hr />
  <p>
    <a href="http://news.ycombinator.com/item?id=3666853" target="_blank"
      >Discuss this post on Hacker News</a
    >
  </p>
  </div>
