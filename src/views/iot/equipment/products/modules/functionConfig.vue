<template>
  <div>
    <yt-table-fun @handle-add="handleAdd">
      <yt-table
        :selection="false"
        :page-hide="true"
        :column="column"
        :data="data"
        :view-btn="false"
        v-model:page="state.page"
        v-model:query="state.query"
        :total="state.total"
        :loading="state.loading"
        @handle-update="handleUpdate"
      >
        <template #dataType="{ row }">
          {{ row.raw?.dataType?.type || '-' }}
        </template>
      </yt-table>
    </yt-table-fun>
    <function-detail ref="functionDetailRef" :id="id" :model="model"></function-detail>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'
import { propTypes } from '@/utils/propTypes'

import FunctionDetail from './modeuls/functionDetail.vue'
import YtTableFun from '@/components/common/yt-table-fun.vue'
import YtTable from '@/components/common/yt-table'

const props = defineProps({
  id: propTypes.string.def(''),
  model: propTypes.object.def({}),
})
const state = reactive({
  total: 0,
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  query: {},
  loading: false
})

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
  if (prop.dataType.type == 'enum') {
    let enumSpecs: any[] = []
    for (var p in prop.dataType.specs) {
      enumSpecs.push({
        name: prop.dataType.specs[p],
        value: p,
      })
    }
    props.enumItems = enumSpecs
  } else if (prop.dataType.type == 'bool') {
    props.boolItem = {
      _true: prop.dataType.specs['0'],
      _false: prop.dataType.specs['1'],
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
    key: 'dataType',
    slot: true,
  },
  {
    label: '数据定义',
    key: 'params',
    slot: true,
  }
])
const data = ref<any[]>([])
// 获取数据
const getInfo = (model) => {
  const modelObj = model || {
    properties: [],
    events: [],
    services: [],
  }
  let modelFuncs: any[] = []
  modelObj.properties.forEach((p) => {
    let params = JSON.stringify(p.dataType.specs || '{}')
    modelFuncs.push({
      raw: p,
      type: 'property',
      name: p.name,
      identifier: p.identifier,
      dataTypeName: p.dataType.type,
      params: params == '{}' ? '' : params,
    })
  })
  modelObj.events.forEach((e) => {
    let output = {}
    e.outputData.forEach((p) => {
      output[p.identifier] = p.name
    })
    modelFuncs.push({
      raw: e,
      type: 'event',
      name: e.name,
      identifier: e.identifier,
      dataTypeName: '-',
      params: JSON.stringify(output),
    })
  })
  modelObj.services.forEach((s) => {
    let input: any = {}
    s.inputData.forEach((p) => {
      input[p.identifier] = p.name
    })
    let output = {}
    s.outputData.forEach((p) => {
      output[p.identifier] = p.name
    })
    modelFuncs.push({
      raw: s,
      type: 'service',
      name: s.name,
      identifier: s.identifier,
      dataTypeName: '-',
      params:
        '输入:' +
        JSON.stringify(input) +
        ',输出:' +
        JSON.stringify(output),
    })
  })

  console.log('modelFuncs', modelFuncs)
  data.value = modelFuncs
}
watch(() => props.model, (newV) => {
  if (newV) getInfo(newV)
}, {
  deep: true,
  immediate: true,
})
</script>

<!-- <style lang="less" scoped>

</style> -->
