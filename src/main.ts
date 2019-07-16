import App from '@leafs/app';
import mockMenu from '@/mocks/func-menu.ts';

// 启动应用
new App({
  getMenuTree: async () => {
    return mockMenu.data
  }
}).run('#leaf-app');
