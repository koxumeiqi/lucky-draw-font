<template>
  <el-row :gutter="20" class="headerRow">
    <el-col :span="2" class="headerCol1">
      <img src="@/assets/title.png" style="width: 4em;height: 3.2em;"/>
    </el-col>
    <el-col :span="4" class="headerCol1">
      <span class="titleSpanClass">小柴抽奖汇</span>
    </el-col>
    <el-col :span="4" class="headerCol2">
      <el-button plain @click="dialogFormVisible = true" color="red" style="margin-top: 15px;">
        点我可填写抽奖上下文信息 🥰
      </el-button>
      <el-dialog v-model="dialogFormVisible" title="上下文信息" width="500">
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item label="用户ID" :label-width="formLabelWidth" prop="userid">
            <el-input v-model="form.userid" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="抽奖策略" :label-width="formLabelWidth" prop="activityId">
            <el-select v-model="form.activityId" placeholder="抽奖策略选择" style="width: 240px">
              <el-option
                v-for="item in activityList"
                :key="item.value"
                :label="item.activityName"
                :value="item.activityId"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormCancel">取消</el-button>
            <el-button type="primary" @click="dialogFormConfirm">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>
    </el-col>
    <el-col :span="2" class="headerCol2">
    </el-col>
    <el-col :span="3" class="headerCol2">
      <span class="integralClass">
        用户ID：{{ form.userid }}
      </span>
    </el-col>
    <el-col :span="3" class="headerCol2">
      <span class="integralClass">
        抽奖额度：{{ remainTimes }}
      </span>
    </el-col>
    <el-col :span="3" class="headerCol2">
      <span class="integralClass">
        积分值：{{ integralNum }}
      </span>
    </el-col>
    <el-col :span="2" class="headerCol2">
      <span class="signInClass">
        <el-button :disabled="signInRes" :color="signButtonColor" size="large" @click="signIn"
                   round>
          {{ signInRes ? '已签到' : '签到' }}
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
import { ref, onMounted, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import { events } from '@/utils/bus.js'
import { queryActivityList, queryUserCurAccount, queryUserIntegral, signInToday, isSignInToday } from '@/apis/api'

const integralNum = ref(0)
const signInRes = ref(false)
const signButtonColor = ref('pink')
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const remainTimes = ref(3)
const activityList = ref([
  {
    activityName: '哈哈哈哈',
    activityId: 100301
  }
])

const formRef = ref(null)
const rules = ref({
  userid: [
    {
      required: true,
      message: '请输入用户ID',
      trigger: 'blur'
    }
  ],
  activityId: [
    {
      required: true,
      message: '请选择抽奖策略',
      trigger: 'change'
    }
  ]
})

const form = ref({
  userid: '',
  activityId: ''
})

onBeforeMount(() => {
  events.on('drawOverEvent', (prize) => {
    console.log('触发了抽奖结束事件，抽奖结果：', prize)
    // 更新抽奖额度、抽奖积分
    flushRightNow()
  })
  events.on('integralGetProductEvent', (x) => {
    console.log('触发了积分兑换商品事件：', x)
    // 更新抽奖额度、抽奖积分
    flushRightNow()
  })
})

onMounted(() => {
  // 填充默认上下文信息，防止不知道使用者，啥信息看不着
  form.value.userid = 'myz'
  form.value.activityId = 100301
  sessionStorage.setItem('drawContext', JSON.stringify(form.value))
  console.log('上下文信息：', sessionStorage.getItem('drawContext'))
  // 请求获取抽奖策略列表
  initRaffleActivityList()
  // 先查询是否可以签到
  queryIsSignInToday()
  flushRightNow()
  openDecideIsSignIn()
})

/**
 * 10s轮询查看是否签到了
 */
function openDecideIsSignIn () {
  setInterval(async () => {
    queryIsSignInToday()
    flushRightNow()
  }, 10000)
}

/**
 * 获取抽奖策略列表
 * @returns {Promise<void>}
 */
async function initRaffleActivityList () {
  const activityListRes = await queryActivityList()
  const {
    code,
    info,
    data
  } = await activityListRes.data
  if (code !== '0000') {
    window.alert('获取抽奖活动列表失败 code:' + code + ' info:' + info)
    return
  }
  activityList.value = data
  console.log('抽奖策略列表：', JSON.stringify(activityList.value))
}

function dialogFormCancel () {
  dialogFormVisible.value = false
}

function dialogFormConfirm () {
  formRef.value.validate((valid) => {
    if (valid) {
      // 如果校验通过，执行确认操作
      // 这里可以放置提交表单的逻辑
      dialogFormVisible.value = false
      // 放入到本地存储中
      sessionStorage.setItem('drawContext', JSON.stringify(form.value))
      console.log('上下文信息：', sessionStorage.getItem('drawContext'))
      console.log('用户id存入了Session缓存中:', form.value.userid)
      console.log('抽奖策略id存入了Session缓存中:', form.value.activityId)
      // 发送信息变更事件，去更新奖品列表
      events.emit('contextInfoUpdateEvent')
      flushRightNow()
    } else {
      // 如果校验失败，不执行任何操作，Element Plus会自动显示错误提示
      ElMessage.error('请检查输入的内容是否输入完整')
      return false
    }
  })
}

async function signIn () {
  // 签到，刷新信息
  const signInResult = await signInToday(form.value.userid)
  const {
    code,
    info,
    data
  } = await signInResult.data
  if (code !== '0000' || data !== true) {
    window.alert('签到失败 code:' + code + ' info:' + info)
    return
  }
  signInRes.value = true
  if (signInRes.value) {
    signButtonColor.value = 'green'
  } else {
    signButtonColor.value = 'pink'
  }
  console.log('签到')
  flushRightNow()
}

async function queryIsSignInToday () {
  const isSignInResult = await isSignInToday(form.value.userid)
  const {
    code,
    info,
    data
  } = await isSignInResult.data
  if (code !== '0000') {
    window.alert('查询签到状态失败 code:' + code + ' info:' + info)
    return
  }
  signInRes.value = data
  console.log('签到状态：', signInRes.value)
  if (signInRes.value) {
    signButtonColor.value = 'green'
  } else {
    signButtonColor.value = 'pink'
  }
}

async function flushRightNow () {
  console.log('刷新')
  // 获取用户抽奖额度
  const userCurAccountRes = await queryUserCurAccount(form.value.userid, form.value.activityId)
  const userCurAccountData = await userCurAccountRes.data
  if (userCurAccountData.code !== '0000') {
    window.alert('获取用户抽奖额度失败 code:' + userCurAccountData.code + ' info:' + userCurAccountData.info)
    return
  }
  remainTimes.value = userCurAccountData.data.totalCountSurplus
  // 获取用户积分信息
  const userIntegralRes = await queryUserIntegral(form.value.userid)
  const userIntegralData = await userIntegralRes.data
  if (userIntegralData.code !== '0000') {
    window.alert('获取用户积分信息失败 code:' + userIntegralData.code + ' info:' + userIntegralData.info)
    return
  }
  integralNum.value = userIntegralData.data
  console.log('刷新用户抽奖额度和积分值', '抽奖额度：', remainTimes.value, '积分值：', integralNum.value)
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
  padding-bottom: 0;
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
