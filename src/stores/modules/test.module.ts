

interface ContainerVo {
  loading?: boolean;
  isAsideHide?: boolean;
}

const state = {
  loading: false
};

const actions = {
 
};

const mutations = {
  
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
