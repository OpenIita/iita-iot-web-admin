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
        delBtn: false,
        menuSlot: true,
        menuWidth: 300,
      }"
      @onLoad="getData"
      @saveFun="onSave">
      <template #menuSlot="scope">
        <el-button link type="primary" icon="ScaleToOriginal" @click="openObjectModel(scope.row)">物模型</el-button>
      </template>
    </yt-crud>
    <el-dialog title="产品物模型" width="70%" v-model="objectModel.visible" append-to-body destroy-on-close top="20px">
      <object-model ref="objectModelRef"></object-model>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import ObjectModel from './modules/objectModel.vue'
import YtCrud from '@/components/common/yt-crud.vue'
import { getProductsList, saveProducts,IProductsVO } from '../api/products.api'
import { getCategoriesAll,ICategoriesVO } from '../api/categories.api'


const cateOptions = ref<ICategoriesVO[]>([])
const column: IColumn[] = [{
  label: '产品Key',
  key: 'id',
  search: true,
  editDisabled: true,
  rules: [{ required: true, message: '产品Key不能为空' }],
}, {
  label: '产品名称',
  key: 'name',
  rules: [{ required: true, message: '产品名称不能为空' }],
}, {
  label: '品类',
  key: 'category',
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
    defaultValue: true,
    options: [
      {
        value: true,
        label: '是',
      }, {
        value: false,
        label: '否',
      }
    ]
  }
}, {
  label: '产品图片',
  key: 'pic',
  type: 'image',
}, {
  label: '修改日期',
  key: 'createAt',
  type: 'date',
  formHide: true,
}]
const data = ref<IProductsVO[]>([])
const state = reactive({
  total: 0,
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  query: {},
  loading: false
})
const getData = () => {
  state.loading = true
  getProductsList({
    ...state.page,
    ...state.query,
  }).then(res => {
    data.value = res.data.rows
    state.total = res.data.total
  }).finally(() => {
    state.loading = false
  })
}
// 保存数据
const onSave = ({type, data, cancel}: any) => {
  state.loading = true
  saveProducts(toRaw(data)).then(res => {
    ElMessage.success(type === 'add' ? '添加成功' : '编辑成功')
    cancel()
    getData()
  }).finally(() => {
    state.loading = false
  })

}

const objectModel = reactive({
  visible: false,
})
const objectModelRef = ref()
const openObjectModel = (row: any) => {
  objectModel.visible = true
  nextTick(() => {
    objectModelRef.value.getInfo(row.id)
  })
}

</script>

<!-- <style lang="scss" scoped>

</style> -->
