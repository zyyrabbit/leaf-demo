export default [
  {
    path: '/standard-list',
    name: 'standard-list',
    component: () => import('./standard-list.vue'),
    meta: {
      title: '标准列表',
    },
  },
  {
    path: '/card-list',
    name: 'card-list',
    component: () => import('./card-list.vue'),
    meta: {
      title: '卡片列表',
    },
  }
];