<template>
    <a-modal v-model:open="open" :footer="null" :width="800" destroyOnClose title="审批记录">
      <a-timeline class="time_line">
        <a-timeline-item v-for="(v, idx) in list" :key="idx">
          <div class="item approver">
            <span v-if="v.assigneeName">{{ v.assigneeName }}</span>
            <span v-if="v.assigneeName">-</span>
            <span>{{ v.taskName }}</span>
          </div>
          <div class="item time">
            <span>{{ v.startTime }}</span>
            <span v-if="v.finishTime">-</span>
            <span v-if="v.finishTime">{{ v.finishTime }}</span>
          </div>
          <div v-for="(item, index) in v.commentList" :key="`idx_${index}`" class="comment">
            <div class="comment_info">
              <span> {{ item.comment }}</span>
              <a-row :gutter="[16, 16]">
                <a-col v-for="(t, ind) in item.imgCommentList" :key="ind" :md="8" :sm="24" :xs="24">
                  <a-image :height="100" :src="t.url" width="auto"/>
                </a-col>
              </a-row>
            </div>
            <div class="from_info">
              <span>来自</span>
              <span>{{ item.userId }}</span>
              <span>{{ item.date }}</span>
            </div>
          </div>
        </a-timeline-item>
      </a-timeline>
    </a-modal>
  </template>
  <script setup>
  import {ref} from 'vue';
  import {getresourceosslistByIds,getflowtaskgetFlowRecord} from "@/request/commonApi";
  
  const loading = ref(false)
  const info = ref({})
  const open = ref(false);
  const list = ref([])
  /**
   * 获取回显信息
   */
  const getEchoInfo = (record) => {
    info.value = record || {}
    open.value = true
    getList()
  
  }
  /**
   * 获取列表
   */
  const getList = async () => {
    loading.value = true
    const {procInsId} = info.value
    const {data} = await getflowtaskgetFlowRecord(procInsId)
    for (let i = 0; i < data.length; i++) {
      const {commentList} = data[i] || {}
      if (Array.isArray(commentList)) {
        for (let j = 0; j < commentList.length; j++) {
          const {imgComment} = commentList[j] || {}
          if (imgComment !== null) {
            const {data: imgCommentRes} = await getresourceosslistByIds(imgComment)
            commentList[j].imgCommentList = imgCommentRes || []
          }
        }
      }
    }
    list.value = data
    loading.value = false
  }
  defineExpose({
    getEchoInfo
  })
  </script>
  <style lang="less" scoped>
  .time_line {
    margin-top: 20px;
  }
  
  .item {
    display: flex;
    align-items: center;
  
    > span {
      display: block;
  
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
  
  .time {
    > span {
      font-size: 12px;
      color: #999999;
    }
  }
  
  .comment {
    padding: 10px 20px;
    margin: 10px 0;
    background-color: #f7f8fa;
  
    .from_info {
      display: flex;
      align-items: center;
  
      > span {
        display: block;
        color: #fc9202;
        font-size: 12px;
  
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }
  </style>
  