import { instance } from "@/request/request";

export const apiMap = {
    withdraw: 'withdraw',
    withdrawlist: '/withdraw/list',
    withdrawapprove: '/withdraw/approve'
}
/**
 * 获取列表
 */
export const getwithdrawlist = (payload) => {
    return instance.get(apiMap.withdrawlist, { payload });
}
/**
 * 审批提现
 */
export const putwithdrawapprove = (payload) => {
    return instance.put(apiMap.withdrawapprove, payload);
}
/**
 * 删除提现记录
 */
export const deletewithdraw = (payload) => {
    return instance.delete(`${apiMap.withdraw}/${payload}`);
}