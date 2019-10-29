<template>
  <div class="ui-post-info">
    <div class="post-info-item">
      <CalendarIcon />
      {{ new Date(date.trim()).toDateString() }}
    </div>
    <div
      class="post-info-item"
      v-if="timeToRead"
    >
      <ClockIcon />
      {{ timeToRead }}
    </div>
    <div
      class="post-info-item"
      v-if="location"
    >
      <NavigationIcon />
      {{ location }}
    </div>
    <div
      class="post-info-tags"
      v-if="tags"
    >
      <div>
        <router-link
          class="blog-tag"
          v-for="(tag, index) in tags"
          :key="index"
          :to="'/tag/' + tag"
        >#{{ tag }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { NavigationIcon, ClockIcon, CalendarIcon } from "vue-feather-icons";
export default {
  components: { NavigationIcon, ClockIcon, CalendarIcon },
  props: ["date", "timeToRead", "location", "tags"]
};
</script>

<style lang="stylus">
.ui-post-info {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.34);
  font-weight: 200;
  padding: 0.6rem 0px 0.6rem 0.6rem;

  div.post-info-item {
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
      width: 17px;
      height: 17px;
    }
  }

  .post-info-tags {
    a.blog-tag {
      font-size: 0.88rem;
      padding: 0 4px;
      display: inline;
      opacity: 0.6;
      margin-right: 0.3rem;
      text-decoration: none;

      &:hover {
        opacity: 1;
      }
    }

    @media (max-width: $MQMobile) {
      display: none;
    }
  }
}
</style>