module.exports = {
  publicPath: "/", //根路径
  devServer: {
    open: true,
    host: "localhost",
    port: 5000,
    https: false, //如果为true页面协议前缀由http改为https，并且页面会提示安全性，最好写false
    hotOnly: false, //热模块更新，添加新模块会有更好的配置
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
