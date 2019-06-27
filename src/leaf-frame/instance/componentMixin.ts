import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import FastClick from 'fastclick';
import { Leaf } from '../index';
import { Comps } from '../components/index';

export default function componentMixin() {
  let prototype = Leaf.prototype as any;
  
  prototype._componentInit = function(this: any) {
    FastClick.attach(document.body);
    for (const key in Comps) {
      if (Comps.hasOwnProperty(key)) {
        Vue.component(key, Comps[key]);
      }
    }
    // 重置 Element-Ui 部分组件的样式
    Element.MessageBox.setDefaults({ type: 'warning' });
    Vue.use(Element, { size: 'small', zIndex: 3000 });
  }

  prototype.registerComps = function(extcomps: any) {
    let comps = {};
    extcomps.keys().forEach(v => {
      comps = { ...comps, ...extcomps(v) };
    });

    for (const key in Comps) {
      if (Comps.hasOwnProperty(key)) {
        Vue.component(key, Comps[key]);
      }
    }
  }
}