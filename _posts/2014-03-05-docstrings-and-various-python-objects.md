---
date: 2014-03-05
tag:
  - python

author: Daniel Roy Greenfeld
location: California
title: Docstrings and Various Python Objects
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/docstrings-and-various-python-objects.html"
        >Docstrings and Various Python Objects</a
      >
    </div>
  </h1>
  <p>
    Early in my journeys with Python I struggled with understanding the purpose
    and use of <strong>lambda</strong> functions. When I finally understood them
    I was disappointed by their lack of <strong>docstrings</strong>. For that
    reason, and various other shortcomings,
    <a
      href="https://pydanny.blogspot.com/2007/07/lambdas-no-more.html"
      target="_blank"
      >I went back to standard functions</a
    >. Also, for what it's worth, I've even spoken about how
    <a
      href="http://www.slideshare.net/pydanny/python-worst-practices/41"
      target="_blank"
      >you shouldn't use lambdas</a
    >.
  </p>
  <p>
    Recently I was thinking about how everything in Python is an object. This
    includes lambdas. Since all Python objects have the
    <code>__doc__</code> special (aka 'magic') attribute, can we add custom
    docstrings to everything?
  </p>
  <p>
    Using
    <a
      href="https://pydanny.com/pytest-no-boilerplate-testing.html"
      target="_blank"
      >pytest</a
    >, Python 2.7.x, and lambdas, let's find out!
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># test_docstrings.py</span>
<span class="kn">import</span> <span class="nn">pytest</span>

<span class="k">def</span> <span class="nf">test_lambdas</span><span class="p">():</span>
<span class="c1"># Create a lambda and test it</span>
<span class="n">doubler</span> <span class="o">=</span> <span class="k">lambda</span> <span class="n">x</span><span class="p">:</span> <span class="s2">" "</span><span class="o">.</span><span class="n">join</span><span class="p">([</span><span class="n">x</span><span class="p">,</span> <span class="n">x</span><span class="p">])</span>
<span class="k">assert</span> <span class="n">doubler</span><span class="p">(</span><span class="s2">"fun"</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"fun fun"</span>

    <span class="c1"># Add a docstring to the lambda</span>
    <span class="n">doubler</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">=</span> <span class="s2">"Doubles strings"</span>

    <span class="c1"># Test that calling __doc__ works</span>
    <span class="k">assert</span> <span class="n">doubler</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">==</span> <span class="s2">"Doubles strings"</span>

</code></pre>
  </div>

  <p>
    Hey! It worked! If I try it in the shell, I can even see that the
    <code>help()</code> function works:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="c1"># Welcome to the REPL!</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">doubler</span> <span class="o">=</span> <span class="k">lambda</span> <span class="n">x</span><span class="p">:</span> <span class="s2">" "</span><span class="o">.</span><span class="n">join</span><span class="p">([</span><span class="n">x</span><span class="p">,</span> <span class="n">x</span><span class="p">])</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">doubler</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">=</span> <span class="s2">"Doubles strings"</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">help</span><span class="p">(</span><span class="n">doubler</span><span class="p">)</span>
<span class="n">Help</span> <span class="n">on</span> <span class="n">function</span> <span class="o">&lt;</span><span class="k">lambda</span><span class="o">&gt;</span> <span class="ow">in</span> <span class="n">module</span> <span class="n">__main__</span><span class="p">:</span>

<span class="o">&lt;</span><span class="k">lambda</span><span class="o">&gt;</span> <span class="k">lambda</span> <span class="n">x</span>
<span class="n">Doubles</span> <span class="n">strings</span>
</code></pre>
  </div>

  <p>
    Contrary to what I thought in 2007, Python lambdas <em>can</em> be
    documented. Modifying their docstring functions with both the direct
    <code>__doc___</code> special attribute and the <code>help()</code> built-in
    works just fine.
  </p>
  <h1 id="should-we-use-lambdas">Should We Use Lambdas?</h1>
  <p>
    As demonstrated in this article, lambdas can be documented. Nevertheless,
    I'm still not entirely convinced python lambdas should be used as anything
    except when an anonymous function is advantageous, i.e during functional
    programming.
  </p>
  <h1 id="what-about-other-python-types">What About Other Python Types?</h1>
  <p>Enough about lambdas, let's see what else we can do with docstrings.</p>
  <h2 id="functions-and-docstrings">Functions and Docstrings</h2>
  <p>
    We know modifying docstrings of functions works, so we'll use it as a
    'control'.
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># appended to test_docstrings.py</span>
<span class="k">def</span> <span class="nf">test_functions</span><span class="p">():</span>
    <span class="c1"># Create a function and test it</span>
    <span class="k">def</span> <span class="nf">doubler</span><span class="p">(</span><span class="n">x</span><span class="p">):</span>
        <span class="s2">"Doubles strings"</span>
        <span class="k">return</span> <span class="s2">" "</span><span class="o">.</span><span class="n">join</span><span class="p">([</span><span class="n">x</span><span class="p">,</span> <span class="n">x</span><span class="p">])</span>
    <span class="k">assert</span> <span class="n">doubler</span><span class="p">(</span><span class="s2">"fun"</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"fun fun"</span>
    <span class="k">assert</span> <span class="n">doubler</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">==</span> <span class="s2">"Doubles strings"</span>

    <span class="c1"># Change the docstring</span>
    <span class="n">doubler</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">=</span> <span class="s2">"Really doubles strings"</span>

    <span class="c1"># Test that calling __doc__ works</span>
    <span class="k">assert</span> <span class="n">doubler</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">==</span> <span class="s2">"Really doubles strings"</span>

</code></pre>
  </div>

  <h2 id="strings-and-docstrings">Strings and Docstrings</h2>
  <p>
    Let's go for something a bit harder. Strings, for example, come with a
    docstring, but as Python strings are immutable types, it's read-only access:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># more appended to test_docstrings.py</span>
<span class="k">def</span> <span class="nf">test_strings</span><span class="p">():</span>
    <span class="c1"># Assert that strings come with a built-in doc string</span>
    <span class="n">s</span> <span class="o">=</span> <span class="s2">"Hello, world"</span>
    <span class="k">assert</span> <span class="n">s</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">==</span> <span class="s1">'str(object) -&gt; string</span><span class="se">\n\n</span><span class="s1">Return a nice string'</span> \
        <span class="s1">' representation of the object.</span><span class="se">\n</span><span class="s1">If the argument is a string,'</span> \
        <span class="s1">' the return value is the same object.'</span>

    <span class="c1"># Try to set the docstring of a string and you get an AttributeError</span>
    <span class="k">with</span> <span class="n">pytest</span><span class="o">.</span><span class="n">raises</span><span class="p">(</span><span class="ne">AttributeError</span><span class="p">)</span> <span class="k">as</span> <span class="n">err</span><span class="p">:</span>
        <span class="n">s</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">=</span> <span class="s2">"Stock programming text"</span>

    <span class="c1"># The error's value explains the problem...</span>
    <span class="k">assert</span> <span class="n">err</span><span class="o">.</span><span class="n">value</span><span class="o">.</span><span class="n">message</span> <span class="o">==</span> <span class="s2">"'str' object attribute '__doc__' is read-only"</span>

</code></pre>
  </div>

  <p>
    Hmmm... does this mean that we can't assign a docstring to a string? What if
    we subclass Python's <code>str</code> type?
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># Again appended to test_docstrings.py</span>
<span class="k">def</span> <span class="nf">test_subclassed_string</span><span class="p">():</span>

    <span class="c1"># Subclass the string type</span>
    <span class="k">class</span> <span class="nc">String</span><span class="p">(</span><span class="nb">str</span><span class="p">):</span>
        <span class="sd">"""I am a string class"""</span>

    <span class="c1"># Instantiate the string</span>
    <span class="n">s</span> <span class="o">=</span> <span class="n">String</span><span class="p">(</span><span class="s2">"Hello, world"</span><span class="p">)</span>

    <span class="c1"># The default docstring is set</span>
    <span class="k">assert</span> <span class="n">s</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">==</span> <span class="s2">"""I am a string class"""</span>

    <span class="c1"># Let's set the docstring</span>
    <span class="n">s</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">=</span> <span class="s2">"I am a string object"</span>
    <span class="k">assert</span> <span class="n">s</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">==</span> <span class="s2">"I am a string object"</span>

</code></pre>
  </div>

  <p>
    This looks like it works, but it doesn't do enough. Specifically, this
    doesn't satisfy the needs of Python's <code>help()</code> function when
    called against the instantiated object.
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="o">&gt;&gt;&gt;</span> <span class="c1"># REPL again so we can call the help() function</span>
<span class="o">&gt;&gt;&gt;</span> <span class="k">class</span> <span class="nc">String</span><span class="p">(</span><span class="nb">str</span><span class="p">):</span>
<span class="o">...</span>     <span class="s2">"""I am a string class"""</span>
<span class="o">...</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">s</span> <span class="o">=</span> <span class="n">String</span><span class="p">(</span><span class="s2">"Hello, world"</span><span class="p">)</span> <span class="c1"># instantiate the String Object</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">s</span><span class="o">.</span><span class="vm">__doc__</span> <span class="o">=</span> <span class="s2">"I am a string object"</span>
<span class="o">&gt;&gt;&gt;</span> <span class="n">help</span><span class="p">(</span><span class="n">s</span><span class="p">)</span> <span class="c1"># Called against the 's' object, not the 'String' class.</span>
<span class="n">Help</span> <span class="n">on</span> <span class="n">built</span><span class="o">-</span><span class="ow">in</span> <span class="n">module</span> <span class="n">__builtin__</span><span class="p">:</span>

<span class="n">NAME</span>
<span class="n">**builtin**</span> <span class="o">-</span> <span class="n">Built</span><span class="o">-</span><span class="ow">in</span> <span class="n">functions</span><span class="p">,</span> <span class="n">exceptions</span><span class="p">,</span> <span class="ow">and</span> <span class="n">other</span> <span class="n">objects</span><span class="o">.</span>

<span class="n">FILE</span>
<span class="p">(</span><span class="n">built</span><span class="o">-</span><span class="ow">in</span><span class="p">)</span>

<span class="n">DESCRIPTION</span>
<span class="n">Noteworthy</span><span class="p">:</span> <span class="bp">None</span> <span class="ow">is</span> <span class="n">the</span> <span class="sb">`nil' object; Ellipsis represents`</span><span class="o">...</span><span class="s1">' in slices.</span>
<span class="o">...</span>
</code></pre>
  </div>

  <p>
    You'll notice in the result of the <code>help()</code> call on the 's'
    object, that the phrase, "I am a string object" does not exist.
  </p>
  <h1 id="conclusion">Conclusion</h1>
  <p>
    In Python, everything might be an object, but not all objects are created
    equal. Lambdas (and functions and objects) do allow for docstrings, but
    many, if not all basic types (strings, lists, classes, etc) for Python do
    not.
  </p>
  <p>
    I wonder if I scratch this particular itch long enough I might be able to
    create a string-like class that handles the <code>help()</code> issue. If
    that happens, maybe I'll add it to
    <a
      href="https://pydanny.com/fixing-pythons-string-class.html"
      target="_blank"
      >String Theory</a
    >. ;-)
  </p>
  <p>
    <strong>Resource</strong>: The entire
    <code>test_docstrings.py</code> module:
    <a href="https://gist.github.com/pydanny/9373279" target="_blank"
      >https://gist.github.com/pydanny/9373279</a
    >
  </p>
  <p>
    <a href="https://s3.amazonaws.com/pydanny/lambda_scoops.png" target="_blank"
      ><img alt="image" src="https://s3.amazonaws.com/pydanny/lambda_scoops.png"
    /></a>
  </p>
  <p>Published: 2014-03-05 12:00</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
  </p>
  <hr />
  <h3 class="ui header">Subscribe!</h3>
  <p>
    If you read this far, you might want to follow me on
    <a href="https://twitter.com/pydanny">twitter</a> or
    <a href="https://github.com/pydanny">github</a> and subscribe via email
    below (I'll email you new articles when I publish them).
  </p>
   
</div>
