<template>
  <div>
    <el-container>
      <el-header class="myheader" style="margin:0;padding:0;">
        <DrawHeaderComponent/>
      </el-header>
      <el-container>
        <el-aside width="200px" style="margin:0;padding:0;background-color: azure">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;margin-left: 25px">
            <el-radio-button :value="false">展开</el-radio-button>
            <el-radio-button :value="true">关闭</el-radio-button>
          </el-radio-group>
          <el-menu
            active-text-color="#7b1aab"
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            background-color="azure"
            default-active="/"
            text-color="#5b4f4b"
            router="true"
          >
            <el-menu-item index="/" style="margin-top: 10px">
              <svg-icon icon-class="nineDraw"></svg-icon>&nbsp;
              <template #title>九宫格抽奖</template>
            </el-menu-item>
            <el-menu-item index="/raffleBox" style="margin-top: 15px">
              <svg-icon icon-class="raffleBox"></svg-icon>&nbsp;
              <template #title>抽奖箱</template>
            </el-menu-item>
            <el-menu-item index="/luckyWheelDraw" style="margin-top: 15px">
              <svg-icon icon-class="bigWheel"></svg-icon>&nbsp;
              <template #title>幸运大转盘</template>
            </el-menu-item>
            <el-menu-item index="/integralMallView" style="margin-top: 15px">
              <svg-icon icon-class="integralMall"></svg-icon>&nbsp;
              <template #title>积分商城</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="margin:0;padding:0;">
          <!-- 路由出口 -->
          <!-- 这里将会显示当前路由对应的组件内容 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { ref } from 'vue'
import DrawHeaderComponent from '@/components/header/DrawHeaderComponent.vue'

const isCollapse = ref(false)

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.myheader {
  padding: 0;
  margin: 0;
}
</style>
