<template>
  <div>
    <yt-table-search v-bind="bind.searchBind" @handle-search="search">
      <template v-for="(item, index) in searchSlots" :key="index" #[item]="scope">
        <slot
          :name="item"
          v-bind="{
            ...scope,
          }"
        ></slot>
      </template>
    </yt-table-search>
    <yt-table-fun v-bind="bind.funBind" v-loading="loading" @handle-add="handleAdd()">
      <yt-table
        v-bind="bind.tableBind"
        ref="ytTableRef"
        @handle-update="handleUpdate"
        @handle-delete="handleDel"
        @handle-view="handleView"
        @change-page="changePage"
        @row-click="rowClick"
      >
        <template #menuSlot="scope">
          <slot
            name="menuSlot"
            v-bind="{
            ...scope,
          }"
          ></slot>
        </template>
        <template v-for="(item, index) in tableSlots" :key="index" #[item]="scope">
          <slot
            :name="item"
            v-bind="{
              ...scope,
            }"
          ></slot>
        </template>
      </yt-table>
    </yt-table-fun>
    <yt-table-form ref="tableFormRef" v-bind="bind.formBind" :column="column" @on-success="onSuccess">
      <template v-for="(item, index) in formSlots" :key="index" #[item]="scope">
        <slot
          :name="item"
          v-bind="{
            ...scope,
          }"
        ></slot>
      </template>
      <template v-for="(item, index) in formItemSlots" :key="index" #[item]="scope">
        <slot
          :name="item"
          v-bind="{
            ...scope,
          }"
        ></slot>
      </template>
    </yt-table-form>
  </div>
</template>
<script lang="ts" setup>
import { crudProps } from './props/crudProps'
import { PropType } from 'vue'

import YtTableSearch from '@/components/common/yt-table-search'
import YtTableFun from '@/components/common/yt-table-fun.vue'
import YtTable from '@/components/common/yt-table'
import YtTableForm from '@/components/common/yt-table-form'
import { IColumn } from './types/tableCommon'

const props = defineProps({
  queryParams: {
    type: Object,
    default: () => ({
      searchParams: {},
      pageParams: {
        pageNum: 1,
        pageSize: 10
      },
    }),
  },
  ...crudProps,
})
let tableSlots = ref<string[]>([])
let formSlots = ref<string[]>([])
let formItemSlots = ref<string[]>([])

let searchSlots = ref<string[]>([])
watch(() => props.column, (newV) => {
  if (newV?.length > 0) {
    tableSlots.value = newV.filter(f => f.slot).map(m => m.key)
    formSlots.value = newV.filter(f => f.formSlot).map(m => m.key + 'Form')
    formItemSlots.value = newV.filter(f => f.formItemSlot).map(m => m.key + 'FormItem')
    searchSlots.value = newV.filter(f => f.searchSlot).map(m => m.key + 'Search')
  }
}, {
  immediate: true,
  deep: true,
})

const emits = defineEmits(['change', 'update:queryParams', 'saveFun', 'rowClick'])
const ytTableRef = ref()
const getTableRef = () => {
  return ytTableRef.value
}
const tableFormRef = ref()
const handleAdd = () => {
  tableFormRef.value?.openDialog('add')
}
const handleDel = (row: any) => {
  console.log(row)
}
const handleUpdate = (row: any) => {
  tableFormRef.value?.openDialog('update', row)
}
const handleView = (row: any) => {
  tableFormRef.value?.openDialog('view', row)
}
const rowClick = (row: any) => {
  emits('rowClick', row)
}
// 表单保存
const onSuccess = (obj: any) => {
  const { type, data } = obj
  emits('saveFun', {
    type,
    data
  })
}

// 传给列表需要的参数
const queryParams = reactive({
  searchParams: {},
  pageParams: {
    pageNum: 1,
    pageSize: 10
  },
})
const search = (params: any) => {
  queryParams.searchParams = params
  emits('update:queryParams', queryParams)
  emits('change', queryParams)
}

const changePage = (data: {
  page: number,
  limit: number
}) => {
  queryParams.pageParams = {
    pageNum: data.page,
    pageSize: data.limit,
  }
  emits('change', queryParams)
}
const objBind = {
  data: props.data,
  column: props.column,
}
const bind = reactive({
  searchBind: objBind,
  tableBind: objBind,
  funBind: {},
  formBind: objBind,
})

// 搜索组件绑定值
if (props.searchProps) bind.searchBind = {
  ...bind.searchBind,
  ...props.searchProps,
}
// 表格组件绑定值
if (props.tableProps) bind.tableBind = {
  ...bind.tableBind,
  ...props.tableProps,
}
// 功能区组件绑定值
if (props.funProps) bind.funBind = {
  ...props.funProps,
}
// 表单组件绑定值
if (props.formProps) bind.formBind = {
  ...bind.formBind,
  ...props.formProps,
}

defineExpose({
  getTableRef,
})
</script>

<!-- <style lang="scss" scoped>

</style> -->
