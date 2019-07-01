import { Leaf } from '../index';
import * as utils from '../utils';
import http, { handlers } from '../http';
import { svgs, importSvgIcons } from '../svgicon';

export default function globalMixin() {
  const prototype = Leaf.prototype;

  prototype._globalInit = function() {
    // 自动加载 svg 图标
    importSvgIcons(svgs);
  }

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
    return this;
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
    return this;
  }

  prototype.registerSvg = function(svgs: any) {
    importSvgIcons(svgs);
    return this;
  }

}