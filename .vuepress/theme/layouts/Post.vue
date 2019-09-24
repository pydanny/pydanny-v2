<template>
  <div id="vuperess-theme-blog__post-layout">
    <Content class="vuepress-blog-theme-content" />
    <Toc />
    <PostInfo />
  </div>
</template>

<script>
import Toc from "@theme/components/Toc.vue";
import PostInfo from "@theme/components/PostInfo.vue";

export default {
  components: {
    Toc,
    PostInfo
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
}
</style>

<style src="prismjs/themes/prism-okaidia.css"></style>

