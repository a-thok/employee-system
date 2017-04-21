import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: ['active'],
})
export default class ModalComponent extends Vue {
  active: number;
}
