---
date: 2017-05-15
tag:
  - python
  - django
  - python
  - python3
  - cookiecutter

author: Daniel Roy Greenfeld
location: California
title: Using Python and Google Docs to Build Books
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/using-python-and-google-docs-to-build-books.html"
        >Using Python and Google Docs to Build Books</a
      >
    </div>
  </h1>
  <p>
    <a
      href="https://www.pydanny.com/using-google-docs-and-python-to-assemble-fiction-books.html"
      target="_blank"
      ><img
        alt="Python F-Strings Are Fun!"
        src="https://raw.githubusercontent.com/pydanny/pydanny.github.com/master/static/python-tip-from-pydanny.png"
    /></a>
  </p>
  <p>
    When I started my latest fiction book,
    <a
      href="https://www.danielroygreenfeld.com/books/the-darkest-autumn/"
      target="_blank"
      >The Darkest Autumn</a
    >, I wrote out the chapters as individual files. I did it in a text editor
    (Sublime) and saved the files to a git repo. The names of the files
    determined their order, chapters being named in this pattern:
  </p>
  <pre><code>the-darkest-autumn $ tree
.
├── 01_Beginnings.md
├── 02_Town_of_Ravenna.md
├── 03_Walls_of_Ravenna.md
</code></pre>
  <p>
    As the book developed I thought about moving it to
    <a href="https://www.literatureandlatte.com/scrivener.php" target="_blank"
      >Scrivener</a
    >. If you don't know, Scrivener is an excellent tool for writing. It
    encourages you to break up your work into chapters and scenes. The downside
    is that Scrivener is complex (I want to write, not figure out software) and
    <a
      href="http://www.literatureandlatte.com/forum/viewtopic.php?f=2&amp;t=11725"
      target="_blank"
      >Scrivener isn't designed for simultaneous collaboration</a
    >. The latter issue is a very serious problem, as I like to have others
    review and comment on my writing as I go.
  </p>
  <p>
    What I really wanted to do is combine the chapter breaking of Scrivener with
    the simplicity and collaboration of Google Docs. Preferably, I would put the
    book chapters into Google Docs as individual files and then send invites to
    my editor, wife, and my beta readers. By using Google Docs I could ensure
    anyone could access the work without having to create a new account and
    learn an unfamiliar system.
  </p>
  <p>
    Unfortunately, at this time Google Docs has no way to combine multiple
    Google Docs contained in one directory into one large document for
    publication. To use Google Docs thhe way I want involves manually
    copy/pasting content from dozens of files into one master document any time
    you want to update a work. With even 5 to 10 documents this is time
    consuming and error prone (for me) to the point of being unusable. This is a
    problem because my fiction books have anywhere from 30 to 50 chapters.
  </p>
  <p>
    Fortunately for me, I know how to code. By using the Python programming
    language, I can automate the process of combining the Google Docs into one
    master file which can be converted to epub, mobi (kindle), or PDF.
  </p>
  <h1 id="how-i-combine-google-doc-files">How I Combine Google Doc Files</h1>
  <p>First, I download all the files in the book's Google Docs directory.</p>
  <p>
    <img
      alt="Selecting Files With Google Docs"
      src="https://www.pydanny.com/static/selecting-files.png?12346"
    />
  </p>
  <p>
    This generates and downloads a zip file called something like
    drive-download-20170505T230011Z-001.zip. I use
    <code>unzip to open it</code>:
  </p>
  <pre><code>unzip drive-download-20170505T230011Z-001.zip -d the-darkest-autumn
</code></pre>
  <p>
    Inside the new the-darkest-autumn folder are a bunch of MS Word-formatted
    files named identically to what's stored on Google Docs:
  </p>
  <pre><code>$ tree the-darkest-autumn/
the-darkest-autumn
├── 01. Beginnings.docx
├── 02. Town of Ravenna.docx
├── 03. Walls of Ravenna.docx
├── 04. Gatehouse of Ravenna.docx
├── 05. Courage.docx
├── 06. To the Upper Valley.docx
├── _afterward.docx
├── _copyright.docx
├── _dedication.docx
└── _title.docx
</code></pre>
  <p>
    Now it's time to bring in the code. By leveraging the
    <a href="python-docx.readthedocs.io/en/latest/index.html" target="_blank"
      >python-docx</a
    >
    library, I combine all the Word files into one large Word files using this
    Python (3.6 or higher) script:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="sd">"""bookify.py: Combines multiple Word docs in a folder.</span>

<span class="sd">"""</span>

<span class="kn">import</span> <span class="nn">os</span>
<span class="kn">import</span> <span class="nn">sys</span>
<span class="kn">from</span> <span class="nn">glob</span> <span class="kn">import</span> <span class="n">glob</span>

<span class="k">try</span><span class="p">:</span>
<span class="kn">from</span> <span class="nn">docx</span> <span class="kn">import</span> <span class="n">Document</span>
<span class="kn">from</span> <span class="nn">docx.enum.text</span> <span class="kn">import</span> <span class="n">WD_ALIGN_PARAGRAPH</span>
<span class="kn">from</span> <span class="nn">docx.enum.text</span> <span class="kn">import</span> <span class="n">WD_COLOR_INDEX</span>
<span class="kn">from</span> <span class="nn">docx.shared</span> <span class="kn">import</span> <span class="n">Inches</span><span class="p">,</span> <span class="n">Pt</span>
<span class="k">except</span> <span class="ne">ImportError</span><span class="p">:</span>
<span class="k">raise</span> <span class="ne">ImportError</span><span class="p">(</span><span class="s2">"You need to 'pip install python-docx'"</span><span class="p">)</span>

<span class="n">TEXT_FONT</span> <span class="o">=</span> <span class="s2">"Trebuchet MS"</span>

<span class="k">def</span> <span class="nf">add_matter</span><span class="p">(</span><span class="n">master_document</span><span class="p">,</span> <span class="n">filename</span><span class="p">,</span> <span class="n">chapter</span><span class="p">,</span> <span class="n">after</span><span class="o">=</span><span class="bp">False</span><span class="p">):</span>
<span class="sd">"""Builds """</span>
<span class="k">if</span> <span class="ow">not</span> <span class="n">os</span><span class="o">.</span><span class="n">path</span><span class="o">.</span><span class="n">exists</span><span class="p">(</span><span class="n">filename</span><span class="p">):</span>
<span class="k">return</span> <span class="n">master_document</span>

    <span class="k">if</span> <span class="n">after</span><span class="p">:</span>
        <span class="n">master_document</span><span class="o">.</span><span class="n">add_page_break</span><span class="p">()</span>

    <span class="c1"># Build the heading</span>
    <span class="n">heading</span> <span class="o">=</span> <span class="n">master_document</span><span class="o">.</span><span class="n">add_heading</span><span class="p">(</span><span class="s1">''</span><span class="p">,</span> <span class="n">level</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span>
    <span class="n">heading</span><span class="o">.</span><span class="n">alignment</span> <span class="o">=</span> <span class="n">WD_ALIGN_PARAGRAPH</span><span class="o">.</span><span class="n">CENTER</span>
    <span class="n">runt</span> <span class="o">=</span> <span class="n">heading</span><span class="o">.</span><span class="n">add_run</span><span class="p">(</span><span class="n">chapter</span><span class="p">)</span>
    <span class="n">runt</span><span class="o">.</span><span class="n">font</span><span class="o">.</span><span class="n">color</span><span class="o">.</span><span class="n">theme_color</span> <span class="o">=</span> <span class="n">WD_COLOR_INDEX</span><span class="o">.</span><span class="n">WHITE</span>

    <span class="c1"># Add the material</span>
    <span class="n">document</span> <span class="o">=</span> <span class="n">Document</span><span class="p">(</span><span class="n">docx</span><span class="o">=</span><span class="n">filename</span><span class="p">)</span>
    <span class="k">for</span> <span class="n">index</span><span class="p">,</span> <span class="n">paragraph</span> <span class="ow">in</span> <span class="nb">enumerate</span><span class="p">(</span><span class="n">document</span><span class="o">.</span><span class="n">paragraphs</span><span class="p">):</span>
        <span class="n">new_paragraph</span> <span class="o">=</span> <span class="n">master_document</span><span class="o">.</span><span class="n">add_paragraph</span><span class="p">()</span>
        <span class="n">new_paragraph</span><span class="o">.</span><span class="n">paragraph_format</span><span class="o">.</span><span class="n">alignment</span> <span class="o">=</span> <span class="n">paragraph</span><span class="o">.</span><span class="n">paragraph_format</span><span class="o">.</span><span class="n">alignment</span>
        <span class="n">new_paragraph</span><span class="o">.</span><span class="n">style</span> <span class="o">=</span> <span class="n">paragraph</span><span class="o">.</span><span class="n">style</span>
        <span class="c1"># Loop through the runs of a paragraph</span>
        <span class="c1"># A run is a style element within a paragraph (i.e. bold)</span>
        <span class="k">for</span> <span class="n">j</span><span class="p">,</span> <span class="n">run</span> <span class="ow">in</span> <span class="nb">enumerate</span><span class="p">(</span><span class="n">paragraph</span><span class="o">.</span><span class="n">runs</span><span class="p">):</span>
            <span class="c1"># Copy over the old style</span>
            <span class="n">text</span> <span class="o">=</span> <span class="n">run</span><span class="o">.</span><span class="n">text</span>
            <span class="c1"># Add run to new paragraph</span>
            <span class="n">new_run</span> <span class="o">=</span> <span class="n">new_paragraph</span><span class="o">.</span><span class="n">add_run</span><span class="p">(</span><span class="n">text</span><span class="o">=</span><span class="n">text</span><span class="p">)</span>
            <span class="c1"># Update styles for run</span>
            <span class="n">new_run</span><span class="o">.</span><span class="n">bold</span> <span class="o">=</span> <span class="n">run</span><span class="o">.</span><span class="n">bold</span>
            <span class="n">new_run</span><span class="o">.</span><span class="n">italic</span> <span class="o">=</span> <span class="n">run</span><span class="o">.</span><span class="n">italic</span>
            <span class="n">new_run</span><span class="o">.</span><span class="n">font</span><span class="o">.</span><span class="n">size</span> <span class="o">=</span> <span class="n">run</span><span class="o">.</span><span class="n">font</span><span class="o">.</span><span class="n">size</span>
            <span class="n">new_run</span><span class="o">.</span><span class="n">font</span><span class="o">.</span><span class="n">color</span><span class="o">.</span><span class="n">theme_color</span> <span class="o">=</span> <span class="n">WD_COLOR_INDEX</span><span class="o">.</span><span class="n">BLACK</span>
    <span class="n">master_document</span><span class="o">.</span><span class="n">add_page_break</span><span class="p">()</span>
    <span class="k">print</span><span class="p">(</span><span class="n">f</span><span class="s1">'Adding {chapter}'</span><span class="p">)</span>
    <span class="k">return</span> <span class="n">master_document</span>

<span class="k">def</span> <span class="nf">add_chapter</span><span class="p">(</span><span class="n">master_document</span><span class="p">,</span> <span class="n">filename</span><span class="p">,</span> <span class="n">chapter</span><span class="p">):</span>
<span class="sd">"""Build chapters, i.e. where the story happens."""</span>
<span class="c1"># Build the chapter</span>
<span class="n">document</span> <span class="o">=</span> <span class="n">Document</span><span class="p">(</span><span class="n">docx</span><span class="o">=</span><span class="n">filename</span><span class="p">)</span>

    <span class="c1"># Build the heading</span>
    <span class="n">heading</span> <span class="o">=</span> <span class="n">master_document</span><span class="o">.</span><span class="n">add_heading</span><span class="p">(</span><span class="s1">''</span><span class="p">,</span> <span class="n">level</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span>
    <span class="n">heading</span><span class="o">.</span><span class="n">alignment</span> <span class="o">=</span> <span class="n">WD_ALIGN_PARAGRAPH</span><span class="o">.</span><span class="n">CENTER</span>

    <span class="n">heading</span><span class="o">.</span><span class="n">add_run</span><span class="p">(</span><span class="n">chapter</span><span class="p">)</span><span class="o">.</span><span class="n">font</span><span class="o">.</span><span class="n">color</span><span class="o">.</span><span class="n">theme_color</span> <span class="o">=</span> <span class="n">WD_COLOR_INDEX</span><span class="o">.</span><span class="n">BLACK</span>
    <span class="n">heading</span><span class="o">.</span><span class="n">paragraph_format</span><span class="o">.</span><span class="n">space_after</span> <span class="o">=</span> <span class="n">Pt</span><span class="p">(</span><span class="mi">12</span><span class="p">)</span>

    <span class="k">for</span> <span class="n">index</span><span class="p">,</span> <span class="n">paragraph</span> <span class="ow">in</span> <span class="nb">enumerate</span><span class="p">(</span><span class="n">document</span><span class="o">.</span><span class="n">paragraphs</span><span class="p">):</span>
        <span class="n">new_paragraph</span> <span class="o">=</span> <span class="n">master_document</span><span class="o">.</span><span class="n">add_paragraph</span><span class="p">()</span>
        <span class="c1"># Loop through the runs of a paragraph</span>
        <span class="c1"># A run is a style element within a paragraph (i.e. bold)</span>
        <span class="k">for</span> <span class="n">j</span><span class="p">,</span> <span class="n">run</span> <span class="ow">in</span> <span class="nb">enumerate</span><span class="p">(</span><span class="n">paragraph</span><span class="o">.</span><span class="n">runs</span><span class="p">):</span>

            <span class="n">text</span> <span class="o">=</span> <span class="n">run</span><span class="o">.</span><span class="n">text</span>
            <span class="c1"># If at start of paragraph and no tab, add one</span>
            <span class="k">if</span> <span class="n">j</span> <span class="o">==</span> <span class="mi">0</span> <span class="ow">and</span> <span class="ow">not</span> <span class="n">text</span><span class="o">.</span><span class="n">startswith</span><span class="p">(</span><span class="s1">'</span><span class="se">\t</span><span class="s1">'</span><span class="p">):</span>
                <span class="n">text</span> <span class="o">=</span> <span class="n">f</span><span class="s2">"</span><span class="se">\t</span><span class="s2">{text}"</span>
            <span class="c1"># Add run to new paragraph</span>
            <span class="n">new_run</span> <span class="o">=</span> <span class="n">new_paragraph</span><span class="o">.</span><span class="n">add_run</span><span class="p">(</span><span class="n">text</span><span class="o">=</span><span class="n">text</span><span class="p">)</span>
            <span class="c1"># Update styles for run</span>
            <span class="n">new_run</span><span class="o">.</span><span class="n">font</span><span class="o">.</span><span class="n">name</span> <span class="o">=</span> <span class="n">TEXT_FONT</span>
            <span class="n">new_run</span><span class="o">.</span><span class="n">bold</span> <span class="o">=</span> <span class="n">run</span><span class="o">.</span><span class="n">bold</span>
            <span class="n">new_run</span><span class="o">.</span><span class="n">italic</span> <span class="o">=</span> <span class="n">run</span><span class="o">.</span><span class="n">italic</span>

        <span class="c1"># Last minute format checking</span>
        <span class="n">text</span> <span class="o">=</span> <span class="n">new_paragraph</span><span class="o">.</span><span class="n">text</span>

    <span class="n">master_document</span><span class="o">.</span><span class="n">add_page_break</span><span class="p">()</span>
    <span class="c1"># Destroy the document object</span>
    <span class="k">del</span> <span class="n">document</span>
    <span class="k">return</span> <span class="n">master_document</span>

<span class="k">def</span> <span class="nf">main</span><span class="p">(</span><span class="n">book</span><span class="p">):</span>
<span class="n">master_document</span> <span class="o">=</span> <span class="n">Document</span><span class="p">()</span>

    <span class="n">master_document</span> <span class="o">=</span> <span class="n">add_matter</span><span class="p">(</span>
      <span class="n">master_document</span><span class="p">,</span>
      <span class="n">filename</span><span class="o">=</span><span class="n">f</span><span class="s1">'{book}/_title.docx'</span><span class="p">,</span>
      <span class="n">chapter</span><span class="o">=</span><span class="s1">'Title Page'</span>
    <span class="p">)</span>
    <span class="n">master_document</span> <span class="o">=</span> <span class="n">add_matter</span><span class="p">(</span>
        <span class="n">master_document</span><span class="p">,</span>
        <span class="n">filename</span><span class="o">=</span><span class="n">f</span><span class="s1">'{book}/_copyright.docx'</span><span class="p">,</span>
        <span class="n">chapter</span><span class="o">=</span><span class="s1">'Copyright Page'</span>
    <span class="p">)</span>
    <span class="n">master_document</span> <span class="o">=</span> <span class="n">add_matter</span><span class="p">(</span>
        <span class="n">master_document</span><span class="p">,</span>
        <span class="n">filename</span><span class="o">=</span><span class="n">f</span><span class="s1">'{book}/_dedication.docx'</span><span class="p">,</span>
        <span class="n">chapter</span><span class="o">=</span><span class="s1">'Dedication'</span>
    <span class="p">)</span>

    <span class="k">for</span> <span class="n">filename</span> <span class="ow">in</span> <span class="n">glob</span><span class="p">(</span><span class="n">f</span><span class="s2">"{book}/*"</span><span class="p">):</span>
        <span class="k">if</span> <span class="n">filename</span><span class="o">.</span><span class="n">startswith</span><span class="p">(</span><span class="n">f</span><span class="s2">"{book}/_"</span><span class="p">):</span>
            <span class="k">print</span><span class="p">(</span><span class="n">f</span><span class="s1">'skipping {filename}'</span><span class="p">)</span>
            <span class="k">continue</span>

        <span class="c1"># Get the chapter name</span>
        <span class="n">book</span><span class="p">,</span> <span class="n">short</span> <span class="o">=</span> <span class="n">filename</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s1">'/'</span><span class="p">)</span>
        <span class="n">chapter</span> <span class="o">=</span> <span class="n">short</span><span class="o">.</span><span class="n">replace</span><span class="p">(</span><span class="s1">'.docx'</span><span class="p">,</span> <span class="s1">''</span><span class="p">)</span>
        <span class="k">if</span> <span class="n">chapter</span><span class="o">.</span><span class="n">startswith</span><span class="p">(</span><span class="s1">'0'</span><span class="p">):</span>
            <span class="n">chapter</span> <span class="o">=</span> <span class="n">chapter</span><span class="p">[</span><span class="mi">1</span><span class="p">:]</span>
        <span class="k">print</span><span class="p">(</span><span class="n">f</span><span class="s1">'Adding {chapter}'</span><span class="p">)</span>
        <span class="n">master_document</span> <span class="o">=</span> <span class="n">add_chapter</span><span class="p">(</span><span class="n">master_document</span><span class="p">,</span> <span class="n">filename</span><span class="p">,</span> <span class="n">chapter</span><span class="p">)</span>

    <span class="n">master_document</span> <span class="o">=</span> <span class="n">add_matter</span><span class="p">(</span>
        <span class="n">master_document</span><span class="p">,</span>
        <span class="n">filename</span><span class="o">=</span><span class="n">f</span><span class="s1">'{book}/_aboutauthor.docx'</span><span class="p">,</span>
        <span class="n">chapter</span><span class="o">=</span><span class="s1">'About the Author'</span><span class="p">,</span>
        <span class="n">after</span><span class="o">=</span><span class="bp">True</span>
    <span class="p">)</span>
    <span class="n">master_document</span> <span class="o">=</span> <span class="n">add_matter</span><span class="p">(</span>
        <span class="n">master_document</span><span class="p">,</span>
        <span class="n">filename</span><span class="o">=</span><span class="n">f</span><span class="s1">'{book}/_afterward.docx'</span><span class="p">,</span>
        <span class="n">chapter</span><span class="o">=</span><span class="s1">'Afterward'</span><span class="p">,</span>
        <span class="n">after</span><span class="o">=</span><span class="bp">True</span>
    <span class="p">)</span>
    <span class="n">master_document</span><span class="o">.</span><span class="n">save</span><span class="p">(</span><span class="n">f</span><span class="s1">'{book}.docx'</span><span class="p">)</span>
    <span class="k">print</span><span class="p">(</span><span class="s1">'DONE!!!'</span><span class="p">)</span>

<span class="k">if</span> <span class="vm">**name**</span> <span class="o">==</span> <span class="s1">'**main**'</span><span class="p">:</span>
<span class="k">try</span><span class="p">:</span>
<span class="n">book</span> <span class="o">=</span> <span class="n">sys</span><span class="o">.</span><span class="n">argv</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span>
<span class="k">except</span> <span class="ne">IndexError</span><span class="p">:</span>
<span class="n">msg</span> <span class="o">=</span> <span class="s1">'You need to specify a book. A book is a directory of word files.'</span>
<span class="k">raise</span> <span class="ne">Exception</span><span class="p">(</span><span class="n">msg</span><span class="p">)</span>

    <span class="n">main</span><span class="p">(</span><span class="n">book</span><span class="p">)</span>

</code></pre>
  </div>

  <p>This is what it looks like when I run the code:</p>
  <pre><code>$ python bookify.py the-darkest-autumn/
Adding Title Page
Adding Copyright Page
Adding Dedication
Adding 1. Beginnings
Adding 2. Town of Ravenna
Adding 3. Walls of Ravenna
Adding 4. Gatehouse of Ravenna
Adding 5. Courage
Adding 6. To the Upper Valley
skipping the-darkest-autumn/_afterward.docx
skipping the-darkest-autumn/_copyright.docx
skipping the-darkest-autumn/_dedication.docx
skipping the-darkest-autumn/_title.docx
Adding Afterward
DONE!!!
</code></pre>
  <p>
    And now I've got a Word document in the same directory called
    the-darkest-autumn.docx.
  </p>
  <h1 id="converting-word-to-epub">Converting Word to EPUB</h1>
  <p>
    While Kindle Direct Publishing (KDP) will accept .docx files, I like to
    convert it to .epub using
    <a href="https://calibre-ebook.com/" target="_blank">Calibre</a>:
  </p>
  <pre><code>$ ebook-convert the-darkest-autumn.docx the-darkest-autumn.epub \
--authors "Daniel Roy Greenfeld" \
--publisher "Two Scoops Press" \
--series Ambria \
--series-index 1 \
--output-profile kindle
</code></pre>
  <p>And now I can check out my results by using Calibre's book viewer:</p>
  <pre><code>$ ebook-viewer the-darkest-autumn.epub
</code></pre>
  <h1 id="add-the-links">Add the Links!</h1>
  <p>
    As <code>python-docx</code> doesn't handle HTTP links at this time, I
    manually add them to the book using Calibre's epub editor. I add links to:
  </p>
  <ul>
    <li>
      My personal author site at
      <a href="https://www.danielroygreenfeld.com/" target="_blank"
        >danielroygreenfeld.com</a
      >
    </li>
    <li>
      The book's
      <a
        href="https://www.amazon.com/the-darkest-autumn-ebook/product-reviews/B071L2G8SL?tag=mlinar-20"
        target="_blank"
        >review page on Amazon</a
      >
    </li>
    <li>
      The book's upcoming sequel,
      <a
        href="https://www.danielroygreenfeld.com/books/the-river-runs-uphill/"
        target="_blank"
        >The River Runs Uphill</a
      >.
    </li>
  </ul>
  <h1 id="how-well-does-it-work">How Well Does It Work?</h1>
  <p>
    For me it works wonders for my productivity. By following a "chapters as
    files" pattern within Google Docs I get solid collaboration power plus some
    (but not all) of the features of Scrivener. I can quickly regenerate the
    book at any time without having to struggle with Scrivener or have to add
    tools like Vellum to the process.
  </p>
  <p>
    I have a secondary script that fixes quoting and tab issues, written before
    I realized Calibre could have done that for me.
  </p>
  <p>
    The book I started this project for,
    <a
      href="https://www.danielroygreenfeld.com/books/the-darkest-autumn/"
      target="_blank"
      >The Darkest Autumn</a
    >, is available now on
    <a
      href="https://www.amazon.com/Darkest-Autumn-Ambria-I-ebook/dp/B071L2G8SL/?tag=mlinar-20"
      target="_blank"
      >Amazon</a
    >. Check it out and let me know what you think of what the script generates.
    Or if you want to support my writing (both fiction and non-fiction),
    <a
      href="https://www.amazon.com/Darkest-Autumn-Ambria-I-ebook/dp/B071L2G8SL/?tag=mlinar-20"
      target="_blank"
      >buy The Darkest Autumn on Amazon</a
    >
    and leave an honest review.
  </p>
  <h1 id="thinking-about-the-future">Thinking About the Future</h1>
  <p>
    Right now this snippet of code generates something that looks okay, but
    could be improved. I plan to enhance it with better fonts and chapter
    headers, the goal to generate something as nice as what
    <a href="https://draft2digital.com/" target="_blank">Draft2Digital</a>
    generates.
  </p>
  <p>
    I've considered adding the OAuth components necessary in order to allow for
    automated downloading. The problem is I loathe working with OAuth. Therefore
    I'm sticking with the manial download process.
  </p>
  <p>
    For about a week I thought about leveraging it and my
    <a href="https://www.djangoproject.com/" target="_blank">Django</a> skills
    to build it as a paid subscription service and rake in the passive income.
    Basically turn it into a startup. After some reflection I backed off because
    if Google added file combination as a feature, it would destroy the business
    overnight.
  </p>
  <p>
    I've also decided not to package this up on Github/PyPI. While
    <a href="https://github.com/audreyr/cookiecutter" target="_blank"
      >Cookiecutter</a
    >
    makes it trivial for me to do this kind of thing, I'm not interested in
    maintaining yet another open source project. However, if someone does
    package it up and credits me for my work, I'm happy to link to it from this
    blog post.
  </p>
  <p>
    <a
      href="https://www.amazon.com/Darkest-Autumn-Ambria-I-ebook/dp/B071L2G8SL/?tag=mlinar-20"
      target="_blank"
      ><img
        alt="Cover for The Darkest Autumn"
        src="https://github.com/pydanny/pydanny.github.com/blob/master/static/the-darkest-autumn-04-01-thumbnail.jpg?raw=true"
    /></a>
  </p>
  <p>Published: 2017-05-15 15:00</p>
  <p>
    Tags:

    <a href="/tag/python.html">python</a>
    <a href="/tag/django.html">django</a>
    <a href="/tag/python.html">python</a>
    <a href="/tag/python3.html">python3</a>
    <a href="/tag/cookiecutter.html">cookiecutter</a>
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
