import Vue from "vue";
import Loading from "@/components/loading/Loading.vue";
const LoadingConstructor = Vue.extend(Loading);

const instance = new LoadingConstructor({
  el: document.createElement("div")
});

instance.show = false; // 默认隐藏

const loading = {
  show(title) {
    // 传递进来的参数
    // 显示方法
    instance.show = true;
    document.body.appendChild(instance.$el);
    if (!title) return;
    instance.title = title;
  },
  hide() {
    // 隐藏方法
    instance.show = false;
  }
};
export default {
  install() {
    if (!Vue.$loading) {
      Vue.$loading = loading;
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.$loading;
      }
    });
  }
};
