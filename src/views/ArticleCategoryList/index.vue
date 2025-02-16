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
          <a-form-item label="类型">
            <a-select v-model:value="formState.status" :options="statusOptionList" placeholder="请选择类型"></a-select>
          </a-form-item>
        </a-col>
        <a-col :md="6" :sm="16" :xs="24">
          <a-button type="primary" @click="search"> 查询</a-button>
          <a-button @click="reset"> 重置</a-button>
        </a-col>
      </a-row>
    </a-form>
    <div class="table_btn_box">
      <a-button type="primary" @click="wakeUpHandleInfoModal">新增分类</a-button>
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
        <a-tag v-if="column.dataIndex === 'enabled'" :color="record.enabled ? 'green' : 'red'">{{ record.enabled ? '是' :
          '否' }}</a-tag>
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
import { getdictoptions } from '@/request/commonApi'
import { STATUSMAP, STATUSCOLORMAP } from './const';
import { getarticlecategorylist, deletearticlecategory } from './api';
import HandleInfoModal from './HandleInfoModal.vue'


onMounted(() => {
  getStatusOptionList()
  getList()
})
const handleInfoModalRef = ref()
const router = useRouter()
const statusOptionList = ref([])
const statusMap = ref(STATUSMAP)
const statusColorMap = ref(STATUSCOLORMAP)
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
  const { title, status } = formState.value || {}
  const payload = {}
  if (title) payload.title = title
  if (status) payload.status = status
  const newList = await getarticlecategorylist(payload)
  list.value = newList || []
  loading.value = false
}
/**
 * 获取状态列表
 */
const getStatusOptionList = async () => {
  const data = await getdictoptions('content_type')
  statusOptionList.value = data || []
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
 * 唤醒新增/编辑分类弹窗
*/
const wakeUpHandleInfoModal = record => {
  handleInfoModalRef.value.getEchoInfo(record)
}
/**
 * 删除数据
*/
const handleDelete = (record) => {
  const { id, name } = record || {}
  Modal.confirm({
    title: '提示',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: `确认删除分类${name}吗？`,
    onOk: async () => {
      await deletearticlecategory(id);
      message.success(`删除分类${name}成功`)
      selectedRowKeys.value = [];
      getList();
    }
  });
}
/**
 * 批量删除数据
*/
// const handleBatchDelete = () => {
//   Modal.confirm({
//     title: '提示',
//     icon: () => createVNode(ExclamationCircleOutlined),
//     content: '确认批量删除选中的项目吗？',
//     onOk: async () => {
//       const ids = selectedRowKeys.value.join(',');
//       await deletearticlecategory(ids);
//       selectedRowKeys.value = [];
//       getList();
//     }
//   });
// }
</script>
<style lang="less" scoped>
.customer_list_container {
  padding: 0 20px;

  >button {
    margin-bottom: 20px;
  }
}

.tip {
  color: red;
}

.search_form {
  .ant-upload-wrapper {
    margin-left: 10px;
    margin-right: 20px;
  }
}
</style>
