<template>
    <a-modal v-model:open="open" title="发货" :closable="false" :width="700" destroyOnClose @ok="submitForm">
        <a-form layout="vertical" ref="formRef" :model="formState">
            <a-form-item required name="tracking_number" label="物流单号">
                <a-input v-model:value="formState.tracking_number" placeholder="请填写物流单号" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup>
import { ref } from "vue";
import { putpayship } from './api';
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
    await putpayship(formState.value);
    message.success('发货成功')
    open.value = false
    emit('success')
}
defineExpose({
    getEchoInfo
})
</script>