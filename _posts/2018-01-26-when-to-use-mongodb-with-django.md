---
date: 2018-01-26
tag:
  - python
  - django
  - mongodb
  - rant

author: Daniel Roy Greenfeld
location: California
title: When to Use MongoDB with Django
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/when-to-use-mongodb-with-django "
        >When to Use MongoDB with Django</a
      >
    </div>
  </h1>
  <h1 id="short-answer">Short Answer</h1>
  <p>You don't.</p>
  <h1 id="long-answer">Long Answer</h1>
  <p>
    First off, let's get one thing out of the way. This isn't a bash on MongoDB.
    MongoDB works great with lots of things (Flask, Tornado, Node, etc), but
    it's a mismatch with Django. In other words, this article is about using the
    right tool for the right job.
  </p>
  <p>
    Second, I'm not speaking from ignorance. In fact, I have quite a bit of
    experience combining MongoDB and Django. You can see some of my early work
    with combining these tools in the defunct
    <a href="https://github.com/jazzband/django-mongonaut" target="_blank"
      >django-mongonaut</a
    >.
  </p>
  <p>
    Okay then, let's get into the background of this post: On various Django
    help forums, you'll hear requests from new-ish Django developers on how to
    use MongoDB with Django. Most of the time they want to replace the Django
    ORM with calls to MongoDB. Here are the reasons I've heard so far.
  </p>
  <h1 id="the-90-reason-json-storage">The 90% Reason: JSON storage</h1>
  <p>
    Most of the time people want to replace SQL with MongoDB in Django, the
    reason is they want to store JSON data and search it.
  </p>
  <p>
    In which case, they should use
    <a
      href="https://docs.djangoproject.com/en/2.0/ref/contrib/postgres/fields/#jsonfield"
      target="_blank"
      >Django's built-in implementation of PostgreSQL's JSON field</a
    >. It's not just a string field, it's fully searchable. Implementation
    example below:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.contrib.postgres.fields</span> <span class="kn">import</span> <span class="n">JSONField</span>
<span class="kn">from</span> <span class="nn">django.db</span> <span class="kn">import</span> <span class="n">models</span>

<span class="k">class</span> <span class="nc">Product</span><span class="p">(</span><span class="n">models</span><span class="o">.</span><span class="n">Model</span><span class="p">):</span>

    <span class="n">metadata</span> <span class="o">=</span> <span class="n">JSONField</span><span class="p">(</span><span class="n">null</span><span class="o">=</span><span class="bp">True</span><span class="p">,</span> <span class="n">blank</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>

</code></pre>
  </div>

  <p>
    Just save your data into this field using a JSON-serializable dict. It's
    that easy. Even better, in this previous
    <a
      href="https://www.pydanny.com/pretty-formatting-json-django-admin "
      target="_blank"
      >article</a
    >, I show how you can pretty print the JSON in the Django admin.
  </p>
  <p>
    Using this field, you get all the built-in features of Django and a
    searchable JSON field without the mess of stapling a non-relational database
    (MongoDB) into a framework and vibrant ecosystem designed to work with
    relational databases (Django).
  </p>
  <p>
    For those using MySQL instead of PostgreSQL, there's always Django-MySQL's
    <a
      href="https://django-mysql.readthedocs.io/en/latest/model_fields/json_field "
      target="_blank"
      >jsonfield</a
    >.
  </p>
  <h1 id="the-5-reason-performance">The 5% Reason: Performance</h1>
  <p>
    A fraction of people want to use MongoDB with Django because of supposed
    performance reasons. Sure, if you run MongoDB without any write safeguards
    and decide to forego database transactions, it will run faster than any
    relational storage. However, that's a dangerously insecure approach to
    things. It's simply not worth the risk of corrupted data.
  </p>
  <p>
    Don't take my word for it, spend an hour searching for articles about write
    safety in MongoDB. Ignore the hype articles published by mongodb.com, read
    what real businesses and projects case studies have to say.
  </p>
  <p>
    Also, if you want to speed database i/o up with Django, standard practice is
    to employ asynchronous tools such as Celery before switching out the
    datastore.
  </p>
  <h1 id="the-4-reason-scaling-up">The 4% Reason: Scaling Up</h1>
  <p>
    Anyone who tells you that relational databases can't scale as well as
    MongoDB (or anything else) is selling you something. Or was sold on
    something and don't want to admit they bought the hype.
  </p>
  <p>
    Again, don't take my word for it, spend an hour searching for articles about
    scaling issues with MongoDB. Again, ignore the marketing and read real case
    studies.
  </p>
  <h1 id="the-1-reason-management">The 1% Reason: Management</h1>
  <p>
    Every once in a while someone tells me that using MongoDB with Django is a
    management decision. In which case, they should send their boss(es) to this
    blog post.
  </p>
  <p>
    Management should know that Django is designed to be used with a relational
    database backend (PostgreSQL, MySQL) and a key/value store for ephemeral
    data (Redis, Memcached). Going beyond that design is going to make
    development slower and frustrate the team. Even if your team can work around
    this issue, they'll be hampered by not being able to fully exploit tools
    within the Django ecosystem.
  </p>
  <h1 id="if-you-must-use-mongodb-use-flask-instead">
    If You Must Use MongoDB, Use Flask Instead
  </h1>
  <p>
    There's nothing wrong with MongoDB. However, it's suboptimal when used with
    Django. If you use it with correct write permissions, MongoDB doesn't
    provide any speed benefits with Django. You also lose many of the advantages
    of Django (database transactions, rock-solid security, forms, easy Django
    REST framework use, hundreds of third-party packages, etc). There is quite a
    lot of things you are going to have to rewrite.
  </p>
  <p>
    And if you're going to have to rewrite that much of Django's functionality
    to use MongoDB, you might as well be using Flask. Honestly, this isn't a bad
    choice, as the flexibility of Flask makes it perfect for use with
    non-relational databases.
  </p>
  <p>
    I know, because this is how we use Flask on the job, which is not with
    relational data. We have dozens of microservices that rely on DynamoDB.
    While DynamoDB isn't MongoDB, they are similar enough that I can tell you
    this approach is delightful. Keep an eye out for my upcoming article about
    it.
  </p>
  <h1 id="stay-tuned">Stay Tuned!</h1>
  <p>
    If you found this article useful and want to see more like it, or if you
    want to encourage me to do more open source work, hit me up on
    <a href="https://www.patreon.com/danielroygreenfeld" target="_blank"
      >Patreon</a
    >.
  </p>
  </div>
