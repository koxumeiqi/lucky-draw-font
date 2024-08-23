<template>
  <div class="center-container">
    <!--    <div class="drawContent-container">
          <span class="remainTimesClass">
            抽奖剩余次数：
            <span style="font-weight: bold;color: darkgoldenrod">{{ remainTimes }}</span>
          </span>
        </div>-->
    <div class="nineDraw-container">
      <div>
        <LuckyGrid
          ref="myLucky"
          width="300px"
          height="300px"
          rows="3"
          cols="3"
          :prizes="prizes"
          :default-style="defaultStyle"
          :active-style="activedStyle"
          :buttons="buttons"
          @start="startCallback"
          @end="endCallback"
        />
      </div>
      <div>
        <StrategyRuleWeight/>
      </div>
    </div>
    <div class="awardContent-container">
      <span class="remainTimesClass">
        奖品列表
      </span>
    </div>
    <div class="scrollCenterClass">
      <vue3ScrollSeamless
        class="scroll-wrap border text-color"
        :classOptions="classOptions"
        :dataList="awardList"
      >
        <ul class="ui-wrap">
          <li class="li-item" v-for="(item,i) of awardList" :key="i">
            <p>用户ID为
              <span style="color: orangered">{{ item.userId }}</span>
              在
              {{ item.awardTime }}
              抽到
              <span style="color: orangered">{{
                  item.awardTitle
                }}</span>
              ,奖品{{ item.awardStateDesc }}</p>
          </li>
          <li v-if="awardList.length == 0"
              style="width: 100%;height: 100px;display: flex;justify-content: center;align-items: center;color: white;font-size: 18px;">
            暂无预测记录
          </li>
        </ul>
      </vue3ScrollSeamless>
    </div>
  </div>
</template>

<script>

import { draw, queryRaffleAwardList, queryActivityAwards } from '@/apis/api'
import { events } from '@/utils/bus.js'
import StrategyRuleWeight from '@/components/ruleWeight/StrategyRuleWeight.vue'

export default {
  components: { StrategyRuleWeight },
  data () {
    return {
      awardList: [],
      classOptions: {
        step: 0.5,
        direction: 1
      },
      buttons: [
        {
          x: 1,
          y: 1,
          shadow: '3',
          imgs: [{
            src: 'raffle-button.png',
            width: '100px',
            height: '100px'
          }]
        }
      ],
      remainTimes: 3,
      defaultStyle: { background: '#4f1e8a' },
      activedStyle: {
        fontColor: 'pink',
        fontSize: '10px'
      },
      prizes: [
        {
          x: 0,
          y: 0,
          fonts: [{
            text: '1',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: 'raffle-award-00.png',
            width: '100px',
            height: '100px',
            activeSrc: 'raffle-award-00.png'
          }]
        },
        {
          x: 1,
          y: 0,
          fonts: [{
            text: '2',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: 'raffle-award-01.png',
            width: '100px',
            height: '100px',
            activeSrc: 'raffle-award-01.png'
          }]
        },
        {
          x: 2,
          y: 0,
          fonts: [{
            text: '3',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: 'raffle-award-02.png',
            width: '100px',
            height: '100px',
            activeSrc: 'raffle-award-02.png'
          }]
        },
        {
          x: 2,
          y: 1,
          fonts: [{
            text: '4',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: 'raffle-award-12.png',
            width: '100px',
            height: '100px',
            activeSrc: 'raffle-award-12.png'
          }]
        },
        {
          x: 2,
          y: 2,
          fonts: [{
            text: '5',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: 'raffle-award-22.png',
            width: '100px',
            height: '100px',
            activeSrc: 'raffle-award-22.png'
          }]
        },
        {
          x: 1,
          y: 2,
          fonts: [{
            text: '6',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: 'raffle-award-21.png',
            width: '100px',
            height: '100px',
            activeSrc: 'raffle-award-21.png'
          }]
        },
        {
          x: 0,
          y: 2,
          fonts: [{
            text: '7',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: 'raffle-award-20.png',
            width: '100px',
            height: '100px',
            activeSrc: 'raffle-award-20.png'
          }]
        },
        {
          x: 0,
          y: 1,
          fonts: [{
            text: '8',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: 'raffle-award-10.png',
            width: '100px',
            height: '100px',
            activeSrc: 'raffle-award-10.png'
          }]
        }
      ],
      flagEmit: false// 用来判断是否发了抽奖结束事件的
    }
  },
  beforeMount () {
    events.on('contextInfoUpdateEvent', (x) => {
      console.log('触发了上下文信息变更事件：', x)
      this.initActivityAwards()
    })
  },
  mounted () {
    this.initPrize()
    this.initActivityAwards()
    this.classOptions.limitMoveNum = this.awardList.length
  },
  methods: {
    async initActivityAwards () {
      const {
        activityId
      } = JSON.parse(sessionStorage.getItem('drawContext'))
      const result = await queryActivityAwards(activityId)
      const {
        code,
        info,
        data
      } = await result.data
      if (code !== '0000') {
        window.alert('获取到奖品结果信息失败 code:' + code + ' info:' + info)
      }
      this.awardList = data
      console.log('获取到奖品结果信息成功 ', JSON.stringify(this.awardList))
    },
    async initPrize () {
      const {
        userid,
        activityId
      } = JSON.parse(sessionStorage.getItem('drawContext'))
      const result = await queryRaffleAwardList(userid, activityId)
      const {
        code,
        info,
        data
      } = await result.data
      if (code !== '0000') {
        window.alert('获取到奖品信息失败 code:' + code + ' info:' + info)
      }
      // 遍历prizes
      for (let i = 0; i < this.prizes.length; i = i + 1) {
        if (data[i]) {
          this.prizes[i].fonts[0].text = data[i].awardTitle
        }
      }
    },
    // 点击抽奖按钮会触发star回调
    startCallback () {
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play()
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        // 抽奖接口
        this.randomRaffleHandle().then(prizeIndex => {
          // 调用stop停止旋转并传递中奖索引
          // 发送抽奖事件
          if (!this.flagEmit) {
            events.emit('drawOverEvent', prizeIndex)
            events.emit('strategyRuleWeightRefresh', prizeIndex)
            this.flagEmit = true
          }
          this.$refs.myLucky.stop(prizeIndex)
        }
        )
      }, 2000)
    },
    // 抽奖结束会触发end回调
    endCallback (prize) {
      // 加载数据
      // 展示奖品
      // 获取奖品信息
      this.queryRaffleAwardListHandle()
      // 抽奖完发送事件，更新抽奖额度、抽奖分数
      this.remainTimes = this.queryRemainTImes()
      this.flagEmit = false
      alert('恭喜抽中奖品💐【' + prize.fonts[0].text + '】')
    },
    async randomRaffleHandle () {
      const {
        userid,
        activityId
      } = JSON.parse(sessionStorage.getItem('drawContext'))
      const result = await draw(userid, activityId)
      const {
        code,
        info,
        data
      } = await result.data
      if (code !== '0000') {
        window.alert('随机抽奖失败 code:' + code + ' info:' + info)
        return
      }
      console.log('抽奖结果信息：', JSON.stringify(data))
      // 为了方便测试，mock 的接口直接返回 awardIndex 也就是奖品列表中第几个奖品。
      return data.awardIndex - 1
    },
    queryRaffleAwardListHandle () {
      console.log('奖品列表发生了变更')
      this.initActivityAwards()
    },
    queryRemainTImes () {
      this.remainTimes -= 1
      return this.remainTimes
    }
  }
}
</script>
<style scoped>
.center-container {
  /* 设置容器高度为视口高度的100% */
  height: 100vh;
  /* 背景图片不重复且填充整个容器 */
  background-image: url("@/assets/backgroud.png");
  background-size: cover; /* 图片将被拉伸以填充整个容器 */
  background-repeat: no-repeat; /* 确保图片不重复 */
  margin: 0;
  padding: 0;
}

.nineDraw-container {
  /* 使内部元素水平和垂直居中 */
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 120px;
}

.drawContent-container {
  /* 使内部元素水平和垂直居中 */
  display: flex;
  justify-content: center;
  padding-top: 120px;
  padding-bottom: 25px;
}

.awardContent-container {
  /* 使内部元素水平和垂直居中 */
  display: flex;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 5px;
  margin: 0;
}

.remainTimesClass {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #ecccd9;
  border: 1px solid #ecccd9;
  border-radius: 10px;
}

.scrollCenterClass {
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-wrap {
  height: 180px;
  width: 450px;
  margin-top: 10px;
  margin-left: 5px;
  overflow: hidden;
  background-color: rgba(241, 217, 128, 0.5);
}

.ui-wrap {
  list-style: none;
  padding-left: 25px;
  margin: 0 auto;
}

.border {
  border: 1px solid rgb(221, 193, 13);
  border-radius: 10px;
}

.text-color {
  color: rgb(27, 100, 107);
}

.li-item {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  font-size: small;
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}

</style>
