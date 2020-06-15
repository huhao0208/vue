import Vue from "vue";
import App from "./App.vue";
import "./utils/http.js";
import "@/assets/fonts/iconfont.css";
import router from "./router";
import fastclick from "fastclick";
//将根据已有的meta标签来设置缩放比例，否则会自动在html的head中添加一个meta name="viewport"的标签，同时会自动设置html的font-size为屏幕宽度除以10，也就是1rem等于html根节点的font-size）。
import "lib-flexible/flexible";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Lazyload } from "vant"; // 必须单独引入

import Loading from "@/components/loading/index.js"; // 自定义loading 使用时通过this.$loading.show() $loading.hide()
import Toast from "@/components/Toast/index.js";
Vue.use(Lazyload)
  .use(Loading)
  .use(Toast);

// 加载进度条配置
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 300, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
});
// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();

  next();
});

router.afterEach(() => {
  NProgress.done();
});

Vue.config.productionTip = false; // 阻止启动生产消息
fastclick.attach(document.body); // 解决手机点击延迟问题

Vue.prototype.$IMG = process.env.VUE_APP_IMG;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
