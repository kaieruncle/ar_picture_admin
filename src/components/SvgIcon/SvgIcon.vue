<template>
    <svg aria-hidden="true">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>
<script setup>
import { defineComponent, computed } from 'vue'
const symbolId = computed(() => `#icon-${props.name}`)
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#333'
    }
})
</script>