const _ = require("lodash");

const feed_options = {
  canonical_base: "https://pydanny.com",
  id: "https://pydanny.com/",
  sort: entries => _.reverse(_.sortBy(entries, "date")),
  author: {
    name: "Daniel Roy Greenfeld",
    email: "pydanny@gmail.com",
    link: "https://pydanny.com"
  }
};

module.exports = {
  title: "PyDanny",
  description: "Inside the head of Daniel Roy Greenfeld",
  theme: "@vuepress/theme-blog",
  themeConfig: {
    fullName: "Daniel Roy greenfeld",
    personalPhoto: "/images/personalPhoto.png",
    bio: `I do Python, Django, and JavaScript out of Los Angeles, California.
    I love to read, write, hang out with my wife, and play with my daughter.
    For physical activity, I enjoy Brazilian Jiu-Jitsu and cycling.
    I am a total Space and NASA Geek. I attend lots of software industry events.
    I've also written a few books and courses.`,
    nav: [
      { text: "Home", link: "/" },
      { text: "Tags", link: "/tag/" },
      { text: "Python", link: "/tag/python/" },
      { text: "Django", link: "/tag/django/" },
      { text: "Books", link: "/pages/books/" },
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
        },
        {
          type: "feed",
          link: "/feed.atom"
        }
      ],
      copyright: [
        {
          text: `Content Copyright © 2012-${new Date().getFullYear()} Daniel Roy Greenfeld.`,
          link: ""
        }
      ]
    },
    summary: true,
  },
  plugins: [
    [
      "sitemap",
      {
        hostname: "https://www.pydanny.com"
      }
    ],
    ["disqus"],
    ["feed", feed_options],
    ["reading-time"]
  ]
};
