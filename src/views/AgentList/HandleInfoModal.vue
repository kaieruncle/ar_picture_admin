<template>
    <a-modal v-model:open="open" title="编辑代理" :closable="false" :width="700" destroyOnClose @ok="submitForm">
        <a-form layout="vertical" ref="formRef" :model="formState">
            <a-form-item required name="contact_name" label="联系人姓名">
                <a-input v-model:value="formState.contact_name" placeholder="请填写联系人姓名" />
            </a-form-item>
            <a-form-item required name="contact_phone" label="联系人电话">
                <a-input v-model:value="formState.contact_phone" placeholder="请填写联系人电话" />
            </a-form-item>
            <a-form-item required name="wechat" label="微信号">
                <a-input v-model:value="formState.wechat" placeholder="请填写微信号" />
            </a-form-item>
            <a-form-item required name="commission_rate" label="分成比例">
                <a-input-number class="form_item_full" v-model:value="formState.commission_rate" placeholder="请填写分成比例">
                    <template #addonAfter>
                        <span>%</span>
                    </template>
                </a-input-number>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup>
import { ref } from "vue";
import { putagentinfo } from './api';
import { message } from "ant-design-vue";
const emit = defineEmits(['success'])
const open = ref(false)
const formState = ref({})
const formRef = ref()
/**
 * 获取回显内容
 */
const getEchoInfo = (record) => {
    formState.value = JSON.parse(JSON.stringify(record || {}))
    open.value = true
}

/**
 * 提交表单
 */
const submitForm = async () => {
    await formRef.value.validate();
    await putagentinfo(formState.value)
    message.success('编辑申请成功')
    open.value = false
    emit('success')
}
defineExpose({
    getEchoInfo
})
</script>