import leaf from 'leaf-frame';
import mockMenu from '@/mocks/func-menu.ts';

// 注册生命周期钩子函数
leaf.register({
  beforeCreate: async leaf => {
    await new Promise(resolve => {
      setTimeout(() => {
        leaf.menuData = mockMenu.data;
        resolve();
      }, 500)
    })
  }
})

// 启动应用
leaf.run();
