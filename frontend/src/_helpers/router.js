import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import LoginPage from '../login/LoginPage.vue';
import RegisterPage from '../register/RegisterPage.vue';
import DevicePage from '../device/DevicePage.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/device', component: DevicePage },

    // otherwise redirect to home
    { path: '*', redirect: '/' },
  ],
});



router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  return next();
});

export { router };
