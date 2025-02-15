import { instance } from "@/request/request";

export const apiMap = {
    dict: '/dict',
    dictlist: '/dict/list',
}
/**
 * 获取列表
 */
export const getdictlist = (payload) => {
    return instance.get(apiMap.dictlist, { payload });
}
/**
 * 新建字典
 */
export const postdict = (payload) => {
    return instance.post(apiMap.dict, payload);
}
/**
 * 编辑字典
 */
export const putdict = (payload) => {
    return instance.put(apiMap.dict, payload);
}
/**
 * 删除字典
 */
export const deletedict = (payload) => {
    return instance.delete(`${apiMap.dict}/${payload}`);
}