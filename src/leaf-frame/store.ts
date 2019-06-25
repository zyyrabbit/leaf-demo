import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import {
  menuModule,
  containerModule,
  theme,
  setting
} from './stores/modules';
const DEBUG = process.env.NODE_ENV === 'development';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu: menuModule,
    container: containerModule,
    theme,
    setting
  },
  strict: DEBUG,
  plugins: DEBUG ? [createLogger({})] : [],
});
