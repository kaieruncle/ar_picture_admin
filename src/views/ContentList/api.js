import { instance } from "@/request/request";
export const apiMap = {
  picture: '/picture',
  picturelist: '/picture/list',
  pictureregenqrcode: '/picture/regenqrcode'
}
/**
 * 获取列表
 */
export const getpicturelist = (payload) => {
  return instance.get(apiMap.picturelist, { payload })
}
/**
 * 重新生成qrcode
 */
export const postpictureregenqrcode = (payload) => {
  return instance.post(apiMap.pictureregenqrcode, payload)
}
/**
 * 删除内容
 */
export const deletepicture = (payload) => {
  return instance.delete(`${apiMap.picture}/${payload}`)
}