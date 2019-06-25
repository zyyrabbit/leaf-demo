export default [
  {
    path: '/basic-form',
    name: 'basic-form',
    component: () => import('./basic-form.vue'),
    meta: {
      title: '基础表单',
    },
  },
  {
    path: '/step-form',
    name: 'step-form',
    component: () => import('./step-form.vue'),
    meta: {
      title: '分步表单',
    },
  },
  {
    path: '/senior-form',
    name: 'senior-form',
    component: () => import('./senior-form.vue'),
    meta: {
      title: '高级表单',
    },
  },
];
