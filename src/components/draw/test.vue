<template>
  <LuckyGrid
    ref="myLucky"
    width="300px"
    height="300px"
    rows="3"
    cols="3"
    :prizes="prizes"
    :defaultStyle="defaultStyle"
    :buttons="buttons"
    :onStart="startRaffle"
    :onEnd="raffleOver">
  </LuckyGrid>
</template>

<script>
export default {
  data () {
    return {
      buttons: [
        {
          x: 1,
          y: 1,
          background: '#7f95d1',
          shadow: '3',
          imgs: [{
            src: '@/assets/award/raffle-button.png',
            width: '100px',
            height: '100px'
          }]
        }
      ],
      defaultStyle: [{ background: '#b8c5f2' }],
      prizes: [
        {
          x: 0,
          y: 0,
          fonts: [{
            text: 'data[0].awardTitle',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: '@/assets/award/raffle-award-00.png',
            width: '100px',
            height: '100px',
            activeSrc: '@/assets/award/raffle-award-00.png'
          }]
        },
        {
          x: 1,
          y: 0,
          fonts: [{
            text: 'data[1].awardTitle',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: '@/assets/award/raffle-award-01.png',
            width: '100px',
            height: '100px',
            activeSrc: '@/assets/award/raffle-award-01.png'
          }]
        },
        {
          x: 2,
          y: 0,
          fonts: [{
            text: 'data[2].awardTitle',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: '@/assets/award/raffle-award-02.png',
            width: '100px',
            height: '100px',
            activeSrc: '@/assets/award/raffle-award-02.png'
          }]
        },
        {
          x: 2,
          y: 1,
          fonts: [{
            text: 'data[3].awardTitle',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: '@/assets/award/raffle-award-12.png',
            width: '100px',
            height: '100px',
            activeSrc: '@/assets/award/raffle-award-12.png'
          }]
        },
        {
          x: 2,
          y: 2,
          fonts: [{
            text: 'data[4].isAwardUnlock ? data[4].awardTitle : \'再抽奖\' + data[4].waitUnLockCount + \'次解锁\'',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: '@/assets/award/raffle-award-22.png',
            width: '100px',
            height: '100px',
            activeSrc: '@/assets/award/raffle-award-22.png'
          }]
        },
        {
          x: 1,
          y: 2,
          fonts: [{
            text: 'data[5].isAwardUnlock ? data[5].awardTitle : \'再抽奖\' + data[5].waitUnLockCount + \'次解锁\'',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: '@/assets/award/raffle-award-21.png',
            width: '100px',
            height: '100px',
            activeSrc: '@/assets/award/raffle-award-21.png'
          }]
        },
        {
          x: 0,
          y: 2,
          fonts: [{
            text: 'data[6].isAwardUnlock ? data[6].awardTitle : \'再抽奖\' + data[6].waitUnLockCount + \'次解锁\'',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: '@/assets/award/raffle-award-20.png',
            width: '100px',
            height: '100px',
            activeSrc: '@/assets/award/raffle-award-20.png'
          }]
        },
        {
          x: 0,
          y: 1,
          fonts: [{
            text: 'data[7].awardTitle',
            top: '80%',
            fontSize: '12px',
            fontWeight: '800'
          }],
          imgs: [{
            src: '@/assets/award/raffle-award-10.png',
            width: '100px',
            height: '100px',
            activeSrc: '@/assets/award/raffle-award-10.png'
          }]
        }
      ]
    }
  },
  methods: {
    startRaffle (e, button) {
      // 点击抽奖按钮会触发star回调
      setTimeout(() => {
        // 调用抽奖组件的play方法开始游戏
        this.$refs.myLucky.play()
        // 抽奖接口
        const prizeIndex = this.randomRaffleHandle()
        this.$refs.myLucky.stop(prizeIndex)
      }, 2500)
    },
    randomRaffleHandle () {
      const prizeIndex = Math.floor(Math.random() * 9)
      return prizeIndex
    },
    raffleOver (prize) {
      // 加载数据
      // 展示奖品
      alert('恭喜抽中奖品💐【' + prize.fonts[0].text + '】')
    }
  }
}

</script>
