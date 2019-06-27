import Vue from 'vue';
import './assets/index.scss';
import '@/assets/index.scss';
import variables from '@/assets/variables.scss';
import HeaderItems from '@/components/HeaderItems.vue';
import setting from '@/../leaf-setting';
import * as utils from '@/utils';

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

  public router: any;
  public stores: any;
  public utils!: obj;
  public http!: obj;
  public menuData!: [];
  public headerSlot!: obj;


  constructor() {
    // leaf对象prototype扩展
    storeMixin();
    routerMixin();
    componentMixin();
    svgMixin();
    globalMixin();
    vueMixin();
    // 初始化
    this._init();
  }
  /**
   *
   * Leaf 对象初始化函数
   * @private
   * @param {LeafType} this
   * @memberof Leaf
   */
  private _init(this: LeafType) {
    this._storeInit();
    this._routerInit();
    this._componentInit();
    this._svgInit();
    this._vueInit();
    this._depInit();
  }

  private _depInit(this: LeafType) {
    // 自动加载路由
    const routers = require.context('@/views', true, /\.router\.ts$/);
    this.registerRouter(routers);

    // 自动加载svg
    const extSvgs = require.context('@/assets/svg', true, /\.svg$/);
    this.registerSvg(extSvgs);

    // 自动加载store module
    const module = require.context('@/views', true, /\.module\.js$/);
    this.registerModule(module);

    // 加载utils
    this.mixinUtils(utils);

    // 引入主题
    this.stores.dispatch('theme/setTheme', variables.theme);
    // 设置
    this.stores.dispatch('setting/setSetting', setting);
    // 插入头部item
    this.headerSlot = HeaderItems;
  }
  /**
   * 反向注册
   * @param this 
   * @param options 
   */
  public register(this: LeafType, options: obj = {}) {
    let {
      beforeCreate,
      created,
      mounted,
      httpConfig,
   } = options;
    this.setHttpConfig(httpConfig);
    // 生命周期钩子函数
    this.beforeCreate = beforeCreate;
    this.created = created;
    this.mounted = mounted;
  }
  /**
   * 启动项目
   */
  public async run(this: LeafType) {
    this.beforeCreate && await this.beforeCreate(this);
    let vueInstance: any = new Vue({
      router: this.router,
      store: this.stores,
      render: h => h(App),
    });
    this.created && await this.created(this, vueInstance);
    vueInstance.$mount('#leaf-app');
    this.mounted && await this.mounted(this, vueInstance);
  }

}

const instance: LeafType = new Leaf();

export default instance;
