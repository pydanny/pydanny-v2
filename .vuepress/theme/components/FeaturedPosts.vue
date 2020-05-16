<template>
  <div class="featured-posts">
    <!-- <h3>More Posts like this!</h3>
    <div class="featured-post" v-for="post in posts" :key="post.key">
      <div class="featured-post-body">
        <h3 class="featured-post-title">
          <router-link :to="post.path">{{ post.title }}</router-link>
        </h3>
        <div
          class="featured-post-description"
        >{{ post.frontmatter.description || post.description }}</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import PostFooter from "./PostFooter";

export default {
  computed: {
    posts() {
      const postTags = this.$page.frontmatter.tags;

      if (!postTags) {
        return [];
      }
      return this.$site.pages
        .filter(
          p =>
            p.frontmatter.tags &&
            p.frontmatter.tags.includes(
              postTags[Math.floor(Math.random() * postTags.length)]
            )
        )
        .slice(0, 3);
    }
  }
};
</script>

<style lang="stylus">
.featured-posts {
  margin: 3rem 0;
}
</style>