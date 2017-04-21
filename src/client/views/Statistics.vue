<template>
  <div class="bg">
    <table class="table stat-table">
      <thead>
        <tr>
          <td>问题总数</td>
          <td>待解决</td>
          <td>待审核</td>
          <td>已关闭</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{counts.total}}</td>
          <td>{{counts.toBeResolve}}</td>
          <td>{{counts.toBeClose}}</td>
          <td>{{counts.closed}}</td>
        </tr>
      </tbody>
    </table>

    <canvas class="chart" ref='chart'></canvas>
    <div class="btn-group select-range">
      <button
        type="button" class="btn" :class="{'primary': range.active, 'default': !range.active}"
        v-for="(range, i) of ranges" @click="selectRange(i)"
      >
        {{range.name}}
      </button>
    </div>
  </div>
</template>

<script>
  export { default } from './Statistics';
</script>

<style>
  .stat-table {
    max-width: 800px;
    margin: 0 auto 1rem;
    text-align: center;
  }

  .stat-table td:first-child {
    color: var(--primary-light);
  }

  .stat-table td:nth-child(2) {
    color: var(--danger-light);
  }

  .stat-table td:nth-child(3) {
    color: var(--warning-light);
  }

  .stat-table td:last-child {
    color: var(--success);
  }

  .select-range {
    display: block;
    margin: 4rem 0 1rem;
    font-size: .9375em;
    text-align: center;
  }
</style>
