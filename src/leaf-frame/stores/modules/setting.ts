import * as types from '../mutation-types';

interface SettingVO {
  [key: string]: any;
}

const state: SettingVO = {};

const actions = {
  setSetting({ commit }: any, data: object) {
    commit(types.SET_SETTING, data);
  },
};

const mutations = {
  [types.SET_SETTING](state: SettingVO, data: object) {
    Object.assign(state, data);
  },
};

const getters = {
  setting: (state: SettingVO) => state,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
