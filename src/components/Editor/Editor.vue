<template>
  <div class="editor_container">
    <Toolbar :defaultConfig="toolbarConfig" :editor="editorRef" mode="default"/>
    <Editor v-model="content" :defaultConfig="editorConfig" mode="default" @onCreated="handleCreated"/>
  </div>
</template>
<script setup>
import {onBeforeUnmount, ref, shallowRef} from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {postfileupload} from '@/request/commonApi';

const content = ref('')
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {
  excludeKeys: [
    "fullScreen"
  ]
}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      async customUpload(file, insertFn) {
        const formData = new FormData()
        formData.append('file', file)
        const {data} = await postfileupload(formData)
        const {url} = data || {}
        if (!url) return
        insertFn(url, '', '')
      }
    }

  }
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
defineExpose({
  content,
  editorRef
})
</script>
<style lang="less" scoped>
.editor_container {
  width: 100%;
  height: 100%;
  min-height: 400px;
  border: 1px solid #e0e0e0;
}
</style>