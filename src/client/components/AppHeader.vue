<template>
  <header class="app-header">
    <img class="logo" src="/favicon.ico" alt="员工交流与协作系统">

    <nav class="header-nav">
      <router-link v-for="route of routes" v-if="route.access" :to="route.path" class="header-nav-link">
        {{route.name}}
      </router-link>
    </nav>

    <span class="header-date">{{today}}</span>
    <span v-if="username">
      你好，{{username}}
      （<router-link to="/setting">设置</router-link>
      <a href="#" @click.prevent="logout">退出</a>）
    </span>
    <span v-else>
      <router-link to="/account">登录</router-link>后可进行更多操作
    </span>
  </header>
</template>

<script>
  export { default } from './AppHeader';
</script>

<style>
  .app-header {
    display: flex;
    align-items: center;
    height: var(--header-height);
    padding: 0 .6rem;
    background: #2e4057;
    color: rgba(255, 255, 255, .6);
    font-size: .875rem;
  }

  .logo {
    height: 100%;
    border-radius: 50%;
    margin-right: 1em;
    transform: translateY(25%);
  }

  .header-nav {
    flex: 1;
    display: flex;
    height: 100%;
  }

  .header-nav-link {
    position: relative;
    line-height: var(--header-height);
    padding: 0 .4em;
    margin: 0 .8em;
    color: inherit;
    transition: color .3s;
  }

  .header-nav .router-link-active,
  .header-nav-link:hover {
    color: #fff;
    text-decoration: none;
  }

  .header-nav-link::after {
    content: "";
    position: absolute;
    bottom: 0%; left: 0;
    width: 100%;
    border-bottom: 2px solid var(--primary-light);
    transform: scaleX(0);
    transition: transform .3s;
  }

  .header-nav-link:hover::after,
  .header-nav .router-link-active::after {
    transform: scaleX(1);
  }

  .header-date {
    margin-right: 1em;
  }
</style>
