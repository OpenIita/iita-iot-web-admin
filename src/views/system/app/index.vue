<template>
  <div>
    <yt-crud
      ref="crudRef"
      :data="data"
      :column="column"
      v-model:page="state.page"
      v-model:query="state.query"
      :total="state.total"
      :loading="state.loading"
      :tableProps=" {
            selection: false,
            viewBtn: false,
            menuWidth: 100,
    
          }"
      @onLoad="getData"
      @delFun="onDelete"
      @saveFun="onSave"
    />
  </div>
</template>
  
  <script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import YtCrud from '@/components/common/yt-crud.vue'
import { listApp, addApp, delApp, updateApp } from '@/api/system/app'
import { AppVO } from '@/api/system/app/types'

const column: IColumn[] = [
  {
    label: '应用名称',
    key: 'appName',
    search: true,
    rules: [{ required: true, message: '应用名称不能为空' }],
  },
  {
    label: 'appId',
    key: 'appId',
    search: true,
    editDisabled: true,
    rules: [{ required: true, message: 'appId不能为空' }],
  },
  {
    label: 'appSecret',
    key: 'appSecret',
    search: false,
    hide:true,
    rules: [{ required: true, message: 'appSecret不能为空' }],
  },
  {
    label: '应用类型',
    key: 'appType',
    sortable: true,
    type: 'select',
    rules: [{ required: true, message: '应用类型不能为空' }],
    componentProps: {
      options: [
        {
          label: 'APP',
          value: '0',
        },
        {
          label: '小程序',
          value: '1',
        },
      ],
    },
  },
  {
    label: '备注',
    key: 'remark',
    sortable: true,
  },
]

const data = ref<AppVO[]>([])
const state = reactive({
  total: 0,
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  query: {},
  loading: false,
})
// 保存数据
const onSave = async ({ data, cancel }: any) => {
  state.loading = true
  data.id ? await updateApp(toRaw(data)) : await addApp(toRaw(data))
  state.loading = false
  cancel()
  getData()
}
// 删除数据
const onDelete = async (row: any) => {
  state.loading = true
  await delApp(row.id)
  ElMessage.success('删除成功!')
  state.loading = false
  getData()
}
// 获取数据
const getData = async () => {
  state.loading = true
  listApp(state.page)
    .then((res) => {
      data.value = res.data.rows
      state.total = res.data.total
    })
    .finally(() => {
      state.loading = false
    })
}
</script>
  