import { Leaf } from '../index';
import { Route } from 'vue-router';
import Component from 'vue-class-component';
import router, { routerLogin, routerPage } from '../router';
import { RouteConfig } from 'vue-router';


export default function routerMixin() {
  let prototype = Leaf.prototype as any;
  
  prototype._routerHandler = function(this: any) {
    this._router = router;
    
    this._router.beforeEach(async (to: Route, from: Route, next: any) => {
      // 判断是否已经获取菜单项
      if (
        this._stores.state.menu &&
        (this._stores.state.menu.menuTree === undefined ||
          this._stores.state.menu.menuTree.length === 0)
      ) {
        const data = this._menuData;
        this._stores.dispatch('menu/createMenuData', {
          menuTree: data,
          toName: to.name,
          path: to.path,
          fromName: from.name,
        });
        let routes = this._utils.getPriRoute(routerPage, data);
        this._router.addRoutes(routes);
        next({ ...to, replace: true });
        return;
      } else {
        this._stores.dispatch('container/createLoading');
      }
      // 判断页面是否404
      if (to.matched.length === 0) {
        next({
          name: '404',
        });
        this._stores.dispatch('container/createLoaded');
        return;
      }
      // 默认有权限
      next();
    });

    this._router.afterEach((to: Route, from: Route) => {
      document.title = `Leaf-${to.meta.title || ''}`;
      this._stores.dispatch('container/createLoaded');
    });

    // 注册 RouterHooks
    Component.registerHooks([
      'beforeRouteEnter',
      'beforeRouteLeave',
      'beforeRouteUpdate', 
    ]);
  }
  
  // 加载路由
  prototype._registerRouter = function(routers: any = {}) {
    let routes: RouteConfig[] = [];

    routers.keys().forEach((v: string) => {
      routes = [...routes, ...routers(v).default];
    });

    routes.forEach((v: RouteConfig) => {
      if (['login', 'first-logged'].indexOf(v.name as string) === -1) {
        routerPage.children!.push(v);
      } else {
        routerLogin.children!.push(v);
      }
    });
    
    this._router.addRoutes([routerLogin]);
  }
}