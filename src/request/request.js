import axios from 'axios'
import { clearRoutes, router } from '@/router/index'
import { useUserStore } from "@/store/index"
import { message } from 'ant-design-vue'

export const instance = axios.create({
    timeout: 30000,
    baseURL: import.meta.env.VITE_APP_BASE_URL
})
// 跨域允许携带cookie
instance.defaults.withCredentials = true
// 请求拦截器
instance.interceptors.request.use(
    request => {
        request.headers.authorization = localStorage.getItem('token');
        if (request.method.toLocaleUpperCase() === 'GET') request.params = {
            ...request.payload || {},
            t: new Date().getTime()
        }
        return request
    },
    error => {
        return error
    }
)

// 响应拦截
instance.interceptors.response.use(
    response => {
        const { data: res } = response || {}
        const { code, msg, data } = res || {}
        switch (code) {
            case 200:
                return data
                break;
            default:
                message.error(msg)
                return Promise.reject()
                break;
        }
    },
    error => {
        const { response } = error || {}
        const {data} = response || {}
        const {code,msg} = data || {}
        switch (code) {
            case 401:
            case 402:
                const { pathname } = window.location || {}
                const userStore = useUserStore();
                message.error(msg)
                clearRoutes()
                userStore.setUserInfo({})
                userStore.setDynamicRoutes([])
                localStorage.clear()
                router.push(`/?redirect=${pathname}`)
                return Promise.reject()
                break;
            default:
                message.error(msg)
                if (response) return Promise.reject(error)
                return Promise.reject(new Error('请求超时, 请刷新重试'))
                break;
        }
    }
)
