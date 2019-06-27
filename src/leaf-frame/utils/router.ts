import { RouteConfig } from 'vue-router/types/router';

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

function createPermissionsRoute(menus: []): AuthMap {
  // 默认白名单
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

export default function getPriRoute(root: RouteConfig, menus: [] = []): RouteConfig[] {
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
