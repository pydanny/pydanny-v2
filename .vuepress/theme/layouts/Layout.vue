<template>
  <div>
    <div class="layout-grid">
      <BaseListLayout v-if="$pagination" />
      <Content v-else />
      <Aside />
    </div>
  </div>
</template>

<style src="prismjs/themes/prism-okaidia.css"></style>

<style lang="stylus">
.layout-grid {
  display: grid;
  grid-template-columns: 5fr 2fr;
  grid-gap: 20px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
}
</style>