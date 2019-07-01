import * as types from '../mutation-types';
import leaf from '../../index';
import { Route } from 'vue-router';
interface MenuVo {
  menuTree?: object[] | null;
  toName?: string;
  path?: string;
  fromName?: string;
  isCollapse?: boolean;
}

const state: MenuVo = {
  menuTree: null,
  isCollapse: false,
};

const actions = {
  async getMenuTree({ commit }: any, data: any) {
    let { to , from } = data;
    let menuTree = await leaf.getMenuTree();
    commit(types.MENU_DATA_CREATE, {
      menuTree,
      toName: to.name,
      fromName: from.name,
      path: to.fullPath
    });
    return menuTree;
  },
  setCollapse({ commit }: any, data: boolean) {
    commit(types.MENU_COLLAPSE_SET, data);
  }
};

const mutations = {
  [types.MENU_DATA_CREATE](state: MenuVo, data: MenuVo) {
    state.menuTree = data.menuTree;
    state.toName = data.toName;
    state.path = data.path;
    state.fromName = data.fromName;
  },
  [types.MENU_COLLAPSE_SET](state: MenuVo, data: boolean) {
    state.isCollapse = data;
  },
};

const getters = {
  menuTree: (state: MenuVo) => state.menuTree,
  isCollapse: (state: MenuVo) => state.isCollapse,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
