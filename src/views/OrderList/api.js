import { instance } from "@/request/request";

export const apiMap = {
    pay: '/pay',
    paylist: '/pay/list',
    payship: '/pay/ship',
    payqrcode: '/pay/qrcode',
    paydelivery: '/pay/delivery'
}
/**
 * 获取列表
 */
export const getpaylist = (payload) => {
    return instance.get(apiMap.paylist, { payload })
}
/**
 * 获取物流公司列表
 */
export const getpaydelivery = (payload) => {
    return instance.get(apiMap.paydelivery, { payload })
}
/**
 * 刷新入口码
*/
export const putpayqrcode = (payload) => {
    return instance.put(`${apiMap.payqrcode}/${payload}`)
}
/**
 * 发货
*/
export const putpayship = (payload) => {
    return instance.put(apiMap.payship, payload)
}

/**
 * 删除订单
 */
export const deletepay = (payload) => {
    return instance.delete(`${apiMap.pay}/${payload}`)
}