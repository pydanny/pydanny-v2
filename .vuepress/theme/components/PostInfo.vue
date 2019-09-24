<template>
  <div>
    <br />
    <div class="blog-tags">
      <router-link v-for="tag in $frontmatter.tags" :to="'/tag/' + tag" class="blog-tag md">#{{ tag }}</router-link>
    </div>
    <h3 class="ui header">Follow Me!</h3>
    <p>
      If you read this far, you might want to follow me on
      <a
        href="https://twitter.com/pydanny"
      >twitter</a> or
      <a href="https://github.com/pydanny">github</a>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped></style>