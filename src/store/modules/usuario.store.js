import { login, profile } from "../../api/auth.js";
import Vue from "vue";

const initialState = () => ({
  usuario: {},
  role: null,
});

const state = initialState();

const getters = {};

const actions = {
  getUsuario({ dispatch, commit }) {
    // pega da api as informaçoes do usuario ja logado e enviado para auth.js
    return profile()
      .then((response) => {
        commit("UPDATE_USUARIO", response);
        commit("UPDATE_ROLE", response.role_name.descricao); //pega da API o nivel de acesso(role) do usuario
        Vue.ls.set("role", response.role_name.descricao); // seta na memoria do browser o nivel de acesso da role
      })
      .catch((error) => {
        // caso de erro, sera executado a funçao deslogarUsuario localizado em login.vue
        dispatch("deslogarUsuario");
        throw error;
      });
  },
  logarUsuario(context, payload) {
    //recebe os valor digitador no componente login para ser enviado para auth.js
    return login({
      email: payload.email,
      password: payload.senha,
    })
      .then((response) => {
        Vue.ls.set("token", `Bearer ${response.token}`); // seta na memoria do brownser o token puxado pela api
      })
      .catch((error) => {
        throw error;
      });
  },
  deslogarUsuario(context) {
    //funçao onde da acesso negado para token , rotes,
    Vue.ls.remove("token");
    Vue.ls.remove("current_route");
    context.commit("RESET");
  },
  reset({ commit }) {
    commit("RESET");
  },
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  UPDATE_USUARIO(state, payload) {
    state.usuario = Object.assign(state.usuario, payload);
  },
  UPDATE_USUARIOS(state, payload) {
    state.usuarios = payload;
  },
  UPDATE_ROLE(state, payload) {
    state.role = payload; // puxa as informaçoes da role em getUsuario e faz um payload com ela
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
