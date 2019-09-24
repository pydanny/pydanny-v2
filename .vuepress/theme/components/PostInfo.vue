<template>
  <div>
    <p>Published: {{ $frontmatter.date }}</p>
    <h3>Tags:</h3>
    <ul class="blog-tags">
      <li v-for="t in $frontmatter.tags" class="blog-tag">
        <a :href="`/tag/${t}`">#{{ t }}</a>
      </li>
    </ul>
    <hr />
    <h3 class="ui header">Subscribe!</h3>
    <p>
      If you read this far, you might want to follow me on
      <a
        href="https://twitter.com/pydanny"
      >twitter</a> or
      <a href="https://github.com/pydanny">github</a> and subscribe via email
      below (I'll email you new articles when I publish them).
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>

</style>