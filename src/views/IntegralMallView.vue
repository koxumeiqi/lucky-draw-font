<template>
  <div class="center-container mx-auto p-4">
    <div class="flex-container">
      <!-- 使用 v-for 循环遍历 SkuProductResponseDTOList -->
      <div
        v-for="(skuProduct, index) in skuProductResponseDTOList" :key="index"
        class="product-card"
        style="margin-bottom: 250px;margin-left: 20px;"
      >
        <div class="card-header">
          <div
            class="count-display"
          >{{ skuProduct.activityCount.dayCount }}次抽奖
          </div>
        </div>
        <div class="card-footer">
          <div class="button-container">
            <button
              class="price-button"
            >{{ skuProduct.productAmount }}￥
            </button>
            <button
              @click="creditPayExchangeSkuHandle(skuProduct.sku)"
              class="exchange-button"
            >
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 7M17 13l1.4 7M9 21h6"
                />
              </svg>
              兑换
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { creditPayExchangeSku, querySkuProductListByActivityId } from '@/apis/api'

const skuProductResponseDTOList = ref([])

onMounted(() => {
  querySkuProductListByActivityIdHandle()
})

const querySkuProductListByActivityIdHandle = async () => {
  const {
    activityId
  } = JSON.parse(sessionStorage.getItem('drawContext'))
  const result = await querySkuProductListByActivityId(activityId)
  const {
    code,
    info,
    data
  } = await result.data
  console.log('商品data：', JSON.stringify(data))
  if (code !== '0000') {
    window.alert('查询产品列表，接口调用失败 code:' + code + ' info:' + info)
    return
  }
  skuProductResponseDTOList.value = data
  console.log('商品：', JSON.stringify(skuProductResponseDTOList.value))
}

const creditPayExchangeSkuHandle = async (sku) => {
  const {
    userid
  } = JSON.parse(sessionStorage.getItem('drawContext'))
  const result = await creditPayExchangeSku(userid, sku)
  const {
    code,
    info
  } = await result.data

  if (code !== '0000') {
    window.alert('对话抽奖次数，接口调用失败 code:' + code + ' info:' + info)
  }
  // todo 发送积分兑换商品事件
}

</script>

<style scoped>
.center-container {
  /* 设置容器高度为视口高度的100% */
  height: 100vh;
  /* 背景图片不重复且填充整个容器 */
  background-image: url("@/assets/skuShop.jpg");
  background-size: cover; /* 图片将被拉伸以填充整个容器 */
  background-position: center; /* 图片定位在中心 */
  background-repeat: no-repeat; /* 确保图片不重复 */
  /* 使内部元素水平和垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}


.container {
  margin: auto;
  padding: 4px;
}

.product-card {
  max-width: 20rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 16px;
  background-image: linear-gradient(to right, #63b3ed, #48bb78);
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
}

.product-card:hover {
  transform: scale(1.05);
}

.card-header {
  padding: 8px 16px;
}

.count-display {
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 8px;
  text-align: center;
  color: white;
}

.card-footer {
  padding: 8px 16px 16px;
  text-align: center;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.price-button {
  background-color: #4c51bf;
  color: white;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out;
}

.price-button:hover {
  background-color: #4338ca;
}

.exchange-button {
  background-color: white;
  color: #4c51bf;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out;
}

.exchange-button:hover {
  background-color: #f3f4f6;
  color: #bf4c8d;
  cursor: hand;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
