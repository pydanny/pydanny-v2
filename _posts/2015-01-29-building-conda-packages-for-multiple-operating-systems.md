---
date: 2015-01-29
tag: 
  - python
  - pypi
  - python3
  - conda
  - cookiecutter
  - binstar
  - packaging
  - howto

author: Daniel Roy Greenfeld
location: California
title: Building Conda Packages for Multiple Operating Systems
---
<div class="twelve wide column">

<h1 class="ui block header">
<div class="content">
<a href="/building-conda-packages-for-multiple-operating-systems.html">Building Conda Packages for Multiple Operating Systems</a>
</div>
</h1>
<p>On the <a href="https://github.com/audreyr/cookiecutter" target="_blank">Cookiecutter</a> project,
recently we added <a href="http://conda.pydata.org/" target="_blank">conda</a> to the open source
packaging systems we officially support (You can find Cookiecutter on
<a href="https://pypi.python.org/pypi/cookiecutter" target="_blank">PyPI</a>,
<a href="https://github.com/Homebrew/homebrew/blob/master/Library/Formula/cookiecutter.rb" target="_blank">homebrew</a>,
and apparently some Linux distros).</p>
<h1 id="creating-a-conda-recipe-from-a-pypi-package">Creating a conda recipe from a PyPI package</h1>
<p>Prequisites:</p>
<ul>
<li>A <a href="http://conda.pydata.org/miniconda.html#miniconda" target="_blank">conda binary</a>
installed.</li>
<li>A package deployed to
<a href="https://pypi.python.org/pypi/cookiecutter" target="_blank">PyPI</a> (in our case,
<a href="https://pypi.python.org/pypi/cookiecutter/0.9.1" target="_blank">https://pypi.python.org/pypi/cookiecutter/0.9.1</a>).</li>
</ul>
<p>Once those are ready, create a conda recipe for Cookiecutter.</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ conda skeleton pypi cookiecutter
</code></pre></div>
<p>This will create a conda recipe, which is a directory named
<code>cookiecutter</code> that contains several text files.</p>
<p>Inside the new <code>cookiecutter</code> recipe directory, find the <code>meta.yaml</code>
file and change the appropriate sections to have this content:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code><span class="nt">source</span><span class="p">:</span>
    <span class="c1"># Change to match the most recent release</span>
    <span class="nt">git_tag</span><span class="p">:</span> <span class="l l-Scalar l-Scalar-Plain">0.9.1</span>
    <span class="nt">git_url</span><span class="p">:</span> <span class="l l-Scalar l-Scalar-Plain">https://github.com/audreyr/cookiecutter.git</span>

<span class="nt">package</span><span class="p">:</span>
    <span class="nt">name</span><span class="p">:</span> <span class="l l-Scalar l-Scalar-Plain">cookiecutter</span>
    <span class="nt">version</span><span class="p">:</span> <span class="p p-Indicator">{{</span> <span class="nv">environ</span><span class="p p-Indicator">[</span><span class="s">'GIT_DESCRIBE_TAG'</span><span class="p p-Indicator">]</span> <span class="p p-Indicator">}}</span>

<span class="nt">build</span><span class="p">:</span>
    <span class="nt">number</span><span class="p">:</span> <span class="p p-Indicator">{{</span> <span class="nv">environ.get('GIT_DESCRIBE_NUMBER'</span><span class="p p-Indicator">,</span> <span class="nv">0)</span> <span class="p p-Indicator">}}</span>

    <span class="c1"># Note that this will override the default build string with the Python</span>
    <span class="c1"># and NumPy versions</span>
    <span class="nt">string</span><span class="p">:</span> <span class="p p-Indicator">{{</span> <span class="nv">environ.get('GIT_BUILD_STR'</span><span class="p p-Indicator">,</span> <span class="s">''</span><span class="nv">)</span> <span class="p p-Indicator">}}</span>
</code></pre></div>
<h1 id="building-a-conda-package">Building a conda package</h1>
<p>Use the conda recipe to build a package for my operating system (in this
case, Mac OS X):</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ conda build cookiecutter
</code></pre></div>
<p>This creates a Cookiecutter conda package at
<code>~/miniconda/conda-bld/osx-64/cookiecutter-0.9.1_BUILDNUM.tar.bz2</code>.</p>
<p><strong>Note:</strong> The official conda recipe for <strong>cookiecutter</strong> is at
<a href="https://github.com/conda/conda-recipes/tree/master/cookiecutter" target="_blank">https://github.com/conda/conda-recipes/tree/master/cookiecutter</a>.</p>
<h1 id="converting-the-conda-package-to-other-systems">Converting the conda package to other systems</h1>
<p>Let's convert that to Windows and Linux systems:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ conda convert ~/miniconda/conda-bld/osx-64/cookiecutter-0.9.1_BUILDNUM.tar.bz2 -p all
</code></pre></div>
<p>This creates five new directories, each with a new package. It looks
something like this:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ ls
linux-32
linux-64
osx-64
win-32
win-64
</code></pre></div>
<p>Each one of these directories contains a conda build also named
<code>cookiecutter-0.9.1_BUILDNUM.tar.bz2</code>.</p>
<p><strong>Note:</strong> I never left the Mac OSX operating system, yet I have packages
that are pretty much garaunteed to work on Windows and Linux. That said,
Cookiecutter is pure python and it's dependencies already have conda
packages. I haven't tried this yet on anything that includes compiling
C or C++, much less Fortran.</p>
<h1 id="uploading-conda-packages-to-binstar">Uploading conda packages to Binstar</h1>
<p>With these packages created, it's time to upload them to
<a href="http://binstar.org" target="_blank">binstar</a>, the primary conda package index.</p>
<p>First, <a href="https://binstar.org/account/register" target="_blank">register your binstar
account</a>.</p>
<p>Then use conda to install the binstar client:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ conda install binstar
</code></pre></div>
<p>Finally, start uploading the new packages:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ binstar upload linux-32/cookiecutter-0.9.1-BUILDNUM.tar.bz2
$ binstar upload linux-64/cookiecutter-0.9.1-BUILDNUM.tar.bz2
$ binstar upload osx-64/cookiecutter-0.9.1-BUILDNUM.tar.bz2
$ binstar upload win-32/cookiecutter-0.9.1-BUILDNUM.tar.bz2
$ binstar upload win-64/cookiecutter-0.9.1-BUILDNUM.tar.bz2
</code></pre></div>
<p><a href="https://binstar.org/pydanny/cookiecutter" target="_blank">Check out the results of my
work</a> or take a look right
below at what's on <a href="http://binstar.org" target="_blank">binstar</a>:</p>
<p><a href="https://binstar.org/search?q=cookiecutter" target="_blank"><img alt="image" src="https://pydanny.com/static/packages.png"/>{.align-center
width="500px"
height="138px"}</a></p>
<h1 id="try-installing-cookiecutter-with-conda">Try installing Cookiecutter with conda!</h1>
<p>If you have <strong>conda</strong> installed, you should be able to get Cookiecutter
thus:</p>
<div class="codehilite ui secondary segment"><pre><span></span><code>$ conda config --add channels https://conda.binstar.org/pydanny
$ conda install cookiecutter
</code></pre></div>
<h1 id="summary">Summary</h1>
<p>Writing about how to package software is hard, so figuring this out was
a <a href="https://github.com/audreyr/cookiecutter/issues/232#issuecomment-71552905" target="_blank">bit of detective
work</a>.
I think that's going to change, as the company behind conda, <a href="http://www.continuum.io/" target="_blank">Continuum
Analytics</a> has stated their intentions to
improve conda's documentation. Furthermore, just as many <a href="https://github.com/audreyr/cookiecutter#python" target="_blank">for-python
cookiecutter templates</a>
include carefully researched <code>setup.py</code> modules for use with
<code>distutils</code>, in 2015 I think we'll begin to see many of these templates
include carefully research conda recipes and instructions.</p>
<p>Many thanks go to <a href="https://twitter.com/fperez_org" target="_blank">Fernando Perez</a> for
inspiring me to actually delve into conda. <a href="https://twitter.com/tswicegood" target="_blank">Travis
Swicegood</a> gave me some useful pointers.
Last, but not least, none of this would have been figured out without
the help of <a href="https://twitter.com/westurner" target="_blank">Wes Turner</a>.</p>
<h1 id="updates">Updates</h1>
<ul>
<li>2015/01/31 - Fixed a broken binstar link thanks to Russ Ferriday.</li>
<li>2015/01/30 - Wes Turner corrected a couple typos in the conda
command statements.</li>
</ul>
<p>Published: 2015-01-29 18:00</p>
<p>Tags:
  
    <a href="/tag/python.html">python</a>
<a href="/tag/pypi.html">pypi</a>
<a href="/tag/python3.html">python3</a>
<a href="/tag/conda.html">conda</a>
<a href="/tag/cookiecutter.html">cookiecutter</a>
<a href="/tag/binstar.html">binstar</a>
<a href="/tag/packaging.html">packaging</a>
<a href="/tag/howto.html">howto</a>
</p>
<hr/>
<h3 class="ui header">Subscribe!</h3>
<p>If you read this far, you might want to follow me on <a href="https://twitter.com/pydanny">twitter</a> or <a href="https://github.com/pydanny">github</a> and subscribe via email below (I'll email you new articles when I publish them).</p>
<!-- Begin MailChimp Signup Form -->
</div>