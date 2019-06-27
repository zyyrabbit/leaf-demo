import { Leaf } from '../index';
import stores from '../store';

export default function storeMixin() {
  let prototype = Leaf.prototype as any;

  prototype._storeInit = function(this: any) {
    this.stores = stores;
  }

  prototype.registerModule = function(module: any) {
    let modules: any = {};
    module.keys().forEach(v => {
      modules = { ...modules, ...module(v).default };
    });
    Object.keys(modules).forEach((key: string) => {
      this.stores.registerModule(key, modules[key])
    })
  }
}