import { instance } from "@/request/request";
export const apiMap = {
  refund: '/refund',
  refundlist: '/refund/list',
}
/**
 * 处理退款申请
 */
export const putrefund = (payload) => {
  return instance.put(apiMap.refund, payload)
}
/**
 * 获取列表
 */
export const getrefundlist = (payload) => {
  return instance.get(apiMap.refundlist, { payload })
}
/**
 * 删除订单
 */
export const deleterefund = (payload) => {
  return instance.delete(`${apiMap.refund}/${payload}`)
}