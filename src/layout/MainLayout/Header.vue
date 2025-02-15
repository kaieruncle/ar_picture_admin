<template>
    <div class="header_container">
        <Logo v-if="!isMobile" />
        <MenuList v-if="!isMobile" />
        <UserDropdown v-if="!isMobile" />
        <MobileMenuWrapper v-if="isMobile"/>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useSysStore } from "@/store/index";
import MenuList from './MenuList.vue';
import UserDropdown from './UserDropdown.vue';
import MobileMenuWrapper from './MobileMenuWrapper.vue';
import Logo from './Logo.vue';
const sysStore = useSysStore()
const isMobile = computed(() => sysStore.isMobile)
</script>
<style lang="less" scoped>
.header_container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    z-index: 1000;
}
</style>