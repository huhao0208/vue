import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import fastclick from "fastclick";
//将根据已有的meta标签来设置缩放比例，否则会自动在html的head中添加一个meta name="viewport"的标签，同时会自动设置html的font-size为屏幕宽度除以10，也就是1rem等于html根节点的font-size）。
import "lib-flexible/flexible";

Vue.config.productionTip = false;
fastclick.attach(document.body);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
