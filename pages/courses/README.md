---
sidebar: auto
courses:
  - id: 1
    image: "/images/packaging-course.jpg"
    title: "creating and distributing python packages"
    description: "English version"
    text: learn how to create and distribute Python Packages
    ready: true
    actions: 
      - text: Two scoops press
        link: "https://courses.twoscoopspress.com/courses/creating-and-distributing-python-packages"
    
  - id: 2
    image: "/images/packaging-course-es.jpg"
    title: "crear y distribuir paquetes de python"
    description: "Version en español"
    ready: true
    text: aprenda a crear y distribuir paquetes de Python
    actions: 
      - text: Two scoops press
        link: "https://courses.twoscoopspress.com/courses/creating-and-distributing-python-packages-es"
  - id: 3
    title: Django Rest Framework
    text: Django REST framework is a powerful and flexible toolkit for building Web APIs.
    image: "https://ksr-ugc.imgix.net/assets/011/705/984/4ea78430d3ad7dc88106a7b973248ba7_original.jpg?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1463687041&auto=format&frame=1&q=92&s=022bf4c5b7efa27ab20395c0da4eff7b"
    ready: false
  - id: 4
    title: Docker
    text: create, deploy, and run applications by using containers
    image: "https://miro.medium.com/max/630/1*j_zP74-cpvXRcs8dM_pkMQ.jpeg"
    ready: false
  - id: 5
    title: Vue.js
    text: create awesome, scalable, fast web apps.
    image: "https://hackernoon.com/hn-images/1*ACR0gj0wbx91V_xgURifWg.png"
    ready: false
    
---

# Courses

<br>

## Current Courses list


<Card
    v-for="course in $frontmatter.courses"
    v-if="course.ready"
    :key="course.id"
    :title="course.title"
    :description="course.description"
    :image="course.image"
    :text="course.text"
    :actions="course.actions"
    width="200"
    class="horizontal" />


<br>
<br>
<br>

## Planned

<Card
    v-for="course in $frontmatter.courses"
    v-if="!course.ready"
    :key="course.id"
    :title="course.title"
    :description="course.description"
    :image="course.image"
    :text="course.text"
    :actions="course.actions"
    width="200"
    class="horizontal" />
