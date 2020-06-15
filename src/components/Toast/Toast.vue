<template>
  <div class="toast" v-if="show">
    <van-icon name="success" v-if="type === 'success'" />
    <van-icon name="fail" v-if="type === 'fail'" />
    <van-icon name="cross" v-if="type === 'error'" />
    <span class="toast_text">
      {{ title }}
    </span>
  </div>
</template>

<script>
import { Icon } from "vant";

export default {
  name: "Toast",
  props: {
    title: String,
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: true
    };
  },
  components: {
    [Icon.name]: Icon
  }
};
</script>

<style scoped lang="less">
.toast {
  text-align: center;
  padding: 20px 10px;
  color: #fff;
  font-size: 25px;
  max-width: 200px;
  min-width: 160px;
  background: rgba(100, 100, 100, 0.9);
  position: fixed;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .toast_text {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .van-icon {
    font-size: 80px;
  }
}
</style>
