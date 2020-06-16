import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/tabbar-pages/Home.vue";
import Index from "../views/tabbar-pages/Index.vue";
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
          import(
            // 区分打包
            /* webpackChunkName: "house" */ "@/views/tabbar-pages/House.vue"
          )
      },
      { path: "/information", name: "information", component: Index },
      { path: "/my", name: "my", component: Index }
    ]
  },
  {
    path: "/citylist",
    name: "citylist",
    component: () =>
      import(
        /*webpackChunkName:"citylist" */ "@/views/house-pages/CityList.vue"
      )
  },
  {
    path: "/map",
    name: "map",
    component: () =>
      import(/*webpackChunkName:"map" */ "@/views/house-pages/Map.vue")
  },

  {
    path: "*",
    name: "404",
    component: () => import("@/views/NoFound.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
