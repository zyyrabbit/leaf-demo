import Vue from 'vue';
import { Leaf } from '../index';

export default function vueMixin() {
  let prototype = Leaf.prototype as any;

  prototype._vueInit = function(this: any) {
    Vue.prototype.$leaf = this;
  }
}