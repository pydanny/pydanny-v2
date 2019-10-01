<template>
  <header id="header-hero">
    <h1>{{$site.title}}</h1>
    <h2>{{$site.description}}</h2>
  </header>
</template>

<script>
export default {};
</script>

<style lang="stylus">
header#header-hero {
  background: #666 url('/images/photo-1436891620584-47fd0e565afb.jpeg');
  height: 400px;
  background-size: cover;
  background-attachment: fixed;
  background-blend-mode: multiply;
  background-position-y: 100%;
  margin-top: -50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;

  h1 {
    color: lighten($accentColor, 70%);
    font-size: 4rem;
    margin-bottom: 0;

    @media (max-width: $MQMobile) {
      font-size: 3rem;
    }
  }

  h2 {
    color: lighten($accentColor, 20%);
    font-weight: 400;
    border: none;
    @media (max-width: $MQMobile) {
      font-size: 1rem;
    }
  }
}
</style>