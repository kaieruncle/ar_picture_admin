<template>
    <a-modal v-model:open="open" title="代理审核" :closable="false" :width="700" destroyOnClose @ok="submitForm">
        <a-form layout="vertical" ref="formRef" :model="formState">
            <a-form-item name="approved" label="审核意见">
                <a-switch v-model:checked="formState.approved" checked-children="通过" un-checked-children="拒绝" />
            </a-form-item>
            <a-form-item required name="commission_rate" label="分成比例" v-if="formState.approved">
                <a-input-number class="form_item_full" v-model:value="formState.commission_rate" placeholder="请填写分成比例" />
            </a-form-item>
            <a-form-item required name="reject_reason" label="拒绝理由" v-if="!formState.approved">
                <a-textarea v-model:value="formState.reject_reason" placeholder="请填写拒绝理由" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup>
import { ref } from "vue";
import { putagentapprove } from './api';
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
    const { approved } = formState.value || {}
    await formRef.value.validate();
    await putagentapprove(formState.value)
    message.success(`${approved ? '通过' : '拒绝'}代理申请成功`)
    open.value = false
    emit('success')
}
defineExpose({
    getEchoInfo
})
</script>