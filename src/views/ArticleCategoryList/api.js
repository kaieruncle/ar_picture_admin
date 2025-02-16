import { instance } from "@/request/request";
export const apiMap = {
  articlecategory: '/article-category',
  articlecategorylist: '/article-category/list'
}
/**
 * 获取列表
 */
export const getarticlecategorylist = (payload) => {
  return instance.get(apiMap.articlecategorylist, { payload })
}
/**
 * 新增分类
 */
export const postarticlecategory = (payload) => {
  return instance.post(apiMap.articlecategory, payload)
}
/**
 * 编辑分类
 */
export const putarticlecategory = (payload) => {
  return instance.put(apiMap.articlecategory, payload)
}
/**
 * 删除分类
 */
export const deletearticlecategory = (payload) => {
  return instance.delete(`${apiMap.articlecategory}/${payload}`)
}