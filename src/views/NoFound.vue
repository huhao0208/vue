<template>
  <div>
    <div>404</div>
    <router-link replace to="/">
      <button>返回首页</button>
    </router-link>
    <button @click="goBack">返回上一页</button>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    goBack() {
      this.$router.replace(this.from);
    }
  },
  components: {},
  beforeRouteEnter(to, from, next) {
    // 注意，在路由进入之前，组件实例还未渲染，所以无法获取this实例，只能通过vm来访问组件实例
    next(vm => (vm.from = from.path ? from.path : "/"));
  }
};
</script>

<style scoped lang="scss"></style>
