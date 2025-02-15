<template>
  <a-modal v-model:open="open" :footer="null" :width="1000" destroyOnClose title="客户列表">
    <a-table :columns="columns" :data-source="list" :loading="loading" :pagination="pagination" :scroll="{ x: 800 }"
      bordered>
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
      </template>
    </a-table>
  </a-modal>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { USERLISTCOLUMNS } from './columns.js';
import { getagentusers } from "./api.js";

const loading = ref(false)
const info = ref({})
const open = ref(false);
const columns = ref(USERLISTCOLUMNS)
const list = ref([])
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
 * 获取回显信息
 */
const getEchoInfo = (record) => {
  info.value = JSON.parse(JSON.stringify(record || {}))
  open.value = true
  getList()
}
/**
 * 获取列表
 */
const getList = async () => {
  loading.value = true
  const { user } = info.value || {}
  const { id: agent_id } = user || {}
  const { pageSize, current: pageNum } = pagination || {}
  const payload = {
    pageSize,
    pageNum,
    agent_id
  }
  const { list: newList, count } = await getagentusers(payload)
  list.value = newList || []
  pagination.total = count
  loading.value = false

}

/**
 * 关闭
 */
defineExpose({
  getEchoInfo
})
</script>