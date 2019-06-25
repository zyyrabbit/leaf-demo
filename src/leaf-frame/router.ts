import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

Vue.use(Router);

export const routerLogin: RouteConfig = {
  path: '/auth',
  name: 'auth',
  redirect: '/auth/login',
  component: () => import('./components/Layout/LoginView.vue'),
  children: [],
};

export const routerPage: RouteConfig = {
  path: '',
  name: 'page',
  redirect: '/dashboard',
  component: () => import('./components/Layout/PageView.vue'),
  children: [],
};

export default new Router({
  routes: [],
});

