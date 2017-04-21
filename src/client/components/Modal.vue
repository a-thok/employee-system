<template>
  <div class="modal-backdrop" :class="{active: active}" @click="$emit('close')">
    <div class="modal" @click.stop>
      <div class="modal-content">
        <slot></slot>
      </div>
      <ul class="modal-btn">
        <button @click="$emit('confirm')">确认</button>
        <button @click="$emit('close')">取消</button>
      </ul>
    </div>
  </div>
</template>

<script>
  export { default } from './Modal';
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: 1;
    background: var(--backdrop-color);
    transition: opacity .3s 0s, visibility 0s 0s;
  }

  .modal-backdrop:not(.active) {
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s 0s, visibility 0s .3s;
  }

  .modal {
    width: 400px;
    border-radius: .25em;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
    transform: translateY(4rem);
    transition: transform .3s;
  }

  .active .modal {
    transform: translateY(8rem);
  }

  .modal-content {
    padding: 2.8em 1em;
    color: var(--fade);
    font-size: .9375rem;
    text-align: center;
  }

  .modal-btn {
    display: flex;
    padding: 0;
    margin: 0;
  }

  .modal-btn button {
    flex-basis: 50%;
    height: 60px;
    border: 0;
    background: #b6bece;
    color: #fff;
    font-size: .9375em;
    cursor: pointer;
  }

  .modal-btn button:first-child {
    background: var(--danger);
  }
</style>
