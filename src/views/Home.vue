<template>
  <div class="home">
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/house" icon="search">找房</van-tabbar-item>
      <van-tabbar-item replace to="/information" icon="friends-o"
        >咨询</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="setting-o">我的</van-tabbar-item>
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
      active: 0
    };
  },
  methods: {}
};
</script>

<style lang="less"></style>
