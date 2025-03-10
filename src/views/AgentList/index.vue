<template>
  <div class="agent_list_container">
    <a-form :model="formState" class="search_form">
      <a-row :gutter="{ xs: 6, sm: 16, md: 24 }" wrap>
        <a-col :md="6" :sm="16" :xs="24">
          <a-form-item label="昵称" name="title">
            <a-input v-model:value="formState.nickname" placeholder="请输入用户昵称" />
          </a-form-item>
        </a-col>
        <a-col :md="6" :sm="16" :xs="24">
          <a-button type="primary" @click="search"> 查询</a-button>
          <a-button @click="reset"> 重置</a-button>
        </a-col>
      </a-row>
    </a-form>
    <!-- <div class="table_btn_box">
      <a-button type="primary" @click="wakeUpHandleInfoModal">新增笔记</a-button>
      <a-button v-if="selectedRowKeys.length > 0" danger type="primary" @click="handleBatchDelete">批量删除</a-button>
    </div> -->
    <a-table bordered :columns="columns" :data-source="list" :loading="loading" :pagination="pagination"
      :row-selection="{ fixed: 'left', selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :rowKey="(record) => record.id" :scroll="{ x: 1000 }">
      <template #headerCell="{ column }">
        <a-tooltip v-if="column.desc" arrow placement="top">
          <template #title>
            <span>{{ column.desc }}</span>
          </template>
          <span>{{ column.title }}</span>
        </a-tooltip>
      </template>
      <template #bodyCell="{ column, record }">
        <a-image v-if="column.dataIndex === 'qrcode_url' && !!record.qrcode_url" :width="60" :height="60"
          :src="record.qrcode_url"></a-image>
        <span v-if="column.dataIndex === 'qrcode_url' && !record.qrcode_url">-</span>
        <a-tag v-if="column.dataIndex === 'status'" :color="statusColorMap[record.status]">{{ statusMap[record.status]
        }}</a-tag>
        <span v-if="column.dataIndex === 'user_count'" class="table_hight_light" @click="wakeUpUserListModal(record)">{{
          record.user_count
        }}</span>
        <div v-if="column.dataIndex === 'operation'" class="table_operation">
          <span v-if="record.status === 'pending'" @click="wakeUpHandleApproveModal(record)">审核</span>
          <span v-if="record.status === 'approved'" @click="wakeUpHandleInfoModal(record)">编辑</span>
        </div>
      </template>
    </a-table>
    <HandleApproveModal ref="handleApproveModalRef" @success="getList" />
    <UserListModal ref="userListModalRef" />
    <HandleInfoModal ref="handleInfoModalRef" @success="getList" />
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { COLUMNS } from './columns';
import { STATUSMAP, STATUSCOLORMAP } from './const';
import { getagentlist } from './api';
import UserListModal from './UserListModal.vue';
import HandleApproveModal from './HandleApproveModal.vue';
import HandleInfoModal from './HandleInfoModal.vue';

onMounted(() => {
  getList()
})

const userListModalRef = ref()
const handleInfoModalRef = ref()
const handleApproveModalRef = ref()
const loading = ref(false)
const formState = ref({})
const statusMap = ref(STATUSMAP)
const statusColorMap = ref(STATUSCOLORMAP)
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
 * 唤醒审核弹窗
*/
const wakeUpHandleApproveModal = (record) => {
  handleApproveModalRef.value.getEchoInfo(record)
}
/**
 * 唤醒编辑代理弹窗
*/
const wakeUpHandleInfoModal = record => {
  handleInfoModalRef.value.getEchoInfo(record)
}
/**
 * 获取列表
 */
const getList = async () => {
  loading.value = true
  const { nickname } = formState.value || {}
  const { pageSize, current: pageNum } = pagination || {}
  const payload = {
    pageSize,
    pageNum
  }
  if (nickname) payload.nickname = nickname
  const { list: newList, count } = await getagentlist(payload)
  list.value = newList || []
  pagination.total = count
  loading.value = false
}
/**
 * 唤醒新增/修改项目弹窗
 */
const wakeUpUserListModal = record => {
  userListModalRef.value.getEchoInfo(record)
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
</script>
<style lang="less" scoped>
.note_manager_container {
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
