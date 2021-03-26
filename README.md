# PyDanny-V2

[![Netlify Status](https://api.netlify.com/api/v1/badges/aa46a235-e9fd-44ab-9f36-9238cc637e4d/deploy-status)](https://app.netlify.com/sites/pydannycom/deploys)

PyDanny.com V2 blog 

## Getting Started

### Installing

navigate to the repository directory

```bash
cd pydanny-v2
```

install dependencies

```bash
yarn install
```

run a development live server

```bash
yarn dev
```

### Blogging

start adding new posts into `pydanny-v2/_posts/**`

## Deployment

1. generate the static files using:

```bash
yarn build
```

2. deploy the content of `.vuepress/dist` to any hosting service, or you can use [netlify](https://www.netlify.com/) for continues deployment.

## Built With

- [vuepress](https://vuepress.vuejs.org/)
- [@vuepress/theme-blog](https://vuepress-theme-blog.ulivz.com/)
- [@vuepress/plugin-blog](https://vuepress-plugin-blog.ulivz.com/)

## Authors

- **Ahmad Mostafa** - _Initial work_ - [z3by](https://github.com/z3by)
- **Daniel Roy Greenfeld**

## License

This project is licensed under the MIT License.
