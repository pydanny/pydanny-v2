<template>
  <div id="vuperess-theme-blog__tags-layout">
    <BlogTags :tags="$frontmatterKey.list" />
  </div>
</template>

<style lang="stylus" scoped>
#vuperess-theme-blog__tags-layout {
  max-width: 700px;
  margin 0 auto;
}
</style>