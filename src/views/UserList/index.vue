<template>
  <div class="user_list_container">
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
        <a-image v-if="column.dataIndex === 'avatar' && !!record.avatar" :width="60" :height="60"
          :src="record.avatar"></a-image>
        <span v-if="column.dataIndex === 'avatar' && !record.avatar">-</span>
        <div v-if="column.dataIndex === 'operation'" class="table_operation">
          <span @click="wakeUpHandleInfoModal(record)">编辑</span>
        </div>
      </template>
    </a-table>
    <HandleInfoModal ref="handleInfoModalRef" @success="getList" />
  </div>
</template>
<script setup>
import { createVNode, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Modal, message } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { COLUMNS } from './columns';
import { getuserlist, putuseragent } from './api';
import HandleInfoModal from './HandleInfoModal.vue';

onMounted(() => {
  getList()
})

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
  const { list: newList, count } = await getuserlist(payload)
  list.value = newList || []
  pagination.total = count
  loading.value = false
}
/**
 * 设定/取消代理
*/
const toogleAgent = (record) => {
  const { id, roles, nickname } = record || {}
  const is_agent = !roles.includes('agent')
  Modal.confirm({
    title: '提示',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: `确认${is_agent ? '设定' : '取消'}【${nickname}】的代理身份吗？`,
    onOk: async () => {
      await putuseragent({
        id,
        is_agent
      });
      selectedRowKeys.value = [];
      message.success(`${is_agent ? '设定' : '取消'}【${nickname}】的代理身份成功`)
      getList();
    }
  });
}
/**
 * 唤醒新增/修改项目弹窗
 */
const wakeUpHandleInfoModal = record => {
  handleInfoModalRef.value.getEchoInfo(record)
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
