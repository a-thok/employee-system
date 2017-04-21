import * as Vue from 'vue';
import Component from 'vue-class-component';
import * as marked from 'marked';
import * as addDays from 'date-fns/add_days';
import * as format from 'date-fns/format';
import { ajax } from '../utils';
import { dimissions } from '../../config';

@Component({})
export default class JournalListView extends Vue {
  date = new Date();
  loading = false;
  users: string[] = [];
  journals: Journal[] = [];
  error = '';

  get YYYYMMDD() {
    return format(this.date, 'YYYY-MM-DD');
  }

  get noJournalUsers() {
    return this.users.filter(user => (
      !this.journals.some(journal => journal.username === user)
    ));
  }

  async created() {
    const data = await ajax.get('/user', true);
    this.users = data.result.filter((user: string) => !dimissions.includes(user));
    this.fetchJournals();
  }

  marked(str: string) {
    return marked(str);
  }

  async fetchJournals() {
    this.error = '';
    this.journals = [];
    this.loading = true;

    const data = await ajax.get(`/journal?date=${this.YYYYMMDD}`, true);
    if (data.success) {
      this.journals = data.result;
    } else if (data.error) {
      this.error = data.error;
    }

    this.loading = false;
  }

  prev() {
    this.date = addDays(this.date, -1);
    this.fetchJournals();
  }

  next() {
    this.date = addDays(this.date, 1);
    this.fetchJournals();
  }

  async markAsTimeOff(username: string) {
    const journal: Journal = {
      username,
      content: '请假',
      marked: false,
    };

    // the timeoff-journal may not be for today
    const today = new Date();
    const dayOffset = this.date.getDay() - today.getDay();
    if (dayOffset !== 0) {
      journal.date = addDays(today, dayOffset);
    }

    const data = await ajax.post('/journal', journal, true);
    if (data.success) {
      this.fetchJournals();
    } else if (data.error) {
      this.error = data.error;
    }
  }
}
