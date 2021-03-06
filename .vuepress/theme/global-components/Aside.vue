<template>
  <aside class="aside-transparent">
    <h4 class="side-title">
      Suggested Book
      <FlagIcon />
    </h4>
    <Card
      :title="primary.title"
      :image="primary.image"
      :text="primary.text"
      :description="primary.description"
      :actions="primary.actions"
      width="100%"
      class="side-book-card"
    />
    <br />
    <br />
    <h4 class="side-title">
      Books I like
      <HeartIcon />
    </h4>
    <Card
      :title="currentBook.title"
      :image="currentBook.image"
      :text="currentBook.text"
      :description="currentBook.description"
      :actions="currentBook.actions"
      width="100%"
      class="side-book-card"
    />
  </aside>
</template>

<script>
import { HeartIcon, FlagIcon } from "vue-feather-icons";

export default {
  components: { HeartIcon, FlagIcon },
  data() {
    return {
      currentBookIndex: 0,
      primary: {
        title: "Two Scoops of Django 3.x",
        description: "Covers Python 3.8/3.9 and Django 3.x - Alpha Version",
        image: "/images/Two-Scoops-of-Django-3-Alpha-Cover_540x.jpg",
        text:
          "Two Scoops of Django is chock-full of material that will help you with your Django projects. Written to support Django 3.0, 3.1, and 3.2 LTS (Long Term Support), this book won't get outdated until April 2024.",
        actions: [
          {
            text: "E-Book versions available on feldroy.com ",
            link: "https://www.feldroy.com/products/two-scoops-of-django-3-x",
          },
        ],
      },
      books: [
        {
          title: "Django Crash Course",
          description: "Covers Python 3.8 and Django 3.x - Beta Version",
          image: "/images/Django-Crash-Course-300x436.jpg",
          text:
            "The Django Crash Course book is a guided walkthrough where we build a real, production-quality Django web application from the ground up. Originally a large part of our corporate training materials, this tutorial was once only available to companies paying $3000 a seat for in-person training. The contents of this book are professional-grade and have been used by real software companies to get their engineers up and running fast with Python 3.8 and Django 3.x development.",
          actions: [
            {
              text:
                "Paperback, PDF, ePub, and Kindle versions available on feldroy.com  ",
              link: "https://feldroy.com/products/django-crash-course",
            },
          ],
        },
        {
          title: "Fluent Python",
          description: "Clear, Concise, and Effective Programming",
          image: "/images/1491946008.01.LZZZZZZZ.jpg",
          text:
            "Authored by one of my mentors, Luciano Ramalho, this is an amazing intermediate-to-advanced book that teaches you how to write the best Python that you can. Fluent Python is a huge, deep reference that is a must-have for any Python programmer.",
          actions: [
            { text: "Available at amazon.com", link: "https://2scoops.co/7X" },
          ],
        },
        {
          title: "Django for APIs",
          description: "Build web APIs with Python and Django",
          image: "/images/B07DR9XS6L.01.LZZZZZZZ.jpg",
          text:
            "Authored by my friend, William Vincent, this take a modern API-first approach to creating 3 different Django back-ends: a Library API, Todo API, and a Blog API with user authentication, permissions, proper documentation, and more. You'll even learn how to connect them to a React front-end for a truly full-stack web application..",
          actions: [
            {
              text: "Available at Amazon",
              link:
                "https://www.amazon.com/Django-APIs-Build-web-Python/dp/1093633948?tag=mlinar-20",
            },
            {
              text: "Kindle on Amazon",
              link:
                "https://www.amazon.com/REST-APIs-Django-powerful-Python-ebook/dp/B07DR9XS6L/?tag=mlinar-20",
            },
          ],
        },
        {
          title: "Darkest Autumn",
          description: "Ambria Book 1",
          image: "/images/Darkest_Autumn_540x.jpg",
          text:
            "Heroes are supposed to be brave, aren't they? Vetch is training to be a knight in a magical world. But he’s afraid of battle and reluctant to hurt others. Led by a sorcerer, a massive army of men and monsters attack Vetch’s homeland, the land of Ambria. With no idea how far the enemy’s power extends, Vetch struggles against impossible odds to keep himself and those he cares about safe.",
          actions: [
            {
              text: "Available at feldroy.com",
              link:
                "https://www.feldroy.com/products/darkest-autumn-ambria-book-1",
            },
            {
              text: "Available at amazon.com",
              link: "https://2scoops.co/ambria-1",
            },
          ],
        },
        {
          title: "Into the Brambles",
          description: "My first fiction novel!",
          image: "/images/B00VC5UQHO.01.LZZZZZZZ.jpg",
          text:
            "The world was ancient, scarred from a thousand wars between gods, immortals, and heroes. Old grudges have faded but are not forgotten. At the end of a so-called ‘age of peace’, two great nations of immortals march against each other, with humanity caught in the middle. In this world of conflict, three very different individuals are thrust into the face of danger.",
          actions: [
            { text: "Available at amazon.com", link: "https://2scoops.co/itb" },
            {
              text: "Available at feldroy.com",
              link: "https://www.feldroy.com/products/into-the-brambles",
            },
          ],
        },
        {
          title: "Illustrated Guide to Python 3",
          description:
            "A Complete Walkthrough of Beginning Python with Unique Illustrations Showing how Python Really Works",
          image: "/images/1977921752.01.LZZZZZZZ.jpg",
          text:
            "This is an awesome beginner's book. Matt Harrison is the Python instructor who taught me how decorators work. If he could teach me that, then he can get you up to speed on Python. What's really awesome about this book is how he leverages diagrams of what Python is doing so you aren't just learning the commands, you truly learn what they do.",
          actions: [
            {
              text: "Available at Amazon.com",
              link: "https://2scoops.co/illustrated-python",
            },
            {
              text: "Kindle on Amazon",
              link: "https://2scoops.co/illustrated-python-kindle",
            },
          ],
        },
        {
          title: "Lifemart",
          description: "My late father's book of poetry.",
          image: "/images/51Fe5VCp7LL.01.LZZZZZZZ.jpg",
          text:
            "Life provides you with all these opportunities, and you pick and choose the ones that become your experience. Lifemart is a collection of poems by my late father, who lived until he was 84. The poems span eight decades of his life experiences. Rich in description and emotion, they evoke mental images of beauty, faith, sadness, and joy.",
          actions: [
            {
              text: "Available at amazon.com",
              link:
                "https://www.amazon.com/Lifemart-Narratives-Others-Ted-Greenfeld/dp/1521946035/?tag=mlinar-20",
            },
            {
              text: "Kindle on Amazon",
              link:
                "https://www.amazon.com/Lifemart-Narratives-Others-Ted-Greenfeld-ebook/dp/B07495Y33K?tag=mlinar-20",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.changeCurrentBook();
  },
  computed: {
    currentBook() {
      return this.books[this.currentBookIndex];
    },
  },
  methods: {
    changeCurrentBook() {
      setInterval(() => {
        const randomBookIndex = Math.floor(Math.random() * this.books.length);
        this.currentBookIndex = randomBookIndex;
      }, 10000);
    },
  },
};
</script>

<style lang="stylus">
.side-book-card {
  margin-top: 0 !important;

  .card-image {
    width: 300px;
  }
}

.side-title {
  margin: 0px 10px 10px 20px;
}

.aside-transparent {
  opacity: 0.5;
  transition: opacity 0.5s ease;

  &:hover {
    opacity: 1;
  }
}
</style>
