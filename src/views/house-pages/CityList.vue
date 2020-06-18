<template>
  <div>
    <Navbar>城市选择</Navbar>
    <van-index-bar :index-list="indexList">
      <div v-for="item in indexList" :key="item">
        <van-index-anchor :index="item">{{
          item | formatIndex
        }}</van-index-anchor>
        <div
          class="city_item"
          v-for="it in list[item]"
          :key="it.value"
          @click="select(it)"
        >
          {{ it.label }}
        </div>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { IndexBar, IndexAnchor } from "vant";
let canSelectList = [];
export default {
  name: "citylist",
  props: {},
  data() {
    return {
      list: [],
      indexList: ["#", "热"] // 索引列表
    };
  },
  computed: {},
  created() {
    const current = JSON.parse(localStorage.getItem("city")) || [];
    this.$set(this.list, "#", [current]);
    this.getCityList();
    this.getHotList();
  },
  mounted() {
    // 获取有房源城市列表
    this.getHasList();
  },
  methods: {
    async getCityList() {
      const cityList = await this.$get("/area/city", { level: 1 });
      let citys = {};
      // 将数据改造成对象
      cityList.forEach(item => {
        let key = item.short.slice(0, 1).toUpperCase();
        citys[key] = citys[key] ? [...citys[key], item] : [item];
      });

      this.list = { ...this.list, ...citys };
      let index = Object.keys(citys).sort();
      this.indexList = [...this.indexList, ...index];
    },
    async getHotList() {
      const hotList = await this.$get("/area/hot");
      // this.list.set("hot", hotList);
      this.$set(this.list, "热", hotList);
    },
    select(e) {
      // 判断是否有房源
      let res = canSelectList.findIndex(item => item.value == e.value);
      if (res === -1) return this.$toast("当前城市暂无房源信息");
      localStorage.setItem("city", JSON.stringify(e));
      this.$toast("选择成功", "success", 0.6);
      this.$router.go(-1);
    },
    async getHasList() {
      canSelectList = await this.$get("/area/hot");
    }
  },
  components: {
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor
  },
  filters: {
    formatIndex(value) {
      let val = "";
      switch (value) {
        case "#":
          val = "当前定位";
          break;
        case "热":
          val = "热门城市";
          break;
        default:
          val = value;
      }
      return val;
    }
  }
};
</script>

<style scoped lang="less">
/deep/ .van-index-bar {
  .van-index-anchor {
    background: rgba(233, 233, 233, 0.1);
    color: #666;
  }
  .city_item {
    border-bottom: 0.5px solid #eee;
    font-size: 18px;
    padding: 20px 16px;
  }
  .van-index-bar__index {
    padding: 3px;
    margin: 1px 10px;
    color: #000;
    font-size: 14px;
    .van-index-bar__index--active {
    }
  }
  .van-index-bar__index--active {
    background: green;
    border-radius: 50%;
  }
}
</style>
