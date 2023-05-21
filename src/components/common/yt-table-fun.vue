<template>
  <el-card shadow="never">
    <template #header>
      <el-row :gutter="funGutter" class="mb8">
        <el-col :span="funSpan" v-if="addBtn">
          <el-button v-bind="addBind" type="primary" plain icon="Plus" @click="emits('handleAdd')">{{ addBtnText }}</el-button>
        </el-col>
        <el-col :span="funSpan" v-if="delBtn">
          <el-button type="danger" plain icon="Delete" v-bind="delBind" :disabled="false" @click="emits('handleDel')">{{ delBtnText }}</el-button>
        </el-col>
        <el-col :span="funSpan" v-if="exportBtn">
          <el-button v-bind="exportBind" type="warning" plain icon="Download" @click="emits('handleExport')">{{ exportBtnText }}</el-button>
        </el-col>
        <right-toolbar v-model:showSearch="showSearch" @queryTable="emits('reloadData')"></right-toolbar>
      </el-row>
    </template>
    <div>
      <slot></slot>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { funProps } from './props/crudProps'
const props = defineProps(funProps)

const exportBind = reactive(props.exportPermi ? {
  vHasPermi: props.exportPermi
} : {})

const addBind = reactive(props.addPermi ? {
  vHasPermi: props.addPermi
} : {})
const delBind = reactive(props.delPermi ? {
  vHasPermi: props.delPermi
} : {})

// 参数
const showSearch = ref(true)

const emits = defineEmits(['handleAdd', 'handleDel', 'handleExport', 'reloadData'])
</script>

<!-- <style lang="scss" scoped>

</style> -->
