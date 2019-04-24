import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/main.css";
import i18n from './i18n'
// import { Pagination } from "vue-pagination-2";

// Vue.component("pagination", Pagination);

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
