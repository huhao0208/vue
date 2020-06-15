<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      v-if="imgsData.length"
    >
      <van-swipe-item v-for="(item, index) in imgsData" :key="index">
        <img v-lazy="$IMG + item.imgSrc" />
      </van-swipe-item>
    </van-swipe>
    <!-- nav 导航 -->
    <van-grid :border="false" :column-num="4" class="nav" clickable center>
      <van-grid-item v-for="item in navs" :key="item.id" :to="item.path">
        <img :src="item.img" alt="" />
        <p>{{ item.title }}</p>
      </van-grid-item>
    </van-grid>

    <!-- 租房小组 -->
    <div class="group">
      <div class="title">
        <h3>租房小组</h3>
        <span>更多</span>
      </div>
      <van-grid
        :border="false"
        :column-num="2"
        class="group_nav"
        clickable
        center
      >
        <van-grid-item v-for="item in groupList" :key="item.id" :to="item.path">
          <div class="grid_item">
            <div class="left">
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
            <img :src="$IMG + item.imgSrc" alt="" />
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image, Grid, GridItem } from "vant";
export default {
  name: "index",
  components: {
    [Swipe.name]: Swipe,
    [Image.name]: Image,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  props: {},
  data() {
    return {
      imgsData: [],
      // 导航菜单数据
      navs: [
        {
          id: 1,
          img: require("@/assets/images/nav-1.png"),
          title: "整租",
          path: "/house"
        },
        {
          id: 2,
          img: require("@/assets/images/nav-2.png"),
          title: "合租",
          path: "/house"
        },
        {
          id: 3,
          img: require("@/assets/images/nav-3.png"),
          title: "地图找房",
          path: "/map"
        },
        {
          id: 4,
          img: require("@/assets/images/nav-4.png"),
          title: "去出租",
          path: "/house"
        }
      ],
      groupList: []
    };
  },
  computed: {},
  created() {
    this.getSwiper();
    this.getGroupList();
  },
  mounted() {},
  watch: {},
  methods: {
    // 获取轮播图
    async getSwiper() {
      this.imgsData = await this.$get("/home/swiper1", {
        showLoading: true
      });
    },
    // 获取租房小组数组
    async getGroupList() {
      this.groupList = await this.$get("/home/groups", {
        area: "AREA|88cff55c-aaa4-e2e0"
      });
    }
  }
};
</script>

<style scoped lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  width: 750px;
  height: 414px;
  background-color: #39a9ed;
  img {
    width: 100%;
    height: 100%;
  }
}
.nav {
  img {
    width: 96px;
  }
}

.group {
  background: #f6f5f6;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .group_nav {
    /deep/ .van-grid-item__content {
      background-color: inherit;
      padding: 0 20px 20px;
    }
    /deep/ .van-grid-item:nth-child(2n) {
      .van-grid-item__content {
        padding-left: 0;
      }
    }
    .grid_item {
      width: 100%;
      background: #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        margin: 20px;
      }
      .left {
        flex: 1;
        h4 {
          padding-bottom: 10px;
          margin: 0;
        }
      }
    }
  }
  // .van-grid-item__content {
  //   background: #f0f;
  //   display: flex;
  //   flex-direction: row;
  //   // margin: 0 10px;
  //   img {
  //     width: 110px;
  //     height: 110px;
  //     border-radius: 50%;
  //   }
  //   .left {
  //     flex: 1;
  //   }
  // }
}
</style>
