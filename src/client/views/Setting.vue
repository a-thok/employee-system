<template>
  <div class="compact">
    <form class="form" @submit.prevent="submit">
      <p class="alert danger center" :class="{hidden: !error}">{{error}}</p>
      <P class="alert success center" :class="{hidden: !success}">密码已成功修改</P>

      <div class="form-group">
        <label for="newPassword">新密码：</label>
        <input type="password" class="input block" id="newPassword" pattern="^[a-zA-Z0-9_-]{6,20}$"  v-model="data.newPassword">
        <small>请使用数字、字母、_或-，长度保持在6到20个字符之间</small>
      </div>
      <div class="form-group">
        <label for="newPasswordConfirm">确认新密码：</label>
        <input type="password" class="input block" id="newPasswordConfirm" pattern="^[a-zA-Z0-9_-]{6,20}$"  v-model="newPasswordConfirm">
      </div>
      <div class="form-group">
        <label for="password">当前密码：</label>
        <input type="password" class="input block" id="password" v-model="data.password" required>
      </div>
      <button class="btn primary block">提交</button>
    </form>
  </div>
</template>

<script>
  export { default } from './Setting';
</script>
