import Vue from 'vue';
import { Leaf } from '../index';

export default function vueMixin() {
  Leaf.prototype._vueInit = function() {
    Vue.prototype.$leaf = this;
  }
}