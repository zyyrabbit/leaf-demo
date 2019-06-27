import * as types from '../mutation-types';

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
  createMenuData({ commit }: any, data: MenuVo) {
    commit(types.MENU_DATA_CREATE, data);
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
    if (state.menuTree === undefined) {
      return;
    }
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
