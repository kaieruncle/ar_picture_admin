<template>
    <a-modal v-model:open="open" :title="`${formState.id ? '编辑' : '新增'}商品`" :closable="false" :width="800"
        destroyOnClose @ok="submitForm">
        <a-form layout="vertical" ref="formRef" :model="formState">
            <a-row wrap :gutter="{ xs: 8, sm: 16, md: 24 }">
                <a-col :xs="24" :sm="16" :md="12">
                    <a-form-item required name="title" label="商品名称">
                        <a-input v-model:value="formState.title" placeholder="请输入商品名称" />
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="16" :md="12">
                    <a-form-item required name="category_id" label="商品分类">
                        <a-select v-model:value="formState.category_id" :options="categoryList"
                            :field-names="{ label: 'name', value: 'id' }" placeholder="请选择文章分类"></a-select>
                    </a-form-item>
                </a-col>
            </a-row>

            <a-form-item required name="description" label="商品描述">
                <a-textarea v-model:value="formState.description" placeholder="请输入商品描述" />
            </a-form-item>
            <a-row wrap :gutter="{ xs: 8, sm: 16, md: 24 }">
                <a-col :xs="24" :sm="16" :md="12">
                    <a-form-item required name="price" label="价格">
                        <a-input-number class="form_item_full" v-model:value="formState.price" placeholder="请填写价格" />
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="16" :md="12">
                    <a-form-item required name="stock" label="库存">
                        <a-input-number class="form_item_full" v-model:value="formState.stock" placeholder="请填写库存" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item name="sort" label="排序">
                <a-input-number class="form_item_full" v-model:value="formState.sort" placeholder="请填写排序" />
            </a-form-item>
            <a-form-item required name="images" label="商品图片">
                <a-upload accept="image/*" v-model:file-list="formState.images" list-type="picture-card"
                    :before-upload="beforeUpload" @change="getUploadResult">
                    <UploadOutlined />
                </a-upload>
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
import { postproduct, putproduct, getproductcategorylist } from './api';
const emit = defineEmits(['success'])
const categoryList = ref([])
const route = useRoute()
const fileList = ref([])
const editorRef = ref()
const open = ref(false)
const formState = ref({})
const formRef = ref()
/**
 * 获取回显内容
 */
const getEchoInfo = async (record) => {
    formState.value = JSON.parse(JSON.stringify(record || {}))
    getCategoryList()
    open.value = true
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
 * 获取分类列表
*/
const getCategoryList = async () => {
    const newList = await getproductcategorylist()
    categoryList.value = newList || []
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
    if (!id) await postproduct(payload)
    if (id) await putproduct(payload)
    message.success(`${id ? '编辑' : '添加'}商品成功`)
    open.value = false
    emit('success')
}
defineExpose({
    getEchoInfo
})
</script>