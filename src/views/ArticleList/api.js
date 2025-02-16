import { instance } from "@/request/request";
export const apiMap = {
  article: '/article',
  articlecategorylist: '/article-category/list',
  articlelist: '/article/list',
  articlesuggest:'/article/suggest'
}
/**
 * 获取分类列表
 */
export const getarticlecategorylist = (payload) => {
  return instance.get(apiMap.articlecategorylist, { payload })
}
/**
 * 获取列表
 */
export const getarticlelist = (payload) => {
  return instance.get(apiMap.articlelist, { payload })
}
/**
 * 新增文章
 */
export const postarticle = (payload) => {
  return instance.post(apiMap.article, payload)
}
/**
 * 编辑文章
 */
export const putarticle = (payload) => {
  return instance.put(apiMap.article, payload)
}
/**
 * 星标文章
*/
export const putarticlesuggest = (payload) => {
  return instance.put(apiMap.articlesuggest, payload)
}

/**
 * 删除文章
 */
export const deletearticle = (payload) => {
  return instance.delete(`${apiMap.article}/${payload}`)
}