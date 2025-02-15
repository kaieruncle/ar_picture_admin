<template>
    <div class="menu_list_container">
        <div class="menu_item" v-for="(t, idx) in dynamicRoutes" :key="idx">
            <div v-if="!t.hidden"
                :class="`item_content ${(currentPath?.includes(t.path) || haveChildPath(t)) && 'item_content_on'}`"
                @click="changeRoute(t)">
                <span>{{ t.meta.title }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, createVNode } from 'vue';
import { useUserStore, useSysStore } from "@/store/index";
import { useRouter } from 'vue-router';
const router = useRouter()
const userStore = useUserStore()
const sysStore = useSysStore()
const dynamicRoutes = computed(() => userStore.dynamicRoutes)
const currentPath = computed(() => sysStore.currentPath)
/**
 * 计算子路由中是否有选中路由
 */
const haveChildPath = computed(() => (t) => {
    const { children } = t || {}
    if (!children) return false
    if (children) return children.filter(v => currentPath.value?.includes(v.path)).length > 0
})
/**
 * 切换路由
 */
const changeRoute = (t) => {
    const { children } = t || {}
    const { layout, path } = children[0] || {}
    const layoutMap = {
        AppLayout: 'app',
        MainLayout: 'main',
        MobileLayout: 'mobile'
    }
    router.replace({ path: `/${layoutMap[layout]}/${path}` })
}
</script>
<style lang="less" scoped>
.menu_list_container {
    position: fixed;
    top: 0;
    left: 200px;
    display: flex;
    align-items: center;
    width: calc(100% - 200px - 120px);
    height: 60px;
}

.menu_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .item_content {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        height: 60%;
        cursor: pointer;
        border-radius: 4px;

        >span {
            color: #999999;
        }
    }

    .item_content_on {
        >span {
            color: #fc9202;
        }
    }

    &:not(:first-child) {
        .item_content {
            margin-left: 10px;
        }
    }
}
</style>