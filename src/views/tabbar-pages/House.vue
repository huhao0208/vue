<template>
  <div>
    <Navbar
      :search="true"
      title="订单"
      @onSearch="onSearch"
      defaultValue="11111"
    >
    </Navbar>
  </div>
</template>

<script>
export default {
  name: "house",
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    onSearch(e) {
      console.log(e);
    }
  },
  components: {}
};
</script>

<style scoped lang="less"></style>
