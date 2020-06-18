<template>
  <div class="dropdown-menu">
    <!-- 需要一个蒙层 -->
    <div class="dropdown-bg" @click="close" v-if="select != -1"></div>
    <!-- 接受参数遍历生成选择项目 -->
    <div
      class="item-list"
      :style="type === 'right' ? 'z-index:999' : ''"
      :class="dataList.length > 1 ? 'list-center' : ''"
    >
      <div
        class="item"
        :data-id="item.title"
        :class="select == index ? 'select' : ''"
        v-for="(item, index) in dataList"
        @click="openMenu(index)"
        :key="item.title"
      >
        {{ item.title }}
        <i class="iconfont icon-arrow"></i>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="item-container" v-if="select !== -1 && type === 'down'">
        <slot></slot>
      </div>
    </transition>
    <transition name="slide-move">
      <div
        class="item-container-right"
        v-if="select !== -1 && type === 'right'"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    dataList: Array // [{ title: "区域", type: "down" },]
  },
  data() {
    return {
      type: "",
      select: -1
    };
  },
  methods: {
    close() {
      //   console.log("关闭");
      this.select = -1;
      this.type = "";
    },
    // 打开菜单
    openMenu(e) {
      if (this.select === e) return this.close();
      //  console.log(e, "打开菜单");
      this.select = e;
      // 判断该元素type
      let { type } = this.dataList[e];
      // console.log(type);
      //根据type 控制展示动画
      this.type = type ? type : "down";
      this.$emit("open", this);
    },
    pickerChange(picker, values) {
      console.log(picker, values);
    },
    async getCondition() {
      let id = JSON.parse(localStorage.getItem("city")).value;
      this.pickerList = this.$get("/area/city", { id });
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.dropdown-menu {
  .dropdown-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background: rgba(50, 50, 50, 0.4);
  }
  .item-list,
  .item-container {
    position: relative;
    padding: 10px;

    background: #fff;
    z-index: 1001;
  }
  .item-container {
    height: 300px;
  }
  .item-list {
    display: flex;
    border-bottom: 0.5px solid #ccc;
    .item {
      flex: 1;
      font-size: 17px;
      color: #333;
      .icon-arrow {
        opacity: 0.4;
        font-size: 12px;
      }
    }
    .select {
      color: green;
      .icon-arrow {
        opacity: 1;
        transform: rotate(180deg);
      }
    }
  }
  .list-center {
    .item {
      text-align: center;
    }
  }
  .slide-fade-enter-active {
    opacity: 1;
    transition: all 0.6s ease;
  }
  .slide-fade-leave-active {
    opacity: 1;
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter {
    height: 0;
    opacity: 0;
  }
  .slide-fade-leave-to {
    opacity: 0;
  }
  .item-container-right {
    height: 100vh;
    width: 70vw;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1200;
    background: #fff;
  }
  .slide-move-enter {
    width: 0;
  }
  .slide-move-leave-to {
    width: 0;
  }
  .slide-move-enter-active {
    transition: all 0.3s cubic-bezier(0.4, 0.07, 0.54, 0.99);
  }
  .slide-move-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
}
</style>
