import { instance } from "@/request/request";

export const apiMap = {
    pay: '/pay',
    paylist: '/pay/list'
}
/**
 * 获取列表
 */
export const getpaylist = (payload) => {
    return instance.get(apiMap.paylist, { payload })
}
/**
 * 删除订单
 */
export const deletepay = (payload) => {
    return instance.delete(`${apiMap.pay}/${payload}`)
}