import { Leaf } from '../index';
import stores from '../store';

export default function storeMixin() {
  let prototype = Leaf.prototype as any;

  prototype._storeHandler = function(this: any) {
    this._stores = stores;
  }

  prototype._registerModule = function(module: any = {}) {
    let modules: any = {};
    module.keys().forEach(v => {
      modules = { ...modules, ...module(v) };
    });
    Object.keys(modules).forEach((key: string) => {
      this._stores.registerModule(key, modules[key])
    })
  }
}