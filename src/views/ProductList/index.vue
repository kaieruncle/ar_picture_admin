<template>
  <div class="content_list_container">
    <a-form :model="formState" class="search_form">
      <a-row :gutter="{ xs: 6, sm: 16, md: 24 }" wrap>
        <a-col :md="6" :sm="16" :xs="24">
          <a-form-item label="标题" name="title">
            <a-input v-model:value="formState.title" placeholder="请输入标题" />
          </a-form-item>
        </a-col>
        <a-col :md="6" :sm="16" :xs="24">
          <a-button type="primary" @click="search"> 查询</a-button>
          <a-button @click="reset"> 重置</a-button>
        </a-col>
      </a-row>
    </a-form>
    <div class="table_btn_box">
      <a-button type="primary" @click="wakeUpHandleInfoModal">新建商品</a-button>
      <!-- <a-button type="primary" danger v-if="selectedRowKeys.length > 0" @click="handleBatchDelete">批量删除</a-button> -->
    </div>
    <a-table :columns="columns" :data-source="list" :loading="loading" :scroll="{ x: 1200 }"
      :row-selection="{ fixed: 'left', selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :rowKey="(record) => record.id">
      <template #headerCell="{ column }">
        <a-tooltip v-if="column.desc" arrow placement="top">
          <template #title>
            <span>{{ column.desc }}</span>
          </template>
          <span>{{ column.title }}</span>
        </a-tooltip>
      </template>
      <template #bodyCell="{ column, record }">
        <div v-if="column.dataIndex === 'operation'" class="table_operation">
          <span @click="wakeUpHandleInfoModal(record)">编辑</span>
          <span @click="handleDelete(record)">删除</span>
        </div>
      </template>
    </a-table>
    <HandleInfoModal ref="handleInfoModalRef" @success="getList" />
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, createVNode } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { COLUMNS } from './columns';
import { getproductlist, deleteproduct } from './api';
import HandleInfoModal from './HandleInfoModal.vue';

onMounted(() => {
  getList()
})
const handleInfoModalRef = ref()
const router = useRouter()
const loading = ref(false)
const formState = ref({})
const columns = ref(COLUMNS)
const list = ref([])
const selectedRowKeys = ref([])
/**
 * 批量选中
 */
const onSelectChange = (val) => {
  selectedRowKeys.value = val;
};

/**
 * 获取列表
 */
const getList = async () => {
  loading.value = true
  const { title } = formState.value || {}
  const payload = {}
  if (title) payload.title = title
  const newList = await getproductlist(payload)
  list.value = newList || []
  loading.value = false
}
/**
 * 筛选
 */
const search = () => {
  getList()
}
/**
 * 重置筛选
 */
const reset = () => {
  formState.value = {}
  search()
}
/**
 * 唤醒新增/编辑文章弹窗
*/
const wakeUpHandleInfoModal = record => {
  handleInfoModalRef.value.getEchoInfo(record)
}
/**
 * 删除数据
*/
const handleDelete = (record) => {
  const { id, title } = record || {}
  Modal.confirm({
    title: '提示',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: `确认删除文章${title}吗？`,
    onOk: async () => {
      await deleteproduct(id);
      message.success(`删除文章${title}成功`)
      selectedRowKeys.value = [];
      getList();
    }
  });
}
</script>