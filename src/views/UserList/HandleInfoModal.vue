<template>
  <a-modal v-model:open="open" :closable="false" :width="700" destroyOnClose title="编辑用户" @ok="submitForm">
    <a-form ref="formRef" :model="formState" layout="vertical">
      <a-form-item label="头像" name="avatar">
        <a-upload v-model:file-list="avatarList" :before-upload="beforeUpload" :max-count="1" accept="image/*"
          list-type="picture-card" @change="getFile">
          <UploadOutlined />
        </a-upload>
      </a-form-item>
      <a-form-item label="昵称" name="nickname" required>
        <a-input v-model:value="formState.nickname" placeholder="请填写用户昵称" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { postfileupload } from '@/request/commonApi';
import { putuserinfo } from './api';

const emit = defineEmits(['success'])
const open = ref(false)
const formState = ref({})
const formRef = ref()
const avatarList = ref([])
/**
 * 获取回显内容
 */
const getEchoInfo = (record) => {
  const { avatar } = record || {}
  formState.value = JSON.parse(JSON.stringify(record || {}))
  if (avatar) avatarList.value = [{ url: avatar }]
  open.value = true
}
/**
 * 阻止默认上传
 */
const beforeUpload = file => {
  return false;
};
/**
 * 获取头像
 */
const getFile = async ({ file, fileList }) => {
  const { status } = file || {}
  if (!status) {
    const formData = new FormData();
    formData.append('file', file);
    const { url } = await postfileupload(formData)
    formState.value.avatar = url
  }
  formRef.value.validateFields(['avatar'])
}
/**
 * 提交表单
 */
const submitForm = async () => {
  await formRef.value.validate();
  await putuserinfo(formState.value);
  message.success('编辑用户信息成功')
  open.value = false
  emit('success')
}
defineExpose({
  getEchoInfo
})
</script>