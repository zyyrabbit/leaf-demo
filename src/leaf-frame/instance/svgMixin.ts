import { Leaf } from '../index';
import { svgs, importSvgIcons } from '../svgicon';

export default function svgMixin() {
  let prototype = Leaf.prototype as any;

  prototype._svgHandler = function(this: any) {
    // 自动加载 svg 图标
    importSvgIcons(svgs);
  }

  prototype._registerSvg = function(svgs: any = {}) {
    importSvgIcons(svgs);
  }
}