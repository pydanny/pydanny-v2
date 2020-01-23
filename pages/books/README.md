---
sidebar: auto
books:
  - id: 1
    title: "Two Scoops of Django"
    type: "technical"
    description: "for Django 1.11 LTS"
    image: "/images/0692915729.01.LZZZZZZZ.jpg"
    text: "Two Scoops of Django is chock-full of material that will help you with your Django projects. Written to support Django 1.11 LTS (Long Term Support), this book won't get outdated until 2020."
    actions:
      - text: "Buy on roygreenfeld.com"
        link: "http://roygreenfeld.com/products/two-scoops-of-django-1-11"
      - text: "Buy on amazon.com"
        link: "https://2scoops.co/tsd111"
      - text: "Kindle and paperback versions available on amazon.com"
        link: "https://2scoops.co/tsd111kindle"

  - id: 2
    title: "Two Scoops of Django"
    type: "technical"
    description: "for Django 1.8 LTS"
    image: "/images/0981467342.01.LZZZZZZZ.jpg"
    text: "Written to support Django 1.8 LTS (Long Term Support), this book is still useful to have for older projects."
    actions:
      - text: "Buy on roygreenfeld.com"
        link: "http://roygreenfeld.com/products/two-scoops-of-django-1-8"
      - text: "Buy on amazon.com"
        link: "https://2scoops.co/tsd18"

  - id: 3
    title: "Two Scoops of Django"
    type: "technical"
    description: "for Django 1.6"
    image: "/images/098146730X.01.LZZZZZZZ.jpg"
    text: "Long out of date, displayed for historical purposes."
    actions:
      - text: "Buy on roygreenfeld.com"
        link: "http://roygreenfeld.com/products/two-scoops-of-django-1-6"
      - text: "Buy on amazon.com"
        link: "https://2scoops.co/tsd16"

  - id: 4
    title: "Two Scoops of Django"
    type: "technical"
    description: "for Django 1.5"
    image: "/images/1481879707.01.LZZZZZZZ.jpg"
    text: "The original edition! Long out of date, displayed for historical purposes."
    actions:
      - text: "Buy on roygreenfeld.com"
        link: "https://roygreenfeld.com/products/two-scoops-of-django-1-5"
      - text: "Buy on amazon.com"
        link: "https://2scoops.co/tsd15"

  - id: 5
    title: "Darkest Autumn"
    type: "fiction"
    description: "co-authored with Audrey Roy Greenfeld"
    image: "/images/B071L2G8SL.01.LZZZZZZZ.jpg"
    text: "First book in the epic Ambria series."
    actions:
      - text: "Buy on roygreenfeld.com"
        link: "https://www.roygreenfeld.com/collections/everything/products/darkest-autumn-ambria-book-1"
      - text: "Buy on amazon.com"
        link: "https://www.amazon.com/gp/product/B071L2G8SL?tag=mlinar-20"

  - id: 6
    title: "Brightest Winter"
    type: "fiction"
    description: "co-authored with Audrey Roy Greenfeld"
    image: "/images/B0727WW7F2.01.LZZZZZZZ.jpg"
    text: "Second book in the epic Ambria series."
    actions:
      - text: "Buy on roygreenfeld.com"
        link: "https://www.roygreenfeld.com/collections/everything/products/brightest-winter-ambria-book-2"
      - text: "Buy on amazon.com"
        link: "https://www.amazon.com/gp/product/B0727WW7F2?tag=mlinar-20"

  - id: 7
    title: "Coldest Spring"
    type: "fiction"
    description: "co-authored with Audrey Roy Greenfeld"
    image: "/images/B071P74C8Z.01.LZZZZZZZ.jpg"
    text: "Third book in the epic Ambria series."
    actions:
      - text: "Buy on roygreenfeld.com"
        link: "https://www.roygreenfeld.com/collections/everything/products/coldest-spring-ambria-book-3"
      - text: "Buy on amazon.com"
        link: "https://www.amazon.com/gp/product/B071P74C8Z?tag=mlinar-20"

  - id: 8
    title: "Deadliest Summer"
    type: "fiction"
    description: "co-authored with Audrey Roy Greenfeld"
    image: "/images/B073V77G4M.01.LZZZZZZZ.jpg"
    text: "Fourth book in the epic Ambria series."
    actions:
      - text: "Buy on roygreenfeld.com"
        link: "https://www.roygreenfeld.com/collections/everything/products/deadliest-summer-ambria-book-4"
      - text: "Buy on amazon.com"
        link: "https://www.amazon.com/gp/product/B073V77G4M?tag=mlinar-20"

  - id: 9
    title: "The Ambria Series"
    type: "fiction"
    description: "co-authored with Audrey Roy Greenfeld"
    image: "/images/D1zlFwHmw0S._SL250_FMpng_.png"
    text: "The entire Ambria series!"
    actions:
      - text: "Buy on roygreenfeld.com"
        link: "https://www.roygreenfeld.com/collections/ambria-series"
      - text: "Buy on amazon.com"
        link: "http://mybook.to/ambria-series"
---

# Books

Writing is a passion of mine, here are my published books. Most are co-authored with my wife, Audrey Roy Greenfeld.

## Technical Works

I co-wrote an ice-cream-themed book series on Django with my wife, Audrey Roy Greenfeld. The most current version is for Django 1.11, the latest Long Term Support (LTS) version of the framework. That means this book is good until at least April of 2020!

<Card
    v-for="book in $frontmatter.books"
    v-if="book.type == 'technical'"
    :key="book.id"
    :title="book.title"
    :description="book.description"
    :image="book.image"
    :text="book.text"
    :actions="book.actions"
    width="200"
    class="horizontal" />
<br>
<br>

## Fiction Works

Yes, I also write fiction.

<Card
    v-for="book in $frontmatter.books"
    v-if="book.type == 'fiction'"
    :key="book.id"
    :title="book.title"
    :description="book.description"
    :image="book.image"
    :text="book.text"
    :actions="book.actions"
    width="200"
    class="horizontal" />

  <!-- http://images.amazon.com/images/P/B071L2G8SL.01.LZZZZZZZ.jpg -->
