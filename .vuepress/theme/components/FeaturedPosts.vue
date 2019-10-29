<template>
  <div class="featured-posts">
    <h3>More Posts like this!</h3>
    <div
      class="featured-post"
      v-for="post in posts"
      :key="post.key"
    >
      <div class="featured-post-header">
        <h4 class="featured-post-title">
          <router-link :to="post.path">
            {{ post.title }}
          </router-link>
        </h4>
      </div>
      <div class="featured-post-body">
        <p
          class="featured-post-summary"
          v-if="post.summary"
        >{{ post.summary}}
          <router-link :to="post.path">Read more</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PostFooter from "./PostFooter";

export default {
  computed: {
    posts () {
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

  .featured-post {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 0.2rem 1rem 1.5rem 1rem;
    margin: 1rem auto;
    border-radius: 10px;

    .featured-post-header {
      border-bottom: 1px solid #eee;

      .featured-post-title {
        font-size: 1.3em;
        font-weight: 600;
        margin: 1rem auto 0.5rem auto;

        a {
          text-decoration: none;
        }
      }
    }
  }
}
</style>