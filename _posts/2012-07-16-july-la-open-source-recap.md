---
date: 2012-07-16
tag:
  - python
  - django
  - php
  - la
  - clojure
  - perl
  - ruby
  - nodejs
  - meteor

author: Daniel Roy Greenfeld
location: California
title: July 15th, 2012 LA Open Source Recap
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/july-la-open-source-recap "
        >July 15th, 2012 LA Open Source Recap</a
      >
    </div>
  </h1>
  <p>
    On July 15th, 2012, at the
    <a
      href="http://www.meetup.com/LA-Hackathons/events/64542582/"
      target="_blank"
      >July LA Hackathons Open Source event</a
    >, over 60 <a href="http://python.org" target="_blank">Python</a>,
    <a href="http://djangoproject.com" target="_blank">Django</a>,
    <a href="http://www.ruby-lang.org/" target="_blank">Ruby</a>,
    <a href="http://rubyonrails.org/" target="_blank">Ruby on Rails</a>,
    <a href="http://www.php.net/" target="_blank">PHP</a>,
    <a href="http://en.wikipedia.org/wiki/JavaScript" target="_blank"
      >JavaScript</a
    >, <a href="http://nodejs.org/" target="_blank">Node.js</a>,
    <a href="http://www.perl.org/" target="_blank">Perl</a>, and
    <a href="http://clojure.org" target="_blank">Clojure</a> developers arrived
    to work on a variety of projects. We went from 10 AM to 10 PM, and there was
    much coding and learning done by all. There was a very powerful vibe shared
    by nearly everyone there, and it was great to see so many people from
    different personal and open source backgrounds working together and having a
    great time as a group.
  </p>
  <h1 id="filtering-out-distractions">Filtering out distractions</h1>
  <p>
    We made some changes to our proceedings for this event, entirely because
    last time with 'distractions' that caused some issues. In a nutshell, here
    is 50% of what we did:
  </p>
  <ol>
    <li>
      A clear statement in the event description and follow up emails that this
      event was for developers and designers only.
    </li>
    <li>Laptops were an absolute requirement for entry into the event.</li>
  </ol>
  <p>
    We also rolled in a couple other tricks I'm not going to write down. If you
    see me in person, ask away. The results were near perfect, and we won't
    hesitate to use these techniques again.
  </p>
  <h1 id="sponsors">Sponsors</h1>
  <p>
    We let attendees know which sponsors were interested in potential new hires,
    in this case,
    <a href="http://originatelabs.com" target="_blank">Originate</a> and
    <a href="http://cars.com" target="_blank">Cars.com</a>. This sort of low-key
    technique helps us land sponsors but doesn't annoy attendees. Speaking of
    sponsors, here they are in alphabetical order:
  </p>
  <ul>
    <li><a href="http://cars.com" target="_blank">Cars.com</a></li>
    <li><a href="http://cartwheelweb.com" target="_blank">Cartwheel Web</a></li>
    <li><a href="http://heroku.com" target="_blank">Heroku</a></li>
    <li><a href="http://originatelabs.com" target="_blank">Originate</a></li>
  </ul>
  <h1 id="codeprojects-worked-on">Code/Projects worked on</h1>
  <p>
    Next time I'm going to be a lot more careful about getting down the details
    of what people did. Maybe a signup sheet or an online form? Heck, sounds
    like a great quick project for next time!
  </p>
  <ul>
    <li>
      <a href="http://djangoproject.com" target="_blank">Django</a> (see below
      for details)
    </li>
    <li>
      <a href="http://tglines.github.com/dynasaur/" target="_blank">Dynasaur</a>
      (Node.js/DynamoDB ORM)
    </li>
    <li>
      <a href="https://github.com/saltstack/salt" target="_blank">Salt Stack</a>
    </li>
    <li>
      <a href="https://github.com/philfree/meteordraw" target="_blank"
        >meteordraw</a
      >
    </li>
    <li><a href="https://github.com/harph/pyit" target="_blank">pyit</a></li>
    <li><a href="http://rubyonrails.org/" target="_blank">Ruby on Rails</a></li>
    <li>
      <a href="https://github.com/symkat/DBIx-Config" target="_blank"
        >DBIx::Config</a
      >
    </li>
    <li>Clojure Tutorials</li>
    <li>
      <a href="https://github.com/andrewvc/engulf" target="_blank">engulf</a>
      (Clojure load testing tool that got 2 more tests)
    </li>
    <li>HTML5</li>
    <li>PHP</li>
    <li>Lots more!</li>
  </ul>
  <h1 id="django-sprints">Django Sprints</h1>
  <p>
    My conservative estimate is that we had 12 people working on Django or
    Django related projects. That's at least 20% of attendees. Unfortunately,
    because I'm not a Django core developer, I wasn't reviewing commits; so I am
    not entirely sure what was being worked on. I do know that I wasn't the only
    person to commit to core Django.
  </p>
  <p>
    As for me, I continued my efforts started at DjangoCon Europe to refactor
    the
    <a
      href="https://docs.djangoproject.com/en/dev/topics/class-based-views/"
      target="_blank"
      >Class</a
    >
    <a
      href="https://docs.djangoproject.com/en/dev/ref/class-based-views/"
      target="_blank"
      >Based</a
    >
    <a
      href="https://docs.djangoproject.com/en/dev/ref/class-based-views/mixins/"
      target="_blank"
      >Views</a
    >
    documentation. I got in two pull requests and finally managed to badly teach
    myself how to use git rebase.
  </p>
  <p>
    <strong>note</strong>: I want to make it exceedingly clear that I'm not the
    only one working the CBV doc refactor. I'm just one of the fold.
  </p>
  <h1 id="socializing">Socializing</h1>
  <p>
    During meals we tried to keep people's hands off the keyboard. Specifically
    everyone got a chance to state their name, toolset they were working with,
    and something interesting/embarrassing about themselves. Three of the more
    memorable ones:
  </p>
  <ul>
    <li>An 8 year old attendee wrote his first 4 PHP programs!</li>
    <li>
      <a href="http://twitter.com/sym_kat" target="_blank">sym_kat</a> is
      invited to speak at the next London Perl Workshop.
    </li>
    <li>
      Someone employed at SpaceX took Zed Shaw's
      <a href="http://learnpythonthehardway.org/" target="_blank">LPTHW</a>
      class taught by the man himself at
      <a href="http://cartwheelweb.com" target="_blank">Cartwheel Web</a> HQ in
      2011 got himself moved from the C# to the Python team. Go open source!
    </li>
  </ul>
  <h1 id="closing-thoughts">Closing thoughts</h1>
  <p>
    There were a few glitches, but nothing major. Most of those glitches stem
    from us coming off two months of helping organize multiple events while
    traveling literally around the world. I think things would have been better
    if I had delegated more to the right people.
  </p>
  <p>
    For the most part, there was this electrifying energy that had people
    focused and working on what they wanted all day. Yet it wasn't all
    heads-down-coding, their was some good coder-to-coder discussion and fun.
    The result is at the end of the day people seemed refreshed and empowered,
    wanting another day as soon as possible. We hope to be able to catch this
    feeling at future events.
  </p>
  <p>
    Which means we're plotting the next event now. If you are interested in
    providing a venue or sponsoring the event, let me know at
    <a href="mailto:pydanny@cartwheelweb.com" target="_blank"
      >pydanny@cartwheelweb.com</a
    >.
  </p>
  <p><strong>Update</strong>: Corrected the details about the SpaceX guy.</p>
  </div>
