from feedgen.feed import FeedGenerator
from glob import glob
from yaml import safe_load

TAG = 'django'

YEARS = ['2020', ]



fg = FeedGenerator()
fg.id('https://daniel.roygreenfeld.com/')
fg.title('pydanny')
fg.author( {'name':'Daniel Roy Greenfeld','email':'daniel.roy.greenfeld@roygreenfeld.com'} )
fg.link( href='https://daniel.roygreenfeld.com', rel='alternate' )
fg.logo('https://daniel.roygreenfeld.com/images/personalPhoto.png')
fg.subtitle('Inside the Head of Daniel Roy Greenfeld')
fg.link( href=f'https://daniel.roygreenfeld.com/atom.{TAG}.xml', rel='self' )
fg.language('en')

years = [f'_posts/posts{x}/*.md' for x in YEARS]
years.sort()
years.reverse()



def read_post(filename):
    with open(filename) as f:
        raw = f.read()[3:]
    
    config = safe_load(raw[:raw.index('---')])
    content = raw[raw.index('---')+3:]
    
    return config, content

feed = []

for year in years:
    posts = glob(year)
    posts.sort()
    posts.reverse()
    for post in posts:
        config, content = read_post(post)
        if TAG not in config['tags']:
            continue
        print(config['title'])
        entry = fg.add_entry()
        entry.id(f'https://daniel.roygreenfeld.com/{config["slug"]}.html')
        entry.title(config['title'])
        entry.description(config['description'])
        entry.pubDate(config['date'])
        entry.content(content, type="html")

print(fg.atom_str(pretty=True))
fg.atom_file(f'.vuepress/public/atom.{TAG}.xml')