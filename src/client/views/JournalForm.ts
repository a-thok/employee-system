import * as Vue from 'vue';
import Component from 'vue-class-component';
import * as marked from 'marked';
import { ajax } from '../utils';

@Component({
  props: ['username'],
})
export default class JournalFormView extends Vue {
  username: string;

  journalId = '';
  editing = true;
  journal = {
    username: this.username,
    content: '',
    marked: false,
  };
  error = '';

  async created() {
    const data = await ajax.get(`journal/${this.username}`, true);
    if (data.success) {
      const { _id, ...journal } = data.result;
      Object.assign(this.journal, journal);
      this.journalId = _id;
      this.editing = false;
    }
  }

  marked(str: string) {
    return marked(str);
  }

  async submit() {
    this.error = '';

    const method = this.journalId ? 'patch' : 'post';
    const url = this.journalId ? `/journal/${this.journalId}` : '/journal';

    const data = await ajax[method](url, this.journal, true);
    if (data.success) {
      this.journalId = data.result._id;
      this.editing = false;
    } else if (data.error) {
      this.error = data.error;
    }
  }
}
