<template>
  <basic-layout>
    <yt-table-search :data="searchData" @handle-search="search">
      <template #slots="item, formModel">
        <el-input v-model="formModel[item.key]"></el-input>
      </template>
    </yt-table-search>
    <yt-table-fun @handle-add="handleAdd()">
      <yt-table :data="data" :column="column" @handle-update="handleUpdate" @handle-delete="handleDel" @handle-view="handleView">
        <template #switch="row">
          <el-switch v-model="row.switch"></el-switch>
        </template>
      </yt-table>
    </yt-table-fun>
    <yt-table-form ref="tableFormRef"></yt-table-form>
  </basic-layout>
</template>
<script lang="ts" setup>
import YtTableSearch from '@/components/common/yt-table-search'
import YtTableFun from '@/components/common/yt-table-fun.vue'
import YtTable from '@/components/common/yt-table'
import YtTableForm from '@/components/common/yt-table-form'
import { IColumn } from '@/components/common/types/search'

const data = ref([{
  title: '标题1',
  value: '内容呢',
  switch: false,
}])
const tableFormRef = ref()
const handleAdd = () => {
  tableFormRef.value?.openDialog('add')
}
const handleDel = (row: any) => {
  console.log(row)
}
const handleUpdate = (row: any) => {
  tableFormRef.value?.openDialog('edit', row)
}
const handleView = (row: any) => {
  tableFormRef.value?.openDialog('view', row)
}
const column = ref<IColumn[]>([{
  label: '标题',
  key: 'title',
}, {
  label: '内容',
  key: 'value',
}, {
  label: '开光',
  key: 'switch',
  slot: true,
}])
const search = (params: any) => {
  console.log(params)
}
const searchData: IColumn[] = [{
  label: '产品类型',
  key: 'type',
  type: 'select',
  componentProps: {
    options: [{
      label: '类型1',
      value: '1'
    }, {
      label: '类型2',
      value: '2'
    }, {
      label: '类型3',
      value: '3'
    }]
  }
}, {
  label: '日期',
  key: 'date',
  type: 'date',
  componentProps: {
    format: 'YYYY/MM/DD',
    valueFormat: 'YYYY-MM-DD',
  },
}, {
  label: '字符串',
  key: 'string',
}, {
  label: '插槽',
  key: 'slots',
  slot: true,
}]
</script>
