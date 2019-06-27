import { Route } from 'vue-router';
import Component from 'vue-class-component';
import { RouteConfig } from 'vue-router';
import { Leaf } from '../index';
import getPriRoute from '../utils/router';
import router, { routerLogin, routerPage } from '../router';

export default function routerMixin() {
  let prototype = Leaf.prototype as any;
  
  prototype._routerInit = function(this: any) {
    this.router = router;
    this.router.beforeEach(async (to: Route, from: Route, next: any) => {
      // 判断是否已经获取菜单项
      if (this.stores.state.menu && !this.stores.state.menu.menuTree) {
        this.stores.dispatch('menu/createMenuData', {
          menuTree: this.menuData,
          toName: to.name,
          path: to.path,
          fromName: from.name,
        });
        let routes = getPriRoute(routerPage, this.menuData);
        this.router.addRoutes(routes);
        next({ ...to, replace: true });
        return;
      }
      this.stores.dispatch('container/createLoading'); 
      // 判断页面是否404
      if (to.matched.length === 0) {
        next({
          name: '404',
        });
        return;
      }
      next();
    });

    this.router.afterEach((to: Route, from: Route) => {
      document.title = `${this.stores.state.setting.setting.title}-${to.meta.title || ''}`;
      this.stores.dispatch('container/createLoaded');
    });

    // 注册 RouterHooks
    Component.registerHooks([
      'beforeRouteEnter',
      'beforeRouteLeave',
      'beforeRouteUpdate', 
    ]);
  }
  
  // 加载路由
  prototype.registerRouter = function(routers: any = {}) {
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
   
    this.router.addRoutes([routerLogin]);
  }
}