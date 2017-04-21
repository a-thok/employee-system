<template>
  <li class="bug-item" :class="{active: activeBugId === bug._id}" :data-state="bug.state">
    <a href="#" class="bug-header" @click="activate($event, bug._id)">
      <h4 class="bug-title" v-html="bug.title"></h4>
      <ul class="bug-tags">
        <li class="tag">{{bug.project}}</li>
        <li class="tag" v-if="bug.category.length">{{bug.category.join(', ')}}</li>
        <li class="tag" :class="{warning: bug.rank === '关键', danger: bug.rank === '紧急'}">{{bug.rank}}</li>
      </ul>
    </a>
    <div class="bug-content">
      <ul class="bug-info">
        <li>
          <span class="bug-label">提交时间：</span>
          <span class="bug-value">{{bug.createdAt.slice(0, 10)}}</span>
        </li>
        <li>
          <span class="bug-label">提交人：</span>
          <span class="bug-value">{{bug.presenter}}</span>
        </li>
        <li>
          <span class="bug-label">解决人：</span>
          <span class="bug-value">{{bug.resolver || '未解决'}}</span>
        </li>
      </ul>
      <p class="bug-desc" v-html="bug.desc"></p>
      <ul class="bug-images">
        <li v-for="(image, index) of bug.images"><img :src="`/${image}`" @click="openImage(index)"></li>
      </ul>
      <div class="bug-btns">
        <button type="button" class="btn primary" v-if="can.modify" @click="goToBug(bug._id)">修改</button>
        <button type="button" class="btn success" v-if="can.resolve" @click="openModal('resolve')">解决</button>
        <button type="button" class="btn warning" v-if="can.undo" @click="openModal('undo')">撤回</button>
        <button type="button" class="btn success" v-if="can.close" @click="openModal('close')">关闭</button>
        <button type="button" class="btn danger" v-if="can.remove" @click="openModal('remove')">删除</button>
      </div>
    </div>
  </li>
</template>

<script>
  export { default } from './BugItem';
</script>

<style>
  .bug-tags,
  .bug-info,
  .bug-images {
    list-style: none;
    padding: 0;
  }

  .bug-item {
    border-left: 2px solid;
    margin-bottom: .6em;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .08);
    transition: box-shadow .2s;
  }

  .bug-item:hover {
    box-shadow: 0 1px 10px rgba(108, 125, 142, .3);
  }

  .bug-item[data-state="1"] {
    border-color: var(--primary);
  }

  .bug-item[data-state="2"] {
    border-color: var(--warning);
  }

  .bug-item[data-state="3"] {
    border-color: var(--success);
  }


  /* header */
  .bug-header {
    position: relative;
    display: block;
    padding: .8em 4.5em .8em 1.5em;
    color: inherit;
  }

  .bug-header:hover {
    text-decoration: none;
  }

  .bug-header::before,
  .bug-header::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 13px;
    height: 2px;
    background: var(--primary);
    transition: transform .3s;
  }

  .bug-header::before {
    right: 32px;
    transform: rotate(45deg);
  }

  .active .bug-header::before {
    transform: rotate(-45deg);
  }

  .bug-header::after {
    right: 24px;
    transform: rotate(-45deg)
  }

  .active .bug-header::after {
    transform: rotate(45deg);
  }

  .bug-title {
    font-weight: normal;
  }


  /* content */
  .bug-content {
    height: 0;
    padding: 0 1.5em;
    overflow: hidden;
    transition: height .3s;
    font-size: .875em;
  }

  .active .bug-content {
    height: auto;
  }

  .bug-info {
    display: flex;
    margin-bottom: .8em;
  }

  .bug-info > li {
    flex: 1;
  }

  .bug-label {
    color: var(--fade);
  }

  .bug-desc {
    white-space: pre-wrap;
  }

  .bug-images {
    display: flex;
    margin-bottom: .6em;
  }

  .bug-images li:not(:first-child) {
    margin-left: .8em;
  }

  .bug-images img {
    --size: 65px;

    display: block;
    width: var(--size);
    height: var(--size);
    border: 2px solid var(--fade-light);
    cursor: pointer;
    transition: border-color .3s;
  }

  .bug-images img:hover {
    border-color: var(--primary-light);
  }

  .bug-btns {
    text-align: right;
    padding-bottom: 1.875em;
  }

  .bug-btns .btn {
    margin-left: .4em;
  }

  .highlight {
    color: var(--danger-dark);
  }
</style>
