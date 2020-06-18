// 全局通用组件引入
import Vue from "vue";
import { Lazyload, Image, Grid, GridItem, Icon, Button } from "vant"; // 常用的组件可以在这里引入 // 不常用的在页面单独引入

import Loading from "@/components/loading/index.js"; // 自定义loading 使用时通过this.$loading.show() $loading.hide()
import Toast from "@/components/Toast/index.js";
import navbar from "@/components/Navbar.vue"; // 引入
let Navbar = vm => vm.component("Navbar", navbar); //注册

Vue.use(Lazyload) // 挂载
  .use(Loading)
  .use(Navbar)
  .use(Toast)
  .use(Image)
  .use(Grid)
  .use(GridItem)
  .use(Button)
  .use(Icon);
