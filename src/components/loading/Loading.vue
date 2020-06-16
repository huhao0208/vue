<template>
  <transition name="fade">
    <div class="loading_bg" v-if="show">
      <van-loading type="spinner" color="#01f9ff">{{ title }}</van-loading>
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
  background: rgba(255, 255, 255, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
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
    margin: 10px 0;
    max-width: 90px;
    text-align: center;
    color: #999;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.7s;
  }
  .fade-enter,
   .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
