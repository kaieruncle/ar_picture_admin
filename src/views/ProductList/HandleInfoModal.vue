<template>
    <a-modal v-model:open="open" :title="`${formState.id ? '编辑' : '新增'}商品`" :closable="false" :width="800"
        destroyOnClose @ok="submitForm">
        <a-form layout="vertical" ref="formRef" :model="formState">
            <a-form-item required name="title" label="商品名称">
                <a-input v-model:value="formState.title" placeholder="请输入商品名称" />
            </a-form-item>
            <a-row wrap :gutter="{ xs: 8, sm: 16, md: 24 }">
                <a-col :xs="24" :sm="16" :md="12">
                    <a-form-item required name="price" label="价格">
                        <a-input-number class="form_item_full" v-model:value="formState.price" placeholder="请填写价格" />
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="16" :md="12">
                    <a-form-item name="sort" label="排序">
                        <a-input-number class="form_item_full" v-model:value="formState.sort" placeholder="请填写排序" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>
<script setup>
import { ref } from "vue";
import { message } from 'ant-design-vue';
import { postproduct, putproduct } from './api';
const emit = defineEmits(['success'])
const open = ref(false)
const formState = ref({})
const formRef = ref()
/**
 * 获取回显内容
 */
const getEchoInfo = async (record) => {
    formState.value = JSON.parse(JSON.stringify(record || {}))
    open.value = true
}
/**
 * 提交表单
 */
const submitForm = async () => {
    const { id } = formState.value || {}
    await formRef.value.validate();
    if (!id) await postproduct(formState.value)
    if (id) await putproduct(formState.value)
    message.success(`${id ? '编辑' : '添加'}商品成功`)
    open.value = false
    emit('success')
}
defineExpose({
    getEchoInfo
})
</script>