<template>
  <div class="compact">
    <h2 class="journal-title">
      工作日志
      <small v-if="!journalId">（今日尚未提交）</small>
    </h2>

    <form class="form" v-if="editing" @submit.prevent="submit">
      <p class="alert danger center" :class="{hidden: !error}">{{error}}</p>

      <div class="form-group">
        <textarea class="input block" name="content" id="content" rows="10" v-model.lazy="journal.content" required></textarea>
      </div>

      <div class="form-group">
        <label class="checkbox" >
          <input type="checkbox" name="marked" v-model="journal.marked">
          <span>启用markdown格式</span>
        </label>
      </div>

      <button v-if="!journalId" class="btn block primary">提交</button>
      <div v-else class="journal-editing-btns">
        <button type="button" class="btn block default" @click="editing = false">取消</button>
        <button class="btn block primary">修改</button>
      </div>
    </form>

    <div v-else class="my-journal clearfix">
      <div v-if="journal.marked" v-html="marked(journal.content)"></div>
      <div v-else style="white-space:pre-wrap">{{journal.content}}</div>
      <button class="btn primary" @click="editing = true">修改</button>
    </div>
  </div>
</template>

<script>
  export { default } from './JournalForm';
</script>

<style>
  .journal-title {
    margin-bottom: 1rem;
    text-align: center;
    font-weight: normal;
  }

  .journal-title small {
    font-size: .72em;
    color: var(--warning-light);
  }

  .my-journal {
    padding: 1em;
    border: 1px solid var(--fade-light);
    border-radius: .25em;
    background: #fff;
  }

  .my-journal .btn {
    float: right;
    margin-top: 1rem;
    font-size: .875rem;
  }

  .journal-editing-btns {
    display: flex;
    justify-content: space-between;
  }

  .journal-editing-btns .btn {
    flex-basis: 48%;
  }
</style>
