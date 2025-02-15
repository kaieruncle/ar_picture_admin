<template>
    <a-drawer v-model:open="open" :title="`${formState.id ? '编辑' : '新增'}账号`" :closable="false" placement="right"
        :width="600" destroyOnClose>
        <template #extra>
            <a-button type="primary" @click="submitForm">保存</a-button>
        </template>
        <a-form layout="vertical" ref="formRef" :rules="formRules" :model="formState">
            <a-form-item required name="type" label="字典类型">
                <a-input v-model:value="formState.type" placeholder="请填写字典类型" />
            </a-form-item>
            <a-form-item required name="label" label="字典标签">
                <a-input v-model:value="formState.label" placeholder="请填写字典标签" />
            </a-form-item>
            <a-form-item required name="value" label="字典值">
                <a-input v-model:value="formState.value" placeholder="请填写字典值" />
            </a-form-item>
            <a-form-item name="sort" label="字典排序">
                <a-input-number class="form_item_full" v-model:value="formState.sort" placeholder="请填写字典排序" />
            </a-form-item>
            <a-form-item name="remark" label="备注">
                <a-textarea v-model:value="formState.remark" placeholder="请填写备注" />
            </a-form-item>

        </a-form>
        <a-modal :open="previewVisible" title="预览" :footer="null" @cancel="handleCancel">
            <img class="preview_img" alt="example" :src="previewImage" />
        </a-modal>
    </a-drawer>
</template>
<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { postdict, putdict } from './api';
const emit = defineEmits(['success'])
const formRef = ref(null)
const open = ref(false)
const formState = ref({})
/**
 * 获取用户信息
 */
 const getEchoInfo = async (record) => {
    formState.value = JSON.parse(JSON.stringify(record || {}))
    open.value = true
}
/**
 * 提交表单
 */
const submitForm = async () => {
    await formRef.value.validate();
    const { id } = formState.value || {}
    if (id) await putdict(formState.value)
    if (!id) await postdict(formState.value)
    open.value = false
    message.success(`${id ? '编辑' : '新建'}字典成功`)
    emit('success')
}
defineExpose({
    getEchoInfo
})
</script>