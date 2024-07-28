<template>
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
</template>

<script>
export default {
  data () {
    return {
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
      defaultStyle: { background: '#b8c5f2' },
      activedStyle: {
        fontColor: 'darkorange',
        fontSize: '24px'
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
      ]
    }
  },
  mounted () {
  },
  methods: {
    // 点击抽奖按钮会触发star回调
    startCallback () {
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play()
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        const index = this.randomRaffleHandle()
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(index)
      }, 2000)
    },
    // 抽奖结束会触发end回调
    endCallback (prize) {
      // 加载数据
      // 展示奖品
      this.queryRaffleAwardListHandle()
      // this.remainTimes -= 1
      // this.buttons[0].fonts[0] = { text: `剩余次数${this.remainTimes}` }
      alert('恭喜抽中奖品💐【' + prize.fonts[0].text + '】')
    },
    randomRaffleHandle () {
      const prizeIndex = Math.floor(Math.random() * 8)
      return prizeIndex
    },
    queryRaffleAwardListHandle () {
      console.log('奖品列表发生了变更')
    }
  }
}
</script>
