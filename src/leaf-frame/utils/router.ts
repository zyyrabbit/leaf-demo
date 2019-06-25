import { RouteConfig } from 'vue-router/types/router';
import { getTreePath } from './traversePath';

type AuthMap = { [index: string]: boolean };
type nodeType = {
  urlAddr: string;
  items: Array<any>;
};
export type MatchFn = (router: string) => boolean;
// 层级遍历路由节点树
export function flatMenu(root: nodeType): AuthMap {
  let result: AuthMap = {};
  if (!root) {
    return result;
  }
  let queue = [root];
  let current: any;
  while (queue.length > 0) {
    current = queue.shift();
    current.urlAddr && (result[current.urlAddr] = true);
    current.items && (queue = queue.concat(current.items));
  }
  return result;
}

// 根据router.path 获取当前菜单
export const getActiveMenuListByPath = function(
  menuTree: any,
  pathStr?: string,
) {
  if (!pathStr) {
    return;
  }

  let routerNameArr = pathStr.split('/'); // 路由列表，['一级路由','二级路由']
  routerNameArr = routerNameArr.filter(x => {
    return x != '';
  });
  // 从后向前遍历路由，如果当前 router.name 匹配不到，匹配上一级路由
  for (let i = routerNameArr.length - 1; i >= 0; i--) {
    let activeMenu = getTreePath(
      menuTree,
      'items',
      'urlAddr',
      routerNameArr[i],
      false,
    );
    if (activeMenu.length > 0) {
      return activeMenu;
    }
  }
};

function createPermissionsRoute(menus: []): AuthMap {
  let authMap: AuthMap = {
    login: true,
    500: true,
    404: true,
  };
  menus.forEach(menu => {
    authMap = {
      ...authMap,
      ...flatMenu(menu),
    };
  });
  return authMap;
}

export function getPriRoute(root: RouteConfig, menus: []): RouteConfig[] {
  let authMap: AuthMap = createPermissionsRoute(menus);
  let result: RouteConfig[] = [];

  if (!root) {
    return result;
  }
  let queue = [root];
  let current: any;
  let children: RouteConfig[];

  while (queue.length > 0) {
    current = queue.shift();
    children = current.children;

    if (children) {
      for (let i = 0; i < children.length; i++) {
        if (children[i].name && !authMap[children[i].name!]) {
          children.splice(i, 1);
          i--;
        }
      }
      queue = queue.concat(children);
    }
  }

  return [root];

}
