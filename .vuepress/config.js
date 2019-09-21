module.exports = {
  title: "PyDanny",
  description: "inside the head of PyDanny",
  theme: "@vuepress/theme-blog",
  themeConfig: {
    nav: [
      { text: "Blog", link: "/" },
      { text: "Tags", link: "/tag/" },
      { text: "Python", link: "/tag/python/" },
      { text: "Django", link: "/tag/django/" },
      { text: "Books", link: "/pages/books/" },
      { text: "Courses", link: "/pages/courses/" },
      { text: "About", link: "/pages/about/" }
    ],
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/pydanny"
        },
        {
          type: "twitter",
          link: "https://twitter.com/pydanny"
        },
        {
          type: "linkedin",
          link: "https://www.linkedin.com/in/pydanny/"
        }
      ]
    }
  }
};
