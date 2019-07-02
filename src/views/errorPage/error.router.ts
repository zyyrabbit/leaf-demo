export default [
  {
    path: '/error/404',
    name: '404',
    component: () => import('./404.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/error/500',
    name: '500',
    component: () => import('./500.vue'),
    meta: {
      title: '500',
    },
  },
  {
    path: '/error/403',
    name: '403',
    component: () => import('./403.vue'),
    meta: {
      title: '403',
    },
  }
];
