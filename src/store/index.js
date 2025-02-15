import { createPinia, defineStore } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { mockDynamicRoutes } from '@/mock/dynamicRoutes';
import {
    getuserinfo,
    postauthadminlogin,
    postauthlogout
} from '@/request/commonApi';
import { clearRoutes, initRoutes, router } from '@/router/index';
import { message } from 'ant-design-vue';

const pinia = createPinia()
const layoutMap = {
    MainLayout: 'main',
    MobileLayout: 'mobile'
}
export const useSysStore = defineStore('sysStore', {
    state: () => ({
        isMobile: false,
        currentPath: null,
        subMenuList: null
    }),
    actions: {
        /**
         * 保存当前设备类型
         */
        setIsMobile(payload) {
            this.isMobile = payload
        },
        /**
         * 保存当前路由
         */
        setCurrentPath(payload) {
            this.currentPath = payload || {};
        },
        /**
         * 保存当前路由下的子路由
         */
        setSubMenuList(payload) {
            this.subMenuList = payload;
        }
    },
    persist: true
})
export const useUserStore = defineStore('userStore', {
    state: () => ({
        // 用户信息
        userInfo: {},
        // 动态路由
        dynamicRoutes: [],
        // 字典
        dictList: [],
        //用户权限
        roleList: [],
    }),
    actions: {
        /**
         * 保存字典
         */
        setDictList(payload) {
            this.dictList = payload || []
        },
        /**
         * 保存用户信息
         */
        setUserInfo(payload) {
            this.userInfo = payload || {};
        },
        /**
         * 保存动态路由
         */
        setDynamicRoutes(payload) {
            this.dynamicRoutes = payload
        },
        /**
         * 保存用户权限
         */
        setRoleList(payload) {
            this.roleList = payload || []
        },
        /**
         * 获取动态路由
         */
        async getDynamicRoutes() {
            // const { data } = await getDynamicRoutes();
            this.setDynamicRoutes(mockDynamicRoutes)
            clearRoutes()
            initRoutes()
            const { pathname } = window.location || {}
            router.replace({ path: pathname })
        },
        /**
         * 登录事件
         */
        async login(payload) {
            const { token } = await postauthadminlogin(payload);
            localStorage.setItem('token', token)
            const userRes = await getuserinfo()
            this.setUserInfo(userRes)
            const routeRes = mockDynamicRoutes
            this.setDynamicRoutes(routeRes)
            // 注入用户动态路由
            initRoutes()
            // 获取地址栏重定向
            const { search } = window.location || {}
            const urlRedirect = new URLSearchParams(search).get('redirect')
            // 检测重定向是否可用
            let canIUsePath = false
            for (let i = 0; i < routeRes.length; i++) {
                const { layout, path, children } = routeRes[i] || {}
                const childrenPathList = Array.isArray(children) ? children.map(t => `/${layoutMap[t.layout]}/${t.path}`) : []
                canIUsePath = childrenPathList.includes(urlRedirect) || urlRedirect === `/${layoutMap[layout]}/${path}`
                if (canIUsePath) break
            }
            // 获取第一项路径
            const { path, layout, children } = routeRes[0] || {}
            let defaultRoute = ''
            if (path) {
                defaultRoute = `/${layoutMap[layout]}/${path}`
            }
            if (!path) {
                const { layout: c_layout, path: c_path } = children[0] || {}
                defaultRoute = `/${layoutMap[c_layout]}/${c_path}`
            }
            // 重定向可用，跳转地址栏的重定向
            if (canIUsePath) {
                router.replace({ path: urlRedirect })
                return
            }
            // 否则跳转第一项路径
            router.replace({ path: defaultRoute })
        },
        /**
         * 更新用户信息
         */
        async updateUserInfo() {
            const data = await getuserinfo()
            this.setUserInfo(data)
        },
        /**
         * 退出登录
         */
        async logout() {
            await postauthlogout()
            clearRoutes()
            this.setUserInfo({})
            this.setDictList([])
            this.setDynamicRoutes([])
            localStorage.clear()
            const { pathname } = window.location || {}
            router.replace(`/?redirect=${pathname}`)
        },
    },
    persist: true
});
pinia.use(piniaPluginPersistedstate);
export default pinia
