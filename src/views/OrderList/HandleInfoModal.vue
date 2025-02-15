<template>
    <a-modal v-model:open="open" :title="`${formState.id ? '编辑' : '新增'}达人`" :closable="false" :width="700"
        destroyOnClose @ok="submitForm">
        <a-form layout="vertical" ref="formRef" :model="formState">
            <a-form-item required name="projectId" label="所属项目">
                <a-select v-model:value="formState.projectId" :filter-option="false" :options="projectList" @search="handleSearchProject"
                    show-search placeholder="请选择所属项目" :field-names="{ label: 'projectName', value: 'id' }"></a-select>
            </a-form-item>
            <a-form-item required name="expertUrl" label="达人链接">
                <a-input v-model:value="formState.expertUrl" placeholder="请填写达人链接" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup>
import { ref } from "vue";
// import { postexpert, putexpert, getprojectinfos } from './api';
import { message } from "ant-design-vue";
const emit = defineEmits(['success'])
const open = ref(false)
const projectSearchParam = ref({})
const projectList = ref([])
const formState = ref({})
const formRef = ref()
/**
 * 获取回显内容
 */
const getEchoInfo = (record) => {
    formState.value = JSON.parse(JSON.stringify(record || {}))
    getProjectList()
    open.value = true
}
/**
 * 获取项目选项
*/
const getProjectList = async () => {
    const { projectName } = projectSearchParam.value || {}
    const payload = {
        pageNum: 1,
        pageSize: 10
    };
    if (projectName) payload.projectName = projectName
    const { records } = await getprojectinfos(payload)
    projectList.value = records || []
}
/**
 * 筛选项目
 */
const handleSearchProject = value => {
    projectSearchParam.value.projectName = value
    getProjectList()
}
/**
 * 提交表单
 */
const submitForm = async () => {
    const { id } = formState.value || {}
    await formRef.value.validate();
    if (id) await putexpert(formState.value)
    if (!id) await postexpert(formState.value);
    message.success(`${id ? '编辑' : '新增'}项目成功`)
    open.value = false
    emit('success')
}
defineExpose({
    getEchoInfo
})
</script>