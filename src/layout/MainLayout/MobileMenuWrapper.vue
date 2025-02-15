<template>
    <div class="mobile_menu_wrapper_container">
        <SvgIcon class="svg_icon" :name="menuListVisible ? 'menu_close' : 'menu_on'" @click="toogleMenuListVisible" />
        <MobileMenuList v-if="menuListVisible" @changeRoute="closeMenuList" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import MobileMenuList from './MobileMenuList.vue'
const menuListVisible = ref(false)

/**
 * 更改菜单列表组件的可见性
 */
const toogleMenuListVisible = () => {
    menuListVisible.value = !menuListVisible.value
}
/**
 * 关闭菜单列表
 */
const closeMenuList = () => {
    menuListVisible.value = false
}
</script>
<style lang="less">
.mobile_menu_wrapper_container {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;

    >span {
        font-size: 20px;
    }
}

.svg_icon {
    width: 24px;
    height: 24px;
}
</style>