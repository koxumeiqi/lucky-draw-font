import request from '@/utils/request.js'
import qs from 'qs'

/**
 * 抽奖接口
 * @param userId 用户id
 * @param activityId 活动id
 * @returns {*}
 */
export function draw (userId, activityId) {
  return request({
    url: '/api/v1/raffle/activity/draw',
    method: 'POST',
    data: {
      userId: userId,
      activityId: activityId
    }
  })
}

/**
 * 查询抽奖列表信息
 * @param userId 用户id
 * @param activityId 活动id
 * @returns {*}
 */
export function queryRaffleAwardList (userId, activityId) {
  return request({
    url: '/api/v1/raffle/strategy/query_raffle_award_list',
    method: 'POST',
    data: {
      userId: userId,
      activityId: activityId
    }
  })
}

/**
 * 获取抽奖活动下拉框列表
 */
export function queryActivityList () {
  return request({
    url: '/api/v1/raffle/activity/query_activity_list',
    method: 'GET'
  })
}

/**
 * 查询用户的抽奖账户余额
 */
export function queryUserCurAccount (userId, activityId) {
  return request({
    url: '/api/v1/raffle/activity/query_user_activity_account',
    method: 'POST',
    data: {
      userId: userId,
      activityId: activityId
    }
  })
}

/**
 * 查询用户的积分额度
 */
export function queryUserIntegral (userId) {
  return request({
    url: `/api/v1/raffle/activity/query_user_credit_account?userId=${userId}`,
    method: 'POST'
  })
}

/**
 * 签到
 */
export function signInToday (userId) {
  return request({
    url: `/api/v1/raffle/activity/calendar_sign_rebate?userId=${userId}`,
    method: 'POST'
  })
}

/**
 * 查看是否签到
 */
export function isSignInToday (userId) {
  return request({
    url: `/api/v1/raffle/activity/is_calendar_sign_rebate?userId=${userId}`,
    method: 'POST'
  })
}

/**
 * 获取奖品信息
 */
export function queryActivityAwards (activityId) {
  return request({
    url: '/api/v1/raffle/activity/query_all_activity_awards',
    method: 'POST',
    data: {
      activityId: activityId
    }
  })
}

/**
 * 获取商品信息
 * @param activityId
 */
export function querySkuProductListByActivityId (activityId) {
  return request(`/api/v1/raffle/activity/query_sku_product_list_by_activity_id?activityId=${activityId}`, {
    method: 'POST'
  })
}

/**
 * 积分兑换商品
 * @param userId
 */
export function creditPayExchangeSku (userId, sku) {
  return request('/api/v1/raffle/activity/credit_pay_exchange_sku', {
    method: 'POST',
    data: {
      userId: userId,
      sku: sku
    }
  })
}
