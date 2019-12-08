/* eslint-disable no-new */
import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store/index';
import { router } from './_helpers';
import App from './app/App.vue';

Vue.use(VeeValidate);


new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
