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
  z-index: 12;
  position: fixed;
  top: 0;
  width: 100vw;
  box-sizing: border-box;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  padding: 15px 20px;
  margin: auto;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.02), 0 6px 6px rgba(0, 0, 0, 0.03);
  transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);

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
  line-height: 40px;
  height: 40px;

  .title {
    /* flex 0 0 200px */
    color: #ccc;
    font-size: 22px;
    margin: 0;
    letter-spacing: 2px;
    display: block;
    text-transform: uppercase;

    a {
      color: #ccc;
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
          color: #ccc;
          text-decoration: none;
          transition: color 0.3s;

          &.nav-link.router-link-exact-active.router-link-active {
            color: $accentColor;
          }
        }
      }
    }

    .search-box {
      margin-left: 20px;

      input {
        border-radius: 20px;
        transition: all 0.5s;
        color: white;
        background: linear-gradient(to right, transparentify(#8e9eab, 60%), transparentify(#eef2f3, 30%));

        &:hover {
          border: 1px solid $accentColor;
          box-shadow: 0 0 5px $accentColor;
        }
      }

      .suggestions {
        border: 1px solid #ccc;
        top: 40px;
        right: 0;

        a {
          color: #555;
          font-family: sans-serif;
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
