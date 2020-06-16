<template>
  <div class="map_page">
    <Navbar>地图找房</Navbar>
    <div id="container"></div>
  </div>
</template>

<script>
var map;
export default {
  props: {},
  data() {
    return {
      city: ""
    };
  },
  created() {
    this.city = JSON.parse(localStorage.getItem("city")) || {};
  },
  mounted() {
    this.createScript();
  },
  methods: {
    // 引入地图
    createScript() {
      this.$loading.show();
      // 判断是否已经引入
      if (window.BMap) return this.initMap();
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "http://api.map.baidu.com/api?v=3.0&ak=aGZLR7VmMH3wMg9uql21kHFhQ2Um0Omo&callback=init";
      document.body.appendChild(script);
      window.init = function() {
        this.initMap();
      }.bind(this);
    },
    // 初始化地图
    initMap() {
      const BMap = window.BMap;
      map = new BMap.Map("container"); // 创建Map实例
      //   const point = new window.BMap.Point(116.404, 39.915); // 创建点坐标
      map.centerAndZoom(this.city.label, 10);
      map.enableScrollWheelZoom(); //启用滚轮放大缩小
      map.enableDragging(); // 允许拖拽
      // 添加带有定位的导航控件
      const navigationControl = new BMap.NavigationControl({
        // 靠有上角位置
        anchor: window.BMAP_ANCHOR_TOP_RIGHT,
        // LARGE类型
        type: window.BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: false
      });
      map.addControl(navigationControl);
      const scaleControl = new BMap.ScaleControl({
        anchor: window.BMAP_ANCHOR_BOTTOM_LEFT
      });
      map.addControl(scaleControl);

      // 添加定位控件
      const geolocationControl = new BMap.GeolocationControl({
        anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT
      });
      geolocationControl.addEventListener("locationSuccess", function(e) {
        // 定位成功事件
        let address = "";
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        console.log("当前定位地址为：" + address);
      });
      geolocationControl.addEventListener("locationError", function(e) {
        // 定位失败事件
        console.log(e.message);
      });
      map.addControl(geolocationControl);

      this.$loading.hide();
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.map_page {
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: 50px;
  margin-top: -50px;
}
#container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
