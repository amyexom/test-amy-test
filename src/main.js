import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import moment from 'moment'

Vue.prototype.moment = moment
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$url = "https://candidate.neversitup.com/todo/";
// Vue.prototype.$header = {
//   Authorization: "Bearer " + localStorage.getItem("tokenlg"),
// };
new Vue({
    router,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");