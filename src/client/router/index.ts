import Vue from 'vue';
import Router from 'vue-router';
import * as Cookies from 'js-cookie';

import AccountView from '../views/Account.vue';
import BugFormView from '../views/BugForm.vue';
import BugListView from '../views/BugList.vue';
import JournalFormView from '../views/JournalForm.vue';
import JournalListView from '../views/JournalList.vue';
import SettingView from '../views/Setting.vue';

const StatisticsView = () => System.import('../views/Statistics.vue').then((m: any) => m.default);

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Cookies.get('username') ? BugListView : AccountView },
    { path: '/account', component: AccountView },
    { path: '/bug-form/:id?', component: BugFormView },
    { path: '/bug-list', component: BugListView },
    { path: '/journal-form', component: JournalFormView },
    { path: '/journal-list', component: JournalListView },
    { path: '/statistics', component: StatisticsView },
    { path: '/setting', component: SettingView },
  ],
});
