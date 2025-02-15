import { instance } from "@/request/request";

export const apiMap = {
    agentusers: '/agent/users',
    agentlist: '/agent/list',
    withdraw: 'withdraw',
    withdrawlist: '/withdraw/list',
    agentapprove: '/agent/approve',
    agentcommission: '/agent/commission'
}
/**
 * 获取列表
 */
export const getagentlist = (payload) => {
    return instance.get(apiMap.agentlist, { payload });
}
/**
 * 获取客户列表
 */
export const getagentusers = (payload) => {
    return instance.get(apiMap.agentusers, { payload });
}
/**
 * 获取提现列表
 */
export const getwithdrawlist = (payload) => {
    return instance.get(apiMap.withdrawlist, { payload });
}
/**
 * 新增提现记录
*/
export const postwithdraw = (payload) => {
    return instance.post(apiMap.withdraw, payload);
}
/**
 * 删除提现记录
 */
export const deletewithdraw = (payload) => {
    return instance.delete(`${apiMap.withdraw}/${payload}`);
}
/**
 * 审核代理申请
 */
export const putagentapprove = (payload) => {
    return instance.put(apiMap.agentapprove, payload);
}

/**
 * 修改代理点位
 */
export const putagentcommission = (payload) => {
    return instance.put(apiMap.agentcommission, payload);
}