<template>
  <div id="vuperess-theme-blog__post-layout">
    <PostHeader />
    <br>
    <br>
    <main class="vuepress-blog-theme-content">
      <Content />
    </main>
    <Toc />
    <PostInfo />
  </div>
</template>

<script>
import Toc from "@theme/components/Toc.vue";
import PostInfo from "@theme/components/PostInfo.vue";
import PostHeader from "@theme/components/PostHeader.vue";

export default {
  components: {
    Toc,
    PostInfo,
    PostHeader
  },
  computed: {
    published() {
      return this.$frontmatter.date.slice(0, 10);
    }
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
</style>

<style src="prismjs/themes/prism-okaidia.css"></style>

