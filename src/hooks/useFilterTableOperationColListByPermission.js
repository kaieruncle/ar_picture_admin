/**
 * 根据权限过滤表格操作列表
 * @param {Array} arr 需要根据权限过滤的所有操作项列表
 * @returns {Boolean}
 */
import { ref } from 'vue';
import { useUserStore } from '@/store/index.js';

export const useFilterTableOperationColListByPermission = () => {
    const userStore = useUserStore()
    const roleList = userStore.roleList;
    const operationColList = ref([])
    const filterFn = (arr) => {
        if (!arr || !Array.isArray(arr)) {
            operationColList.value = []
            return
        }
        const isAdmin = roleList.includes('superadmin')
        if (isAdmin) {
            operationColList.value = arr
            return
        }
        let result = []
        for (let i = 0; i < arr.length; i++) {
            const { permission, children } = arr[i] || {}
            const havePermission = Array.isArray(permission) && permission.filter(v => roleList.includes(v)).length > 0
            if (havePermission) result.push(arr[i])
            if (Array.isArray(children)) {
                let c_result = []
                children.forEach(v => {
                    const { permission: c_permission } = v || {}
                    const c_havePermission = Array.isArray(c_permission) && c_permission.filter(v => roleList.includes(v)).length > 0
                    if (c_havePermission) c_result.push(v)
                })
                arr[i].children = c_result
                result.push(arr[i])
            }
        }
        operationColList.value = result
    }
    return {
        operationColList,
        filterFn
    }
};
