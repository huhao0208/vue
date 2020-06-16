<template>
  <transition name="slide-fade">
    <div class="loading_bg" v-show="show">
      <van-loading type="spinner" color="#1989fa">{{ title }}</van-loading>
    </div>
  </transition>
</template>

<script>
import { Loading } from "vant";
export default {
  components: {
    [Loading.name]: Loading
  },
  name: "Loading",
  props: {
    show: Boolean,
    title: {
      type: String,
      default: "正在载入..."
    }
  }
};
</script>

<style scoped lang="less">
.loading_bg {
  width: 100vw;
  height: 100vh;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
}
.van-loading {
  // width: 80px;
  height: 35px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .van-loading__spinner {
    font-weight: 800;
    width: 100%;
    height: 100%;
  }
  .van-loading__text {
    margin-top: 5px;
  }
}
</style>
