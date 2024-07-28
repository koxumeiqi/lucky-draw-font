<template>
  <div class="center-container">
    <span>九宫格</span>
  </div>
</template>

<script setup>

</script>

<style scoped>
.center-container {
  /* 设置容器高度为视口高度的100% */
  height: 100vh;
  /* 背景图片不重复且填充整个容器 */
  background-image: url("@/assets/backgroud.png");
  background-size: cover; /* 图片将被拉伸以填充整个容器 */
  background-position: center; /* 图片定位在中心 */
  background-repeat: no-repeat; /* 确保图片不重复 */
  /* 使内部元素水平和垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
