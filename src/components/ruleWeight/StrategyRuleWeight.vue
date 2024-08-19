<template>
  <div v-for="(ruleWeight, index) in strategyRuleWeightVOList" class="w-full" style="width: 250px;">
    <div class="items-center">
      <div class="mr-2">
        <span class="text-xs font-bold text-pink">抽奖阶梯{{ index + 1 }}</span>
      </div>
      <div class="progress-bar-container bg-gray-200 rounded-full h-4 relative overflow-hidden flex-grow">
        <div class="progress-bar bg-gradient-to-r from-blue-600 to-blue-400 h-4 rounded-full"
             :style="{ width: ruleWeight.ruleWeightCount/ruleWeight.userActivityAccountTotalUseCount + '%' }"></div>
        <div class="progress-label absolute right-0 top-0 h-4 flex items-center justify-end pr-1" style="width: 100%;">
          <span class="text-xs font-bold text-black">{{
              Math.min(ruleWeight.userActivityAccountTotalUseCount, ruleWeight.ruleWeightCount)
            }}/{{ ruleWeight.ruleWeightCount }}</span>
        </div>
      </div>
      <div v-if="ruleWeight.strategyAwards" class="mt-2">
        <span class="text-xs text-black">必中奖品范围：</span>
        <span v-for="(award, idx) in ruleWeight.strategyAwards" :key="award.awardId" class="text-xs text-hhh">
          {{ idx + 1 }}. {{ award.awardTitle }}&nbsp;&nbsp;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { queryRaffleStrategyRuleWeight } from '@/apis/api'

const strategyRuleWeightVOList = ref([])

onMounted(() => {
  initStrategyRuleWeightVOList()
})

async function initStrategyRuleWeightVOList () {
  const {
    userid,
    activityId
  } = JSON.parse(sessionStorage.getItem('drawContext'))
  const result = await queryRaffleStrategyRuleWeight(userid, activityId)
  const {
    code,
    info,
    data
  } = await result.data
  if (code !== '0000') {
    window.alert('获取权重信息失败 code:' + code + ' info:' + info)
  }
  console.log('初始化权重信息----', JSON.stringify(data))
  strategyRuleWeightVOList.value = data
}

</script>

<style>
.w-full {
  margin-left: 40px;
  margin-bottom: 20px;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.mr-2 {
  margin-right: 0.5rem;
}

.text-xs {
  font-size: 0.75rem;
}

.font-bold {
  font-weight: bold;
}

.text-pink {
  color: #803cf6;
}

.text-hhh {
  color: #4c51bf;
}

.bg-gray-200 {
  background-color: #edf2f7;
}

.rounded-full {
  border-radius: 9999px;
}

.h-4 {
  height: 1rem;
}

.relative {
  position: relative;
}

.overflow-hidden {
  overflow: hidden;
}

.flex-grow {
  flex-grow: 1;
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-blue-600 {
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0));
  --tw-gradient-from: #2563eb;
}

.to-blue-400 {
  --tw-gradient-to: #60a5fa;
}

.absolute {
  position: absolute;
}

.right-0 {
  right: 0;
}

.top-0 {
  top: 0;
}

.justify-end {
  justify-content: flex-end;
}

.pr-1 {
  padding-right: 0.25rem;
}

.text-black {
  color: black;
}

.mt-2 {
  margin-top: 0.5rem;
}

.progress-bar-container {
  width: 100%;
}

.progress-bar {
  width: 60%; /* This will be overridden by Vue's binding */
}

.progress-label {
  width: 100%;
}
</style>
