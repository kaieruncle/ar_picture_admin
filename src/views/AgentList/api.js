import { instance } from "@/request/request";

export const apiMap = {
    agentusers: '/agent/users',
    agentlist: '/agent/list',
    agentinfo: '/agent/info',
    agentwithdrawlist: '/agent/withdrawlist',
    agentapprove: '/agent/approve'
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
export const getagentwithdrawlist = (payload) => {
    return instance.get(apiMap.agentwithdrawlist, { payload });
}
/**
 * 审核代理申请
 */
export const putagentapprove = (payload) => {
    return instance.put(apiMap.agentapprove, payload);
}


/**
 * 修改代理信息
 */
export const putagentinfo = (payload) => {
    return instance.put(apiMap.agentinfo, payload);
}
