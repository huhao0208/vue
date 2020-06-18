<template>
  <div class="house-page">
    <Navbar
      :search="true"
      title="订单"
      @onSearch="onSearch"
      defaultValue="11111"
      ref="navbar"
    ></Navbar>
    <DropdownMenu
      :dataList="listData"
      @open="select"
      ref="dropMenuRef"
      :class="isStick ? 'dm-stick' : ''"
    >
      <template v-if="current.type === 'down'">
        <van-picker :columns="columns"></van-picker>
        <div class="btn">
          <van-button>确定</van-button>
          <van-button>确定</van-button>
        </div>
      </template>
      <template v-else>3333333333</template>
    </DropdownMenu>
    <!-- 底部列表 -->

    <!-- <div class="list-item" v-for="item in houseDataList" :key="item.houseCode">
      <img :src="$IMG+item.houseImg" alt />
      <div class="right">
        <h3>{{item.title}}</h3>
        <p>{{item.desc}}</p>
        <div class="tags">
          <span v-for="tag in item.tags" :key="tag">{{tag}}</span>
        </div>
        <p class="price">{{item.price}}</p>
      </div>
    </div>-->

    <virtual-list
      ref="virtualRef"
      class="list-dynamic scroll-touch"
      :data-key="'title'"
      :data-sources="houseDataList"
      :data-component="Item"
      :estimate-size="80"
      @tobottom="getMore"
      @scroll="listScroll"
      :item-class="'list-item-dynamic'"
    ></virtual-list>
  </div>
</template>

<script>
let menuTop = 0;
let timer,
  trigger = true;
import VirtualList from "vue-virtual-scroll-list";
import item from "./item";
import DropdownMenu from "@/components/DropdownMenu.vue";
import { Picker } from "vant";
export default {
  name: "house",
  props: {},
  data() {
    return {
      Item: item,
      isStick: false, // 是否吸顶
      houseDataList: [],
      city: {}, // 当前城市
      listData: [
        { title: "区域", type: "down" },
        { title: "方式", type: "down" },
        { title: "租金", type: "down" },
        { title: "筛选", type: "right" }
      ],
      condition: {},
      current: {
        select: "",
        type: ""
      },
      columns: []
    };
  },
  computed: {},
  created() {
    //   console.log(this.$refs.navbar); // 这里获取不到子组件的值
    // 所以通过本地存储获取
    this.city = JSON.parse(localStorage.getItem("city"));
    this.getHouseDataList();
  },

  mounted() {
    this.getCondition();
    window.addEventListener("scroll", this.onScroll);
    // 获取DropdownMenu 距离顶部距离
    this.$nextTick(() => {
      menuTop = this.$refs.dropMenuRef.$el.offsetTop;
    });
  },
  methods: {
    onSearch(e) {
      console.log(e);
    },
    select(e) {
      console.log(e.select, e.type);
      const { select, type } = e;
      this.current = { select, type };
      switch (select) {
        case 0:
          this.columns = [this.condition.area, this.condition.subway];
          break;
        case 1:
          this.columns = this.condition.rentType;
          break;
        case 2:
          this.columns = this.condition.price;
          break;
        default:
          this.columns = this.condition;
      }
    },
    // 获取区域 houses/condition
    async getCondition() {
      const res = await this.$get("/houses/condition", {
        id: this.city.value
      });
      // // 数据改造
      this.formatData(res);
      console.log(res);

      this.condition = res;
    },
    // 改造数据函数
    formatData(obj) {
      // 先判断是否为对象
      if (typeof obj === "object") {
        for (let key in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, key)) return;
          if (key === "label") {
            obj.text = obj[key];
            delete obj[key];
          }
          this.formatData(obj[key]);
        }
      }
    },
    async getHouseDataList() {
      const { list } = await this.$get("/houses", {
        cityId: this.city.value
      });
      this.houseDataList = list;
    },
    onScroll() {
      // 优化 // 节流
      if (!trigger) return;
      trigger = false;
      clearTimeout(timer);
      timer = setTimeout(() => {
        trigger = true;
        if (window.scrollY >= menuTop - 20) {
          if (this.isStick) return;
          console.log("需要吸顶");
          this.isStick = true;
        } else {
          if (!this.isStick) return;
          console.log("不需要吸顶");
          this.isStick = false;
        }
      }, 100);
    },
    // 触底获取更多
    getMore() {
      console.log("daodi l ");
    },
    listScroll() {
      let scrollY = this.$refs.virtualRef.getOffset();
      document.documentElement.scrollTop = scrollY < menuTop ? 0 : menuTop;
      // 如果滚动距离 小于 menuTop 则控制 外层也跟着滚动

      //  this.$resf.virtualRef.getOffset()
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  components: {
    DropdownMenu,
    "virtual-list": VirtualList,
    "van-picker": Picker
  }
};
</script>

<style scoped lang="less">
.house-page {
  height: 100%;
}
.btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  .van-button {
    flex: 1;
  }
}
/deep/ .van-picker {
  height: 100%;
  .van-picker-column__item--selected {
    border-bottom: 1px solid #eee;
  }
}

/deep/ .van-picker__columns {
  height: 220px !important;
}
.dm-stick {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 1111;
}
.list-dynamic {
  height: 100vh;
  box-sizing: border-box;
  //  padding-bottom: 50px;
  overflow-y: auto;
}
</style>
