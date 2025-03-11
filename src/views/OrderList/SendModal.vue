<template>
    <a-modal v-model:open="open" title="发货" :closable="false" :width="700" destroyOnClose @ok="submitForm">
        <a-form layout="vertical" ref="formRef" :model="formState">
            <a-form-item required name="express_company" label="物流公司">
                <a-select v-model:value="formState.express_company"
                    :field-names="{ label: 'delivery_name', value: 'delivery_id' }" :options="expressCompanyList"
                    placeholder="请选择接收账户" :filter-option="filterOption" show-search />
            </a-form-item>
            <a-form-item required name="tracking_number" label="物流单号">
                <a-input v-model:value="formState.tracking_number" placeholder="请填写物流单号" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup>
import { ref } from "vue";
import { putpayship, getpaydelivery } from './api';
import { message } from "ant-design-vue";
const emit = defineEmits(['success'])
const expressCompanyList = ref([])
const open = ref(false)
const formState = ref({})
const formRef = ref()
/**
 * 筛选搜索框
*/
const filterOption = (input, option) => {
    const { delivery_name } = option || {}
    return delivery_name.includes(input)
}
/**
 * 获取回显内容
 */
const getEchoInfo = (record) => {
    formState.value = JSON.parse(JSON.stringify(record || {}))
    getExpressCompanyList()
    open.value = true
}
/**
 * 获取物流公司列表
*/
const getExpressCompanyList = async () => {
    const { list, count } = await getpaydelivery()
    expressCompanyList.value = list || []
}
/**
 * 提交表单
 */
const submitForm = async () => {
    await formRef.value.validate();
    const { express_company } = formState.value || {}
    const { delivery_name: express_company_name } = expressCompanyList.value.filter(v => v.delivery_id === express_company)[0] || {}
    formState.value.express_company_name = express_company_name
    await putpayship(formState.value);
    message.success('发货成功')
    open.value = false
    emit('success')
}
defineExpose({
    getEchoInfo
})
</script>