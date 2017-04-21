import Vue from 'vue';
import Component from 'vue-class-component';
import { projects, states, ranks, categories } from '../constants';

const filterAll: Filter = { name: '全部', value: '' };

@Component({
  props: ['queries'],
})
export default class BugFiltersComponent extends Vue {
  queries: Queries;

  filters = [
    { name: '状态', prop: 'state', items: [filterAll].concat(states) },
    { name: '重要等级', prop: 'rank', items: [filterAll].concat(ranks) },
    { name: '涉及人员', prop: 'category', items: [filterAll].concat(categories) },
  ];
  projectFilter = { name: '所属项目', prop: 'project', items: [filterAll].concat(projects) };
  switched = false;

  switchFilter() {
    this.switched = !this.switched;
  }

  changeFilter(event: Event, filter: string, value: string|number) {
    const el = event.target as HTMLLIElement;
    if (!el.classList.contains('active')) {
      this.$emit('changeFilter', filter, value);
    }
  }

  search(event: Event) {
    const el = event.target as HTMLInputElement;
    this.$emit('changeFilter', 'keyword', el.value);
  }
};
