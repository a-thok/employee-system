import * as Vue from 'vue';
import Component from 'vue-class-component';
import { ajax } from '../utils';

const emptyUser = { name: '', password: '' };

@Component({})
export default class AccountComponent extends Vue {
  isLogin = true;

  account = { ...emptyUser, remember: false };
  loginError = '';

  newAccount = { ...emptyUser };
  registerError = '';
  registerSuccess = false;

  input(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.validity.valid) {
      input.classList.remove('danger');
      input.classList.add('success');
    } else {
      input.classList.remove('success');
      input.classList.add('danger');
    }
  }

  async login() {
    this.loginError = '';
    const data = await ajax.post('/user/login', this.account, true);
    if (data.success) {
      this.$emit('login');
      this.$router.push('bug-list');
      Object.assign(this.account, emptyUser);
    } else if (data.error) {
      this.loginError = data.error;
    }
  }

  async register() {
    this.registerError = '';
    const data = await ajax.post('/user', this.newAccount, false);
    if (data.success) {
      this.newAccount = { ...emptyUser };
      this.registerSuccess = true;
    } else if (data.error) {
      this.registerError = data.error;
    }
  }
}
