<template>
  <aside class="aside-transparent">
    <h4 class="side-title">
      Suggested Book
      <FlagIcon />
    </h4>
    <Card
      :title="twoScoops.title"
      :image="twoScoops.image"
      :text="twoScoops.text"
      :description="twoScoops.description"
      :actions="twoScoops.actions"
      width="100%"
      class="side-book-card"
    />
    <br>
    <br>
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
      twoScoops: {
        title: "Two Scoops of Django",
        description: "for Django 1.11 LTS",
        image: "/images/0692915729.01.LZZZZZZZ.jpg",
        text:
          "Two Scoops of Django is chock-full of material that will help you with your Django projects. Written to support Django 1.11 LTS (Long Term Support), this book won't get outdated until 2020.",
        actions: [
          {
            text: "Available at twoscoopspress.com",
            link: "http://twoscoopspress.com/products/two-scoops-of-django-1-11"
          },
          {
            text: "Available at amazon.com",
            link: "https://2scoops.co/tsd111"
          },
          {
            text: "Buy kindle on amazon.com",
            link: "https://2scoops.co/tsd111kindle"
          }
        ]
      },
      books: [
        {
          title: "Fluent Python",
          description: "Clear, Concise, and Effective Programming",
          image: "/images/1491946008.01.LZZZZZZZ.jpg",
          text:
            "Authored by one of my mentors, Luciano Ramalho, this is an amazing intermediate-to-advanced book that teaches you how to write the best Python that you can. Fluent Python is a huge, deep reference that is a must-have for any Python programmer.",
          actions: [
            { text: "Available at amazon.com", link: "https://2scoops.co/7X" }
          ]
        },
        {
          title: "Django for APIs",
          description: "Build web APIs with Python and Django",
          image: "/images/B07DR9XS6L.01.LZZZZZZZ.jpg",
          text:
            "Another book by William Vincent, this take a modern API-first approach to creating 3 different Django back-ends: a Library API, Todo API, and a Blog API with user authentication, permissions, proper documentation, and more. You'll even learn how to connect them to a React front-end for a truly full-stack web application..",
          actions: [
            {
              text: "Available at Amazon",
              link:
                "https://www.amazon.com/Django-APIs-Build-web-Python/dp/1093633948?tag=mlinar-20"
            },
            {
              text: "Kindle on Amazon",
              link:
                "https://www.amazon.com/REST-APIs-Django-powerful-Python-ebook/dp/B07DR9XS6L/?tag=mlinar-20"
            }
          ]
        },
        {
          title: "Django for Beginners",
          description: "Learn web development with Django",
          image: "/images/1980377898.01.LZZZZZZZ.jpg",
          text:
            'Authored by my friend, William Vincent, Django for Beginners takes you from total beginner to confident Django developer. Proceed step-by-step through five progressively more complex web applications: from a "Hello World" app all the way to a robust Newspaper app with a custom user model, complete user authentication flow, foreign key relationships, and more. Learn current best practices around class-based views, templates, urls, user authentication, testing, and deployment.',
          actions: [
            {
              text: "Available at amazon.com",
              link: "https://2scoops.co/1980377898"
            }
          ]
        },
        {
          title: "Darkest Autumn",
          description: "Ambria Book 1",
          image: "/images/B071L2G8SL.01.LZZZZZZZ.jpg",
          text:
            "Heroes are supposed to be brave, aren't they? Vetch is training to be a knight in a magical world. But he’s afraid of battle and reluctant to hurt others. Led by a sorcerer, a massive army of men and monsters attack Vetch’s homeland, the land of Ambria. With no idea how far the enemy’s power extends, Vetch struggles against impossible odds to keep himself and those he cares about safe.",
          actions: [
            {
              text: "Available at amazon.com",
              link: "https://2scoops.co/ambria-1"
            },
            {
              text: "Available at twoscoopspress",
              link:
                "https://www.twoscoopspress.com/products/darkest-autumn-ambria-book-1"
            }
          ]
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
              text: "Available at twoscoopspress",
              link: "https://www.twoscoopspress.com/products/into-the-brambles"
            }
          ]
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
              text: "Available at amazon.com",
              link: "https://2scoops.co/illustrated-python"
            },
            {
              text: "Kindle on Amazon",
              link: "https://2scoops.co/illustrated-python-kindle"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.changeCurrentBook();
  },
  computed: {
    currentBook() {
      return this.books[this.currentBookIndex];
    }
  },
  methods: {
    changeCurrentBook() {
      setInterval(() => {
        const randomBookIndex = Math.floor(Math.random() * this.books.length);
        this.currentBookIndex = randomBookIndex;
      }, 10000);
    }
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
  opacity: 0.7;
  transition opacity .5s ease;

  &:hover {
    opacity: 1;
  }
}
</style>
