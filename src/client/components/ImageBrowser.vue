<template>
  <div class="image-browser" v-show="src != null">
    <span class="close" @click="close">&times;</span>
    <span class="prev" @click="prev">&lt;</span>
    <img :src="src">
    <span class="next" @click="next">&gt;</span>
  </div>
</template>

<script>
  export { default } from './ImageBrowser';
</script>

<style>
  .image-browser {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1041;
    display: flex;
    width: 100%;
    height: 100%;
    animation: fadeIn .4s ease forwards;
  }

  @keyframes fadeIn {
    100% {
      background: var(--backdrop-color);
    }
  }

  .image-browser img {
    max-width: 70%;
    max-height: 90%;
    margin: auto;
    animation: zoom .4s ease;
  }

  @keyframes zoom {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  .image-browser span {
    position: absolute;
    color: white !important;
    opacity: .4;
    transition: opacity .3s ease;
    cursor: pointer;
    user-select: none;
  }

  .image-browser span:hover {
    opacity: 0.8;
  }

  .image-browser .close {
    top: 0;
    right: 1rem;
    font-size: 4rem;
  }

  .image-browser .prev,
  .image-browser .next {
    top: 50%;
    transform: translateY(-50%);
    font-family: SimSun;
    font-size: 6rem;
  }

  .image-browser .prev {
    left: 2rem;
  }

  .image-browser .next {
    right: 2rem;
  }
</style>
