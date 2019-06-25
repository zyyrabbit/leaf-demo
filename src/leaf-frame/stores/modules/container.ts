import * as types from '../mutation-types';

interface ContainerVo {
  loading?: boolean;
  isAsideHide?: boolean;
}

const state = {
  loading: false
};

const actions = {
  createLoading({ commit }: any) {
    commit(types.CONTAINER_LOADING_DATA_CREATE);
  },
  createLoaded({ commit }: any) {
    commit(types.CONTAINER_LOADED_DATA_CREATE);
  }
};

const mutations = {
  [types.CONTAINER_LOADING_DATA_CREATE](state: ContainerVo) {
    state.loading = true;
  },
  [types.CONTAINER_LOADED_DATA_CREATE](state: ContainerVo) {
    state.loading = false;
  }
};

const getters = {
  loading: (state: ContainerVo) => state.loading
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
