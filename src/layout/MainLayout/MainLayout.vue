<template>
    <div class="main_layout_container">
        <Header />
        <SideBar v-if="!isMobile" />
        <RouterView :class="`main_layout_children ${isMobile && 'main_layout_children_full'}`">
            <template #default="{ Component, route }">
                <keep-alive>
                    <component :is="Component" :key="route.name" v-if="route.meta.keepAlive" />
                </keep-alive>
                <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive" />
            </template>
        </RouterView>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSysStore } from '@/store/index';
import Header from './Header.vue';
import SideBar from './SideBar.vue';
const sysStore = useSysStore()
const isMobile = computed(() => sysStore.isMobile)
</script>
<style lang="less">
.main_layout_container {
    width: 100%;
    height: 100%;
    background-color: #f2f4f7;
}

.main_layout_children {
    padding: 0 20px;
    position: fixed;
    top: 80px;
    left: 220px;
    width: calc(100% - 200px - 20px - 20px);
    height: calc(100% - 60px - 20px - 20px);
    z-index: 0;
    background-color: #ffffff;
    border-radius: 4px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
}

.main_layout_children_full {
    left: 0;
    width: 100%;
}
</style>