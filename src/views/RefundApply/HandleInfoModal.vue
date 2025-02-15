<template>
  <a-modal v-model:open="open" :closable="false" :width="700" destroyOnClose title="审核退款" @ok="submitForm">
    <a-form ref="formRef" :model="formState" layout="vertical">
      <a-form-item label="审核结果" name="action" required>
        <a-radio-group v-model:value="formState.action" button-style="solid">
          <a-radio-button v-for="(t, idx) in statusOptionList" :key="idx" :value="t.value">{{ t.label
            }}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="拒绝理由" v-if="formState.action === 'reject'" name="reject_reason" required>
        <a-textarea v-model:value="formState.reject_reason" placeholder="请填写拒绝理由" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
import { ref } from "vue";
import { getdictoptions } from '@/request/commonApi'
import { putrefund } from './api';
import { message } from "ant-design-vue";
const emit = defineEmits(['success'])
const statusOptionList = ref([])
const open = ref(false)
const formState = ref({})
const formRef = ref()
/**
 * 获取状态列表
 */
const getStatusOptionList = async () => {
  const data = await getdictoptions('refund_examine_status')
  statusOptionList.value = data || []
}
/**
 * 获取回显内容
 */
const getEchoInfo = (record) => {
  formState.value = JSON.parse(JSON.stringify(record || {}))
  getStatusOptionList()
  open.value = true
}
/**
 * 提交表单
 */
const submitForm = async () => {
  await formRef.value.validate();
  await putrefund(formState.value);
  message.success('审核退款申请成功')
  open.value = false
  emit('success')
}
defineExpose({
  getEchoInfo
})
</script>