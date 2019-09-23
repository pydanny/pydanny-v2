---
date: 2013-5-03
tag:
  - django
  - python
  - twoscoops
  - book
  - LaTeX

author: Daniel Roy Greenfeld
location: California
title: Tools we used to write Two Scoops of Django
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/tools-we-used-to-write-2scoops.html"
        >Tools we used to write Two Scoops of Django</a
      >
    </div>
  </h1>
  <p>
    Because of the ubiquitousness of
    <a href="http://en.wikipedia.org/wiki/Restructured_Text" target="_blank"
      >reStructuredText</a
    >
    in the lives of
    <a href="http://python.org" target="_blank">Python</a> developers and the
    advocacy of it, it's not uncommon for people to assume we used it to write
    our book. However, that's not really the case.
  </p>
  <p>The short answer is we used:</p>
  <ul>
    <li>reStructuredText (RST)</li>
    <li>Google Documents</li>
    <li>Apple Pages</li>
    <li>
      <a href="http://en.wikipedia.com/wiki/LateX" target="_blank">LaTeX</a>
    </li>
  </ul>
  <p>
    The long answer is the rest of this posting. Since writing the book was
    broken up into three major stages '<em>alpha</em>', '<em>beta</em>', and
    '<em>final</em>', so have I broken up blog article.
  </p>
  <h1 id="alpha-days">Alpha Days</h1>
  <p>
    Some of the original alpha material was written in rough draft form as RST
    since it was what we were used to using. Unfortunately, the PDF generation
    wasn't to our liking, so we immediately began looking at other options.
    Since she enjoyed using it at MIT and because it gave us greater individual
    control, <a href="http://audreymroy.com" target="_blank">Audrey</a> wanted
    to switch to
    <a href="http://en.wikipedia.com/wiki/LateX" target="_blank">LaTeX</a>. I
    was worried about the challenges of learning LaTeX, so we compromised and
    moved to Google Documents.
  </p>
  <p>
    For the most part, Google Documents was great in the early stages. The
    real-time collaborative nature was handy, but the gem was the comment
    system. It gave us the ability to have line-by-line written dialogues with
    our technical reviewers. However, Google Documents makes it nigh-impossible
    to use WYSIWYG editor styles, add in better print fonts, forced us to
    cut-and-paste code examples, and finally the PDF export system was flakey on
    our massive document.
  </p>
  <p>
    Our original thought was to convert the Google Document output to PDF and
    then modify it with Adobe InDesign. Upon trying it, we found it had a
    lackluster user interface that had a steep learning curve and was
    prohibitively expensive ($550-$700). Our friend and reviewer, Kenneth Love
    of
    <a href="http://gettingstartedwithdjango.com" target="_blank"
      >Getting Started with Django</a
    >
    fame, offered to do the conversion work, but we wanted to be able to update
    our work at will. Awesome as Kenneth might be, we couldn't expect him to
    drop what he was doing to update the final output of our work whenever we
    wanted.
  </p>
  <p>
    Therefore, what we did in the week of January 10th-16th was convert the book
    to Apple Pages, which is the word processor in Apple iWorks. This was as
    painful as it sounds. We also discovered the day before launch that Apple
    Pages doesn't create a sidebar PDF table of contents, which a lot of people
    enjoy (including ourselves). Tired and exhausted from weeks of 16 hour days,
    we launched anyway on January 17th with the book weighing in at 5.1 MB.
  </p>
  <h1 id="beta-experiences">Beta Experiences</h1>
  <p>
    People were so positive it really gave us a boost. Hundreds of people sent
    us feedback and we were delighted beyond words, with a significant portion
    sending us commentary/corrections about our writing and code. I'll admit I
    did get tired over a certain 'moat' mistake since I got corrected on it over
    50 times. However, the number of code corrections we were getting was higher
    than expected. It was clear we needed to be able to import the code modules
    from testable chunks of real code. We had so many kindle/epub requests we
    also needed the ability to render the text attractively across multiple
    formats.
  </p>
  <p>
    After stumbling through RST, Google Documents, and Apple Pages different
    tools, I finally agreed with Audrey that the challenges of learning LaTeX
    was worth it. While we could have used RST, we would have had to use LaTeX
    anyway for our customizations since when RST is converted to PDF it actually
    uses an interim step of LaTeX!
  </p>
  <p>
    So while I handled the corrections and feedback from thousands, Audrey built
    the fundamentals of the LaTeX file structure. Audrey really got her hands
    dirty by teaching me LaTeX, since my brain is slow and thick. Here's a
    sample of what I've learned how to do, taken from Chapter 6, Section 1,
    Subsection 5 (6.1.5):
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="k">\subsection</span><span class="nb">{</span>Model Inheritance in Practice: The TimeStampedModel<span class="nb">}</span>
It's very common in Django projects to include a <span class="k">\inlinecode</span><span class="nb">{</span>created<span class="nb">}</span> and <span class="k">\inlinecode</span><span class="nb">{</span>modified<span class="nb">}</span> timestamp field on all your models. We could manually add those fields to each and every model, but that's a lot of work and adds the risk of human error. A better solution is to write a <span class="k">\inlinecode</span><span class="nb">{</span>TimeStampedModel<span class="nb">}</span> <span class="k">\index</span><span class="nb">{</span>TimeStampedModel<span class="nb">}</span> to do the work for us:

<span class="k">\goodcodefile</span><span class="nb">{</span>chapter<span class="nb">\_</span>06/myapp/core/timestampedmodel.py<span class="nb">}</span>

Take careful note of the very last two lines in the example, which turn our example into an abstract base class: <span class="k">\index</span><span class="nb">{</span>abstract base classes<span class="nb">}</span>

<span class="k">\goodcodefile</span><span class="nb">{</span>chapter<span class="nb">_</span>06/myapp/core/class<span class="nb">_</span>meta.py<span class="nb">}</span>

By defining <span class="k">\inlinecode</span><span class="nb">{</span>TimeStampedModel<span class="nb">}</span> as an abstract base class <span class="k">\index</span><span class="nb">{</span>abstract base classes<span class="nb">}</span> when we define a new class that inherits from it, Django doesn't create a <span class="k">\inlinecode</span><span class="nb">{</span>model<span class="k">\_</span>utils.time<span class="k">\_</span>stamped<span class="k">\_</span>model<span class="nb">}</span> table when syncdb is run.
</code></pre>
  </div>
  <p>
    Once I got the hang of LaTeX, then began the hard work of converting the
    book's current content from Apple Pages. That was a couple weeks of grueling
    effort on my part while Audrey wrote more book material. Daily I would
    request a new LaTeX customizations, which Audrey would address. However, as
    she was working on literally rewriting the content of a dozen chapters
    including templates, testing, admin, and logging my interruptions became an
    issue. So we enlisted the help of Italian economist and LaTeX expert Laura
    Gelsomino. Thanks to her the desired text formatting was achieved.
  </p>
  <p>
    During the conversion process we rewrote every single code example, putting
    them into easily testable projects, and pulled them into the book via use of
    custom LaTeX commands called <code>\goodcodefile{}</code> and
    <code>\badcodefile{}</code>.
  </p>
  <p>
    Eventually I joined Audrey on rewriting and reviewing chapters and on
    February 28th, the beta was launched. LaTeX generates lean PDFs so the book
    came in at just 1.6 MB while adding a whopping 50 pages (25% more) of
    content.
  </p>
  <h1 id="final-efforts">Final Efforts</h1>
  <p>
    The final effort was focused on cleanup, new formats, presentation, and art.
  </p>
  <p>
    For cleanup, our amazing readers gave us so much feedback we could barely
    keep up. We fought to keep our dialogues with them personal yet brief. With
    reader oversight we corrected many of the 'quirks' of my writing style
    (Audrey is a stickler for Strunk and White, I am not). We also made numerous
    corrections based on feedback and our own observations.
  </p>
  <p>
    With the guidance of fellow Python author
    <a href="http://hairysun.com/" target="_blank">Matt Harrison</a> I wrote
    scripts that took the archaic HTML generated by LaTeX module tex4ht and
    rendered it into something that Kindlegen could use to generate Kindle .mobi
    files. At first the results looked awesome on modern kindles and other new
    ebook readers, but was terrible on older devices. So I toned back the fancy
    stuff to what you see today. Getting technical books to look nice on all
    readers is really, really hard - and unfortunately some publishers take
    shortcuts that hurt the efforts of the authors. If you have problem with an
    e-book's format, please consider that before writing a negative review about
    the final output.
  </p>
  <p>
    Speaking of mobile editions, we also wrote a second version of each Python
    example to deal with the smaller format. While libraries exist to do the
    work for you, since I did a lot of it from scratch (albeit coached by Matt)
    I had to dig into the lackluster .mobi/.epub documentation to figure out
    things like .ncx files.
  </p>
  <p>
    <strong>note:</strong> If you want to be the self-published author of a
    technical book I <em>strongly recommend</em> you read Matt's
    <a
      href="http://www.amazon.com/Ebook-Formatting-Mobi-EPUB-ebook/dp/B00BWQXHU6/ref=la_B0077BQLH6_1_2?ie=UTF8&amp;qid=1366041987&amp;sr=1-2&amp;tag=ihpydanny-20"
      target="_blank"
      >Ebook Formatting: KF8, Mobi &amp; EPUB</a
    >. Also check out his rst2epub2 library for converting RST files to various
    formats.
  </p>
  <p>
    While I worked on the mobile editions, Audrey focused on the print version
    and adding more art and bits and pieces of new content. She focused on
    clarity and flow, and the result is that the book feels even lighter to read
    and yet is dense with useful information. To test how the book launched, she
    would order a copy from the printer and wait several days for it to arrive.
    Then she would inspect the cover and interior with her incredibly exacting
    eye. It's a slow process, but Audrey wanted to make absolutely certain our
    readers would enjoy and use the print edition.
  </p>
  <p>
    On April 10th we launched the final in PDF, Kindle, and ePub form. The PDF
    weighs in at 2.7 MB, and the Kindle file is a bit heaver. At some point
    we'll do the work to reduce file size, but for now we're working on other
    things.
  </p>
  <p>
    A week later we announced the launch of the
    <a
      href="http://www.amazon.com/Two-Scoops-Django-Best-Practices/dp/1481879707/ref=sr_1_2?ie=UTF8&amp;qid=1366166104&amp;sr=8-2&amp;tag=ihpydanny-20"
      target="_blank"
      >print version of the book</a
    >. People seem to really like the design and feel of the physical book, and
    we've even had requests for t-shirts.
  </p>
  <h1 id="thoughts">Thoughts</h1>
  <p>
    Writing a technical book was really hard. Crazy hard. Also very satisfying.
    We could have made more money doing just client work, but this was a dream
    come true. Sometimes money doesn't matter.
  </p>
  <h2 id="whither-two-scoops-of-django">Whither Two Scoops of Django?</h2>
  <p>
    <a href="http://django.2scoops.org" target="_blank"
      >Two Scoops of Django: Best Practices for Django 1.5</a
    >
    will still receive periodic corrections, but won't see new content unless
    it's security related for Django 1.5. Don't worry though, for when Django
    1.6 comes nigh, we'll commence work on Two Scoops of Django: Best Practices
    for Django <strong>1.6</strong> (<strong>TSD 1.6</strong>). The plan is to
    update practices as needed and hopefully add more content on testing,
    logging, continuous integration, and more. Like it's predecessor TSD 1.6
    will be written using LaTeX.
  </p>
  <p>
    That said, if I ever fulfill my dream of writing fiction I'll just use Matt
    Harrison's
    <a href="https://github.com/mattharrison/rst2epub2" target="_blank"
      >rst2epub2</a
    >
    library.
  </p>
  <h2 id="concerns-about-open-sourcing">Concerns About Open Sourcing</h2>
  <p>
    We've considered open sourcing our current book generation system, but
    installation is rather challenging and requires serious Audrey/Laura-level
    LaTeX knowledge combined with my experience with Python. Unfortunately, from
    our experience on managing other open source projects, dealing with requests
    for documentation and assistance would take up a prohibitive amount of our
    time. Honestly, we would rather write another book or sling code.
  </p>
  <h2 id="book-generation-as-a-service">Book Generation as a Service?</h2>
  <p>
    Another option is turning our system into a service, which would convert
    existing RST or even MarkDown to LaTeX so it could generate books in the Two
    Scoops format. Doing this would require at least a month of full-time work
    on both of our parts, and we have no idea as to the interest level. We think
    it would be a low amount of interest, but then again, hasn't
    <a href="http://leanpub.com" target="_blank">leanpub</a> done pretty well
    using this model of business?
  </p>
  <p>
    In any case we're working on other projects. Maybe even a new technical
    book...
  </p>
  <p>Published: 2013-5-03 10:00</p>
  <p>
    Tags:

    <a href="/tag/django.html">django</a>
    <a href="/tag/python.html">python</a>
    <a href="/tag/twoscoops.html">twoscoops</a>
    <a href="/tag/book.html">book</a>
    <a href="/tag/LaTeX.html">LaTeX</a>
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
