import { Leaf } from './index';

export type handler = () => void;
export type obj = {[index: string]: any};

export interface Leaf {
  stores: any;
  router: any;
  utils: obj;
  http: obj;
  headerSlot: obj;
  run: handler;
  setUp: (options: obj) => void;
  registerComps(extcomps: any): void;
  registerRouter(routers: obj): void;
  registerModule(module: obj): void;
  registerSvg(svgs: obj): void;
  registerUtils(extUtils: obj): void;
  setHttpConfig(httpConfig: { config: obj, handler:  obj}): void;
  beforeCreate(leaf: any): Promise<any>;
  created(leaf: any, vueInstance: any): Promise<any>;
  mounted(leaf: any, vueInstance: any): Promise<any>;
  getMenuTree: () => any;
}

declare module './index' {
  interface Leaf {
    registerComps(extcomps: any): void;
    registerRouter(routers: obj): void;
    registerModule(module: obj): void;
    registerSvg(svgs: obj): void;
    registerUtils(extUtils: obj): void;
    setHttpConfig(httpConfig: { config: obj, handler:  obj}): void;
    beforeCreate(leaf: any): Promise<any>;
    created(leaf: any, vueInstance: any): Promise<any>;
    mounted(leaf: any, vueInstance: any): Promise<any>;
    /* _componentInit(): void;
    _vueInit(): void;
    _svgInit(): void;
    _storeInit(): void;
    _componentInit(): void;
    _routerInit(): void;
    _handlers: obj; */
  }
}