import * as Vue from 'vue';
import Component from 'vue-class-component';
import * as format from 'date-fns/format';
import { ajax } from '../utils';

@Component({
  props: ['username', 'usergroup'],
})
export default class AppHeaderComponent extends Vue {
  username: string;
  usergroup: number;
  today = format(new Date(), 'YYYY-MM-DD');

  get routes() {
    const isUser = this.usergroup >= 1;
    const isAdmin = this.usergroup >= 2;
    return [
      { name: '问题列表', path: '/bug-list', access: isUser },
      { name: '提交问题', path: '/bug-form', access: isUser },
      { name: '提交工作日志', path: '/journal-form', access: isUser },
      { name: '管理工作日志', path: '/journal-list', access: isAdmin },
      { name: '数据统计', path: '/statistics', access: isUser },
    ];
  }

  async logout() {
    const data = await ajax.get('/user/logout', true);
    if (data.success) {
      this.$emit('logout');
      this.$router.push('account');
    }
  }
}
