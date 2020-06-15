/* eslint-disable no-unused-vars */
// 导入axios
import axios from "axios";
import Vue from "vue";
import Qs from "qs";
//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时时间 单位是ms，这里设置了10s的超时时间
  timeout: 10 * 1000
});
// 2.请求拦截器
service.interceptors.request.use(
  config => {
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 3.响应拦截器
service.interceptors.response.use(
  response => {
    Vue.$loading.hide();
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    if (response.data.status !== 200) {
      Vue.$toast(response.data.description, "fail");
      return;
    }
    return response.data.body;
  },
  error => {
    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          window.location.href = "/NotFound";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes("timeout")) {
        error.message = "服务器响应超时，请刷新当前页";
      } else {
        error.message = "连接服务器失败";
      }
    }
    Vue.$toast(error.message, "error");
    // Toast.error(error.message);
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response);
  }
);

//4.导出文件
const http = (url, methods = "get", data = {}) => {
  if (data.showLoading) {
    //  console.log("显示loading");
    Vue.$loading.show();
    delete data.showLoading;
  }
  let method = methods.toLocaleUpperCase();
  method === "GET" || method === "DELETE"
    ? (url = url + "?" + Qs.stringify(data))
    : "";
  let params = {
    method,
    url,
    data
  };

  return service(params);
};

const get = (url, data) => http(url, "get", data);
const post = (url, data) => http(url, "post", data);

Vue.prototype.$get = get;
Vue.prototype.$post = post;
export default service;
