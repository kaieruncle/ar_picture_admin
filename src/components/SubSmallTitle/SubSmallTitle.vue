<template>
  <div class="sub_small_title_container">
    <div class="content">
      <span>{{ title }}</span>
    </div>
    <slot name="btn"></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    require: false,
    default: "副标题"
  }
});
</script>
<style lang="less" scoped>
.sub_small_title_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.content {
  display: flex;
  align-items: center;

  &::before {
    margin-right: 10px;
    content: '';
    display: block;
    width: 4px;
    height: 14px;
    background-color: #9fb2c6;
  }

  > span {
    display: block;
    color: #555f70;
    font-weight: 600;
    font-size: 14px;
  }
}
</style>