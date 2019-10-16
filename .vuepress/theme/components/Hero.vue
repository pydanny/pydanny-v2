<template>
  <header id="header-hero">
    <div class="waveWrapper waveAnimation">
      <div class="waveWrapperInner bgTop">
        <div
          class="wave waveTop"
          style="background-image: url('http://front-end-noobs.com/jecko/img/wave-top.png')"
        >
          <h1>{{$site.title}}</h1>
          <h2>{{$site.description}}</h2>
        </div>
      </div>
      <div class="waveWrapperInner bgMiddle">
        <div
          class="wave waveMiddle"
          style="background-image: url('http://front-end-noobs.com/jecko/img/wave-mid.png')"
        ></div>
      </div>
      <div class="waveWrapperInner bgBottom">
        <div
          class="wave waveBottom"
          style="background-image: url('http://front-end-noobs.com/jecko/img/wave-bot.png')"
        ></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="stylus">
header#header-hero {
  h1 {
    color: white;
    font-size: 4rem;
    margin: 0;
    font-family: serif;
    position: absolute;
    top: 30vh;
    left: 25vw;

    @media (max-width: $MQMobile) {
      font-size: 3rem;
    }
  }

  h2 {
    color: lighten($accentColor, 80%);
    font-weight: 400;
    border: none;
    position: absolute;
    top: 38vh;
    left: 35vw;

    @media (max-width: $MQMobile) {
      font-size: 1rem;
      left: 15vw;
    }
  }

  @keyframes move_wave {
    0% {
      transform: translateX(0) translateZ(0) scaleY(1);
    }

    50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.55);
    }

    100% {
      transform: translateX(-50%) translateZ(0) scaleY(1);
    }
  }

  .waveWrapper {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: -1px;
    height: $headerHeight;
    margin: 0 auto;
  }

  .waveWrapperInner {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    bottom: -1px;
    background-image: linear-gradient(to bottom, darken(#355c7d, 30%), #6c5b7b, #c06c84);
  }

  .bgTop {
    z-index: 15;
    opacity: 0.5;
  }

  .bgMiddle {
    z-index: 10;
    opacity: 0.75;
  }

  .bgBottom {
    z-index: 5;
  }

  .wave {
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
  }

  .waveTop {
    background-size: 50% 100px;
  }

  .waveAnimation .waveTop {
    animation: move-wave 3s;
    -webkit-animation: move-wave 3s;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }

  .waveMiddle {
    background-size: 50% 120px;
  }

  .waveAnimation .waveMiddle {
    animation: move_wave 10s linear infinite;
  }

  .waveBottom {
    background-size: 50% 100px;
  }

  .waveAnimation .waveBottom {
    animation: move_wave 15s linear infinite;
  }
}
</style>