<template>
  <div>
    <bug-filters :queries="queries" @changeFilter="changeFilter"></bug-filters>

    <loading :active="loading"></loading>

    <ul class="bug-list" v-if="!error">
      <bug-item v-for="bug of bugs"
        :bug="bug" :username="username" :usergroup="usergroup" :activeBugId="activeBugId"
        @activate="changeActiveBug" @openImage="openImage" @openModal="openModal"
      >
      </bug-item>
    </ul>

    <div class="alert danger center" v-if="error">{{error}}</div>

    <footer class="bug-pager">
      <pager :currentPage="queries.page" :size="queries.size" :total="total" @goToPage="fetchBugs"></pager>
    </footer>

    <image-browser :index="activeImageIndex" :src="imageSrc" :total="totalImage" @changeImage="changeImage"></image-browser>


    <modal :active="modals.resolve" @confirm="updateState({ state: 2, message })" @close="closeModal">
      <textarea class="input block" rows="2" placeholder="请填写解决当前问题所做的操作" v-model="message"></textarea>
    </modal>

    <modal :active="modals.undo" @confirm="updateState({ state: 1 })" @close="closeModal">
      <template>将问题重置为未解决状态，确定要继续？</template>
    </modal>

    <modal :active="modals.close" @confirm="updateState({ state: 3 })" @close="closeModal">
      <template>审核通过并关闭问题，确定要继续？</template>
    </modal>

    <modal :active="modals.remove" @confirm="remove" @close="closeModal">
      <template>删除后将无法撤销，确定要继续？</template>
    </modal>
  </div>
</template>

<script>
  export { default } from './BugList';
</script>

<style>
  .bug-list {
    list-style: none;
    padding: 0;
  }

  .bug-list::after {
    content: "";
    display: block;
    height: 3.75rem;
  }

  .bug-pager {
    position: fixed;
    bottom: 0; left: 0;
    width: 100%;
    padding: .8em 0;
    background: #fff;
    box-shadow: -1px 0 2px 1px rgba(0, 0, 0, .1);
  }
</style>
