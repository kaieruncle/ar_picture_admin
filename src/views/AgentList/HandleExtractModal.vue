<template>
    <a-modal v-model:open="open" title="新增提现" :closable="false" :width="700" destroyOnClose @ok="submitForm">
        <a-form layout="vertical" ref="formRef" :model="formState">
            <a-form-item required name="amount" label="提现金额">
                <a-input-number class="form_item_full" v-model:value="formState.amount" placeholder="请填写提现金额" />
            </a-form-item>
            <a-form-item name="remark" label="备注">
                <a-textarea v-model:value="formState.remark" placeholder="请填写备注" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup>
import { ref } from "vue";
import { postwithdraw } from './api';
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
    await postwithdraw(formState.value)
    message.success('新增提现记录成功')
    open.value = false
    emit('success')
}
defineExpose({
    getEchoInfo
})
</script>