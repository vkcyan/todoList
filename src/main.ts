import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Message from "./template/Message";
Vue.config.productionTip = false;
Vue.prototype.$message = Message;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

// router.beforeEach()
