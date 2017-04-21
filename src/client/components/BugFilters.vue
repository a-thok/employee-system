<template>
  <div class="bug-filter">
    <ul class="filter-section" v-for="filter of filters">
      <li
        v-for="item of filter.items" class="filter-item" :class="{active: item.value === queries[filter.prop]}"
        @click="changeFilter($event, filter.prop, item.value)"
      >{{item.name}}</li>
    </ul>
    <div class="filter-section search">
      <input
        type="search" class="input bug-search" placeholder="输入关键词"
        v-model="queries.keyword" @keydown.enter="search($event)"
      >
    </div>

    <ul class="filter-section projects" :class="{active: switched}">
      <li
        v-for="item of projectFilter.items" class="filter-item" :class="{active: item.value === queries.project}"
        @click="changeFilter($event, 'project', item.value)"
      >{{item.name}}</li>
    </ul>

    <i class="switcher" :class="{active: switched}" @click="switchFilter"></i>
  </div>
</template>

<script>
  export { default } from './BugFilters';
</script>

<style>
  .bug-filter {
    position: relative;
    display: flex;
    align-items: center;
    padding: .4em 0;
    border-radius: .25em;
    margin: 0 auto 1rem;
    background: var(--fade-dark);
    font-size: .875rem;
    overflow: hidden;
  }

  .filter-section {
    display: flex;
    justify-content: space-around;
    padding: 0 .8em;
    margin: 0;
    list-style: none;
  }

  .filter-section:not(.search) {
    flex: 1;
    color: rgba(255, 255, 255, .5);
  }

  .filter-section:not(:last-child) {
    border-right: 1px solid #666b61;
  }

  .input.bug-search {
    width: 10rem;
    padding: .4em 1em;
    border: 0;
  }

  .filter-item {
    padding: .4em .6em;
    border-radius: .25em;
    cursor: pointer;
    transition: background .3s, color .3s .1s;
  }

  .filter-item:not(.active):hover {
    background: rgba(255, 255, 255, .1);
  }

  .filter-item.active {
    color: #fff;
  }

  /* projects */
  .projects {
    position: absolute;
    top: 0; left: 0;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--primary-light);
    transform: translateY(-100%);
    border: 0 !important;
    transition: transform .3s .2s;
    color: rgba(255, 255, 255, .5);
  }

  .projects > li {
    opacity: 0;
    transform: translateY(-50%);
    transition: all .3s;
  }

  .projects.active {
    transform: translate(0);
    transition: transform .3s;
  }

  .projects.active > li {
    opacity: 1;
    transform: translateY(0);
    transition: all .3s .2s;
  }

  /* filter switcher */
  .bug-filter .switcher {
    align-self: stretch;
  }

  .switcher {
    position: relative;
    width: 50px;
    cursor: pointer;
  }

  .switcher::before,
  .switcher::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 10px;
    height: 3px;
    background: #fff;
    transition: all .3s;
  }

  .switcher::before {
    right: 22px;
    transform: rotate(45deg);
  }

  .switcher::after {
    right: 16px;
    transform: rotate(-45deg)
  }

  .switcher.active::before {
    width: 14px;
    right: 16px;
    transform: rotate(-225deg);
  }

  .switcher.active::after {
    width: 14px;
    transform: rotate(-135deg);
  }
</style>
