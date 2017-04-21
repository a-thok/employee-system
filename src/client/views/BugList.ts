import * as Vue from 'vue';
import Component from 'vue-class-component';
import { states } from '../constants';
import { ajax } from '../utils';
import BugFiltersComponent from '../components/BugFilters.vue';
import BugItemComponent from '../components/BugItem.vue';

const defaultModalsState = {
  resolve: false,
  undo: false,
  close: false,
  remove: false,
};

@Component({
  props: ['username', 'usergroup'],
  components: {
    'bug-filters': BugFiltersComponent,
    'bug-item': BugItemComponent,
  },
})
export default class BugListView extends Vue {
  username: string;
  usergroup: number;

  loading = false;
  queries: Queries = {
    page: 1,
    size: 10,
    project: '',
    rank: '',
    category: '',
    state: states[0].value,
    keyword: '',
  };
  error = '';

  bugs: Bug[] = [];
  total = 0;

  activeBugId = '';
  activeImageIndex = -1;

  message = '';
  modals = { ...defaultModalsState };

  get imageSrc() {
    if (this.activeImageIndex >= 0) {
      const activeBug = this.bugs.find(bug => bug._id === this.activeBugId);
      return (activeBug as Bug).images[this.activeImageIndex];
    }
    return null;
  }

  get totalImage() {
    const activeBug = this.bugs.find(bug => bug._id === this.activeBugId);
    return (activeBug ? activeBug.images.length : 0);
  }

  get queryStr() {
    const queryStr = Object.keys(this.queries).reduce((str, key) => {
      const value = this.queries[key];
      return (value ? `${str}&${key}=${value}` : str);
    }, '');
    return queryStr.slice(1);
  }

  created() {
    this.fetchBugs();
  };

  changeFilter(key: string, value: string | number) {
    this.queries[key] = value;
    this.fetchBugs();
  }

  async fetchBugs(page = 1) {
    this.error = '';
    this.queries.page = page;
    this.bugs = [];
    this.loading = true;

    const data = await ajax.get(`/bug?${this.queryStr}`, true);
    if (data.success) {
      const { items, total } = data.result;
      this.bugs = items;
      this.total = total;

      if (items.length) {
        this.activeBugId = items[0]._id;
      } else {
        this.error = '查无相关条目';
      }
    } else {
      this.error = data.error;
    }

    this.loading = false;
  }

  changeActiveBug(id: string) {
    this.activeBugId = id;
  }

  openModal(key: string) {
    this.modals[key] = true;
  }

  closeModal() {
    this.modals = { ...defaultModalsState };
  }

  openImage(index: number) {
    this.activeImageIndex = index;
    document.body.classList.add('seal');
  }

  changeImage(index: number) {
    this.activeImageIndex = index;
    // close
    if (index === null) {
      document.body.classList.remove('seal');
    }
  }

  async updateState(body: Bug) {
    const data = await ajax.patch(`bug/${this.activeBugId}`, body, true);
    if (data.success) {
      this.closeModal();
      const currentBug = this.bugs.find(bug => bug._id === this.activeBugId);
      Object.assign(currentBug, data.result);
      this.message = '';
    }
  }

  async remove() {
    const data = await ajax.delete(`bug/${this.activeBugId}`, true);
    if (data.success) {
      this.closeModal();
      this.bugs = this.bugs.filter(bug => bug._id !== this.activeBugId);
      if (this.bugs.length) {
        this.activeBugId = this.bugs[0]._id;
      }
    }
  }
}
