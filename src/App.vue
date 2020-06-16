<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang="less">
body {
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  touch-action: none; // 阻止触摸浏览器报错
  padding-top: 50px;
  box-sizing: border-box;
  height: 100vh;
  p {
    margin: 0;
    padding: 0;
  }
}
</style>
