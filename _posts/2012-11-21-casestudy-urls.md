---
date: 2012-11-21
tag:
  - python
  - django
  - howto
  - casestudy
  - hackathon
  - class-based-views

author: Daniel Roy Greenfeld
location: California
title: "Case Study: URL Design for petcheatsheets.com"
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/casestudy-urls "
        >Case Study: URL Design for petcheatsheets.com</a
      >
    </div>
  </h1>
  <p>
    <strong>Backstory:</strong> On Saturday, November 17, 2012
    <a href="http://audreymroy.com" target="_blank">Audrey Roy</a> and I decided
    to participate in the
    <a href="https://twitter.com/petcentric" target="_blank">Petcentric</a>
    hackathon, a Los Angeles area Pet-themed product/coding contest held at
    <a href="http://www.amplify.la/" target="_blank">Amplify</a>. We arrived a
    bit late, but armed with Audrey's idea of creating a pet based reference
    sheet for owners, pet sitters, vets, and anyone else needing a card with
    data on pets, we got to work. About eight hours later we toggled a DNS
    switch and
    <a href="https://www.petcheatsheets.com" target="_blank"
      >petcheatsheets.com</a
    >
    was live.
  </p>
  <p>
    <strong>Update:</strong> Pet Cheatsheet's owner's pet information is
    private, because it includes emergency contact information that often
    includes phone numbers, email addresses, and even physical addresses of
    family members and friends. Maintaining the privacy of pets and their owners
    was also a consideration in implementation.
  </p>
  <h1 id="url-design-thoughts">URL Design Thoughts</h1>
  <p>
    During development, one of the things I considered carefully was URL design
    of the primary feature, which was pets. The obvious choice was to go with a
    design that identified owners with pets:
  </p>
  <pre><code>/&lt;owner_username&gt;/&lt;pet_name&gt;/
</code></pre>
  <p>
    However, upon reflection, this didn't sit well with me. What if a pet
    changed owners? Identifying a pet with a particular owner in the URL meant
    that if we ever added a 'transfer ownership' feature, there would be extra
    work. Also, if we ever implemented a sharing feature, changing URLs on a pet
    going to the same veterinarian their whole life might make the
    veterinarian's list of pets and their URLs invalid.
  </p>
  <p>
    With that in mind, I decided to go with an identifier and pet name, where
    the pet name was actually not used in the lookup:
  </p>
  <pre><code>/&lt;pet_id&gt;/&lt;pet_name:not_required&gt;/
</code></pre>
  <p>
    One more thing, rather than just use the <strong>pet</strong> table's
    primary key as <code>&lt;pet_id&gt;</code> I decided to go with base36 (0-9
    and a-z) encoding. It's not unlike what URL shortening services do, and if
    we gained any traction, it makes recitation of a pet's URL easier. So the
    final result was actually:
  </p>
  <pre><code>/&lt;pet_id:base_36_encoded&gt;/&lt;pet_name:not_required&gt;/
</code></pre>
  <h1 id="implementation">Implementation</h1>
  <p>
    Here's a simplified view of the final implementation, starting with the
    model:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># pets/models.py</span>
<span class="kn">from</span> <span class="nn">django.db</span> <span class="kn">import</span> <span class="n">models</span>
<span class="kn">from</span> <span class="nn">django.utils.translation</span> <span class="kn">import</span> <span class="n">ugettext_lazy</span> <span class="k">as</span> <span class="n">_</span>

<span class="k">class</span> <span class="nc">Pet</span><span class="p">(</span><span class="n">models</span><span class="o">.</span><span class="n">Model</span><span class="p">):</span>

    <span class="n">name</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">_</span><span class="p">(</span><span class="s2">"Pet's name"</span><span class="p">),</span> <span class="n">max_length</span><span class="o">=</span><span class="mi">100</span><span class="p">)</span>
    <span class="n">identifier</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">_</span><span class="p">(</span><span class="s2">"identifier"</span><span class="p">),</span> <span class="n">max_length</span><span class="o">=</span><span class="mi">50</span><span class="p">,</span>
        <span class="n">null</span><span class="o">=</span><span class="bp">True</span><span class="p">,</span> <span class="n">blank</span><span class="o">=</span><span class="bp">True</span><span class="p">,</span> <span class="n">db_index</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
    <span class="c1"># More fields...</span>

</code></pre>
  </div>
  <p>Then the form:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># pets/forms.py</span>
<span class="kn">from</span> <span class="nn">django</span> <span class="kn">import</span> <span class="n">forms</span>

<span class="kn">from</span> <span class="nn">pets.models</span> <span class="kn">import</span> <span class="n">Pet</span>

<span class="k">class</span> <span class="nc">PetForm</span><span class="p">(</span><span class="n">forms</span><span class="o">.</span><span class="n">ModelForm</span><span class="p">):</span>

    <span class="k">class</span> <span class="nc">Meta</span><span class="p">:</span>
        <span class="n">model</span> <span class="o">=</span> <span class="n">Pet</span>
        <span class="n">fields</span> <span class="o">=</span> <span class="p">(</span><span class="s1">'name'</span><span class="p">,</span> <span class="p">)</span> <span class="c1"># more fields</span>

</code></pre>
  </div>
  <p>With model and form, we build the views:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="c1"># pets/views.py</span>
<span class="kn">from</span> <span class="nn">django.shortcuts</span> <span class="kn">import</span> <span class="n">get_object_or_404</span>
<span class="kn">from</span> <span class="nn">django.utils.baseconv</span> <span class="kn">import</span> <span class="n">base36</span>
<span class="kn">from</span> <span class="nn">django.views.generic</span> <span class="kn">import</span> <span class="n">CreateView</span><span class="p">,</span> <span class="n">DetailView</span><span class="p">,</span> <span class="n">UpdateView</span>

<span class="kn">from</span> <span class="nn">braces.views</span> <span class="kn">import</span> <span class="n">LoginRequiredMixin</span>

<span class="kn">from</span> <span class="nn">pets.forms</span> <span class="kn">import</span> <span class="n">PetForm</span>

<span class="k">class</span> <span class="nc">PetCreateView</span><span class="p">(</span><span class="n">LoginRequiredMixin</span><span class="p">,</span> <span class="n">CreateView</span><span class="p">):</span>

    <span class="n">model</span> <span class="o">=</span> <span class="n">Pet</span>
    <span class="n">form_class</span> <span class="o">=</span> <span class="n">PetForm</span>

    <span class="k">def</span> <span class="nf">form_valid</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">form</span><span class="p">):</span>
        <span class="n">pet</span> <span class="o">=</span> <span class="n">form</span><span class="o">.</span><span class="n">save</span><span class="p">()</span>
        <span class="n">pet</span><span class="o">.</span><span class="n">identifier</span> <span class="o">=</span> <span class="n">base36</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="n">pet</span><span class="o">.</span><span class="n">pk</span><span class="p">)</span>
        <span class="n">pet</span><span class="o">.</span><span class="n">owner</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">request</span><span class="o">.</span><span class="n">user</span>
        <span class="c1"># Save again - it's not taking THAT many server cycles AND we needed</span>
        <span class="c1">#    the pet.pk in advance to generate the pet.identifier</span>
        <span class="n">pet</span><span class="o">.</span><span class="n">save</span><span class="p">()</span>
        <span class="k">return</span> <span class="nb">super</span><span class="p">(</span><span class="n">PetCreateView</span><span class="p">,</span> <span class="bp">self</span><span class="p">)</span><span class="o">.</span><span class="n">form_valid</span><span class="p">(</span><span class="n">form</span><span class="p">)</span>

<span class="k">class</span> <span class="nc">GetPetMixin</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>
<span class="sd">""" Any view that needs to get a Pet object can use this Mixin </span>

<span class="sd"> Pet Cheatsheet's owner's pet information is private, because it</span>
<span class="sd"> includes emergency contact information that often includes phone</span>
<span class="sd"> numbers, email addresses, and even physical addresses of family</span>
<span class="sd"> members and friends.</span>
<span class="sd"> """</span>

    <span class="k">def</span> <span class="nf">get_object</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="n">pet</span> <span class="o">=</span> <span class="n">get_object_or_404</span><span class="p">(</span><span class="n">Pet</span><span class="p">,</span> <span class="n">identifier</span><span class="o">=</span><span class="bp">self</span><span class="o">.</span><span class="n">kwargs</span><span class="p">[</span><span class="s1">'identifier'</span><span class="p">])</span>

        <span class="k">if</span> <span class="n">pet</span><span class="o">.</span><span class="n">owner</span> <span class="o">!=</span> <span class="bp">self</span><span class="o">.</span><span class="n">request</span><span class="o">.</span><span class="n">user</span><span class="p">:</span>
            <span class="c1"># Rather than a 'forbidden' result, we want to show a 'Pet Not</span>
            <span class="c1">#    Found' page so we can educate site users.</span>
            <span class="k">raise</span> <span class="n">Http404</span>
        <span class="k">return</span> <span class="n">pet</span>

<span class="k">class</span> <span class="nc">PetDetailView</span><span class="p">(</span><span class="n">LoginRequiredMixin</span><span class="p">,</span> <span class="n">GetPetMixin</span><span class="p">,</span> <span class="n">DetailView</span><span class="p">):</span>
<span class="k">pass</span>

<span class="k">class</span> <span class="nc">PetUpdateView</span><span class="p">(</span><span class="n">LoginRequiredMixin</span><span class="p">,</span> <span class="n">GetPetMixin</span><span class="p">,</span> <span class="n">UpdateView</span><span class="p">):</span>
<span class="n">model</span> <span class="o">=</span> <span class="n">Pet</span>
<span class="n">form_class</span> <span class="o">=</span> <span class="n">PetForm</span>

<span class="k">class</span> <span class="nc">PetPDFView</span><span class="p">(</span><span class="n">LoginRequiredMixin</span><span class="p">,</span> <span class="n">GetPetMixin</span><span class="p">,</span> <span class="n">DetailView</span><span class="p">):</span>
<span class="n">model</span> <span class="o">=</span> <span class="n">Pet</span>

    <span class="c1"># snip: lots of code for rendering the PDFs.</span>

</code></pre>
  </div>
  <p>Then we wire up the views into the urls:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.conf.urls.defaults</span> <span class="kn">import</span> <span class="n">patterns</span><span class="p">,</span> <span class="n">url</span>

<span class="kn">from</span> <span class="nn">pets</span> <span class="kn">import</span> <span class="n">views</span>

<span class="n">urlpatterns</span> <span class="o">=</span> <span class="n">patterns</span><span class="p">(</span><span class="s2">""</span><span class="p">,</span>

    <span class="n">url</span><span class="p">(</span>
        <span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s2">"^build-cheatsheet/$"</span><span class="p">,</span>
        <span class="n">view</span><span class="o">=</span><span class="n">views</span><span class="o">.</span><span class="n">PetCreateView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(),</span>
        <span class="n">name</span><span class="o">=</span><span class="s2">"pet_create"</span><span class="p">,</span>
    <span class="p">),</span>
    <span class="n">url</span><span class="p">(</span>
        <span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s2">"^update/(?P&lt;identifier&gt;[\w\d]+)/(?P&lt;slug&gt;[\w\d\-\_]+)/$"</span><span class="p">,</span>
        <span class="n">view</span><span class="o">=</span><span class="n">views</span><span class="o">.</span><span class="n">PetUpdateView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(),</span>
        <span class="n">name</span><span class="o">=</span><span class="s2">"pet_update"</span><span class="p">,</span>
    <span class="p">),</span>
    <span class="n">url</span><span class="p">(</span>
        <span class="n">regex</span><span class="o">=</span><span class="sa">r</span><span class="s2">"^(?P&lt;identifier&gt;[\w\d]+)/(?P&lt;slug&gt;[\w\d\-\_]+)/$"</span><span class="p">,</span>
        <span class="n">view</span><span class="o">=</span><span class="n">views</span><span class="o">.</span><span class="n">PetDetailView</span><span class="o">.</span><span class="n">as_view</span><span class="p">(),</span>
        <span class="n">name</span><span class="o">=</span><span class="s2">"pet_detail"</span><span class="p">,</span>
    <span class="p">),</span>
    <span class="c1"># snip: a lot of other views</span>

<span class="p">)</span>
</code></pre>
  </div>
  <h1 id="result">Result</h1>
  <p>
    In the image below you can see how Marko's URL has his own unique
    identifier, along with his name. I can change the name in the URL or even in
    the database, but so long as I don't modify the identifying part of the URL
    (<code>1m</code>), his information always shows up.
  </p>
  <p>
    <a href="http://petcheatsheets.com" target="_blank"
      ><img
        alt="image"
        src="petcheatsheets-url-example.png"
      />{.img-polaroidalign-center}</a
    >
  </p>
  </div>
