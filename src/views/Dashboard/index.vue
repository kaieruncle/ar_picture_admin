<template>
  <div class="dashboard_container">
    <SubTitle title="系统数据" />
    <a-row :gutter="[16,16]">
      <a-col :md="8" :sm="16" :xs="24">
        <a-statistic :value="dataResource.projectCount">
          <template #title>
            <SvgIcon name="project" class="svg_icon"></SvgIcon>
            <span>项目数量</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="8" :sm="16" :xs="24">
        <a-statistic :value="dataResource.expertCount">
          <template #title>
            <SvgIcon name="author" class="svg_icon"></SvgIcon>
            <span>达人数</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="8" :sm="16" :xs="24">
        <a-statistic :value="dataResource.noteCount">
          <template #title>
            <SvgIcon name="note" class="svg_icon"></SvgIcon>
            <span>笔记数</span>
          </template>
        </a-statistic>
      </a-col>
    </a-row>
    <SubTitle title="爬虫数据" />
    <a-row :gutter="[16,16]">
      <a-col :md="6" :sm="16" :xs="24">
        <a-statistic :value="dataResource.fansCount">
          <template #title>
            <SvgIcon name="fans" class="svg_icon"></SvgIcon>
            <span>总粉丝数</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="6" :sm="16" :xs="24">
        <a-statistic :value="dataResource.likedCount">
          <template #title>
            <SvgIcon name="like" class="svg_icon"></SvgIcon>
            <span>总点赞数</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="6" :sm="16" :xs="24">
        <a-statistic :value="dataResource.collectedCount">
          <template #title>
            <SvgIcon name="collected" class="svg_icon"></SvgIcon>
            <span>总收藏数</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="6" :sm="16" :xs="24">
        <a-statistic :value="dataResource.commentCount">
          <template #title>
            <SvgIcon name="comment" class="svg_icon"></SvgIcon>
            <span>总评论数</span>
          </template>
        </a-statistic>
      </a-col>
    </a-row>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getprojecttotal } from './api';

onMounted(() => {
  getDataResource()
})
const loading = ref(false)
const dataResource = ref({})
/**
 * 获取列表
 */
const getDataResource = async () => {
  loading.value = true
  const data = await getprojecttotal()
  dataResource.value = data || {}
  loading.value = false
}

</script>
<style lang="less" scoped>
.dashboard_container {
  padding: 0 20px;

  .sub_title_container {
    margin: 20px 0;
  }

  // :deep(.ant-col) {
  //   padding: 20px;
  //   border: 1px solid #f7f8fa;
  // }
  :deep(.ant-statistic){
    padding:20px 40px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  :deep(.ant-statistic-content-value-int){
    font-size: 40px;
  }
}

.svg_icon {
  margin-right: 10px;
  width: 16px;
  height: 16px;
}
</style>