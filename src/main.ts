import leaf from 'leaf-frame';
import mockMenu from '@/mocks/func-menu.ts';

// 启动应用
leaf.register({
  getMenuTree: async () => {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(mockMenu.data);
      }, 500);
    })
  }
}).run('#leaf-app');
