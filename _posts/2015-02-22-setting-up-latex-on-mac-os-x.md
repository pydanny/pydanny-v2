---
date: 2015-02-22
tag:
  - book
  - LaTeX
  - howto
  - python

author: Daniel Roy Greenfeld
location: California
title: Setting up LaTeX on Mac OS X
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/setting-up-latex-on-mac-os-x.html"
        >Setting up LaTeX on Mac OS X</a
      >
    </div>
  </h1>
  <p>
    These are my notes for getting LaTeX running on Mac OS X with the components
    and fonts I want. Which is handy when you want to generate PDFs from
    <a href="http://sphinx-doc.org/" target="_blank">Sphinx</a>. At some point I
    want to replace this with a
    <a href="https://www.docker.com/" target="_blank">Docker</a> container
    similar
    <a href="https://github.com/blang/latex-docker" target="_blank"
      >https://github.com/blang/latex-docker</a
    >, albeit with the components in parts 3 and 4 below.
  </p>
  <ol>
    <li>
      Get mactex-basic.pkg from
      <a href="http://www.ctan.org/pkg/mactex-basic" target="_blank"
        >http://www.ctan.org/pkg/mactex-basic</a
      >
    </li>
    <li>Click mactex-basic.pkg to install LaTeX.</li>
    <li>
      <p>Update <code>tlmgr</code>:</p>
      <pre><code>sudo tlmgr update --self
</code></pre>
    </li>
    <li>
      <p>Install the following tools via <code>tlmgr</code>:</p>
      <pre><code>sudo tlmgr install titlesec
sudo tlmgr install framed
sudo tlmgr install threeparttable
sudo tlmgr install wrapfig
sudo tlmgr install multirow
sudo tlmgr install enumitem
sudo tlmgr install bbding
sudo tlmgr install titling
sudo tlmgr install tabu
sudo tlmgr install mdframed
sudo tlmgr install tcolorbox
sudo tlmgr install textpos
sudo tlmgr install import
sudo tlmgr install varwidth
sudo tlmgr install needspace
sudo tlmgr install tocloft
sudo tlmgr install ntheorem
sudo tlmgr install environ
sudo tlmgr install trimspaces
</code></pre>
    </li>
    <li>
      <p>Install fonts via <code>tlmgr</code>:</p>
      <pre><code>sudo tlmgr install collection-fontsrecommended
</code></pre>
    </li>
  </ol>
  <p>
    <strong>note:</strong> Yes, I know I can install the basic LaTeX package
    using <a href="http://brew.sh/" target="_blank">Homebrew</a>, but sometimes
    I like doing things manually.
  </p>
  <p>
    <a
      href="http://en.wikipedia.org/wiki/LaTeX#mediaviewer/File:Latex_example.png"
      target="_blank"
      ><img
        alt="image"
        src="http://upload.wikimedia.org/wikipedia/commons/9/9c/Latex_example.png"
    /></a>
  </p>
  <p>Published: 2015-02-22 14:00</p>
  <p>
    Tags:

    <a href="/tag/book.html">book</a>
    <a href="/tag/LaTeX.html">LaTeX</a>
    <a href="/tag/howto.html">howto</a>
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
