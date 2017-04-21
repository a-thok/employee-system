<template>
  <div>
    <ul class="account">
      <li class="login">
        <span class="form-tab" :class="{active: isLogin}" @click="isLogin = true">登录</span>

        <form class="form" @submit.prevent="login" v-show="isLogin">
          <p class="alert danger center" :class="{hidden: !loginError}">{{loginError}}</p>
          <div class="form-group">
            <input class="input block user" type="text" name="name" placeholder="用户名" v-model="account.name" required>
          </div>
          <div class="form-group">
            <input class="input block password" type="password" name="password" placeholder="密码" v-model="account.password" required>
          </div>
          <div class="form-group" style="margin: -.5em 0">
            <label class="checkbox">
              <input type="checkbox" name="remember" v-model="account.remember">
              <span>记住我</span>
            </label>
          </div>
          <div class="form-group">
            <button class="btn block lg primary">登录</button>
          </div>
        </form>
      </li>

      <li class="register">
        <span class="form-tab" :class="{active: !isLogin}" @click="isLogin = false">注册</span>

        <form class="form" @submit.prevent="register" v-show="!isLogin">
          <p class="alert danger center" :class="{hidden: !registerError}">{{registerError}}</p>
          <p class="alert success center" v-if="registerSuccess">注册成功，请登陆</p>
          <div class="form-group">
            <input
              class="input block user" type="text" name="name" placeholder="用户名"
              pattern="^[\u4e00-\u9fa5]{2,4}$" required v-model="newAccount.name" @input="input"
            >
            <small class="form-tip">请使用真实姓名以方便同事之间交流</small>
          </div>
          <div class="form-group">
            <input
              class="input block password" type="password" name="password" placeholder="密码"
              pattern="^[a-zA-Z0-9_-]{6,20}$" required v-model="newAccount.password" @input="input"
            >
            <small class="form-tip">请使用数字、字母、_或-，长度保持在6到20个字符之间</small>
          </div>
          <button class="btn block lg primary">注册</button>
        </form>
      </li>
    </ul>
  </div>
</template>

<script>
  export { default } from './Account';
</script>

<style>
  .account {
    position: relative;
    display: flex;
    width: 90%;
    max-width: 560px;
    padding: 0;
    margin: 5em auto 0;
    list-style: none;
  }

  .account > li {
    flex-basis: 50%;
  }

  .form-tab {
    display: block;
    height: 4rem;
    margin: 0;
    line-height: 4rem;
    text-align: center;
    background: #fff;
    cursor: pointer;
  }

  .login .form-tab {
    border-top-left-radius: .25rem;
  }

  .register .form-tab {
    border-top-right-radius: .25rem;
  }

  .form-tab:not(.active) {
    background: #d2d8d8;
    color: #809191;
  }

  .account form {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 2em;
    border-bottom-left-radius: .25em;
    border-bottom-right-radius: .25em;
    background: #fff;
  }

  .account .input {
    padding-left: 3em;
    background-repeat: no-repeat;
    background-position: .8em center;
  }

  .input.user {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0Q1RERERiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik04LjcsMTVMMywxOC40Yy0wLjYsMC40LTEsMS0xLDEuN1YyM2gyMHYtMi45DQoJYzAtMC43LTAuNC0xLjQtMS0xLjdMMTUuMywxNSIvPg0KPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRDVERERGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEyLDE2TDEyLDE2DQoJYy0zLjMsMC02LTIuNy02LTZWN2MwLTMuMywyLjctNiw2LTZsMCwwYzMuMywwLDYsMi43LDYsNnYzQzE4LDEzLjMsMTUuMywxNiwxMiwxNnoiLz4NCjwvc3ZnPg0K);
  }

  .input.password {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0QyRDhEOCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iDQoJTTE4LjMsMS43aC0yLjhMOC44LDguNEM4LjMsOC4xLDcuNiw4LDcsOGMtMi44LDAtNSwyLjItNSw1czIuMiw1LDUsNXM1LTIuMiw1LTVjMC0wLjYtMC4xLTEuMy0wLjQtMS44bDYuNy02LjdWMS43eiIvPg0KPGNpcmNsZSBmaWxsPSJub25lIiBzdHJva2U9IiNEMkQ4RDgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBjeD0iNyIgY3k9IjEzIiByPSIxIi8+DQo8L3N2Zz4NCg==);
  }
</style>
