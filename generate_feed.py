"""
generate_feed.py

Usage:

    python generate_feed.py TAGHERE

Note:

    Works with Python 3.8, untested otherwise.
"""

import sys
from glob import glob

try:
    from feedgen.feed import FeedGenerator
    from markdown2 import Markdown
    from yaml import safe_load
except ImportError:
    print("You need to install pyyaml, feedgen, and markdown2")
    sys.exit(1)


if __name__ == "__main__":

    try:
        tag = sys.argv[1]
    except IndexError:
        print('Add a tag argument such as "python"')
        sys.exit(1)

    # TODO - convert to argument
    YEARS = [
        "2020",
        "2021"
    ]

    markdowner = Markdown(extras=["fenced-code-blocks", ])

    fg = FeedGenerator()
    fg.language('en')
    fg.id("https://daniel.roygreenfeld.com/")
    fg.title("pydanny")
    fg.author(
        {
            "name": "Daniel Roy Greenfeld",
            "email": "daniel.roy.greenfeld@roygreenfeld.com",
        }
    )
    fg.link(href="https://daniel.roygreenfeld.com", rel="alternate")
    fg.logo("https://daniel.roygreenfeld.com/images/personalPhoto.png")
    fg.subtitle("Inside the Head of Daniel Roy Greenfeld")
    fg.link(href=f"https://daniel.roygreenfeld.com/feeds/{tag}.atom.xml", rel="self")
    # https://daniel.roygreenfeld.com/feeds/python.atom.xml
    fg.language("en")

    years = [f"_posts/posts{x}/*.md" for x in YEARS]
    years.sort()
    years.reverse()

    def read_post(filename):
        with open(filename) as f:
            raw = f.read()[3:]

        config = safe_load(raw[: raw.index("---")])
        content = raw[raw.index("---") + 3 :]

        return config, content

    feed = []

    for year in years:
        posts = glob(year)
        posts.sort()
        posts.reverse()
        for post in posts:
            config, content = read_post(post)
            if tag not in config["tags"]:
                continue

            # add the metadata
            print(config["title"])
            entry = fg.add_entry()
            entry.id(f'https://daniel.roygreenfeld.com/{config["slug"]}.html')
            # entry.link(href=f'https://daniel.roygreenfeld.com/feeds/{config["slug"]}.html')
            entry.title(config["title"])
            entry.description(config["description"])
            entry.pubDate(config["date"])
            entry.updated(config["date"])

            # Add the content
            content = markdowner.convert(content)
            entry.content(content, type="html")

    # print(fg.atom_str(pretty=True))
    fg.atom_file(f".vuepress/public/feeds/{tag}.atom.xml")
