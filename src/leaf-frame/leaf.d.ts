export type handler = () => void;
export type obj = {[index: string]: any};

export interface LeafType {
  readonly _stores: obj;
  readonly _router: obj;
  readonly _utils: obj;
  readonly _http: obj;
  _headerSlot: obj;
  _menuData: Array<obj>;
  _registerRouter: (routers: obj) => void;
  _registerModule: (module: obj) => void;
  _registerSvg: (svgs: obj) => void;
  _vueHandler: handler;
  _svgHandler: handler;
  _storeHandler: handler;
  _componentHandler: handler;
  _routerHandler: handler;
  _mixin: (mixins: Array<obj>) => void;
  _mixinUtils: (mixinUtils: obj) => void;

  run: handler;
  frameSet: (options: obj) => void;
}