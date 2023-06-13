<template>
  <div>
    <yt-crud
      ref="crudRef"
      :data="data"
      :column="column"
      :loading="loading"
      :tableProps="{
        pageHide: false,
      }"
      @delFun="onDelete"
      @saveFun="onSave"
    ></yt-crud>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import YtCrud from '@/components/common/yt-crud.vue'
import { deleteCategories, getCategoriesList, saveCategories } from '../api/categories.api'
import { ICategoriesVO } from '../api/categories.api'

const column: IColumn[] = [{
  label: 'id',
  key: 'id',
  rules: [{ required: true, message: 'id不能为空' }],
}, {
  label: '名称',
  key: 'name',
  rules: [{ required: true, message: '名称不能为空' }],
}, {
  label: '添加日期',
  key: 'createAt',
  type: 'date',
  formHide: true,
}]

const data = ref<ICategoriesVO[]>([])
const loading = ref(false)
// 保存数据
const onSave = async ({type, data, cancel}: any) => {
  loading.value = true
  await saveCategories(toRaw(data))
  loading.value = false
  cancel()
  getData()
}
// 删除
const onDelete = async (row: any) => {
  loading.value = true
  await deleteCategories(row.id)
  ElMessage.success('删除成功!')
  loading.value = false
  getData()
}
// 获取数据
const getData = async () => {
  loading.value = true
  const res = await getCategoriesList()
  data.value = res?.data?.rows || []
  loading.value = false
}
getData()
</script>

<!-- <style lang="scss" scoped>

</style> -->
