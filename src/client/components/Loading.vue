<template>
  <div class="loading" :class="{active: active}">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
  export { default } from './Loading';
</script>

<style>
  .loading {
    --height: 80px;
    --itemWidth: 13px;

    width: 150px;
    height: 0;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    transition: height .3s ease;
  }

  .loading.active {
    height: var(--height);
  }

  .loading span {
    position: absolute;
    width: var(--itemWidth);
    height: var(--itemWidth);
    margin: calc((var(--height) - var(--itemWidth)) / 2) 0;
    border-radius: 50%;
    background: lightgreen;
    animation: load 1.04s ease-in infinite alternate;
  }

  @keyframes load {
    0%{
      opacity: 1;
      transform: translate(0px);
    }
    100%{
      opacity: 0.2;
      transform: translate(150px);
    }
  }

  .loading span:nth-child(1) {
    animation-delay:0.13s;
  }

  .loading span:nth-child(2) {
    animation-delay:0.26s;
  }

  .loading span:nth-child(3) {
    animation-delay:0.39s;
  }

  .loading span:nth-child(4) {
    animation-delay:0.52s;
  }

  .loading span:nth-child(5) {
    animation-delay:0.65s;
  }
</style>
