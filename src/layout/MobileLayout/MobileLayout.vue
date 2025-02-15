<template>
    <div class="mobile_layout_container">
        <RouterView class="mobile_layout_children">
            <template #default="{ Component, route }">
                <keep-alive>
                    <component :is="Component" :key="route.name" v-if="route.meta.keepAlive" />
                </keep-alive>
                <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive" />
            </template>
        </RouterView>
    </div>
</template>
<style lang="less" scoped>
.mobile_layout_container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - env(safe-area-inset-bottom));
    background-color: #ffffff;
    z-index: 1;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>