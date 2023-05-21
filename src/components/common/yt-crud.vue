<template>
  <transition>
    <div>
      <yt-table-search :column="column" @handle-search="search" :search-loing="loading">
        <template #slots="item, formModel">
          <el-input v-model="formModel[item.key]"></el-input>
        </template>
      </yt-table-search>
      <yt-table-fun v-loading="loading" @handle-add="handleAdd()">
        <yt-table
          ref="ytTableRef"
          :data="data"
          :column="column"
          @handle-update="handleUpdate"
          @handle-delete="handleDel"
          @handle-view="handleView"
          @change-page="changePage"
        >
          <template #switch="row">
            <el-switch v-model="row.switch"></el-switch>
          </template>
        </yt-table>
      </yt-table-fun>

      <yt-table-form ref="tableFormRef" :column="column" @on-success="onSuccess">
        <template #slots="col, data">
          <el-switch v-model="data.slots"></el-switch>
        </template>
      </yt-table-form>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { crudProps } from './props/crudProps'
import { PropType } from 'vue'

import YtTableSearch from '@/components/common/yt-table-search'
import YtTableFun from '@/components/common/yt-table-fun.vue'
import YtTable from '@/components/common/yt-table'
import YtTableForm from '@/components/common/yt-table-form'

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

const emits = defineEmits(['change', 'update:queryParams', 'saveFun'])
const ytTableRef = ref()
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
</script>

<!-- <style lang="scss" scoped>

</style> -->
