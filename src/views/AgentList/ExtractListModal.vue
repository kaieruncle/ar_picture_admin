<template>
    <a-modal v-model:open="open" :footer="null" :width="1000" destroyOnClose title="提现记录">
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
                <div v-if="column.dataIndex === 'operation'" class="table_operation">
                    <span @click="handleDelete(record)">删除</span>
                </div>
            </template>
        </a-table>
    </a-modal>
</template>
<script setup>
import { reactive, ref,createVNode } from 'vue';
import { Modal,message } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { EXTRACLLISTCOLUMNS } from './columns.js';
import { getwithdrawlist, deletewithdraw } from "./api.js";
const loading = ref(false)
const info = ref({})
const open = ref(false);
const columns = ref(EXTRACLLISTCOLUMNS)
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
    const { id } = user || {}
    const { pageSize, current: pageNum } = pagination || {}
    const payload = {
        pageSize,
        pageNum,
        id
    }
    const { list: newList, count } = await getwithdrawlist(payload)
    list.value = newList || []
    pagination.total = count
    loading.value = false
}
/**
 * 删除提现记录
 */
const handleDelete = (record) => {
  const { id } = record || {}
  Modal.confirm({
    title: '提示',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: '确认删除此提现记录吗？',
    onOk: async () => {
      await deletewithdraw(id);
      message.success(`记录删除成功`)
      getList();
    }
  });
}
/**
 * 关闭
 */
defineExpose({
    getEchoInfo
})
</script>