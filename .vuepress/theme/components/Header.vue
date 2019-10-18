<template>
  <section id="header-wrapper">
    <header id="header">
      <div class="header-wrapper">
        <div class="title">
          <NavLink link="/" class="home-link">{{ $site.title }}</NavLink>
        </div>
        <div class="header-right-wrap">
          <ul class="nav" v-if="$themeConfig.nav">
            <li class="nav-item" v-for="item in $themeConfig.nav">
              <NavLink :link="item.link">{{ item.text }}</NavLink>
            </li>
          </ul>
          <SearchBox />
        </div>
      </div>
    </header>
  </section>
</template>

<script>
import SearchBox from "@SearchBox";

export default {
  components: { SearchBox }
};
</script>

<style lang="stylus">
@import '~@app/style/config';

#header {
  z-index: 20;
  position: fixed;
  top: 0;
  width: 100vw;
  box-sizing: border-box;
  background: linear-gradient(to right, #355c7d, #6c5b7b, #c06c84);
  padding: 15px 20px;
  margin: 0 auto;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.02), 0 6px 6px rgba(0, 0, 0, 0.03);
  transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: $navbarHeight;

  ol, ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04), 0 6px 6px rgba(0, 0, 0, 0.08);
  }
}

// border-bottom 5px solid lighten(#3eaf7c, 50%)
.header-wrapper {
  display: flex;
  line-height: 50px;
  height: 100%;

  .title {
    /* flex 0 0 200px */
    color: #ccc;
    font-size: 22px;
    margin: 0;
    letter-spacing: 2px;
    display: block;
    text-transform: uppercase;

    a {
      color: lighten($accentColor, 80%);
      font-weight: bold;
      text-decoration: none;
    }
  }

  .header-right-wrap {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .nav {
      flex: 0 0 auto;
      display: flex;
      margin: 0;
      align-items: center;

      .nav-item {
        margin-left: 20px;

        a {
          font-size: 18px;
          color: lighten($accentColor, 40%);
          text-decoration: none;
          transition: color 0.3s;

          &:hover {
            color: lighten($accentColor, 80%);
          }

          &.nav-link.router-link-exact-active.router-link-active {
            color: lighten($accentColor, 80%);
          }
        }
      }
    }

    .search-box {
      margin-left: 20px;

      input {
        min-width: 100px;
        border-radius: 20px;
        transition: all 0.5s;
        color: $accentColor;

        &:hover {
          border: 1px solid $accentColor;
          box-shadow: 0 0 5px $accentColor;
        }
      }

      .suggestions {
        top: 40px;
        right: 0;
        font-size: 0.9em;
        opacity: 0.9;
        border: none;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);

        a {
          color: #555;
          font-weight: 400;
          text-decoration: none;

          &.focused {
            color: $accentColor;
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  #header {
    display: none;
  }

  .header-wrapper {
    flex-direction: column;

    .header-right-wrap {
      display: none;
    }
  }
}
</style>
