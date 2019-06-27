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
    let temp: any;
    let name: string;
    extUtils.keys().forEach(v => {
      temp = { ...extUtils(v) };
      // 处理default情况
      if(temp.default) {
        name = temp.default.name;
        if (!name) {
          console.error('全局注册的util, export default 导出函数必须为命名函数!');
          return;
        }
        temp[name] = temp.default;
        delete temp.default;
      }
      utils = { ...utils, ...temp };
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