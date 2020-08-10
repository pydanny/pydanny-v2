---
sidebar: auto

courses:
  - id: 0
    title: "Django Best Practices the Two Scoops Way"
    description: "August 14, 2020: Live Instruction of Django Best Practices"
    image: "/images/django-news-advert-2020-07-29.png"
    text: 'This is a live online Zoom-powered event where I dive deep into Django and Python best practices. Attendees can ask questions and are encouraged to do so. Ownership of Two Scoops of Django is recommended but not mandatory. Material covered includes coding style, project architecture, model and query best practices, building APIs, and more. To learn the entire curriculem, click the "More information" link below.'
    actions:
      - text: "More Information"
        link: "https://events.eventzilla.net/e/django-best-practices-the-two-scoops-way-2138797976"    
      - text: "Register Now"
        link: "https://events.eventzilla.net/e/django-best-practices-the-two-scoops-way-2138797976"
  - id: 1
    title: "Django Crash Course"
    type: "technical"
    description: "August 21, 22, and 23: Live Instruction of Django Fundamentals"
    image: "/images/Funny_Course_Logo.png"
    text: "I'm offering 14 hours of live, online Django instruction conducted via Zoom conferencing software. If you get stuck, there will be at least two members of our team (all senior developers) available to help.

Originally a large part of our corporate training materials, this tutorial was once only available to companies paying $3000 a seat for in-person training around the world. The contents of this course are professional-grade and have been used by real software companies to get their engineers up and running fast with Python 3.8 and Django 3.x development.

This course is designed to build solid foundations for any developer looking to get proficient with Django fast."
    actions:
      - text: "More information"
        link: "https://events.eventzilla.net/e/django-crash-course-online--august-2138797784"
      - text: "Register Now"
        link: "https://events.eventzilla.net/e/django-crash-course-online--august-2138797784"        
---

# Courses

Recently I've started teaching live, online courses. I enjoy real-time interactions with my students as they learn. 

<Card
    v-for="course in $frontmatter.courses"
    :key="course.id"
    :title="course.title"
    :description="course.description"
    :image="course.image"
    :text="course.text"
    :actions="course.actions"
    width="300"
    class="verticle" />