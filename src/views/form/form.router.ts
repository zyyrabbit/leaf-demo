export default [
  {
    path: '/portal_manage',
    name: 'portal_manage',
    component: () => import('./basic-form.vue'),
    meta: {
      title: '基础表单',
    },
  },
  {
    path: '/step-form',
    name: '/tomcat/resource',
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
