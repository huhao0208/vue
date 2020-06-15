<template>
  <div class="loading_bg" :hidden="!show">
    <van-loading type="spinner" color="#1989fa">{{ title }}</van-loading>
  </div>
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
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
}
.van-loading {
  // width: 80px;
  height: 70px;
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
    margin-top: 10px;
  }
}
</style>
