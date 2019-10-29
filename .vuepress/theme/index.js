const removeMd = require("remove-markdown");

module.exports = (themeConfig, ctx) => {
  themeConfig = Object.assign(themeConfig, {
    summary: !!themeConfig.summary,
    summaryLength:
      typeof themeConfig.summaryLength === "number"
        ? themeConfig.summaryLength
        : 300,
    pwa: !!themeConfig.pwa
  });

  const defaultBlogPluginOptions = {
    directories: [
      {
        id: "post",
        dirname: "_posts",
        path: "/",
        // layout: 'IndexPost', defaults to `Layout.vue`
        itemLayout: "Post",
        frontmatter: { title: "Daniel Roy Greenfeld" },
        itemPermalink: "/:slug.html",
        pagination: {
          lengthPerPage: 20
        }
      }
    ],
    frontmatters: [
      {
        id: "tag",
        keys: ["tag", "tags"],
        path: "/tag/",
        // layout: 'Tag',  defaults to `FrontmatterKey.vue`
        frontmatter: { title: "Tag" },
        pagination: {
          lengthPerPage: 5
        }
      }
    ]
  };

  const { modifyBlogPluginOptions } = themeConfig;

  const blogPluginOptions =
    typeof modifyBlogPluginOptions === "function"
      ? modifyBlogPluginOptions(defaultBlogPluginOptions)
      : defaultBlogPluginOptions;

  const plugins = [
    "@vuepress/plugin-nprogress",
    "@vuepress/back-to-top",
    "smooth-scroll",
    "reading-progress",
    ["@vuepress/medium-zoom", true],
    [
      "@vuepress/search",
      {
        searchMaxSuggestions: 10
      }
    ],
    ["@vuepress/blog", blogPluginOptions]
  ];

  if (themeConfig.pwa) {
    plugins.push([
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]);
  }

  const config = {
    plugins,
    define: {
      THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
        ? themeConfig.paginationComponent
        : "Pagination"
    }
  };

  /**
   * Generate summary.
   */
  if (themeConfig.summary) {
    config.extendPageData = function (pageCtx) {
      const strippedContent = pageCtx._strippedContent;
      if (!strippedContent) {
        return;
      }
      pageCtx.summary =
        removeMd(
          strippedContent
            .trim()
            .replace(/^#+\s+(.*)/, "")
            .slice(0, themeConfig.summaryLength)
        ) + " ...";
    };
  }

  return config;
};
