<template>
  <div>
    <yt-crud
      v-bind="options"
      :loading="state.loading"
      :total="state.total"
      v-model:page="state.page"
      v-model:query="state.query"
      @on-load="getData"
      @delFun="onDelete"
      @saveFun="onSave"
    >
      <template #menuSlot="scope">
        <el-tooltip class="box-item" effect="dark" content="配置" placement="top">
          <el-button link type="primary" icon="Setting" @click="handleConfig(scope.row.id)"></el-button>
        </el-tooltip>
      </template>
      <template #state="scope">
        <el-tag v-if="scope.row.state === 'running'" type="success" size="small">运行中</el-tag>
        <el-tag v-else-if="scope.row.state === 'stopped'" type="danger" size="small">已停止</el-tag>
      </template>
      <template #triggerExpression1FormItem="{column, row}">
        <el-form-item v-if="row.trigger === 'cron'" :label="column.label" :prop="column.key">
          <crontab-box v-model="row[column.key]"></crontab-box>
        </el-form-item>
      </template>
      <template #triggerExpression2FormItem="{column, row}">
        <el-form-item v-if="row.trigger === 'random'" :label="column.label" :prop="column.key">
          <el-radio-group v-model="row[column.key]">
            <el-radio-button label="second">秒</el-radio-button>
            <el-radio-button label="minute">分</el-radio-button>
            <el-radio-button label="hour">时</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>
    </yt-crud>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'
import { deleteVirtualDevices, batchDeleteVirtualDevices, getVirtualDevicesList, saveVirtualDevices } from '../api/virtualDevices.api'
import { getProductsList, IProductsVO } from '../api/products.api'

import CrontabBox from '@/components/Crontab/index.vue'
import YtCrud from '@/components/common/yt-crud.vue'

// 跳转配置
const router = useRouter()
const handleConfig = (id: string) => {
  if (!id) return
  router.push(`virtualDeviceConfig/${id}`)
}

// 产品字典
const productOptions = ref<IProductsVO[]>([])
const column = ref<IColumn[]>([{
  label: '名称',
  key: 'name',
  rules: [{ required: true, message: '名称不能为空' }],
}, {
  label: '所属产品',
  key: 'productKey',
  type: 'select',
  search: true,
  tableWidth: 120,
  componentProps: {
    labelAlias: 'name',
    valueAlias: 'productKey',
    options: productOptions,
  },
  rules: [{ required: true, message: '产品名称不能为空' }],
}, {
  label: '类型',
  key: 'type',
  type: 'radioButton',
  componentProps: {
    defaultValue: 'thingModel',
    options: [
      {
        value: 'thingModel',
        label: '基于物模型',
      }, {
        value: 'protocol',
        label: '基于设备协议',
      }
    ]
  }
}, {
  label: '触发方式',
  key: 'trigger',
  type: 'radioButton',
  tableWidth: 120,
  componentProps: {
    defaultValue: 'none',
    options: [
      {
        value: 'none',
        label: '无（手动）',
      }, {
        value: 'cron',
        label: '定时执行',
      }, {
        value: 'random',
        label: '随机执行',
      }
    ]
  }
}, {
  label: '状态',
  key: 'state',
  search: true,
  formHide: true,
  tableWidth: 80,
  slot: true,
}, {
  label: 'cron表达式',
  key: 'triggerExpression1',
  type: 'cron',
  formItemSlot: true,
  hide: true,
}, {
  label: '随机单位',
  key: 'triggerExpression2',
  type: 'radioButton',
  hide: true,
  formItemSlot: true,
}, {
  label: '创建时间',
  key: 'createAt',
  type: 'date',
  sortable: true,
  formHide: true,
}])
const state = reactive({
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  total: 0,
  loading: false,
  query: {},
})
const data = ref()
const getData = () => {
  state.loading = true
  getVirtualDevicesList({
    ...state.page,
  }).then((res) => {
    data.value = res.data.rows
    state.total = res.data.total
  })
  state.loading = false
}
const getDict = () => {
  getProductsList({
    pageNum: 1,
    pageSize: 99999,
  }).then(res => {
    productOptions.value = res.data.rows || []
    column.value.forEach(item => {
      if (item.key === 'productKey') {
        item.componentProps.options = productOptions.value
      }
    })
  })
}
getDict()
// 保存数据
const onSave = ({type, data, cancel}: any) => {
  state.loading = true
  saveVirtualDevices(toRaw(data)).then(res => {
    ElMessage.success(type === 'add' ? '添加成功' : '编辑成功')
    cancel()
    getData()
  }).finally(() => {
    state.loading = false
  })
}
// 删除
const onDelete = async (row: any) => {
  state.loading = true
  let ids = row.id
  let fun = deleteVirtualDevices
  if (row instanceof Array) {
    ids = row.map(m => m.id)
    fun = batchDeleteVirtualDevices
  }
  await fun(ids)
  ElMessage.success('删除成功!')
  state.loading = false
  getData()
}
const options = reactive({
  ref: 'crudRef',
  tableProps: {
    selection: true,
    delBtn: true,
    menuSlot: true,
    menuWidth: 220,
  },
  funProps: {
    delBtn: true,
  },
  searchProps: {
    labelWidth: 120,
  },
  data,
  column,
})
</script>

<!-- <style lang="scss" scoped>

</style> -->
