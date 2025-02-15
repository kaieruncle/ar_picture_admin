<template>
    <div class="mobile_menu_list_container">
        <div class="mobile_menu_list">
            <div class="menu" v-for="(t, idx) in dynamicRoutes" :key="idx">
                <div :class="`menu_item  ${(currentPath?.includes(t.path) || haveChildPath(t)) && 'menu_item_on'}`"
                    v-if="!t.hidden" @click="changeRoute(t)">
                    <span>{{ t.meta.title }}</span>
                </div>
                <div class="children" v-if="currentPath?.includes(t.path) || haveChildPath(t)">
                    <div class="children_item" v-for="(item, index) in t.children" :key="`${idx}_${index}`">
                        <div :class="`children_item_button ${currentPath?.includes(item.path) && 'children_item_button_on'}`"
                            v-if="!item.hidden" @click="changeRoute(item)">
                            <span>{{ item.meta.title }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore, useSysStore } from "@/store/index";
const router = useRouter()
const sysStore = useSysStore()
const userStore = useUserStore()
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
    const layoutMap = {
        AppLayout: 'app',
        MainLayout: 'main',
        MobileLayout: 'mobile'
    }
    if (Array.isArray(children) && children.length > 0) {
        const { layout, path } = children[0] || {}
        router.replace({ path: `/${layoutMap[layout]}/${path}` })
    } else {
        const { layout, path } = t || {}
        router.replace({ path: `/${layoutMap[layout]}/${path}` })
    }
}
</script>
<style lang="less" scoped>
.mobile_menu_list_container {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100% - 60px);
    background-color: #00000060;
}

.mobile_menu_list {
    width: 200px;
    height: 100%;
    background-color: #ffffff;

    &::before {
        content: '';
        display: table;
        height: 0;
    }

    .menu {
        .menu_item {
            display: flex;
            align-items: center;
            padding: 0 10px;
            height: 40px;
        }

        .menu_item_on {
            >span {
                color: #fc9202;
            }
        }

        .children {

            background-color: #f7f8fa;

            .children_item {
                .children_item_button {
                    padding: 0 10px;
                    display: flex;
                    align-items: center;
                    height: 40px;

                    >span {
                        color: #999999;
                    }
                }

                .children_item_button_on {
                    >span {
                        color: #fc9202;
                    }
                }
            }
        }
    }
}
</style>
