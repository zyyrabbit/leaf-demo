import * as types from '../mutation-types';
import { getActiveMenuListByPath } from '../../utils/index';

interface MenuVo {
  menuTree?: object[];
  toName?: string;
  path?: string;
  fromName?: string;
  isCollapse?: boolean;
  activeMenu?: MenuVo;
}

const state: MenuVo = {
  menuTree: [],
  isCollapse: false,
  activeMenu: undefined,
};

const actions = {
  createMenuData({ commit }: any, data: MenuVo) {
    commit(types.MENU_DATA_CREATE, data);
  },
  setCollapse({ commit }: any, data: boolean) {
    commit(types.MENU_COLLAPSE_SET, data);
  },
  setActiveMenu({ commit }: any, data: number) {
    commit(types.ACTIVE_MENU_SET, data);
  },
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
    let activeMenuList = getActiveMenuListByPath(state.menuTree, state.path);
    if (activeMenuList && activeMenuList.length > 0) {
      // 只pop最末级菜单
      state.activeMenu = activeMenuList.pop();
    }
  },
  [types.MENU_COLLAPSE_SET](state: MenuVo, data: boolean) {
    state.isCollapse = data;
  },
  [types.ACTIVE_MENU_SET](state: MenuVo, data: MenuVo) {
    state.activeMenu = data;
  },
};

const getters = {
  menuTree: (state: MenuVo) => state.menuTree,
  isCollapse: (state: MenuVo) => state.isCollapse,
  activeMenu: (state: MenuVo) => state.activeMenu,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
