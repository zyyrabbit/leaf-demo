import * as types from '../mutation-types';

interface SettingVo {
  setting: object;
}

const state: SettingVo = {
  setting: {}
};

const actions = {
  setSetting({ commit }: any, data: object) {
    commit(types.SET_SETTING, data);
  },
};

const mutations = {
  [types.SET_SETTING](state: SettingVo, data: object) {
    state.setting = data;
  },
};

const getters = {
  setting: (state: SettingVo) => state.setting,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
