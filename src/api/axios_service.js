import Vue from "vue";
import router from "@/router";
import axios from "axios";
import store from "@/store/index.js";

const url = process.env.VUE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: url + "/api",
});

axiosInstance.interceptors.request.use(
  //interceptador do axios para pegar as infomaçoes do auth.js e introduzir o token recebido da API no headers da response
  function (config) {
    const token = Vue.ls.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// const last_route = Vue.ls.get("last_route");

// interceptor to catch errors
const errorInterceptor = (error) => {
  //interceptador de erros, caso retorne algum erro da api, sera informado na tela de acordo com os numeros setados

  // all the error responses
  if (!error.response) {
    Vue.prototype.$toast.error("Sem acesso ao servidor");
  } else {
    switch (error.response.status) {
      case 400:
        Vue.prototype.$toast.error("Sem conexão");
        break;
      case 401: // authentication error, logout the user
        Vue.prototype.$toast.error("Não autorizado");

        store.dispatch("Usuario/deslogarUsuario");

        if (
          router.currentRoute.name != "login" &&
          router.currentRoute.name != "cadastro"
        ) {
          router.push({ path: "/login" });
        }

        break;
      case 403:
        Vue.prototype.$toast.error("Acesso não autorizado!");
        break;
      case 422:
        break;
      case 404: {
        break;
      }
      case 409: {
        break;
      }

      default:
        Vue.prototype.$toast.error("Sem conexão");
    }
  }

  return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = (response) => {
  switch (response.status) {
    case 200:
      // yay!
      break;
    default:
    // default case
  }

  return response;
};

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor); // aqui esta sendo chamado com "use" os interceptadores

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body); // aqui ele recebe os valores do auth.js e manda para a api e a api retornar algo
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
};

export default api;
