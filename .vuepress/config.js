module.exports = {
  title: "PyDanny",
  description: "Inside the head of Daniel Roy Greenfeld",
  theme: "@vuepress/theme-blog",
  themeConfig: {
    fullName: "Daniel Roy greenfeld",
    personalPhoto: "/images/personalPhoto.png",
    bio:
      "I do Python, Django, and JavaScript out of Los Angeles, California. I love to read, write, hang out with my wife, and play at Capoeira and Brazilian Jiu-Jitsu. I am a total Space and NASA Geek. I used to attend lots of software industry events, but these days I go to perhaps one per year. I've written a few books and courses.",
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
    ["disqus"]
  ]
};
