export default [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '概览',
    },
  },
];
