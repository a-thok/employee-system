/* tslint:disable no-unused-new */
import Vue from 'vue';
import { router } from './router';
import AppContainer from './App.vue';
import { ImageBrowserComponent, LoadingComponent, ModalComponent, PagerComponent } from './components';
import { host, wsPort } from '../config';
import './styles/';
import '../favicon.ico';

Vue.component('image-browser', ImageBrowserComponent);
Vue.component('loading', LoadingComponent);
Vue.component('modal', ModalComponent);
Vue.component('pager', PagerComponent);

new Vue({
  router,
  render: h => h(AppContainer),
}).$mount('#root');

if ('Notification' in window) {
  const notify = () => {
    const ws = new WebSocket(`ws://${host}:${wsPort}`);
    ws.addEventListener('message', (event) => {
      const bug = JSON.parse(event.data);

      new Notification(bug.title, {
        body: `${bug.project} · ${bug.category.join('-')} · ${bug.rank}`,
        icon: '/favicon.ico',
      });
    });
  };

  const { permission } = Notification as any;
  if (permission === 'granted') {
    notify();
  } else if (permission !== 'denied') {
    Notification
      .requestPermission()
      .then(() => notify());
  }
}
