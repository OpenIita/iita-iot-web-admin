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
        menuWidth: 270,
        menuSlot: true,
      }"
      @openBeforeFun="openBeforeFun"
      @onLoad="getData"
      @delFun="onDelete"
      @saveFun="onSave"
    >
      <template #status="scope">
        <el-switch
          v-model="scope.row.status"
          active-value="0"
          inactive-value="1"
          disabled
          style="--el-switch-on-color: #029D40; --el-switch-off-color: #DFDFDF"
        />
      </template>
      <template #menuSlot="scope">
        <el-tooltip class="box-item" effect="dark" content="停用" placement="top">
          <el-button v-if="scope.row.status === '0'" link type="danger" icon="SwitchButton" @click="handleStatus(scope.row)" />
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="启用" placement="top">
          <el-button v-if="scope.row.status === '1'" link type="success" icon="Open" @click="handleStatus(scope.row)" />
        </el-tooltip>
      </template>
    </yt-crud>
  </div>
</template>

<script setup name="Tenant" lang="ts">
import { IColumn } from '@/components/common/types/tableCommon'

import YtCrud from '@/components/common/yt-crud.vue'
import { listTenant, getTenant, delTenant, addTenant, updateTenant, changeTenantStatus, syncTenantPackage } from '@/api/system/tenant'
import { selectTenantPackage } from '@/api/system/tenantPackage'
import { TenantForm, TenantQuery, TenantVO } from '@/api/system/tenant/types'
import { TenantPkgVO } from '@/api/system/tenantPackage/types'
import { ComponentInternalInstance } from 'vue'
import { FormInstance } from 'element-plus'

let packageOptions: any[] = []

const column = ref<IColumn[]>([{
  label: '租户编号',
  key: 'tenantId',
  search: true,
  addHide: true,
  formHide: true,
  rules: [{ required: true, message: '租户编号不能为空' }],
}, {
  label: '企业名称',
  key: 'companyName',
  search: true,
  rules: [{ required: true, message: '企业名称不能为空' }],
}, {
  label: '联系人',
  key: 'contactUserName',
  search: true,
  rules: [{ required: true, message: '联系人不能为空' }],
}, {
  label: '联系电话',
  key: 'contactPhone',
  search: true,
  rules: [{ required: true, message: '联系电话不能为空' }],
}, {
  label: '用户名',
  key: 'username',
  hide: true,
  editHide: true,
  rules: [{ required: true, message: '用户名不能为空' }],
}, {
  label: '用户密码',
  key: 'password',
  hide: true,
  editHide: true,
  rules: [{ required: true, message: '用户密码不能为空' }],
}, {
  label: '租户套餐',
  key: 'packageId',
  hide: true,
  type: 'select',
  componentProps: {
    labelAlias: 'packageName',
    valueAlias: 'id',
  },
  rules: [{ required: true, message: '租户套餐不能为空' }],
}, {
  label: '过期时间',
  key: 'expireTime',
  type: 'date',
}, {
  label: '用户数量',
  key: 'accountCount',
  hide: true,
}, {
  label: '绑定域名',
  key: 'domain',
  hide: true,
}, {
  label: '企业地址',
  key: 'address',
}, {
  label: '企业代码',
  key: 'licenseNumber',
}, {
  label: '租户状态',
  key: 'status',
  addHide: true,
  formHide: true,
  slot: true,
}, {
  label: '企业简介',
  key: 'intro',
  hide: true,
  componentProps: {
    type: 'textarea',
    row: 3,
  }
}, {
  label: '备注',
  key: 'remark',
  hide: true,
}])

const data = ref<TenantVO[]>([])
const state = reactive({
  total: 0,
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  query: {},
  loading: false
})

// 保存数据
const onSave = async ({data, cancel}: any) => {
  state.loading = true
  if(data.id){
    updateTenant(toRaw(data))
  }else{
    await addTenant(toRaw(data))
  }
  state.loading = false
  cancel()
  getData()
}
// 删除数据
const onDelete = async (row: any) => {
  if(row.status === '0'){
    ElMessage.success('租户正在启用中,不能删除!')
    return
  }
  state.loading = true
  await delTenant(row.id)
  ElMessage.success('删除成功!')
  state.loading = false
  getData()
}
// 获取数据
const getData = async () => {
  state.loading = true
  listTenant(state.page).then(res => {
    data.value = res.data.rows
    state.total = res.data.total
  }).finally(() => {
    state.loading = false
  })
}
// 查询所有租户套餐
const getTenantPackage = async () => {
  selectTenantPackage().then(res => {
    res = res || {}
    packageOptions = res.data || []
    column.value.forEach(item => {
      if (item.key === 'packageId') {
        item.componentProps.options = packageOptions
      }
    })
  })
}
// 前置操作
const openBeforeFun = ({type, data}) => {
  getTenantPackage()
}
const handleStatus = (row) => {
  state.loading = true
  changeTenantStatus(row.id,row.tenantId,row.status==='0'?'1':'0').then(res => {
    ElMessage.success(row.status==='0'?'停用成功!':'启用成功!')
    getData()
  }).finally(() => {
    state.loading = false
  })
}
</script>
