<template>
    <a-modal v-model:open="open" :title="`${formState.id ? '编辑' : '新增'}文章`" :closable="false" :width="800"
        destroyOnClose @ok="submitForm">
        <a-form layout="vertical" ref="formRef" :model="formState">
            <a-row wrap :gutter="{ xs: 8, sm: 16, md: 24 }">
                <a-col :xs="24" :sm="16" :md="12">
                    <a-form-item required name="title" label="文章标题">
                        <a-input v-model:value="formState.title" placeholder="请输入文章标题" />
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="16" :md="12">
                    <a-form-item required name="category_id" label="文章分类">
                        <a-select v-model:value="formState.category_id" :options="categoryList"
                            :field-names="{ label: 'name', value: 'id' }" placeholder="请选择文章分类"></a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item required name="images" label="图集">
                <a-upload accept="image/*" v-model:file-list="formState.images" list-type="picture-card"
                    :before-upload="beforeUpload" @change="getUploadResult">
                    <UploadOutlined />
                </a-upload>
            </a-form-item>
            <a-form-item name="content" label="文章内容">
                <Editor ref="editorRef" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup>
import { ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import { message } from 'ant-design-vue';
import { DeleteOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { postfileupload } from '@/request/commonApi';
import { postarticle, putarticle, getarticlecategorylist } from './api';

const emit = defineEmits(['success'])
const imagesList = ref([])
const categoryList = ref([])
const route = useRoute()
const editorRef = ref()
const open = ref(false)
const formState = ref({})
const formRef = ref()
/**
 * 获取回显内容
 */
const getEchoInfo = async (record) => {
    const { content } = record || {}
    formState.value = JSON.parse(JSON.stringify(record || {}))
    open.value = true
    getCategoryList()
    await nextTick()
    editorRef.value.content = content || ''

}
/**
 * 获取分类列表
*/
const getCategoryList = async () => {
    const newList = await getarticlecategorylist()
    categoryList.value = newList || []
}
/**
 * 阻止默认上传
 */
const beforeUpload = file => {
    return false;
};
/**
 * 获取上传结果
 */
const getUploadResult = async ({ file, fileList }) => {
    const { status } = file || {}
    if (!status) {
        const formData = new FormData();
        formData.append('file', file);
        const { url } = await postfileupload(formData)
        fileList[fileList.length - 1].url = url
    }
    formRef.value.validateFields(['images'])
}

/**
 * 提交表单
 */
const submitForm = async () => {
    const { id, images } = formState.value || {}
    await formRef.value.validate();
    const filterImages = images.map((v, sort) => {
        const { url, uid } = v || {}
        return {
            sort,
            url,
            uid
        }
    })
    const payload = JSON.parse(JSON.stringify(formState.value || {}))
    payload.images = filterImages || []
    const { content } = editorRef.value || {}
    payload.content = content
    if (!id) await postarticle(payload)
    if (id) await putarticle(payload)
    message.success(`${id ? '编辑' : '添加'}文章成功`)
    open.value = false
    emit('success')
}
defineExpose({
    getEchoInfo
})
</script>