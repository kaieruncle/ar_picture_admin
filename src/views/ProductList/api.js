import { instance } from "@/request/request";
export const apiMap = {
  product: '/product',
  productlist: '/product/list'
}
/**
 * 获取列表
 */
export const getproductlist = (payload) => {
  return instance.get(apiMap.productlist, { payload })
}
/**
 * 新增产品
 */
export const postproduct = (payload) => {
  return instance.post(apiMap.product, payload)
}
/**
 * 编辑产品
 */
export const putproduct = (payload) => {
  return instance.put(apiMap.product, payload)
}

/**
 * 删除产品
 */
export const deleteproduct = (payload) => {
  return instance.delete(`${apiMap.product}/${payload}`)
}