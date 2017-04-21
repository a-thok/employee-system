import * as Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: ['src', 'index', 'total'],
})
export default class ImageBrowserComponent extends Vue {
  src: string;
  index: number;
  total: number;

  close() {
    this.$emit('changeImage', -1);
  }

  prev() {
    const { index } = this;
    if (index > 0) {
      this.$emit('changeImage', index - 1);
    }
  }

  next() {
    const { index, total } = this;
    if (index < total - 1) {
      this.$emit('changeImage', index + 1);
    }
  }
}
