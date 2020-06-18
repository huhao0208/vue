<template>
  <div>
    <!-- 顶部搜索栏 -->
    <Navbar search></Navbar>
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      lazy-render
    >
      <van-swipe-item v-for="(item, index) in imgsData" :key="index">
        <van-image fit="fill" :lazy-load="false" :src="$IMG + item.imgSrc" />
      </van-swipe-item>
    </van-swipe>
    <!-- nav 导航 -->
    <van-grid :border="false" :column-num="4" class="nav" clickable center>
      <van-grid-item v-for="item in navs" :key="item.id" :to="item.path">
        <img :src="item.img" alt />
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
            <img :src="$IMG + item.imgSrc" alt />
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 最新资讯 -->
    <div class="group news">
      <div class="title">
        <h3>最新资讯</h3>
        <span>更多</span>
      </div>

      <div class="news_card" v-for="item in newsList" :key="item.id">
        <img :src="$IMG + item.imgSrc" alt />
        <div class="right">
          <h4>{{ item.title }}</h4>
          <div class="bottom">
            <span>{{ item.from }}</span>
            <span>{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  name: "index",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
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
      groupList: [],
      newsList: []
    };
  },
  computed: {},
  created() {
    this.getSwiper();
    this.getGroupList();
    this.getNews();
    console.log("created");
  },
  mounted() {
    console.log("mouted");
  },
  activated() {
    // 数据更新放这里
    console.log("activated");
  },
  watch: {},
  methods: {
    // 获取轮播图
    async getSwiper() {
      this.imgsData = await this.$get("/home/swiper", {
        showLoading: true
      });
    },
    // 获取租房小组数组
    async getGroupList() {
      this.groupList = await this.$get("/home/groups", {
        area: "AREA|88cff55c-aaa4-e2e0",
        showLoading: true
      });
    },
    // 最新资讯
    async getNews() {
      this.newsList = await this.$get("/home/news", {
        area: "AREA|88cff55c-aaa4-e2e0",
        showLoading: true
      });
    }
  }
};
</script>

<style scoped lang="less">
.home .nav_bar {
  position: absolute;
  // position: sticky;
  // top: -50px;
  background: transparent;
}
.my-swipe {
  margin-top: -50px;
  width: 100vw;
  height: 60vw;
  background-color: rgba(148, 197, 243, 0.363);
  .van-swipe-item {
    color: #fff;
    width: 100%;
    //  height: 207px;
    line-height: 207px;
    background-color: rgba(148, 197, 243, 0.363);
    .van-image {
      width: 100vw;
      height: 60vw;
    }
  }
}
.nav {
  img {
    width: 48px;
  }
}

.group {
  background: #f6f5f6;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 7px;
  }
  .group_nav {
    /deep/ .van-grid-item__content {
      background-color: inherit;
      padding: 0 10px 10px;
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
        width: 55px;
        height: 55px;
        border-radius: 50%;
        margin: 10px;
      }
      .left {
        flex: 1;
        h4 {
          padding-bottom: 5px;
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
.news {
  background: #fff;
  .news_card {
    display: flex;
    padding: 10px;
    border-bottom: 0.5px solid #eee;
    img {
      width: 120px;
      margin-right: 10px;
    }
    .right {
      flex: 1;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h4 {
        margin: 0;
        font-size: 14px;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        color: #9c9fa1;
        font-size: 12px;
      }
    }
  }
}
</style>
