import * as Vue from 'vue';
import Component from 'vue-class-component';
import * as Cookies from 'js-cookie';
import { AppHeaderComponent } from './components';

@Component({
  components: {
    'app-header': AppHeaderComponent,
  },
})
export default class AppContainer extends Vue {
  username = '';
  usergroup = 0;

  created() {
    this.checkCookie();
  }

  checkCookie() {
    this.username = Cookies.get('username') || '';
    this.usergroup = +Cookies.get('usergroup') || 0;
  }
}
