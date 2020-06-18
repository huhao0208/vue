<template>
  <div class="nav_bar">
    <i v-show="showBack" class="back iconfont icon-back" @click="goBack"></i>
    <div v-if="search" class="center search_center">
      <div class="label" @click="() => this.$router.push('/citylist')">
        {{ city.label ? city.label : "请选择城市" }}
        <i class="iconfont icon-arrow"></i>
      </div>
      <van-search
        :value="value"
        @input="onChange"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      ></van-search>
    </div>
    <h2 v-else class="center title">
      <slot>{{ title ? title : "" }}</slot>
    </h2>
    <div class="right">
      <i
        v-if="search"
        class="iconfont icon-map"
        @click="() => this.$router.push('/map')"
      ></i>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
const tabbarpaths = ["/index", "/house"]; // tabbar 路径 用来控制不显示back
import { Search } from "vant";
export default {
  name: "Navbar",
  props: {
    title: String,
    search: Boolean,
    defaultValue: String // 默认值
  },
  data() {
    return {
      value: "",
      showBack: true,
      city: {}
    };
  },
  computed: {},
  created() {
    // 判断历史记录  // 判断是否为tabbar页面
    this.showBack =
      Boolean(window.history.length) && !tabbarpaths.includes(this.$route.path);

    // 设置 search默认值
    this.value = this.defaultValue;

    // 获取显示的城市
    this.city = JSON.parse(localStorage.getItem("city")) || {};
  },
  methods: {
    onSearch() {
      this.$emit("onSearch", this.value);
    },
    onChange(e) {
      this.value = e;
      this.$emit("onChange", this.value);
    },
    goBack() {
      // 不会刷新目标页面
      window.history.back();
      // 刷新目标页面
      //this.$router.back();
    }
  },
  components: {
    [Search.name]: Search
  }
};
</script>

<style scoped lang="less">
.nav_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  padding: 10px;
  min-height: 30px;
  background: #f6f5f6;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  .back {
    // width: 32px;
    // height: 32px;
    min-width: 26px;
    font-size: 16px;
    margin-right: 10px;
  }
  .center {
    flex: 1;
    display: flex;
    align-items: center;
    .label {
      height: 100%;
      // background: #fff;
      padding-left: 9px;
      .icon-arrow {
        padding-right: 9px;
        border-right: 1px solid #ccc;
      }
    }
    /deep/ .van-search {
      flex: 1;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      .van-search__content {
        background: inherit;
        .van-icon-clear {
          font-size: 20px;
        }
        // .van-icon-search {
        //   font-size: 22px;
        // }
      }
    }
  }
  .search_center {
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
  }
  .title {
    justify-content: center;
    font-size: 15px;
    margin: 0;
  }
  .right {
    min-width: 26px;
    .iconfont {
      font-size: 23px;
      margin-left: 10px;
    }
  }
}
</style>
