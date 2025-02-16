<template>
  <a-modal v-model:open="open" :closable="false" :width="700" destroyOnClose title="编辑用户" @ok="submitForm">
    <a-form ref="formRef" :model="formState" layout="vertical">
      <a-form-item label="是否启用" name="enabled">
        <a-switch v-model:checked="formState.enabled" checked-children="是" un-checked-children="否" />
      </a-form-item>
      <a-form-item label="分类名称" name="name" required>
        <a-input v-model:value="formState.name" placeholder="请填写分类名称" />
      </a-form-item>
      <a-form-item label="排序" name="sort">
        <a-input-number class="form_item_full" v-model:value="formState.sort" placeholder="请填写排序" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { postfileupload } from '@/request/commonApi';
import { postproductcategory,putproductcategory  } from './api';

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
  const { id } = formState.value || {}
  await formRef.value.validate();
  if (!id) await postproductcategory(formState.value);
  if (id) await putproductcategory(formState.value);
  message.success(`${id ? '编辑' : '新增'}分类成功`)
  open.value = false
  emit('success')
}
defineExpose({
  getEchoInfo
})
</script>