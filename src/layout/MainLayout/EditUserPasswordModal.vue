<template>
    <a-modal v-model:open="open" width="500px" title="修改密码" @ok="handleSubmit" destroyOnClose>
        <a-form layout="vertical" ref="formRef" :model="formState" :rules="formRules">
            <a-form-item required name="old_password" label="原有密码">
                <a-input-password v-model:value="formState.old_password" placeholder="请输入原有密码" />
            </a-form-item>
            <a-form-item required name="new_password" label="新密码">
                <a-input-password v-model:value="formState.new_password" placeholder="请输入新密码" />
            </a-form-item>
            <a-form-item required name="confirmPassword" label="确认密码">
                <a-input-password v-model:value="formState.confirmPassword" placeholder="请确认新密码" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from '@/store/index';
import { message } from 'ant-design-vue';
import { putuserpassword } from '@/request/commonApi';
const open = ref(false)
const userStore = useUserStore()
const formRef = ref()
const formState = ref({})
const formRules = ref(
    {
        confirmPassword: [{
            validator: async (_rule, value) => {
                if (value !== formState.value.new_password) {
                    return Promise.reject("两次输入密码不一致!");
                }
                return Promise.resolve();
            },
            trigger: 'blur'
        }],
    }
)
/**
 * 表单提交事件
 */
const handleSubmit = async () => {
    await formRef.value.validate();
    await putuserpassword(formState.value) || {}
    open.value = false
    message.success({ content: '密码修改成功，请重新登录！3s后自动退出登录', duration: 3 })
    setTimeout(() => {
        userStore.logout();
    }, 3000)
}
defineExpose({
    open
})
</script>