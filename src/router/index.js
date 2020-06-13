import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Index from "../views/Index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/index",
    children: [
      { path: "/index", name: "index", component: Index },
      {
        path: "/house",
        name: "house",
        component: () =>
          import(/* webpackChunkName: "house" */ "@/views/House.vue")
      },
      { path: "/information", name: "information", component: Index },
      { path: "/my", name: "my", component: Index }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
