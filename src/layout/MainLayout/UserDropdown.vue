<template>
    <a-dropdown>
        <div class="user_dropdown_container">
            <img class="avatar_img" :src="userInfo.avatar" />
            <span>{{ userInfo.nickname }}</span>
        </div>
        <template #overlay>
            <a-menu>
                <a-menu-item @click="wakeUpLogoutConfirm">
                    <span>退出登录</span>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>
<script setup>
import { computed, createVNode, ref, onMounted } from 'vue';
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useUserStore } from "@/store/index";
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
/**
 * 唤醒登出确认框
 */
const wakeUpLogoutConfirm = () => {
    Modal.confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确认退出登录吗？',
        onOk: () => userStore.logout()
    });
}
</script>
<style lang="less" scoped>
.user_dropdown_container {
    position: fixed;
    top: 0;
    right: 20px;
    width: 100px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;

    >img {
        margin-right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: bottom;
    }

    >span {
        display: block;
        max-width: 100px;
        color: #333;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
}
</style>