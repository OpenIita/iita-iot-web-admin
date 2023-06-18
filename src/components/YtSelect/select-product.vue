<template>
  <el-input class="cu-input" size="small" placeholder="请选择产品" v-model.trim="name" @clear="onClear" clearable @click="handleSelect">
    <template #append>
      <el-button type="primaqry" @click="handleSelect">选择</el-button>
    </template>
  </el-input>
  <el-dialog title="选择产品" v-model="dialogState.show" width="1200px">
    <yt-crud
      ref="ytCrudRef"
      :data="data"
      :column="column"
      :table-props="{
        menu: false,
        selection: multiple,
      }"
      :fun-props="{
        hide: true
      }"
      :loading="state.loading"
      :total="state.total"
      v-model:page="state.page"
      v-model:query="state.query"
      @on-load="getData"
      @row-click="rowClick"
    ></yt-crud>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogState.show = false">取消</el-button>
        <el-button type="primary" @click="handleMultiple">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import { IColumn } from '../common/types/tableCommon'
import { getProductsList } from '@/views/iot/equipment/api/products.api'
import { getCategoriesAll } from '@/views/iot/equipment/api/categories.api'

import YtCrud from '@/components/common/yt-crud.vue'

const props = defineProps({
  id: propTypes.string.def(''),
  // 是否多选
  multiple: propTypes.bool.def(false)
})
const emits = defineEmits(['onSelect', 'update:id'])
const state = reactive({
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  total: 0,
  loading: false,
  query: {},
})
// 单击
const ytCrudRef = ref()

const rowClick = (row: any) => {
  if (props.multiple) {
    ytCrudRef.value.getTableRef().tableRef.toggleRowSelection(toRaw(row), undefined)
    return
  }
  emits('onSelect', row)
  emits('update:id', row.id)
  dialogState.data = row
  dialogState.show = false
  console.log(row)
}
// 多选
const handleMultiple = () => {
  const rows = ytCrudRef.value.getTableRef().tableRef.getSelectionRows()
  dialogState.data = {
    id: rows.map((m: any) => m.id),
    name: rows.map((m: any) => m.name).join(',')
  }
  emits('update:id', dialogState.data.id)
  dialogState.show = false
}

// 清空
const onClear = () => {
  emits('update:id', '')
  dialogState.data = {}
}
const dialogState = reactive({
  show: false,
  data: {} as any,
})
const name = computed(() => {
  return dialogState.data?.name || ''
})
const handleSelect = () => {
  console.log('handleSelect')
  dialogState.show = true
}
// 分类字典
const cateOptions = ref<any[]>([])
const getDict = () => {
  getCategoriesAll().then(res => {
    console.log(res.data)
    cateOptions.value = res.data || []
  })
}
getDict()
const column: IColumn[] = [{
  label: 'ProductKey',
  key: 'id',
  rules: [{ required: true, message: 'ProductKey不能为空' }],
}, {
  label: '产品名称',
  search: true,
  key: 'name',
  rules: [{ required: true, message: '产品名称不能为空' }],
}, {
  label: '品类',
  key: 'category',
  search: true,
  type: 'select',
  tableWidth: 80,
  componentProps: {
    labelAlias: 'name',
    valueAlias: 'id',
    options: cateOptions.value,
  },
  rules: [{ required: true, message: '品类不能为空' }],
}, {
  label: '节点类型',
  key: 'nodeType',
  type: 'radio',
  componentProps: {
    defaultValue: 0,
    options: [
      {
        value: 0,
        label: '网关设备',
      }, {
        value: 1,
        label: '网关子设备',
      }, {
        value: 2,
        label: '直连设备',
      },
    ]
  }
}, {
  label: '透传设备',
  key: 'transparent',
  type: 'radio',
  tableWidth: 80,
  componentProps: {
    defaultValue: 'true',
    options: [
      {
        value: 'true',
        label: '是',
      }, {
        value: 'false',
        label: '否',
      }
    ]
  }
}]
const data = ref<any[]>([])
const getData = () => {
  state.loading = true
  getProductsList({
    ...state.query,
    ...state.page,
  }).then((res) => {
    data.value = res.data.rows || []
    state.total = res.data.total
  })
  state.loading = false
}
</script>

<style lang="scss" scoped>
.cu-input {
  cursor: pointer;
}
::v-deep(.el-input-group__append) {
  background-color: var(--el-color-primary);
  color: #fff;
}
</style>
