export type handler = () => void;
export type obj = {[index: string]: any};

export interface LeafType {
  readonly stores: any;
  readonly router: any;
  readonly utils: obj;
  readonly http: obj;
  headerSlot: obj;
  menuData: Array<obj>;
  registerRouter: (routers: obj) => void;
  registerModule: (module: obj) => void;
  registerSvg: (svgs: obj) => void;
  mixinUtils: (mixinUtils: obj) => void;
  setHttpConfig: (httpConfig: obj) => void;
  run: handler;
  register: (options: obj) => void;
  beforeCreate: (leaf: any) => Promise<any>;
  created: (leaf: any, vueInstance: any) =>  Promise<any>;
  mounted: (leaf: any, vueInstance: any) =>  Promise<any>;
  _vueInit: handler;
  _svgInit: handler;
  _storeInit: handler;
  _componentInit: handler;
  _routerInit: handler;
  _handlers: handler[];
  _depInit: handler;
  _init: handler,
}