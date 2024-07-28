<template>
  <router-view/>
</template>

<style>
body {
  /* ... 其他样式 ... */

  /* 定义滚动条的整体样式 */

  &::-webkit-scrollbar {
    width: 5px; /* 滚动条的宽度 */
  }

  /* 定义滚动条轨道的样式 */

  &::-webkit-scrollbar-track {
    background-color: rgb(236, 204, 217); /* 轨道背景颜色 */
    border-radius: 6px; /* 轨道圆角 */
  }

  /* 定义滚动条滑块的样式 */

  &::-webkit-scrollbar-thumb {
    background-color: #ecccd9; /* 滑块颜色 */
    border-radius: 6px; /* 滑块圆角 */
  }

  /* 当鼠标悬停在滑块上时的样式 */

  &::-webkit-scrollbar-thumb:hover {
    background-color: #d54978; /* 悬停时滑块的颜色 */
  }
}
</style>
