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
  title: "Daniel Feldroy",
  description: "Inside the head of Daniel Feldroy nee Roy Greenfeld",
  theme: "@vuepress/theme-blog",
  themeConfig: {
    fullName: "Daniel Roy greenfeld",
    personalPhoto: "/images/personalPhoto.png",
    bio: `I do Python, JavaScript, and C# out of Los Angeles, California.
      I love to read, write, hang out with my wife, and play with my daughter.
      For physical activity, I enjoy Brazilian Jiu-Jitsu and cycling.
      I am a total Space and NASA Geek. I attend lots of software industry events.
      I also write books.`,
    nav: [
      { text: "Home", link: "/" },
      { text: "Tags", link: "/tag/" },
      { text: "Books", link: "/pages/books/" },
      { text: "About", link: "/pages/about/" },
      { text: "Feldroy", link: "https://feldroy.com/" }
    ],
    footer: {
      contact: [
        {
          type: "youtube",
          link: "https://youtube.com/c/danielfeldroy"
        },
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
      ],
      copyright: [
        {
          text: `Content Copyright © 2012-${new Date().getFullYear()} Daniel Roy Greenfeld.`,
          link: ""
        }
      ]
    }
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
