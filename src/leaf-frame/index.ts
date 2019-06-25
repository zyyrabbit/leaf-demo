import 'element-ui/lib/theme-chalk/index.css';
import './assets/index.scss';
import Vue from 'vue';
import {
  storeMixin,
  routerMixin,
  componentMixin,
  svgMixin,
  globalMixin,
  vueMixin
} from './instance'
import App from './App.vue';
import { LeafType, obj } from './leaf';

export class Leaf {
  public _router: any;
  public _stores: any;
  public _utils!: obj;
  public _http!: obj;
  public _menuData!: [];
  public _headerSlot!: obj;


  constructor() {
    storeMixin();
    routerMixin();
    componentMixin();
    svgMixin();
    globalMixin();
    vueMixin();

    this._init();
  }
  
  public frameSet(this: LeafType, options: any = {}) {
    let {
      module, 
      routers,
      svgs, 
      menuData = [], 
      mixins,
      variables = {},
      utils,
      headerSlot,
      setting = {}
   } = options;
    this._registerModule(module);
    this._registerRouter(routers);
    this._registerSvg(svgs);
    this._mixin(mixins);
    this._mixinUtils(utils);
    // 设置菜单数据
    this._menuData = menuData;
    // 引入主题
    this._stores.dispatch('theme/setTheme', variables.theme);
    // 设置
    this._stores.dispatch('setting/setSetting', setting);
    // 插入头部item
    this._headerSlot = headerSlot;
  }

  public run() {
    new Vue({
      router: this._router,
      store: this._stores,
      render: h => h(App),
    }).$mount('#leaf-app');
  }

  public _mixin(mixins: [] = []) {
    mixins.forEach((item: any) => Vue.mixin(item));
  }

  private _init(this: any) {
    this._storeHandler();
    this._routerHandler();
    this._componentHandler();
    this._svgHandler();
    this._vueHandler();
  }

}

const instance: LeafType = new Leaf();

export default instance;
