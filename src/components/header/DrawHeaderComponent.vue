<template>
  <el-row :gutter="20" class="headerRow">
    <el-col :span="2" class="headerCol1">
      <img src="@/assets/title.png" style="width: 4em;height: 3.2em;"/>
    </el-col>
    <el-col :span="4" class="headerCol1">
      <span class="titleSpanClass">小柴抽奖汇</span>
    </el-col>
    <el-col :span="13" class="headerCol2"></el-col>
    <el-col :span="2" class="headerCol2">
      <span class="integralClass">
        积分值：{{ integralNum }}
      </span>
    </el-col>
    <el-col :span="2" class="headerCol2">
      <span class="signInClass">
        <el-button :disabled="signInRes === '已签到'" :color="signButtonColor" size="large" @click="signIn"
                   round>
          {{ signInRes }}
        </el-button>
      </span>
    </el-col>
    <el-col :span="1" class="headerCol2">
      <el-avatar class="avatar" size="default"
                 src="https://tse2-mm.cn.bing.net/th/id/OIP-C.PQjlzdtUm1FK79nPh7xuuQHaHa?w=217&h=217&c=7&r=0&o=5&dpr=1.3&pid=1.7">
      </el-avatar>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'

const integralNum = ref(0)
const signInRes = ref('签到')
const signButtonColor = ref('pink')

function signIn () {
  signInRes.value = '已签到'
  console.log('签到')
}

</script>

<style scoped>
.avatar {
  position: absolute; /* 使用绝对定位 */
  right: 10px; /* 距离右侧边缘的距离 */
  margin-right: 10px; /* 如果需要额外的间距，可以使用 margin */
  margin-top: 5px;
}

.signInClass {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 确保容器占满整个高度 */
}

.integralClass {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 确保容器占满整个高度 */
}

.titleSpanClass {
  font-size: 30px;
  font-weight: initial;
  padding-top: 30px;
  color: #882933;
}

.headerRow {
  height: 100%;
  padding-left: 0;
  margin-left: 0;
  padding-bottom: 10px;
}

.headerCol1 {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  background-color: #ecccd9;
}

.headerCol2 {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  background-color: #e5dfdb;
}
</style>
