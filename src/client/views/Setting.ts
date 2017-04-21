import Vue from 'vue';
import Component from 'vue-class-component';
import { ajax } from '../utils';

@Component({})
export default class SettingView extends Vue {
  data = {
    password: '',
    newPassword: '',
  };
  newPasswordConfirm = '';
  error = '';
  success = false;

  async submit() {
    this.error = '';

    if (this.newPasswordConfirm !== this.data.newPassword) {
      return this.error = '两次输入的密码不一致';
    }

    const data = await ajax.patch('/user', this.data, true);
    if (data.success) {
      this.success = true;
    } else {
      this.error = data.error;
    }
  }
};
