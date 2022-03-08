import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  state: {
    locale: "",
  },
  mutations: {
    UPDATE_TEMPLATE(state, payload) {
      state.template = payload;
    },
    UPDATE_LOCALE(state, payload) {
      state.locale = payload;
    },
  },
  actions: {},
});
