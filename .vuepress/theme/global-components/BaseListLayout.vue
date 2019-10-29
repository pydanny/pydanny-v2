<template>
  <div
    id="base-list-layout"
    align="center"
  >
    <div
      class="ui-posts"
      align="left"
    >
      <h1 v-if="$route.meta.pid && $route.meta.pid !== 'post'">
        Latest
        <span class="hilight">#{{ $route.meta.id }}</span> Posts
      </h1>
      <h1 v-else>Latest Posts</h1>

      <div
        class="ui-post"
        v-for="page in pages"
        :key="page.key"
      >
        <div class="ui-post-header">
          <h3 class="ui-post-title">
            <router-link :to="page.path">{{ page.title }}</router-link>
          </h3>
          <h5 class="ui-post-description">{{ page.frontmatter.description }}</h5>
        </div>
        <div class="ui-post-body">
          <p
            class="ui-post-summary"
            v-if="page.summary"
          >{{ page.summary }}
            <router-link :to="page.path">Read more</router-link>
          </p>
        </div>
        <hr />
        <PostFooter
          :date="page.frontmatter.date"
          :timeToRead="page.readingTime.text"
          :location="page.frontmatter.location"
          :tags="page.frontmatter.tags.slice(0,3)"
        />
      </div>
    </div>

    <component
      v-if="$pagination.length > 1 && paginationComponent"
      :is="paginationComponent"
    ></component>
  </div>
</template>

<script>
/* global THEME_BLOG_PAGINATION_COMPONENT */

import Vue from "vue";
import PostFooter from "../components/PostFooter";
import {
  Pagination,
  SimplePagination
} from "@vuepress/plugin-blog/lib/client/components";

export default {
  components: { PostFooter },

  data () {
    return {
      paginationComponent: null
    };
  },

  created () {
    this.paginationComponent = this.getPaginationComponent();
  },

  computed: {
    pages () {
      return this.$pagination.pages;
    }
  },

  methods: {
    getPaginationComponent () {
      const n = THEME_BLOG_PAGINATION_COMPONENT;
      if (n === "Pagination") {
        return Pagination;
      }

      if (n === "SimplePagination") {
        return SimplePagination;
      }

      return Vue.component(n) || Pagination;
    }
  }
};
</script>

<style lang="stylus">
.common-layout {
  .content-wrapper {
    padding-bottom: 80px;
  }
}

header.home-hero {
  height: 600px;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    color: white;
    margin: 0;
    font-size: 4em;

    @media (max-width: 600px) {
      font-size: 2em;
    }
  }

  h3 {
    color: darken(white, 9%);
    margin-top: 0;
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
    font-weight: 300;
  }
}

.ui-posts {
  max-width: 800px;

  h1 {
    font-family: serif;

    .hilight {
      font-family: Arial, Helvetica, sans-serif;
      color: $accentColor;
    }
  }
}

.ui-post {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  padding: 0.5rem;
  padding-top: 15px;
  margin-bottom: 25px;
  border-radius: 14px;
  border-bottom: 1px solid #f1f1f1;
  background-color: #FFF;

  &:hover {
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);

    .ui-post-summary {
      color: lighten(slategray, 10%);
    }
  }

  &:last-child {
    border-bottom: 0px;
    margin-bottom: 0px;
  }

  p {
    margin: 0;
  }
}

.ui-post-header {
  padding: 0.3rem 0.8rem;
}

.ui-post-summary {
  color: lighten(slategray, 30%);
}

.ui-post-body {
  padding: 15px;

  .post-info-tags {
    a {
      margin-right: 0.3rem;
      text-decoration: none;
    }
  }
}

.ui-post-image {
  height: 200px;
  background-size: cover;
  margin-bottom: 15px;
  border-radius: 10px;
}

h3.ui-post-title {
  font-size: 1.3em;
  font-family: sans-serif !important;
  font-weight: bolder;
  border-bottom: 0;
  margin: 0;

  a {
    cursor: pointer;
    color: $accentColor;
    transition: all 0.2s;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.ui-post-description {
  font-size: 1rem;
  margin-bottom: 0px;
  margin-top: 0.4rem;
  color: lighten($accentColor, 50%);
  font-weight: 200;
}

.ui-post-author {
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.84);
  margin-bottom: 3px;
  font-weight: 400;

  svg {
    margin-right: 5px;
    width: 14px;
    height: 14px;
  }
}
</style>

<style src="prismjs/themes/prism-okaidia.css"></style>


