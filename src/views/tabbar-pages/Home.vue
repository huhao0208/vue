<template>
  <div class="home">
    <router-view />
    <van-tabbar v-model="active" safe-area-inset-bottom border>
      <van-tabbar-item
        v-for="(item, index) in tabarList"
        :key="index"
        replace
        :to="{ path: item.path }"
      >
        <template #icon="props">
          <i
            :class="
              'iconfont icon-' + item.icon + (props.active ? ' active' : '')
            "
          />
        </template>
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import { Grid, GridItem, Button, Tabbar, TabbarItem } from "vant";
export default {
  name: "Home",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  data() {
    return {
      active: 0,
      tabarList: [
        { path: "/index", title: "首页", icon: "ind" },
        { path: "/house", title: "找房", icon: "findHouse" },
        { path: "/information", title: "咨询", icon: "infom" },
        { path: "/my", title: "我的", icon: "my" }
      ]
    };
  },
  created() {
    // 页面初始选中的
    let index = this.tabarList.findIndex(
      item => item.path === this.$route.path
    );
    this.active = index;
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
.van-tabbar {
  z-index: 999;
  height: 50px;
  border-top: 0.5px solid #eee;
  background: rgb(250, 249, 249);
  .iconfont {
    font-size: 20px;
  }
}
.home {
  padding-bottom: 50px;
}
</style>
