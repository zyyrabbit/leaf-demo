import { Leaf } from '../index';
import * as utils from '../utils';
import http, { handlers } from '../http/';

export default function globalMixin() {
  const prototype = Leaf.prototype as any;

  prototype.utils = utils;
  prototype.http = http;
  prototype._handlers = handlers;

  prototype.registerUtils = function(extUtils: any) {
    let utils = {};
    extUtils.keys().forEach(v => {
      utils = { ...utils, ...extUtils(v) };
    });
    prototype.utils = {
      ...prototype.utils,
      ...utils
    }
  }

  prototype.setHttpConfig = function(httpConfig: { config: object, handler:  object} = {} as any) {
    let { config, handler } = httpConfig;

    prototype.http.defaults = {
      ...prototype.http.defaults,
      ...config
    }

    prototype._handlers =  {
      ...prototype._handlers,
      ...handler
    }
  }

}