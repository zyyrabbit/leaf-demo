import { Leaf } from '../index';
import * as utils from '../utils';
import http from '../http';

export default function globalMixin() {
  Leaf.prototype._utils = utils;
  Leaf.prototype._http = http;

  const prototype = Leaf.prototype as any;

  prototype._mixinUtils = function(mixinUtils: object = {}) {
    prototype._utils = {
      ...prototype._utils,
      ...mixinUtils
    }
  }

  prototype._setHttpConfig = function(httpConfig: object = {}) {
    prototype._http.defaults = {
      ...prototype._http.defaults,
      ...httpConfig
    }
  }
}