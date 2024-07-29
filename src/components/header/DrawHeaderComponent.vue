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
          <el-form-item label="抽奖策略" :label-width="formLabelWidth" prop="strategyId">
            <el-select v-model="form.strategyId" placeholder="抽奖策略选择" style="width: 240px">
              <el-option
                v-for="item in strategyList"
                :key="item.value"
                :label="item.strategyDesc"
                :value="item.strategyId"
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
    <el-col :span="5" class="headerCol2">
    </el-col>
    <el-col :span="2" class="headerCol2">
      <span class="integralClass">
        用户ID：{{ form.userid }}
      </span>
    </el-col>
    <el-col :span="2" class="headerCol2">
      <span class="integralClass">
        抽奖额度：{{ remainTimes }}
      </span>
    </el-col>
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
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const integralNum = ref(0)
const signInRes = ref('签到')
const signButtonColor = ref('pink')
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const remainTimes = ref(3)
const strategyList = ref([
  {
    strategyDesc: '哈哈哈哈',
    strategyId: 1
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
  strategyId: [
    {
      required: true,
      message: '请选择抽奖策略',
      trigger: 'change'
    }
  ]
})

const form = ref({
  userid: '',
  strategyId: ''
})

onMounted(() => {
  // todo 请求获取抽奖策略列表
  form.value.userid = 'myz'
  form.value.strategyId = 1
  localStorage.setItem('drawContext', JSON.stringify(form.value))
  console.log('上下文信息：', localStorage.getItem('drawContext'))
  // todo 获取用户积分信息
  // todo 获取用户抽奖额度
})

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
      localStorage.setItem('drawContext', JSON.stringify(form.value))
      console.log('上下文信息：', localStorage.getItem('drawContext'))
      console.log('用户id存入了Session缓存中:', form.value.userid)
      console.log('抽奖策略id存入了Session缓存中:', form.value.strategyId)
      // todo 发送信息变更事件，去更新奖品列表
    } else {
      // 如果校验失败，不执行任何操作，Element Plus会自动显示错误提示
      ElMessage.error('请检查输入的内容是否输入完整')
      return false
    }
  })
}

function signIn () {
  // todo 签到，刷新信息
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
