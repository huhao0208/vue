<template>
  <div class="list-item">
    <!-- {{source}} -------- -->
    <img :src="$IMG + source.houseImg" alt />
    <div class="right">
      <h3>{{ source.title }}</h3>
      <p>{{ source.desc }}</p>
      <div class="tags">
        <span v-for="tag in source.tags" :key="tag">{{ tag }}</span>
      </div>
      <p class="price">{{ source.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    source: Object,
    default() {
      return {};
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
.list-item {
  display: flex;
  padding: 10px;
  align-items: center;
  border-bottom: 0.5px solid #eee;
  img {
    width: 106px;
    height: 100%;
    margin-right: 10px;
  }
  .right {
    flex: 1;
    h3 {
      margin: 0;
    }
  }
}
</style>
