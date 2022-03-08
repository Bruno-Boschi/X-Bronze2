import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueProgressBar from "vue-progressbar";
import Storage from "vue-ls";
import VueCurrencyFilter from "vue-currency-filter";
import * as filters from "./filters";

Vue.config.productionTip = false;

const progress_options = {
  color: "#75e289",
  failedColor: "#d64242",
  thickness: "4px",
};

const storage_options = {
  namespace: "xbronze2__", // key prefix
  name: "ls", // name variable Vue.[ls] or this.[$ls],
  storage: "local", // storage name session, local, memory
};

const currency_filter_options = [
  {
    // default name 'currency'
    symbol: "",
    thousandsSeparator: ".",
    fractionCount: 2,
    fractionSeparator: ",",
  },
  {
    // default name 'currency_2'
    name: "guarani",
    symbol: "",
    thousandsSeparator: ".",
    fractionCount: 0,
    fractionSeparator: ",",
  },
];

Vue.use(Storage, storage_options);
Vue.use(VueProgressBar, progress_options);
Vue.use(VueCurrencyFilter, currency_filter_options);

Vue.config.productionTip = false;

Vue.component("NaoAutorizado", () =>
  import("@/components/global/NaoAutorizado.vue")
);

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
