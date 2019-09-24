---
date: 2018-04-21
tag:
  - python
  - django
  - django-rest-framework
  - Vue.js
  - javascript

author: Daniel Roy Greenfeld
location: California
title: Authenticating via JWT using Django, Axios, and Vue
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/drf-jwt-axios-vue "
        >Authenticating via JWT using Django, Axios, and Vue</a
      >
    </div>
  </h1>
  <p><img src="https://www.pydanny.com/static/vuelogo.png" /></p>
  <p>
    Getting Django Rest Framework, JWT, Axios, and Vue.js to play nice isn't
    easy. Here's my quick-and-dirty cheatsheet that I wrote while glueing the
    pieces together.
  </p>
  <p>
    Note: My architecture doesn't use django-webpack-loader. Instead, I'm
    running Django and Vue.js as two separate projects. I do this because I
    <strong>much prefer</strong> generating new projects with
    <code>vue create</code> over configuring webpack.
  </p>
  <h2 id="the-back-end">The Back-End</h2>
  <p>First, install some Django parts using the installer of your choice:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code>pip install Django
pip install djangorestframework
pip install django-cors-headers
pip install djangorestframework-jwt
</code></pre>
  </div>
  <p>Then, configure Django in <code>settings.py</code>:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="n">INSTALLED_APPS</span> <span class="o">=</span> <span class="p">(</span>
    <span class="o">...</span>
    <span class="s1">'rest_framework'</span><span class="p">,</span>
    <span class="s1">'rest_framework.authtoken'</span><span class="p">,</span>
    <span class="s1">'corsheaders'</span><span class="p">,</span>
<span class="p">)</span>

<span class="n">MIDDLEWARE_CLASSES</span> <span class="o">=</span> <span class="p">(</span>
<span class="o">...</span>
<span class="s1">'corsheaders.middleware.CorsMiddleware'</span><span class="p">,</span>
<span class="p">)</span>

<span class="n">CORS_ORIGIN_ALLOW_ALL</span> <span class="o">=</span> <span class="bp">False</span>
<span class="n">CORS_ALLOW_CREDENTIALS</span> <span class="o">=</span> <span class="bp">True</span>
<span class="n">CORS_ORIGIN_WHITELIST</span> <span class="o">=</span> <span class="p">(</span>
<span class="c1"># TODO - set this properly for production</span>
<span class="s1">'http://127.0.0.1:8080'</span><span class="p">,</span>
<span class="s1">'http://127.0.0.1:8000'</span><span class="p">,</span>
<span class="p">)</span>

<span class="n">REST_FRAMEWORK</span> <span class="o">=</span> <span class="p">{</span>
<span class="s1">'DEFAULT_PERMISSION_CLASSES'</span><span class="p">:</span> <span class="p">(</span>
<span class="c1"># By default we set everything to admin,</span>
<span class="c1"># then open endpoints on a case-by-case basis</span>
<span class="s1">'rest_framework.permissions.IsAdminUser'</span><span class="p">,</span>
<span class="p">),</span>
<span class="s1">'TEST_REQUEST_RENDERER_CLASSES'</span><span class="p">:</span> <span class="p">(</span>
<span class="s1">'rest_framework.renderers.MultiPartRenderer'</span><span class="p">,</span>
<span class="s1">'rest_framework.renderers.JSONRenderer'</span><span class="p">,</span>
<span class="s1">'rest_framework.renderers.TemplateHTMLRenderer'</span>
<span class="p">),</span>
<span class="s1">'DEFAULT_AUTHENTICATION_CLASSES'</span><span class="p">:</span> <span class="p">(</span>
<span class="s1">'rest_framework_jwt.authentication.JSONWebTokenAuthentication'</span><span class="p">,</span>
<span class="s1">'rest_framework.authentication.SessionAuthentication'</span><span class="p">,</span>
<span class="p">),</span>
<span class="s1">'DEFAULT_PAGINATION_CLASS'</span><span class="p">:</span> <span class="s1">'rest_framework.pagination.LimitOffsetPagination'</span><span class="p">,</span>
<span class="s1">'PAGE_SIZE'</span><span class="p">:</span> <span class="mi">20</span><span class="p">,</span>
<span class="p">}</span>

<span class="kn">from</span> <span class="nn">datetime</span> <span class="kn">import</span> <span class="n">timedelta</span>

<span class="n">JWT_AUTH</span> <span class="o">=</span> <span class="p">{</span>
<span class="s1">'JWT_ALLOW_REFRESH'</span><span class="p">:</span> <span class="bp">True</span><span class="p">,</span>
<span class="s1">'JWT_EXPIRATION_DELTA'</span><span class="p">:</span> <span class="n">timedelta</span><span class="p">(</span><span class="n">hours</span><span class="o">=</span><span class="mi">1</span><span class="p">),</span>
<span class="s1">'JWT_REFRESH_EXPIRATION_DELTA'</span><span class="p">:</span> <span class="n">timedelta</span><span class="p">(</span><span class="n">days</span><span class="o">=</span><span class="mi">7</span><span class="p">),</span>
<span class="p">}</span>
</code></pre>
  </div>

  <p>Once that's done, it's time to do modify the <code>urls.py</code>:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kn">from</span> <span class="nn">django.conf.urls</span> <span class="kn">import</span> <span class="n">include</span><span class="p">,</span> <span class="n">url</span>
<span class="o">...</span>

<span class="n">urlpatterns</span> <span class="o">=</span> <span class="p">[</span>
<span class="o">...</span>
<span class="c1"># JWT auth</span>
<span class="n">url</span><span class="p">(</span><span class="sa">r</span><span class="s1">'^api/v1/auth/obtain_token/'</span><span class="p">,</span> <span class="n">obtain_jwt_token</span><span class="p">),</span>
<span class="n">url</span><span class="p">(</span><span class="sa">r</span><span class="s1">'^api/v1/auth/refresh_token/'</span><span class="p">,</span> <span class="n">refresh_jwt_token</span><span class="p">),</span>
<span class="c1"># The rest of the endpoints</span>
<span class="n">url</span><span class="p">(</span><span class="sa">r</span><span class="s1">'^api/v1/'</span><span class="p">,</span> <span class="n">include</span><span class="p">(</span><span class="s1">'project.api'</span><span class="p">,</span> <span class="n">namespace</span><span class="o">=</span><span class="s1">'apiv1'</span><span class="p">)),</span>
<span class="o">...</span>
<span class="p">]</span>
</code></pre>
  </div>

  <p>Run the tests and fix them as they fail.</p>
  <h2 id="the-front-end">The Front-End</h2>
  <p>First off, add this to your Vuex store:</p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="kr">import</span> <span class="nx">Vue</span> <span class="nx">from</span> <span class="s1">'vue'</span>
<span class="kr">import</span> <span class="nx">Vuex</span> <span class="nx">from</span> <span class="s1">'vuex'</span>
<span class="kr">import</span> <span class="nx">axios</span> <span class="nx">from</span> <span class="s1">'axios'</span>

<span class="nx">Vue</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span><span class="nx">Vuex</span><span class="p">)</span>

<span class="c1">// Make Axios play nice with Django CSRF</span>
<span class="nx">axios</span><span class="p">.</span><span class="nx">defaults</span><span class="p">.</span><span class="nx">xsrfCookieName</span> <span class="o">=</span> <span class="s1">'csrftoken'</span>
<span class="nx">axios</span><span class="p">.</span><span class="nx">defaults</span><span class="p">.</span><span class="nx">xsrfHeaderName</span> <span class="o">=</span> <span class="s1">'X-CSRFToken'</span>

<span class="kr">export</span> <span class="k">default</span> <span class="k">new</span> <span class="nx">Vuex</span><span class="p">.</span><span class="nx">Store</span><span class="p">({</span>
<span class="nx">state</span><span class="o">:</span> <span class="p">{</span>
<span class="nx">authUser</span><span class="o">:</span> <span class="p">{},</span>
<span class="nx">isAuthenticated</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span>
<span class="nx">jwt</span><span class="o">:</span> <span class="nx">localStorage</span><span class="p">.</span><span class="nx">getItem</span><span class="p">(</span><span class="s1">'token'</span><span class="p">),</span>
<span class="nx">endpoints</span><span class="o">:</span> <span class="p">{</span>
<span class="c1">// TODO: Remove hardcoding of dev endpoints</span>
<span class="nx">obtainJWT</span><span class="o">:</span> <span class="s1">'http://127.0.0.1:8000/api/v1/auth/obtain_token/'</span><span class="p">,</span>
<span class="nx">refreshJWT</span><span class="o">:</span> <span class="s1">'http://127.0.0.1:8000/api/v1/auth/refresh_token/'</span><span class="p">,</span>
<span class="nx">baseUrl</span><span class="o">:</span> <span class="s1">'http://127.0.0.1:8000/api/v1/'</span>
<span class="p">}</span>
<span class="p">},</span>

<span class="nx">mutations</span><span class="o">:</span> <span class="p">{</span>
<span class="nx">setAuthUser</span><span class="p">(</span><span class="nx">state</span><span class="p">,</span> <span class="p">{</span>
<span class="nx">authUser</span><span class="p">,</span>
<span class="nx">isAuthenticated</span>
<span class="p">})</span> <span class="p">{</span>
<span class="nx">Vue</span><span class="p">.</span><span class="nx">set</span><span class="p">(</span><span class="nx">state</span><span class="p">,</span> <span class="s1">'authUser'</span><span class="p">,</span> <span class="nx">authUser</span><span class="p">)</span>
<span class="nx">Vue</span><span class="p">.</span><span class="nx">set</span><span class="p">(</span><span class="nx">state</span><span class="p">,</span> <span class="s1">'isAuthenticated'</span><span class="p">,</span> <span class="nx">isAuthenticated</span><span class="p">)</span>
<span class="p">},</span>
<span class="nx">updateToken</span><span class="p">(</span><span class="nx">state</span><span class="p">,</span> <span class="nx">newToken</span><span class="p">)</span> <span class="p">{</span>
<span class="c1">// TODO: For security purposes, take localStorage out of the project.</span>
<span class="nx">localStorage</span><span class="p">.</span><span class="nx">setItem</span><span class="p">(</span><span class="s1">'token'</span><span class="p">,</span> <span class="nx">newToken</span><span class="p">);</span>
<span class="nx">state</span><span class="p">.</span><span class="nx">jwt</span> <span class="o">=</span> <span class="nx">newToken</span><span class="p">;</span>
<span class="p">},</span>
<span class="nx">removeToken</span><span class="p">(</span><span class="nx">state</span><span class="p">)</span> <span class="p">{</span>
<span class="c1">// TODO: For security purposes, take localStorage out of the project.</span>
<span class="nx">localStorage</span><span class="p">.</span><span class="nx">removeItem</span><span class="p">(</span><span class="s1">'token'</span><span class="p">);</span>
<span class="nx">state</span><span class="p">.</span><span class="nx">jwt</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span>
<span class="p">}</span>
<span class="p">}</span>
<span class="p">})</span>
</code></pre>
  </div>

  <p>
    Then, in a Vue component called something like
    <code>components/Login.vue</code>:
  </p>
  <div class="codehilite ui secondary segment">
    <pre><span></span><code><span class="p">&lt;</span><span class="nt">template</span> <span class="na">lang</span><span class="o">=</span><span class="s">"html"</span><span class="p">&gt;</span>
  <span class="p">&lt;</span><span class="nt">form</span> <span class="na">class</span><span class="o">=</span><span class="s">"login form"</span><span class="p">&gt;</span>
    <span class="p">&lt;</span><span class="nt">div</span> <span class="na">class</span><span class="o">=</span><span class="s">"field"</span><span class="p">&gt;</span>
      <span class="p">&lt;</span><span class="nt">label</span> <span class="na">for</span><span class="o">=</span><span class="s">"id_username"</span><span class="p">&gt;</span>Username<span class="p">&lt;/</span><span class="nt">label</span><span class="p">&gt;</span>
      <span class="p">&lt;</span><span class="nt">input</span>
        <span class="na">v-model</span><span class="o">=</span><span class="s">"username"</span>
        <span class="na">type</span><span class="o">=</span><span class="s">"text"</span>
        <span class="na">placeholder</span><span class="o">=</span><span class="s">"Username"</span>
        <span class="na">autofocus</span><span class="o">=</span><span class="s">"autofocus"</span>
        <span class="na">maxlength</span><span class="o">=</span><span class="s">"150"</span>
        <span class="na">id</span><span class="o">=</span><span class="s">"id_username"</span><span class="p">&gt;</span>
    <span class="p">&lt;/</span><span class="nt">div</span><span class="p">&gt;</span>
    <span class="p">&lt;</span><span class="nt">div</span> <span class="na">class</span><span class="o">=</span><span class="s">"field"</span><span class="p">&gt;</span>
      <span class="p">&lt;</span><span class="nt">label</span> <span class="na">for</span><span class="o">=</span><span class="s">"id_password"</span><span class="p">&gt;</span>Password<span class="p">&lt;/</span><span class="nt">label</span><span class="p">&gt;</span>
      <span class="p">&lt;</span><span class="nt">input</span>
        <span class="na">v-model</span><span class="o">=</span><span class="s">"password"</span>
        <span class="na">type</span><span class="o">=</span><span class="s">"password"</span>
        <span class="na">placeholder</span><span class="o">=</span><span class="s">"Password"</span>
        <span class="na">id</span><span class="o">=</span><span class="s">"id_password"</span><span class="p">&gt;</span>
    <span class="p">&lt;/</span><span class="nt">div</span><span class="p">&gt;</span>
    <span class="p">&lt;</span><span class="nt">button</span>
      <span class="err">@</span><span class="na">click</span><span class="err">.</span><span class="na">prevent</span><span class="o">=</span><span class="s">"authenticate"</span>
      <span class="na">class</span><span class="o">=</span><span class="s">"button primary"</span>
      <span class="na">type</span><span class="o">=</span><span class="s">"submit"</span><span class="p">&gt;</span>
      Log In
    <span class="p">&lt;/</span><span class="nt">button</span><span class="p">&gt;</span>
  <span class="p">&lt;/</span><span class="nt">form</span><span class="p">&gt;</span>
<span class="p">&lt;/</span><span class="nt">template</span><span class="p">&gt;</span>

<span class="p">&lt;</span><span class="nt">script</span><span class="p">&gt;</span>
<span class="kr">import</span> <span class="nx">axios</span> <span class="nx">from</span> <span class="s1">'axios'</span>

<span class="kr">export</span> <span class="k">default</span> <span class="p">{</span>
<span class="nx">data</span> <span class="p">()</span> <span class="p">{</span>
<span class="k">return</span> <span class="p">{</span>
<span class="nx">username</span><span class="o">:</span> <span class="s1">''</span><span class="p">,</span>
<span class="nx">password</span><span class="o">:</span> <span class="s1">''</span>
<span class="p">}</span>
<span class="p">},</span>
<span class="nx">methods</span><span class="o">:</span> <span class="p">{</span>
<span class="nx">authenticate</span> <span class="p">()</span> <span class="p">{</span>
<span class="kr">const</span> <span class="nx">payload</span> <span class="o">=</span> <span class="p">{</span>
<span class="nx">username</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">username</span><span class="p">,</span>
<span class="nx">password</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">password</span>
<span class="p">}</span>
<span class="nx">axios</span><span class="p">.</span><span class="nx">post</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">$store</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">endpoints</span><span class="p">.</span><span class="nx">obtainJWT</span><span class="p">,</span> <span class="nx">payload</span><span class="p">)</span>
        <span class="p">.</span><span class="nx">then</span><span class="p">((</span><span class="nx">response</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
          <span class="k">this</span><span class="p">.</span><span class="nx">$store</span><span class="p">.</span><span class="nx">commit</span><span class="p">(</span><span class="s1">'updateToken'</span><span class="p">,</span> <span class="nx">response</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">token</span><span class="p">)</span>
<span class="c1">// get and set auth user</span>
<span class="kr">const</span> <span class="nx">base</span> <span class="o">=</span> <span class="p">{</span>
<span class="nx">baseURL</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">\$store</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">endpoints</span><span class="p">.</span><span class="nx">baseUrl</span><span class="p">,</span>
<span class="nx">headers</span><span class="o">:</span> <span class="p">{</span>
<span class="c1">// Set your Authorization to 'JWT', not Bearer!!!</span>
<span class="nx">Authorization</span><span class="o">:</span> <span class="sb">`JWT </span><span class="si">${</span><span class="k">this</span><span class="p">.</span><span class="nx">$store</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">jwt</span><span class="si">}</span><span class="sb">`</span><span class="p">,</span>
<span class="s1">'Content-Type'</span><span class="o">:</span> <span class="s1">'application/json'</span>
<span class="p">},</span>
<span class="nx">xhrFields</span><span class="o">:</span> <span class="p">{</span>
<span class="nx">withCredentials</span><span class="o">:</span> <span class="kc">true</span>
<span class="p">}</span>
<span class="p">}</span>
<span class="c1">// Even though the authentication returned a user object that can be</span>
<span class="c1">// decoded, we fetch it again. This way we aren't super dependant on</span>
<span class="c1">// JWT and can plug in something else.</span>
<span class="kr">const</span> <span class="nx">axiosInstance</span> <span class="o">=</span> <span class="nx">axios</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span><span class="nx">base</span><span class="p">)</span>
<span class="nx">axiosInstance</span><span class="p">({</span>
<span class="nx">url</span><span class="o">:</span> <span class="s2">"/user/"</span><span class="p">,</span>
<span class="nx">method</span><span class="o">:</span> <span class="s2">"get"</span><span class="p">,</span>
<span class="nx">params</span><span class="o">:</span> <span class="p">{}</span>
<span class="p">})</span>
<span class="p">.</span><span class="nx">then</span><span class="p">((</span><span class="nx">response</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
<span class="k">this</span><span class="p">.</span><span class="nx">$store</span><span class="p">.</span><span class="nx">commit</span><span class="p">(</span><span class="s2">"setAuthUser"</span><span class="p">,</span>
                <span class="p">{</span><span class="nx">authUser</span><span class="o">:</span> <span class="nx">response</span><span class="p">.</span><span class="nx">data</span><span class="p">,</span> <span class="nx">isAuthenticated</span><span class="o">:</span> <span class="kc">true</span><span class="p">}</span>
              <span class="p">)</span>
              <span class="k">this</span><span class="p">.</span><span class="nx">$router</span><span class="p">.</span><span class="nx">push</span><span class="p">({</span><span class="nx">name</span><span class="o">:</span> <span class="s1">'Home'</span><span class="p">})</span>
<span class="p">})</span>

        <span class="p">})</span>
        <span class="p">.</span><span class="k">catch</span><span class="p">((</span><span class="nx">error</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
          <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">error</span><span class="p">);</span>
          <span class="nx">console</span><span class="p">.</span><span class="nx">debug</span><span class="p">(</span><span class="nx">error</span><span class="p">);</span>
          <span class="nx">console</span><span class="p">.</span><span class="nx">dir</span><span class="p">(</span><span class="nx">error</span><span class="p">);</span>
        <span class="p">})</span>
    <span class="p">}</span>

<span class="p">}</span>
<span class="p">}</span>
<span class="p">&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>

<span class="p">&lt;</span><span class="nt">style</span> <span class="na">lang</span><span class="o">=</span><span class="s">"css"</span><span class="p">&gt;</span>
<span class="p">&lt;/</span><span class="nt">style</span><span class="p">&gt;</span>
</code></pre>
  </div>

  <h2 id="summary">Summary</h2>
  <p>
    There you have it, my quick-and-dirty notes on getting Django REST
    Framework, JWT, Axios, and Vue.js to play nice together. Be aware there are
    a two significant problems:
  </p>
  <ol>
    <li>
      I'm not happy about using local storage, especially with JWT. In fact, my
      good friend Randall Degges has written about the
      <a
        href="https://developer.okta.com/blog/2017/08/17/why-jwts-suck-as-session-tokens"
        target="_blank"
        >problems of JWT</a
      >.
    </li>
    <li>I don't cover logging out. ;)</li>
  </ol>
  <p>Credits:</p>
  <ul>
    <li>
      <a
        href="https://hackernoon.com/jwt-authentication-in-vue-js-and-django-rest-framework-part-1-c40c5c0d4f6e"
        target="_blank"
        >Melvin Koh's blog post on the subject</a
      >
    </li>
    <li>Too many Stackoverflow and Github issues to list here. :P</li>
  </ul>
  </div>
