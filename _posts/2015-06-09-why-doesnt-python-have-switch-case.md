---
date: 2015-06-09
tag: 
  - python
  - django
  - howto

author: Daniel Roy Greenfeld
location: California
title: Why Doesn't Python Have Switch/Case?
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/why-doesnt-python-have-switch-case.html">Why Doesn't Python Have Switch/Case?</a>
</div>
</h1>
<p><a href="https://www.pydanny.com/static/aliens.png" target="_blank"><img alt="Aliens" src="https://pydanny.com/static/aliens.png"/></a></p>
<p>Unlike every other programming language I've used before, Python does
not have a switch or case statement. To get around this fact, we use
dictionary mapping:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">def</span> <span class="nf">numbers_to_strings</span><span class="p">(</span><span class="n">argument</span><span class="p">):</span>
    <span class="n">switcher</span> <span class="o">=</span> <span class="p">{</span>
        <span class="mi">0</span><span class="p">:</span> <span class="s2">"zero"</span><span class="p">,</span>
        <span class="mi">1</span><span class="p">:</span> <span class="s2">"one"</span><span class="p">,</span>
        <span class="mi">2</span><span class="p">:</span> <span class="s2">"two"</span><span class="p">,</span>
    <span class="p">}</span>
    <span class="k">return</span> <span class="n">switcher</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">argument</span><span class="p">,</span> <span class="s2">"nothing"</span><span class="p">)</span>
</code></pre></div>
<p>This code is analogous to:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="kd">function</span><span class="p">(</span><span class="nx">argument</span><span class="p">){</span>
    <span class="k">switch</span><span class="p">(</span><span class="nx">argument</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">case</span> <span class="mi">0</span><span class="o">:</span>
            <span class="k">return</span> <span class="s2">"zero"</span><span class="p">;</span>
        <span class="k">case</span> <span class="mi">1</span><span class="o">:</span>
            <span class="k">return</span> <span class="s2">"one"</span><span class="p">;</span>
        <span class="k">case</span> <span class="mi">2</span><span class="o">:</span>
            <span class="k">return</span> <span class="s2">"two"</span><span class="p">;</span>
        <span class="k">default</span><span class="o">:</span>
            <span class="k">return</span> <span class="s2">"nothing"</span><span class="p">;</span>
    <span class="p">};</span>
<span class="p">};</span>
</code></pre></div>
<p>While the Python code is often more terse than the standard method of
handling cases, I could argue it is more arcane. When I first started
Python it felt weird and distracting. Over time it grew on me, the use
of a dictionary key being the identifier in a switch becoming more and
more habitual.</p>
<h1 id="dictionary-mapping-for-functions">Dictionary Mapping for Functions</h1>
<p>In Python we can also include functions or lambdas in our dictionary
mapping:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">def</span> <span class="nf">zero</span><span class="p">():</span>
    <span class="k">return</span> <span class="s2">"zero"</span>

<span class="k">def</span> <span class="nf">one</span><span class="p">():</span>
    <span class="k">return</span> <span class="s2">"one"</span>

<span class="k">def</span> <span class="nf">numbers_to_functions_to_strings</span><span class="p">(</span><span class="n">argument</span><span class="p">):</span>
    <span class="n">switcher</span> <span class="o">=</span> <span class="p">{</span>
        <span class="mi">0</span><span class="p">:</span> <span class="n">zero</span><span class="p">,</span>
        <span class="mi">1</span><span class="p">:</span> <span class="n">one</span><span class="p">,</span>
        <span class="mi">2</span><span class="p">:</span> <span class="k">lambda</span><span class="p">:</span> <span class="s2">"two"</span><span class="p">,</span>
    <span class="p">}</span>
    <span class="c1"># Get the function from switcher dictionary</span>
    <span class="n">func</span> <span class="o">=</span> <span class="n">switcher</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">argument</span><span class="p">,</span> <span class="k">lambda</span><span class="p">:</span> <span class="s2">"nothing"</span><span class="p">)</span>
    <span class="c1"># Execute the function</span>
    <span class="k">return</span> <span class="n">func</span><span class="p">()</span>
</code></pre></div>
<p>While the code inside <code>zero()</code> and <code>one</code> are simple, many Python
programs use dictionary mappings like this to dispatch complex
procedures.</p>
<h1 id="dispatch-methods-for-classes">Dispatch Methods for Classes</h1>
<p>If we don't know what method to call on a class, we can use a dispatch
method to determine it at runtime.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="k">class</span> <span class="nc">Switcher</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>
    <span class="k">def</span> <span class="nf">numbers_to_methods_to_strings</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">argument</span><span class="p">):</span>
        <span class="sd">"""Dispatch method"""</span>
        <span class="c1"># prefix the method_name with 'number_' because method names</span>
        <span class="c1"># cannot begin with an integer.</span>
        <span class="n">method_name</span> <span class="o">=</span> <span class="s1">'number_'</span> <span class="o">+</span> <span class="nb">str</span><span class="p">(</span><span class="n">argument</span><span class="p">)</span>
        <span class="c1"># Get the method from 'self'. Default to a lambda.</span>
        <span class="n">method</span> <span class="o">=</span> <span class="nb">getattr</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">method_name</span><span class="p">,</span> <span class="k">lambda</span><span class="p">:</span> <span class="s2">"nothing"</span><span class="p">)</span>
        <span class="c1"># Call the method as we return it</span>
        <span class="k">return</span> <span class="n">method</span><span class="p">()</span>

    <span class="k">def</span> <span class="nf">number_0</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="s2">"zero"</span>

    <span class="k">def</span> <span class="nf">number_1</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="s2">"one"</span>

    <span class="k">def</span> <span class="nf">number_2</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="s2">"two"</span>
</code></pre></div>
<p>Pretty nifty, right?</p>
<h1 id="the-official-answer">The Official Answer</h1>
<p>The <a href="https://docs.python.org/2/faq/design.html#why-isn-t-there-a-switch-or-case-statement-in-python" target="_blank">official
answer</a>
says, "You can do this easily enough with a sequence of
<code>if... elif... elif... else</code>". And that you can use dictionary mapping
for functions and dispatch methods for classes.</p>
<p>Arguably the official answer doesn't explain anything except for
workarounds. In other words, a "non-answer". In my opinion, what the
official answer is really trying to say is, "Python doesn't need a
case statement."</p>
<h1 id="really">Really?</h1>
<p>Yup. But there's more. I've heard people I respect say that
switch/case statements in code can be really hard to debug.</p>
<p>Personally I find that argument breaks down as soon as you run into
gigantic nested dictionaries used for mapping of code branches. Think
about it, a 100+ element nested dictionary is just as hard to debug as a
nested switch and case block with 100+ cases.</p>
<h1 id="maybe-dictionary-mapping-runs-faster">Maybe Dictionary Mapping Runs Faster?</h1>
<p>Moot as Python doesn't have a case statement. Talking about benchmarks
from other languages is pointless as what is faster in one language is
not always faster in another. Let's move on.</p>
<h1 id="the-significant-advantage-of-pythons-approach">The Significant Advantage of Python's Approach</h1>
<p>Every once in a while I walk into a scenario where Python's approach
just works better than a switch/case statement. This is when at runtime
I need to add or remove potential items from the mapping. When this
occurs, my years of practice of writing dictionary mappings and dispatch
methods pays off. I have insights now that I never had back in the day
when I relied on switch/case statements.</p>
<h1 id="closing-thoughts">Closing Thoughts</h1>
<p>To me, that Python forced me to accumulate lots of practical experience
with mappings is a blessing in disguise. The constraint of not having
switch/case statements allowed me to create approaches and ideas I may
not have developed with it.</p>
<p>Intentional or not, Python's lack of switch/case has been a social
construct that made me a better coder.</p>
<p>Enough so that I think this accidental social construct is a better
answer than the official one of 'Do this instead!'</p>
<hr/>
<p>The reference book I co-authored with <a href="http://www.codemakesmehappy.com" target="_blank">Audrey Roy
Greenfeld</a> on Django best practices,
<a href="http://twoscoopspress.com/products/two-scoops-of-django-1-8" target="_blank">Two Scoops of Django
1.8</a>, is
now available in both print paperback and PDF formats.</p>
<p>Published: 2015-06-09 18:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/django.html">django</a>
<a href="/tag/howto.html">howto</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>