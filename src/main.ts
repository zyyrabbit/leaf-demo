import app from '@leafs/app';
import mockMenu from '@/mocks/func-menu.ts';

// 启动应用
app.setUp({
  getMenuTree: async () => {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(mockMenu.data);
      }, 500);
    })
  }
}).run('#leaf-app');
