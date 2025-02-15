<template>
    <div class="login_container">
        <div class="login_rect" v-if="!loadingVisible">
            <div class="login_title">
                <img :src="LoginTitleSvg" />
                <span>好柿相册后台管理</span>
            </div>
            <a-form class="login_form" ref="formRef" :model="formState">
                <a-form-item name="userName">
                    <a-input v-model:value="formState.username" placeholder="请输入账号">
                        <template #prefix>
                            <UserOutlined :style="{ color: '#999999' }" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item name="password">
                    <a-input-password v-model:value="formState.password" placeholder="请输入密码">
                        <template #prefix>
                            <LockOutlined :style="{ color: '#999999' }" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button block type="primary" @click="onSubmit">登录</a-button>
                </a-form-item>
            </a-form>
        </div>
        <a-spin size="large" :spinning="loadingVisible" />
    </div>
</template>
<script setup>
import { ref, reactive, } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useSysStore, useUserStore } from '@/store/index';
import LoginTitleSvg from '@/assets/svg/logo.svg';
const loadingVisible = ref(false)
const formState = reactive({})
const userStore = useUserStore()


/**
 * 管理员登录
 */
const onSubmit = async () => {
    userStore.login(formState)
}

</script>
<style lang="less" scoped>
.login_container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f7f8fa;
}


.login_rect {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 4px;
    background-color: #ffffff;

    .login_title {
        display: flex;
        align-items: center;
        justify-content: center;

        >img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }

        >span {
            display: block;
            font-size: 16px;
            font-weight: 600;
        }
    }

    .login_form {
        margin-top: 40px;
        width: 320px;
    }
}
</style>