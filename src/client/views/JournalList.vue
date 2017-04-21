<template>
  <div class="bg">
    <div class="journal-date">
      <div class="journal-date-arrow" @click="prev">&lt;</div>
      <div>{{YYYYMMDD}} 工作日志汇总</div>
      <div class="journal-date-arrow" @click="next">&gt;</div>
    </div>

    <loading :active="loading"></loading>

    <div class="journal-alert alert danger center" v-show="error">{{error}}</div>

    <table class="table journal-table">
      <thead>
        <tr>
          <th style="width:3em">#</th>
          <th style="width:6em">人员</th>
          <th style="text-align:center;">日志内容</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(journal, index) of journals">
          <th>{{index}}</th>
          <td>{{journal.username}}</td>
          <td
            class="content" :class="{wrap: !journal.marked, 'time-off': journal.content === '请假'}"
            v-html="journal.marked ? marked(journal.content) : journal.content"
          ></td>
        </tr>
        <tr v-for="(user, index) of noJournalUsers">
          <th>{{index + journals.length}}</th>
          <td>{{user}}</td>
          <td class="content">
            <button type="button" class="btn danger" @click="markAsTimeOff(user)">
              标记为请假
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export { default } from './JournalList';
</script>

<style>
  .journal-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: .25rem;
    margin-bottom: 1rem;
    background: var(--fade-dark);
    color: #fff;
    font-size: .875rem;
  }

  .journal-date-arrow {
    font-family: "SimSun";
    font-weight: bold;
    padding: 0 .6em;
    font-size: 1.875rem;
    color: #ddd;
    cursor: pointer;
    transition: color .3s ease;
    user-select: none;
  }

  .journal-date-arrow:hover {
    color: #fff;
  }

  .journal-list .content.wrap {
    white-space: pre-wrap;
  }

  .journal-table {
    margin: 1em 0;
    font-size: .875rem;
  }

  .journal-table .btn {
    float: right;
    font-size: .8125em;
  }

  .time-off {
    color: var(--danger);
  }

  .journal-alert {
    margin: 1em 0;
  }
</style>
