---
date: 2014-06-12
tag:
  - python
  - jinja2

author: Daniel Roy Greenfeld
location: California
title: Jinja2 Quick Load Function
---

<div class="twelve wide column">
  <h1 class="ui block header">
    <div class="content">
      <a href="/jinja2-quick-load-function ">Jinja2 Quick Load Function</a>
    </div>
  </h1>
  <p>
    It seems like that for every few weeks I find myself needing to generate
    something out of a template while working outside a framework. For this
    task, my preferred solution is
    <a href="http://jinja.pocoo.org/" target="_blank">Jinja2</a>. I've used
    Jinja2 to generate HTML, code, and text. If I were brave enough I would even
    say I've used it to generate XML (<em
      >While my preferred xml tool is great for parsing, even lxml is not so
      much fun for XML generation</em
    >).
  </p>
  <p>
    I frequently use this snippet of code to render templates. Since I'm tired
    of digging through my code to find it, I'm placing it here for personal
    reference.
  </p>
  
  ```python
  from jinja2 import FileSystemLoader, Environment

  def render_from_template(directory, template_name, **kwargs):
      loader = FileSystemLoader(directory)
      env = Environment(loader=loader)
      template = env.get_template(template_name)
      return template.render(**kwargs)

  ```

  <p>Sample usage:</p>
  

  ```python

  >>> from simple_script import render_from_template
  >>> data = {
  ...     "date": "June 12, 2014",
  ...     "items": ["oranges", "bananas", "steak", "milk"]
  ... }
  >>> render_from_template(".", "shopping_list ", **data)
  ```


  <p>
    I've thought about packaging this up with
    <a href="https://github.com/audreyr/cookiecutter-pypackage" target="_blank"
      >cookiecutter-pypackage</a
    >
    and placing it on
    <a href="https://pypi.python.org/pypi" target="_blank">PyPI</a>, but I think
    it might be overkill.
  </p>
  <p>
    <strong>Update 2014/06/12:</strong> Fixed cookiecutter link thanks to
    <a href="https://github.com/dirn" target="_blank"
      >https://github.com/dirn</a
    >
  </p>
  </div>
