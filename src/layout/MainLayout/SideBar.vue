<template>
    <div class="side_bar_container">
        <div class="side_bar_item" v-for="(t, idx) in subMenuList" :key="idx" @click="changeRoute(t)">
            <div v-if="!t.hidden" :class="`item_content ${currentPath?.includes(t.path) && 'item_content_on'}`">
                <span>{{ t.meta.title }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSysStore } from "@/store/index";
const router = useRouter()
const sysStore = useSysStore()
const currentPath = computed(() => sysStore.currentPath)
const subMenuList = computed(() => sysStore.subMenuList)

/**
 * 切换路由
 */
const changeRoute = (t) => {
    const { redirect, path } = t || {}
    router.push({ path: redirect || `/main/${path}` })
}
</script>
<style lang="less" scoped>
.side_bar_container {
    position: fixed;
    top: 60px;
    left: 0;
    width: 200px;
    height: calc(100% - 60px);
    overflow-y: auto;
    background-color: #ffffff;

    &::-webkit-scrollbar {
        display: none;
    }
}

.side_bar_item {
    display: flex;
    align-items: center;
    cursor: pointer;

    .item_content {
        width: 100%;
        padding: 10px 20px;

        >span {
            color: #999999;
        }
    }

    .item_content_on {
        >span {
            color: #fc9202
        }
    }
}
</style>