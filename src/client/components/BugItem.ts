import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: ['username', 'usergroup', 'bug', 'activeBugId'],
})
export default class BugItemComponent extends Vue {
  username: string;
  usergroup: number;
  bug: Bug;
  activeBugId: string;

  get can() {
    const { username, usergroup } = this;
    const { state, presenter, resolver } = this.bug;

    const isUser = usergroup >= 1;
    const isAdmin = usergroup >= 2;
    const isResolver = resolver === username;
    const isPresenter = presenter === username;
    const isState1 = state === 1;
    const isState2 = state === 2;

    return {
      modify:  isUser && isState1,
      resolve: isUser && isState1,
      undo: (isResolver && isState2) || (isAdmin && state >= 2),
      close: isAdmin && isState2,
      remove: isPresenter && isState1,
    };
  }

  activate(event: Event, id: string) {
    event.preventDefault();

    const last = document.querySelector('.active .bug-content') as HTMLDivElement;
    last.style.cssText = `height: ${last.scrollHeight}px;`;
    this.$emit('activate', id);

    const current = (event.currentTarget as HTMLLIElement).nextElementSibling as HTMLLIElement;
    current.style.cssText = `height: ${current.scrollHeight}px;`;
    last.style.cssText = '';
    current.addEventListener('transitionend', () => { current.style.cssText = ''; });
  }

  openImage(index: number) {
    this.$emit('openImage', index);
  }

  goToBug(id: number) {
    this.$router.push(`/bug-form/${id}`);
  }

  openModal(key: string) {
    this.$emit('openModal', key);
  }
}
