import {instance} from "@/request/request";

export const apiMap = {
    projecttotal: '/project/total',
}
/**
 * 获取数据看板
 */
export const getprojecttotal = (payload) => {
    return instance.get(apiMap.projecttotal, {payload})
}
