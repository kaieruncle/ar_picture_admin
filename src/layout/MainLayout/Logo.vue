<template>
    <div class="logo_container" @click="redirectToHome"></div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
/**
 * 跳转到首页
 */
const redirectToHome = () => {
    router.push({ path: '/' })
}
</script>
<style lang="less" scoped>
.logo_container {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 60px;
    background-image: url(@/assets/images/logo.png);
    background-size: 100% 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
}
</style>