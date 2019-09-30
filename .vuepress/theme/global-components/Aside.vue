<template>
  <aside>
    <Card
      :title="book.title"
      :image="book.image"
      :text="book.text"
      :description="book.description"
      :actions="book.actions"
      width="100%"
      class="side-book-card"
    />
  </aside>
</template>

<script>
export default {
  data() {
    return {
      book: {
        title: "Two Scoops of Django",
        description: "for Django 1.11 LTS",
        image: "/images/0692915729.01.LZZZZZZZ.jpg",
        text:
          "Two Scoops of Django is chock-full of material that will help you with your Django projects. Written to support Django 1.11 LTS (Long Term Support), this book won't get outdated until 2020.",
        actions: [
          {
            text: "Buy on twoscoopspress.com",
            link: "http://twoscoopspress.com/products/two-scoops-of-django-1-11"
          },
          { text: "Buy on amazon.com", link: "https://2scoops.co/tsd111" },
          {
            text: "Buy kindle on amazon.com",
            link: "https://2scoops.co/tsd111kindle"
          }
        ]
      }
    };
  }
};
</script>

<style lang="stylus">
.side-book-card {
  .card-image {
    width 300px;
  }
}
</style>
