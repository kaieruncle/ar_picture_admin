import { instance } from "@/request/request";

export const apiMap = {
    userlist: '/user/list',
    userinfo: '/user/info',
    useragent: '/user/agent'
}
/**
 * 获取列表
 */
export const getuserlist = (payload) => {
    return instance.get(apiMap.userlist, { payload });
}
/**
 * 编辑用户
 */
export const putuserinfo = (payload) => {
    return instance.put(apiMap.userinfo, payload);
}
/**
 * 设为/取消代理
 */
export const putuseragent = (payload) => {
    return instance.put(apiMap.useragent, payload);
}