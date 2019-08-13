import data from '@/mocks/resource1';

function resolveMenuAndButton(resources, menus, buttons) {
  resources = resources || [];
  resources.forEach(item => {
    if (item.resourceCode) {
      const menuItem = {};
      if (item.resourceType == 1) {
        menuItem.urlAddr = item.url;
        menuItem.menuName = item.resourceName;
        menus.push(menuItem);
      } else if (item.resourceType == 2) buttons.push(item.resourceCode);

      if (item.children && item.children.length > 0) {
        menuItem.items = [];
        resolveMenuAndButton(item.children, menuItem.items, buttons);
      }
    }
  });
}

async function init(app) {
  
    const menus = [];
    const buttons = [];
    try {
      let user;
      let resource;

      if (!user) {
        user = data.user;
      }

      if (!resource || !resource[0] || !resource[0].children) {
        resource = data.menu;
      }
  
      resolveMenuAndButton(resource, menus, buttons);
      debugger
      return {
        user,
        menus: menus[0].items,
        buttons,
      }
    } catch (e) {
      throw new Error(e);
    } finally {
    }
}

export default {
  init
};

