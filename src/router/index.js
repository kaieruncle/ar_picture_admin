import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router';
import { useSysStore, useUserStore } from "@/store/index";

const modules = import.meta.glob('@/views/**/*.vue');

/**
 * 获取模块
 */
export function getModule(name) {
    return modules[`/src/views/${name}.vue`]
}

// 静态路由
const basicRoutes = [{
    path: '/',
    name: 'Login',
    meta: {
        keepAlive: true,
        title: '登录',
    },
    component: getModule('Login/index')
}, {
    path: '/main',
    name: 'MainLayout',
    meta: {
        keepAlive: true,
        title: 'MainLayout',
    },
    component: () => import('@/layout/MainLayout/MainLayout.vue')
}, {
    path: '/mobile',
    name: 'MobileLayout',
    meta: {
        keepAlive: true,
        title: 'MobileLayout',
    },
    component: () => import('@/layout/MobileLayout/MobileLayout.vue')
},
{
    path: "/:catchAll(.*)",
    component: getModule('NotFound/index')
}]

export const router = createRouter({
    history: createWebHistory(),
    routes: basicRoutes
});

const basicRouteNames = basicRoutes.map(v => v.name)

/**
 * 清空路由
 */
export const clearRoutes = () => {
    const routes = router.getRoutes()
    routes.forEach(v => {
        if (!basicRouteNames.includes(v.name)) router.removeRoute(v.name)
    })
}

/**
 * 注册动态路由
 */
export const initRoutes = () => {
    const userStore = useUserStore()
    const dynamicRoutes = JSON.parse(JSON.stringify(userStore.dynamicRoutes))
    dynamicRoutes.forEach(v => {
        const { component, layout, children } = v || {}
        if (component) {
            v.component = getModule(component)
            router.addRoute(layout, v)
        }
        if (Array.isArray(children)) {
            children.forEach(t => {
                const { parameter } = t || {}
                if (Array.isArray(parameter)) {
                    parameter.forEach(item => {
                        const { required, name } = item || {}
                        t.path += required ? `/:${name}` : `/:${name}?`
                    })
                }
                t.component = getModule(t.component)
                router.addRoute(t.layout.trim(), t)
            })
        }
    })
}
const layoutMap = {
    AppLayout: 'app',
    MainLayout: 'main',
    MobileLayout: 'mobile'
}
/**
 * 更新一级菜单
 */
export const initFirstLevelMenu = (to) => {
    const sysStore = useSysStore()
    sysStore.setCurrentPath(to.fullPath)
}
/**
 * 更新二级菜单
 */
export const initNextLevelMenu = (to) => {
    const userStore = useUserStore()
    const sysStore = useSysStore()
    const dynamicRoutes = JSON.parse(JSON.stringify(userStore.dynamicRoutes))
    dynamicRoutes.forEach(v => {
        const { children } = v || {}
        const isThisChildren = Array.isArray(children) && children.filter(t => to.path.includes(`/${layoutMap[t.layout]}/${t.path}`)).length > 0
        if (isThisChildren) sysStore.setSubMenuList(children)
    })
}

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const dynamicRoutes = JSON.parse(JSON.stringify(userStore.dynamicRoutes))
    const token = localStorage.getItem('token')
    if (to.meta.title) document.title = to.meta.title
    initFirstLevelMenu(to)
    // 已登录则注册动态路由
    const routes = router.getRoutes()
    const currentRoutes = routes.filter(v => !basicRouteNames.includes(v.name))
    if (currentRoutes.length === 0 && token) {
        userStore.getDynamicRoutes()
        return
    }
    // 登录回跳
    if (to.path === '/' && token) {
        const { path, layout, children } = dynamicRoutes[0] || {}
        let defaultRoute = ''
        if (path) {
            defaultRoute = `/${layoutMap[layout]}/${path}`
        }
        if (!path) {
            const { layout: c_layout, path: c_path } = children[0] || {}
            defaultRoute = `/${layoutMap[c_layout]}/${c_path}`
        }
        next({ path: defaultRoute })
        return
    }
    if (to.path !== '/' && token) {
        initNextLevelMenu(to)
        next()
        return
    }
    next()
})