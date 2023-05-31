<template>
  <div>
    <yt-crud v-bind="options" ref="crudRef" :data="data" :column="column">
      <template #menuSlot="scope">
        <el-button link type="primary" icon="Switch" @click="handleConversionScript(scope.row)">编辑转换脚本</el-button>
      </template>
    </yt-crud>
    <conversion-script title="转换脚本" ref="conversionScriptRef"></conversion-script>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import ConversionScript from '../modules/conversionScript.vue'
import YtCrud from '@/components/common/yt-crud.vue'

// 转换脚本
const conversionScriptRef = ref()
const handleConversionScript = (row: any) => {
  conversionScriptRef.value.openDialog(row)
}

const column: IColumn[] = [{
  label: '名称',
  key: 'name',
  rules: [{ required: true, message: '名称不能为空' }],
}, {
  label: '说明',
  key: 'desc',
  componentProps: {
    rows: 4,
    type: 'textarea'
  }
}, {
  label: '添加日期',
  key: 'createAt',
  type: 'date',
  formHide: true,
}]

const data = ref([
  {
    "id": "62995ba4dbf51a5ec41d5f7b",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "自定义表计协议",
    "desc": "用于燃气表的协议",
    "createAt": 1654217636597
  },
  {
    "id": "628ceb14addfdb2a3b4b5727",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "奇特HTTP标准协议",
    "desc": "奇特HTTP标准协议转换器",
    "createAt": 1653402388275
  },
  {
    "id": "6260396d67aced2696184053",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "奇特MQTT标准协议",
    "desc": "奇特MQTT标准协议转换器",
    "createAt": 1650473325173
  }
])

const options = reactive({
  tableProps: {
    selection: false,
    viewBtn: false,
    menuSlot: true,
    menuWidth: 300,
  },
  searchProps: {},
})
</script>

<!-- <style lang="scss" scoped>

</style> -->
