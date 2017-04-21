import * as Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: ['active'],
})
export default class LoadingComponent extends Vue {
  active: boolean;
}
