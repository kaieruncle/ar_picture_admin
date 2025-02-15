<template>
  <a-config-provider :locale="zhCN" :theme="{
      token: {
        colorPrimary: '#fc9202',
      },
    }">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script setup>
import { onMounted } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useSysStore } from '@/store/index';
dayjs.locale('zh-cn');
const sysStore = useSysStore()
onMounted(() => {
  getDeviceWidth()
})
/**
 * 处理视口宽度改变事件
 */
const handleWindowResize = (e) => {
  const SCREEN_WIDTH = 1200
  sysStore.setIsMobile(window.innerWidth < SCREEN_WIDTH)
}
/**
 * 判断设备尺寸是否为移动端
 */
const getDeviceWidth = () => {
  window.addEventListener('resize', handleWindowResize);
}
</script>
