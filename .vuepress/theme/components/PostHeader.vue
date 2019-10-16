<template>
  <div class="post-header">
    <div class="post-header__head">
      <img src="/images/personalPhoto.png" alt="Daniel Roy Greenfeld" />
      <div>
        <h1 class="post-header__title">{{ $frontmatter.title }}</h1>
        <h2 class="post-header__description">{{ $frontmatter.description }}</h2>
        <div class="post-header__info">
          <span>
            <CalendarIcon />
            <span>{{ new Date($frontmatter.date.trim()).toDateString() }}</span>
          </span>
          <span>
            <ClockIcon />
            <span>{{ $page.readingTime.text }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { ClockIcon, CalendarIcon } from "vue-feather-icons";

export default {
  components: { ClockIcon, CalendarIcon }
};
</script>

<style lang="stylus">
.post-header {
  .post-header__head {
    display: flex;
    justify-content: center;

    img {
      width: 10rem;
      margin-right: 3rem;
    }
  }

  .post-header__title {
    margin-top: 0;
    margin-bottom: 0;
    font-family: serif;
    font-size: 2.5rem;
  }

  .post-header__description {
    color: lighten(grey, 50%);
    margin-top: 0;
    border: none;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .post-header__info {
    color: $accentColor;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px;
    font-size: 12px;

    span {
      display: flex;
      align-items: center;
      margin-right: 10px;

      svg {
        margin-right: 10px;
      }
    }
  }
}
</style>