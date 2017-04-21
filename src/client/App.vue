<template>
  <div class="app">
    <app-header :username="username" :usergroup="usergroup" @logout="checkCookie"></app-header>

    <router-view class="container main" :username="username" :usergroup="usergroup" @login="checkCookie"></router-view>
  </div>
</template>

<script src="./App.ts"></script>

<style>
  .app {
    min-height: 100vh;
    background: #f3f3f5;
  }

  .main {
    padding-top: 1rem;
  }
</style>
