---
date: 2013-3-27
tag:
  - python
  - django
  - forms

author: Daniel Roy Greenfeld
location: California
title: Overloading Django Form Fields
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/overloading-form-fields ">Overloading Django Form Fields</a>
    </div>
  </h1>
  <p>
    One of the patterns we get positive feedback for mentioning in our
    <a href="http://django.2scoops.org/" target="_blank">book</a> is
    <strong>overloading form fields</strong>.
  </p>
  <p>
    The problem this pattern handles is the use case of when we have a model
    with a field(s) that allows for blank values, how do we force users to enter
    values?
  </p>
  <p>For example, assuming the following model:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># myapp/models.py</span>
<span class="kn">from</span> <span class="nn">django.db</span> <span class="kn">import</span> <span class="n">models</span>

<span class="k">class</span> <span class="nc">MyModel</span><span class="p">(</span><span class="n">models</span><span class="o">.</span><span class="n">Model</span><span class="p">):</span>

    <span class="n">name</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mi">50</span><span class="p">,</span> <span class="n">blank</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">age</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">IntegerField</span><span class="p">(</span><span class="n">blank</span><span class="o">=</span><span class="bp">True</span><span class="p">,</span> <span class="n">null</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">profession</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mi">100</span><span class="p">,</span> <span class="n">blank</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">bio</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">TextField</span><span class="p">(</span><span class="n">blank</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>

</code></pre>
  </div>
  <p>
    How do we make all those fields (name, age, profession, bio) required
    without modifying the database?
  </p>
  <p>This is the way I used to do it:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># myapp/forms.py</span>
<span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>

<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">MyModel</span>

<span class="k">class</span> <span class="nc">MyModelForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">ModelForm</span><span class="p">):</span>

    <span class="n">name</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mi">100</span><span class="p">,</span> <span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">age</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">IntegerField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">profession</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="n">bio</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">TextField</span><span class="p">(</span><span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>

    <span class="k">class</span> <span class="nc">Meta</span><span class="p">:</span>
        <span class="n">model</span> <span class="o">=</span> <span class="n">MyModel</span>

</code></pre>
  </div>
  <p>See the problems with this approach?</p>
  <p>
    <code>MyModelForm</code> is nearly a copy of <code>MyModel</code>, and was
    in fact created by copy/pasting model and then modifying it. In software
    engineering parlance, it violates the principal of Don't Repeat Yourself (<a
      href="http://en.wikipedia.org/wiki/Don%27t_repeat_yourself"
      target="_blank"
      >DRY</a
    >) and is fertile ground for introducing bugs.
  </p>
  <h1 id="mymodelform-has-a-bug"><code>MyModelForm</code> has a bug!</h1>
  <p>Can you spot the bug?</p>
  <p>
    The code example below illuminates where I purposefully/gleefully placed an
    error:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="k">class</span> <span class="nc">MyModel</span><span class="p">(</span><span class="n">models</span><span class="o">.</span><span class="n">Model</span><span class="p">):</span>

    <span class="c1"># 50 character database field</span>
    <span class="n">name</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mi">50</span><span class="p">,</span> <span class="n">blank</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>

<span class="k">class</span> <span class="nc">MyModelForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">ModelForm</span><span class="p">):</span>

    <span class="c1"># Most people don't write tests to check for field length.</span>
    <span class="c1"># 100 character form field - probably not spotted until deployed.</span>
    <span class="c1"># Easy error to make when violating DRY since the model can change</span>
    <span class="c1">#   and leave the form definition behind.</span>
    <span class="n">name</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mi">100</span><span class="p">,</span> <span class="n">required</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>

</code></pre>
  </div>
  <p>
    Bugs like this happen either because developers are human and make mistakes,
    or because the model evolves over time and the forms are left behind. This
    is a serious maintenance issue, and one that will bite you or the developers
    who end up maintaining code you've written.
  </p>
  <p>Can you spot the second bug? ;-)</p>
  <p>How do we fix this?</p>
  <h1 id="a-better-way">A Better Way</h1>
  <p>
    In instantiated Django forms, fields are kept in a dict-like object. Which
    means, instead of writing forms in a way that duplicates the model, a better
    way is to explicitly modify only what we want to modify:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>

<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">MyModel</span>

<span class="k">class</span> <span class="nc">MyModelForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">ModelForm</span><span class="p">):</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
        <span class="nb">super</span><span class="p">(</span><span class="n">MyModelForm</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="fm">__init__</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">)</span>
        <span class="c1"># Making name required</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s1">'name'</span><span class="p">]</span><span class="o">.</span><span class="n">required</span> <span class="o">=</span> <span class="bp">True</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s1">'age'</span><span class="p">]</span><span class="o">.</span><span class="n">required</span> <span class="o">=</span> <span class="bp">True</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s1">'bio'</span><span class="p">]</span><span class="o">.</span><span class="n">required</span> <span class="o">=</span> <span class="bp">True</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s1">'profession'</span><span class="p">]</span><span class="o">.</span><span class="n">required</span> <span class="o">=</span> <span class="bp">True</span>

    <span class="k">class</span> <span class="nc">Meta</span><span class="p">:</span>
        <span class="n">model</span> <span class="o">=</span> <span class="n">MyModel</span>

</code></pre>
  </div>
  <h2 id="other-field-attributes">Other field attributes</h2>
  <p>
    This isn't just limited to the <code>required</code> attribute. It can also
    be applied to <code>help_text</code>, <code>label</code>,
    <code>choices</code>, <code>widgets</code>, or any other form field
    attribute:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>

<span class="kn">from</span> <span class="nn">.models</span> <span class="kn">import</span> <span class="n">MyModel</span>

<span class="k">class</span> <span class="nc">MyModelForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">ModelForm</span><span class="p">):</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
        <span class="nb">super</span><span class="p">(</span><span class="n">MyModelForm</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="fm">__init__</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">)</span>
        <span class="c1"># snip the other fields for the sake of brevity</span>
        <span class="c1"># Adding content to the form</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s1">'profession'</span><span class="p">]</span><span class="o">.</span><span class="n">help_text</span> <span class="o">=</span> <span class="s2">"Job title here"</span>

    <span class="k">class</span> <span class="nc">Meta</span><span class="p">:</span>
        <span class="n">model</span> <span class="o">=</span> <span class="n">MyModel</span>

</code></pre>
  </div>
  <h2 id="try-it-with-inheritance">Try it with Inheritance!</h2>
  <p>We can even do this with inheritance:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>

<span class="k">class</span> <span class="nc">BaseEmailForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">Form</span><span class="p">):</span>
<span class="n">email</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">EmailField</span><span class="p">(</span><span class="s2">"Email"</span><span class="p">)</span>
<span class="n">email2</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">EmailField</span><span class="p">(</span><span class="s2">"Email 2"</span><span class="p">)</span>

    <span class="k">def</span> <span class="nf">clean</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
        <span class="n">email</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">cleaned_data</span><span class="p">[</span><span class="s1">'email'</span><span class="p">]</span>
        <span class="n">email2</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">cleaned_data</span><span class="p">[</span><span class="s1">'email2'</span><span class="p">]</span>
        <span class="k">if</span> <span class="n">email</span> <span class="o">!=</span> <span class="n">email2</span><span class="p">:</span>
            <span class="k">raise</span> <span class="n">forms</span><span class="o">.</span><span class="n">ValidationError</span><span class="p">(</span><span class="s2">"Emails don't match"</span><span class="p">)</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">cleaned_data</span>

<span class="k">class</span> <span class="nc">ContactForm</span><span class="p">(</span><span class="n">BaseEmailForm</span><span class="p">):</span>
<span class="n">message</span> <span class="o">=</span> <span class="n">forms</span><span class="o">.</span><span class="n">CharField</span><span class="p">()</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
        <span class="nb">super</span><span class="p">(</span><span class="n">ContactForm</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="fm">__init__</span><span class="p">(</span><span class="o">*</span><span class="n">args</span><span class="p">,</span> <span class="o">**</span><span class="n">kwargs</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s1">'email2'</span><span class="p">]</span><span class="o">.</span><span class="n">label</span> <span class="o">=</span> <span class="s2">"Confirm your email"</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">fields</span><span class="p">[</span><span class="s1">'email2'</span><span class="p">]</span><span class="o">.</span><span class="n">help_text</span> <span class="o">=</span> <span class="s2">"We want to be sure!"</span>

</code></pre>
  </div>
  <h1 id="summary">Summary</h1>
  <p>
    From the perspective of general software development, it's always a good
    thing to avoid repeating yourself. This might seem like as much or in some
    cases even more typing, but it's a lot better than making an
    embarrassing/costly mistake.
  </p>
  <p>
    From the perspective of a Python developer our approach more closely matches
    the
    <a href="http://www.python.org/dev/peps/pep-0020/" target="_blank"
      >Zen of Python</a
    >. This is because we only modify the field properties that need to be
    modified, the approach specified is more explicit.
  </p>
  <p>
    Today's reading is Matt Harrison's
    <a
      href="http://www.amazon.com/Guide-Learning-Iteration-Generators-ebook/dp/B007JR4FCQ/?ie=UTF8&amp;qid=1364400929&amp;sr=1-5&amp;tag=ihpydanny-20"
      target="_blank"
      >Guide to Learning Iteration and Generators in Python</a
    >
  </p>
  </div>
