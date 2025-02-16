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
      <a-button type="primary" @click="wakeUpHandleInfoModal">新建商品</a-button>
      <!-- <a-button type="primary" danger v-if="selectedRowKeys.length > 0" @click="handleBatchDelete">批量删除</a-button> -->
    </div>
    <a-table :columns="columns" :data-source="list" :loading="loading" :pagination="pagination" :scroll="{ x: 1200 }"
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
        <a-switch v-if="column.dataIndex === 'is_starred'" v-model:checked="record.is_starred" checked-children="是"
          un-checked-children="否" @change="toogleIsStarred(record)" />
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
import { getproductlist } from './api';
import HandleInfoModal from './HandleInfoModal.vue';

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
const pagination = reactive({
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  showQuickJumper: false,
  total: 0,
  pageSizeOptions: ['10', '20', '50'],
  showTotal: (total) => `共 ${total} 条`,
  onShowSizeChange: (current, pageSize) => {
    pagination.pageSize = pageSize;
    pagination.current = 1;
  },
  onChange: (current) => {
    pagination.current = current;
    getList();
  },
});
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
  const { pageSize, current: pageNum } = pagination || {}
  const payload = {
    pageSize,
    pageNum
  }
  if (title) payload.title = title
  if (status) payload.status = status
  const { list: newList, count } = await getproductlist(payload)
  list.value = newList || []
  pagination.total = count
  loading.value = false
}
/**
 * 切换星标
*/
const toogleIsStarred = async (record) => {
  const { id, is_starred, title } = record || {}
  await putarticlesuggest({
    id,
    is_starred
  })
  message.success(`${is_starred ? '推荐' : '取消推荐'}文章${title}成功`)
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
  pagination.current = 1
  pagination.total = 0
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
      await deletearticle(id);
      message.success(`删除文章${title}成功`)
      selectedRowKeys.value = [];
      getList();
    }
  });
}
</script>