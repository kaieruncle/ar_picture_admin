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
    <a-table :columns="columns" :data-source="list" :loading="loading" :pagination="pagination"
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
        <a-image v-if="column.dataIndex === 'user.avatar' && !!record.user.avatar" :width="60" :height="60"
          :src="record.user.avatar"></a-image>
        <span v-if="column.dataIndex === 'user.avatar' && !record.user.avatar">-</span>
        <a-image v-if="column.dataIndex === 'qrcode_url' && !!record.qrcode_url" :width="60" :height="60"
          :src="record.qrcode_url"></a-image>
        <span v-if="column.dataIndex === 'qrcode_url' && !record.qrcode_url">-</span>
        <a-tag v-if="column.dataIndex === 'status'" :color="statusColorMap[record.status]">{{ statusMap[record.status]
          }}</a-tag>
        <span v-if="column.dataIndex === 'available_amount'" class="table_hight_light"
          @click="wakeupExtractListModal(record)">{{
            record.available_amount }}</span>
        <a-input v-if="column.dataIndex === 'commission_rate'" v-model:value="record.commission_rate"
          @blur="editCommissionRate(record)">
          <template #suffix>
            <span>%</span>
          </template>
        </a-input>
        <span v-if="column.dataIndex === 'user_count'" class="table_hight_light" @click="wakeUpUserListModal(record)">{{
          record.user_count
        }}</span>
        <div v-if="column.dataIndex === 'operation'" class="table_operation">
          <span v-if="record.status === 'pending'" @click="wakeUpHandleApproveModal(record)">审核</span>
          <span v-if="record.status === 'approved'" @click="wakeupHandleExtractModal(record)">提现</span>
        </div>
      </template>
    </a-table>
    <HandleApproveModal ref="handleApproveModalRef" @success="getList" />
    <ExtractListModal ref="extractListModalRef" @success="getList" />
    <HandleExtractModal ref="handleExtractModalRef" />
    <UserListModal ref="userListModalRef" />
  </div>
</template>
<script setup>
import { createVNode, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Modal, message } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { COLUMNS } from './columns';
import { STATUSMAP, STATUSCOLORMAP } from './const';
import { getagentlist, putagentcommission } from './api';
import UserListModal from './UserListModal.vue';
import HandleApproveModal from './HandleApproveModal.vue';
import ExtractListModal from './ExtractListModal.vue';
import HandleExtractModal from './HandleExtractModal.vue';

onMounted(() => {
  getList()
})

const userListModalRef = ref()
const handleApproveModalRef = ref()
const handleExtractModalRef = ref()
const extractListModalRef = ref()
const loading = ref(false)
const formState = ref({})
const statusOptionList = ref([])
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
 * 唤醒新增/编辑提现记录弹窗
*/
const wakeupHandleExtractModal = (record) => {
  handleExtractModalRef.value.getEchoInfo(record)
}
/**
 * 唤醒提现列表弹窗
*/
const wakeupExtractListModal = (record) => {
  extractListModalRef.value.getEchoInfo(record)
}
/**
 * 编辑分润比例
*/
const editCommissionRate = record => {
  const { user, commission_rate } = record || {}
  const { nickname } = user || {}
  Modal.confirm({
    title: '提示',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: `确认将代理${nickname}的分润比例改为${commission_rate}%吗？`,
    onOk: async () => {
      await putagentcommission(record);
      selectedRowKeys.value = [];
      message.success(`修改代理${nickname}分润比例为${commission_rate}%成功`)
      getList();
    }
  });
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
 * 设定/取消代理
*/
// const cancelAgent = (record) => {
//   const { id, nickname } = record || {}
//   Modal.confirm({
//     title: '提示',
//     icon: () => createVNode(ExclamationCircleOutlined),
//     content: `确认取消【${nickname}】的代理身份吗？`,
//     onOk: async () => {
//       await putuseragent({
//         id,
//         is_agent: false
//       });
//       selectedRowKeys.value = [];
//       message.success(`取消【${nickname}】的代理身份成功`)
//       getList();
//     }
//   });
// }
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
// /**
//  * 批量删除数据
//  */
// const handleDelete = (record) => {
//   const {id, title} = record || {}
//   Modal.confirm({
//     title: '提示',
//     icon: () => createVNode(ExclamationCircleOutlined),
//     content: `确认删除笔记【${title}】吗？`,
//     onOk: async () => {
//       await deletenote(id);
//       selectedRowKeys.value = [];
//       getList();
//     }
//   });
// }
// /**
//  * 批量删除数据
//  */
// const handleBatchDelete = () => {
//   Modal.confirm({
//     title: '提示',
//     icon: () => createVNode(ExclamationCircleOutlined),
//     content: '确认批量删除选中的笔记吗？',
//     onOk: async () => {
//       const ids = selectedRowKeys.value.join(',');
//       await deletenote(ids);
//       selectedRowKeys.value = [];
//       getList();
//     }
//   });
// }
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
