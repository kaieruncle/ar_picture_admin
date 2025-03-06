import { instance } from "./request";

export const apiMap = {
    // 管理员登录
    authadminlogin: '/auth/admin/login',
    // 退出登录
    authlogout: '/auth/logout',
    // 获取当前用户信息
    userinfo: '/user/info',
    // 获取字典列表
    dictoptions: '/dict/options',
    // 文件上传
    fileupload: '/file/upload',
    // 修改密码
    userpassword: '/user/password'
}


/**
 * 文件上传
 */
export const postfileupload = (payload) => {
    return instance.post(apiMap.fileupload, payload);
}
/**
 * 管理员登录
 */
export const postauthadminlogin = (payload) => {
    return instance.post(apiMap.authadminlogin, payload);
}
/**
 * 修改密码
 */
export const putuserpassword = (payload) => {
    return instance.put(apiMap.userpassword, payload);
}
/**
 * 获取用户信息
 */
export const getuserinfo = (payload) => {
    return instance.get(apiMap.userinfo, { payload })
}

/**
 * 获取字典列表
 */
export const getdictoptions = (payload) => {
    return instance.get(`${apiMap.dictoptions}/${payload}`)
}

/**
 * 退出登录
 */
export const postauthlogout = () => {
    return instance.post(apiMap.authlogout);
}
