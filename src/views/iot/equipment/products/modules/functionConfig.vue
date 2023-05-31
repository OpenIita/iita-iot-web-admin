<template>
  <div>
    <yt-table-fun @handle-add="handleAdd">
      <yt-table :selection="false" :page-hide="true" :column="column" :data="data" :view-btn="false" @handle-update="handleUpdate">
        <template #type="{ row }">
          <div>{{ JSON.stringify(row.dataType.type) || '-' }}</div>
        </template>
        <template #specs="{ row }">
          <div>{{ JSON.stringify(row.dataType.specs) || '-' }}</div>
        </template>
      </yt-table>
    </yt-table-fun>
    <function-detail ref="functionDetailRef"></function-detail>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import FunctionDetail from './modeuls/functionDetail.vue'
import YtTableFun from '@/components/common/yt-table-fun.vue'
import YtTable from '@/components/common/yt-table'

// 获取数据
const getInfo = (id: string) => {
  console.log(id)
}
const functionDetailRef = ref()
const handleAdd = () => {
  functionDetailRef.value.openDialog()
}
const handleUpdate = (row: any) => {
  let tmpModel = JSON.parse(JSON.stringify(row))
  console.log('tmpModel', tmpModel)
  if (!tmpModel.raw.dataType) {
    tmpModel.raw.dataType = {}
  }
  tmpModel.raw.inputData = tmpModel.raw.inputData
    ? tmpModel.raw.inputData
    : []
  tmpModel.raw.outputData = tmpModel.raw.outputData
    ? tmpModel.raw.outputData
    : []
  let prop = tmpModel.raw
  const props: any = {}
  if (prop.dataType.type == "enum") {
    let enumSpecs = []
    for (var p in prop.dataType.specs) {
      enumSpecs.push({
        name: prop.dataType.specs[p],
        value: p,
      })
    }
    props.enumItems = enumSpecs
  } else if (prop.dataType.type == "bool") {
    props.boolItem = {
      _true: prop.dataType.specs["0"],
      _false: prop.dataType.specs["1"],
    }
  }
  functionDetailRef.value.openDialog(toRaw(row), props)
}
const column = ref<IColumn[]>([
  {
    label: '功能类型',
    key: 'type',
  },
  {
    label: '功能名称',
    key: 'name',
  },
  {
    label: '标识符',
    key: 'identifier',
  },
  {
    label: '数据类型',
    key: 'type',
    slot: true,
  },
  {
    label: '数据定义',
    key: 'specs',
    slot: true,
  }
])
const data = ref(([
  {
    "identifier": "powerstate",
    "type": 'property',
    "dataType": {
      "type": "enum",
      "specs": {
        "0": "关",
        "1": "开"
      }
    },
    "name": "开关",
    "accessMode": "rw"
  },
  {
    "identifier": "brightness",
    "type": 'property',
    "dataType": {
      "type": "int32",
      "specs": {
        "min": "1",
        "max": "100"
      }
    },
    "name": "亮度",
    "accessMode": "rw"
  }
] as any).map((m: any) => ({
  ...m,
  raw: m,
  model: m.model || {
    properties: [],
    events: [],
    services: [],
  }
})))
const options = reactive({
  ref: 'crudRef',
  data,
  column,
  tableProps: {
    selection: false,
  }
})

defineExpose({
  getInfo,
})
</script>

<!-- <style lang="less" scoped>

</style> -->
