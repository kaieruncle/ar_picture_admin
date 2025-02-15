<template>
  <div class="refund_apply_container">
    <a-form :model="formState" class="search_form">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24 }" wrap>
        <a-col :md="6" :sm="16" :xs="24">
          <a-form-item label="账号">
            <a-input v-model:value="formState.userName" placeholder="请输入账号" />
          </a-form-item>
        </a-col>
        <a-col :md="6" :sm="16" :xs="24">
          <a-button type="primary" @click="getList"> 查询</a-button>
          <a-button @click="reset"> 重置</a-button>
        </a-col>
      </a-row>
    </a-form>
    <!-- <div class="table_btn_box">
      <a-button type="primary" @click="wakeUpHandleInfoModal">新增账号</a-button>
      <a-button v-if="selectedRowKeys.length > 0" danger type="primary" @click="handleBatchDelete">批量删除</a-button>
    </div> -->
    <a-table :columns="columns" :data-source="list" :loading="loading" :pagination="pagination"
      :row-selection="{ fixed: 'left', selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :rowKey="(record) => record.id" :scroll="{ x: 800 }">
      <template #bodyCell="{ column, record }">
        <a-tag v-if="column.dataIndex === 'status'" :color="statusColorMap[record.status]">{{ statusMap[record.status]
          }}</a-tag>
        <div v-if="column.dataIndex === 'operation'" class="table_operation">
          <span v-if="record.status === 'pending'" @click="wakeUpHandleInfoModal(record)">审核</span>
          <span v-if=" record.status === 'failed'" @click="wakeUpHandleInfoModal(record)">重新退款</span>
          <span @click="handleDelete(record)">删除</span>
        </div>
      </template>
    </a-table>
    <HandleInfoModal ref="handleInfoModalRef" @success="getList" />
  </div>
</template>

<script setup>
import { createVNode, onMounted, reactive, ref } from 'vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { COLUMNS } from './columns';
import { STATUSMAP, STATUSCOLORMAP } from './const';
import { getrefundlist ,deleterefund } from './api';
import HandleInfoModal from './HandleInfoModal.vue';

onMounted(() => {
  getList()
});
const handleInfoModalRef = ref()
const statusOptionList = ref([])
const statusMap = ref(STATUSMAP)
const statusColorMap = ref(STATUSCOLORMAP)
const formState = ref({});
const columns = ref(COLUMNS);
const loading = ref(false);
const list = ref([]);
const selectedRowKeys = ref([]);
const selectedRows = ref([])
// 批量选中
const onSelectChange = (val, rows) => {
  selectedRowKeys.value = val;
  selectedRows.value = rows
};
const pagination = reactive({
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  showQuickJumper: false,
  total: 0,
  pageSizeOptions: ['10', '20', '50'],
  showTotal: (total) => `共 ${total} 条`,
  onShowSizeChange: (pageSize, pageNum) => {
    pagination.pageSize = pageNum; // 修改每页显示的条数
    pagination.current = pageSize;
  },
  onChange: (page) => {
    pagination.current = page;
    getList();
  },
});
/**
 * 获取账号列表
 */
const getList = async () => {
  loading.value = true
  const { current: pageNum, pageSize } = pagination;
  const { userName } = formState.value || {}
  const payload = {
    pageNum,
    pageSize
  };
  if (userName) payload.userName = userName
  const { list: newList, count } = await getrefundlist(payload)
  list.value = newList || []
  pagination.total = count
  loading.value = false
}
/**
 * 唤醒处理信息弹窗
 */
const wakeUpHandleInfoModal = (record) => {
  handleInfoModalRef.value.getEchoInfo(record)
}

/**
 * 删除
 */
const handleDelete = (record) => {
  const { nickName, id } = record || {}
  Modal.confirm({
    title: '提示',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: `确认删除账号${nickName}吗？`,
    onOk: async () => {
      await deleterefund(id);
      selectedRowKeys.value = [];
      getList();
    }
  });
}
/**
 * 批量删除事件
 */
const handleBatchDelete = () => {
  Modal.confirm({
    title: '提示',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: '确认批量删除账号吗？',
    onOk: async () => {
      const ids = selectedRowKeys.value.join(',');
      await deleterefund(ids);
      selectedRowKeys.value = [];
      getList();
    }
  });
}
/**
 * 重置
 */
const reset = () => {
  pagination.current = 1;
  formState.value = {}
  getList();
}
</script>
<style lang="less" scoped>
.account_manager_container {
  background-color: #ffffff;
}
</style>