<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{disabled: currentPage <= 1}">
        <a class="page-link" href="#"  @click.prevent="goToPage(1)"><span>&laquo; 上一页</span></a>
      </li>
      <li class="page-item" v-for="page of pages" :class="{active: page === currentPage}">
        <a class="page-link" href="#" @click.prevent="goToPage(page)">{{page}}</a>
      </li>
      <li class="page-item" :class="{disabled: currentPage >= pageLength}">
        <a class="page-link" href="#" @click.prevent="goToPage(pageLength)"><span>下一页 &raquo;</span></a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export { default } from './Pager';
</script>

<style>
  .pagination {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: .8125rem;
  }

  .page-item:not(:first-child) {
    margin-left: 1em;
  }

  .page-link {
    display: block;
    padding: .5em .9em;
    border: 1px solid #e6e6e6;
    border-radius: .25em;
    background: #fff;
    color: inherit;
    text-decoration: none;
  }

  .page-link:hover {
    background: #f2f2f2;
    text-decoration: none;
  }

  .active .page-link {
    border-color: var(--primary);
    background: var(--primary);
    color: #fff;
    pointer-events: none;
  }

  .disabled .page-link {
    color: rgba(46, 64, 87, .4);
    pointer-events: none;
  }
</style>
