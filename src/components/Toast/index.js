import Toast from "./Toast.vue";
import Vue from "vue";
// 将组建挂载到vue上
const toastConstructor = Vue.extend(Toast);
// 声明构造函数的变量 定时器变量
let instance;
let timer = null;
let ToastC = (title, type, duration = 1.5) => {
  // console.log(options);
  if (!instance) {
    instance = new toastConstructor();
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
  }
  instance.show = false;
  clearTimeout(timer);
  instance.show = true;
  // if (typeof options === "string") {
  //   instance.title = options;
  // } else if (typeof options === "object") {
  //   options.duration && (time = options.duration);
  //   options.type && (instance.type = options.type);
  //   instance.title = options.title;
  // } else {
  //   return;
  // }
  instance.title = title;
  instance.type = type;
  timer = setTimeout(() => {
    instance.show = false;
    clearTimeout(timer);
  }, duration * 1000);
};
ToastC.install = Vue => {
  if (Vue.$loading) Vue.$loading.hide();
  if (!Vue.$toast) {
    Vue.$toast = ToastC;
  }
  Vue.mixin({
    created() {
      this.$toast = Vue.$toast;
    }
  });
};
export default ToastC;
