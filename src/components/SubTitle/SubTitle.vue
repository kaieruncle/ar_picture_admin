<template>
    <div class="sub_title_container">
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
.sub_title_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
        background-color: #fc9202;
    }

    >span {
        display: block;
        font-weight: 600;
    }
}
</style>