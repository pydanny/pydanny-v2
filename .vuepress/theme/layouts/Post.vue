<template>
  <div id="vuperess-theme-blog__post-layout">
    <PostHeader />
    <br />
    <hr />
    <main class="vuepress-blog-theme-content">
      <Content />
      <hr />
      <Toc />
      <PostInfo />
      <ClientOnly>
        <Disqus shortname="pydanny" :identifier="identifier" />
      </ClientOnly>
    </main>
  </div>
</template>

<script>
import Toc from "@theme/components/Toc.vue";
import PostInfo from "@theme/components/PostInfo.vue";
import PostHeader from "@theme/components/PostHeader.vue";
import axios from "axios";

export default {
  components: {
    Toc,
    PostInfo,
    PostHeader
  },
  data() {
    return {
      comments: [],
      githubToken: "demo-access-token"
    };
  },
  computed: {
    published() {
      return this.$frontmatter.date.slice(0, 10);
    },
    identifier() {
      return `${this.$frontmatter.slug}.html`
    }
  },
  methods: {
    getComments() {
      axios
        .get(
          `https://api.github.com/search/issues?q=${this.$frontmatter.slug}%20in:title+repo:pydanny/pydanny-v2+label:post`,
          {
            headers: {
              Authorization: `token ${this.githubToken}`
            }
          }
        )
        .then(res => {
          const issue = res.data.items[0] || null;
          const issueExists = issue && issue.title == this.$frontmatter.slug;
          if (issueExists) {
            axios.get(issue.comments_url).then(res => {
              this.comments = res.data;
            });
          }
        });
    }
  },
  created() {
    // this.getComments();
  }
};
</script>

<style lang="stylus">
.vuepress-blog-theme-content {
  font-size: 16px;
  letter-spacing: 0px;
  color: #2c3e50;
  position: relative;
  padding: 5px 50px !important;
  border-radius: 20px;
}

.content__default {
  margin: 20px auto !important;
}

.comments {
  background: white;

  .comment {
    border: 1px solid #eee;
    padding: 0 20px;
    border-radius: 10px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__user-avatar {
      height: 50px;
      margin-right: 10px;
    }

    &__user-name {
      display: flex;
      line-height: 50px;
    }
  }
}
</style>

<style src="prismjs/themes/prism-okaidia.css"></style>

