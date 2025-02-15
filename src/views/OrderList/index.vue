<template>
  <div class="order_list_container">
    <a-form :model="formState" class="search_form">
      <a-row :gutter="{ xs: 6, sm: 16, md: 24 }" wrap>
        <a-col :md="6" :sm="16" :xs="24">
          <a-form-item label="作品标题/订单号" name="keyword">
            <a-input v-model:value="formState.keyword" placeholder="请输入作品标题或订单号" />
          </a-form-item>
        </a-col>
        <a-col :md="6" :sm="16" :xs="24">
          <a-button type="primary" @click="search"> 查询</a-button>
          <a-button @click="reset"> 重置</a-button>
        </a-col>
      </a-row>
    </a-form>
    <!-- <div class="table_btn_box">
      <a-button type="primary" danger v-if="selectedRowKeys.length > 0" @click="handleBatchDelete">批量删除</a-button>
    </div> -->
    <a-table :columns="columns" :data-source="list" :loading="loading" :pagination="pagination" :scroll="{ x: 1000 }"
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
        <a-tag v-if="column.dataIndex === 'status'" :color="statusColorMap[record.status]">{{ statusMap[record.status]
          }}</a-tag>
        <a-image v-if="column.dataIndex === 'picture.picture_url'" :width="60" :height="60"
          :src="record.picture?.picture_url"></a-image>
        <div v-if="column.dataIndex === 'operation'" class="table_operation">
          <span @click="handleDelete(record)">删除</span>
        </div>
      </template>
    </a-table>
    <HandleInfoModal ref="handleInfoModalRef" @success="getList" />
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, nextTick, createVNode } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { COLUMNS } from './columns';
import { STATUSMAP, STATUSCOLORMAP } from './const';
import { getpaylist, deletepay } from './api';
import HandleInfoModal from './HandleInfoModal.vue';


onMounted(() => {
  getList()
})
const route = useRoute()
const router = useRouter()
const statusMap = ref(STATUSMAP)
const statusColorMap = ref(STATUSCOLORMAP)
const handleInfoModalRef = ref()
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
 * 唤醒新增/修改项目弹窗
*/
const wakeUpHandleInfoModal = record => {
  handleInfoModalRef.value.getEchoInfo(record)
}
/**
 * 获取列表
 */
const getList = async () => {
  loading.value = true
  const { keyword } = formState.value || {}
  const { pageSize, current: pageNum } = pagination || {}
  const payload = {
    pageSize,
    pageNum
  }
  if (keyword) payload.keyword = keyword
  const { list: newList, count } = await getpaylist(payload)
  list.value = newList || []
  pagination.total = count
  loading.value = false
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
 * 批量删除数据
*/
const handleDelete = (record) => {
  const { id, picture } = record || {}
  const { title } = picture || {}
  Modal.confirm({
    title: '提示',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: `确认删除订单【${title}】吗？`,
    onOk: async () => {
      await deletepay(id);
      message.success(`订单${title}删除成功`)
      selectedRowKeys.value = [];
      getList();
    }
  });
}
/**
 * 批量删除数据
*/
const handleBatchDelete = () => {
  Modal.confirm({
    title: '提示',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: '确认批量删除选中的达人吗？',
    onOk: async () => {
      const ids = selectedRowKeys.value.join(',');
      await deletepay(ids);
      selectedRowKeys.value = [];
      getList();
    }
  });
}
</script>
<style lang="less" scoped>
.author_manager_container {
  padding: 0 20px;

  >button {
    margin-bottom: 20px;
  }
}
</style>
