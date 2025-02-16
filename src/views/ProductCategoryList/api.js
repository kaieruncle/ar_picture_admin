import { instance } from "@/request/request";
export const apiMap = {
  productcategory: '/product-category',
  productcategorylist: '/product-category/list',
}
/**
 * 获取列表
 */
export const getproductcategorylist = (payload) => {
  return instance.get(apiMap.productcategorylist, { payload })
}
/**
 * 新增分类
 */
export const postproductcategory = (payload) => {
  return instance.post(apiMap.productcategory, payload)
}
/**
 * 编辑分类
 */
export const putproductcategory = (payload) => {
  return instance.put(apiMap.productcategory, payload)
}
/**
 * 删除分类
 */
export const deleteproductcategory = (payload) => {
  return instance.delete(`${apiMap.productcategory}/${payload}`)
}