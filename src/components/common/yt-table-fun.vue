<template>
  <el-card shadow="never">
    <template #header>
      <el-row :gutter="gutter" class="mb8">
        <el-col :span="span" v-if="addBtn">
          <el-button v-bind="addBind" type="primary" plain icon="Plus" @click="emits('handleAdd')">{{ addBtnText }}</el-button>
        </el-col>
        <el-col :span="span" v-if="delBtn">
          <el-button type="danger" plain icon="Delete" v-bind="delBind" :disabled="false" @click="emits('handleDel')">{{ delBtnText }}</el-button>
        </el-col>
        <el-col :span="span" v-if="exportBtn">
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
import { propTypes } from '@/utils/propTypes'
import { PropType } from 'vue'

const props = defineProps({
  // 布局
  gutter: propTypes.number.def(10),
  span: propTypes.number.def(1.5),
  // 按钮权限
  addPermi: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  delPermi: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  exportPermi: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  // 按钮显示
  addBtn: propTypes.bool.def(true),
  // 删除暂无批量删除
  delBtn: propTypes.bool.def(false),
  // TODO: 导出暂时没得、后面加
  exportBtn: propTypes.bool.def(false),
  // 按钮文字
  addBtnText: propTypes.string.def('新增'),
  delBtnText: propTypes.string.def('删除'),
  exportBtnText: propTypes.string.def('导出'),
})

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
