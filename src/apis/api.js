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
