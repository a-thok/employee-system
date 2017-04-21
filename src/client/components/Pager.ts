import * as Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: ['currentPage', 'size', 'total'],
})
export default class PagerComponent extends Vue {
  currentPage: number;
  size: number;
  total: number;
  pageLength = 0;

  get pages() {
    const temp = [this.currentPage];

    this.pageLength = Math.ceil(this.total / this.size);

    let prev = this.currentPage - 1;
    while (temp.length < 4 && prev > 0) {
      temp.unshift(prev);
      prev -= 1;
    }

    let next = this.currentPage + 1;
    while (temp.length < 9 && next <= this.pageLength) {
      temp.push(next);
      next += 1;
    }

    while (temp.length < 9 && prev > 0) {
      temp.unshift(prev);
      prev -= 1;
    }

    return temp;
  }

  goToPage(page: number) {
    this.$emit('goToPage', page);
  }
}
