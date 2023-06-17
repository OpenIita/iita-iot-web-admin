<template>
  <div>
    <yt-crud
      v-bind="options"
      @onLoad="getData"
      :loading="state.loading"
      :total="state.total"
      v-model:page="state.page"
      v-model:query="state.query"
      @saveFun="onSave"
    >
      <template #state="scope">
        <el-tag v-if="scope.row.state.online" type="success" size="mini">在线</el-tag>
        <el-tag v-else type="danger" size="mini">离线</el-tag>
      </template>
      <template #menuSlot="scope">
        <!-- TODO: 没接口,nodeType无法获取，得改成 ！= 0 -->
        <el-button link icon="Box" :disabled="scope.row.nodeType == 0" @click="showChidrenDevices(scope.row)">子设备</el-button>
        <el-button link type="primary" icon="View" @click="handleView(scope.row.id)">详情</el-button>
        <el-popconfirm title="是否确认删除该数据" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button link type="danger" icon="Delete">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </yt-crud>
    <children-dialog ref="childrenDialogRef"></children-dialog>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import ChildrenDialog from './modules/childrenDialog.vue'
import YtCrud from '@/components/common/yt-crud.vue'
import { ElPopconfirm } from 'element-plus'
import { getDevicesList, deleteDevices, saveDevices } from '../api/devices.api'

const state = reactive({
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  total: 0,
  loading: false,
  query: {},
})

// 查看详情
const router = useRouter()
const handleView = (id: string) => {
  if (!id) return
  router.push(`devicesDetail/${id}`)
}

// 打开子设备
const childrenDialogRef = ref()
const showChidrenDevices = (row: any) => {
  childrenDialogRef.value.openDialog(row)
}

// 产品字典
const productOptions = [
  {
    'id': 'xpsYHExTKPFaQMS7',
    'name': '调光灯',
    'category': 'light',
    'nodeType': 1,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'null',
    'transparent': false,
    'createAt': 1681962512815
  },
  {
    'id': 'hdX3PCMcFrCYpesJ',
    'name': '智能风扇',
    'category': 'fan',
    'nodeType': 1,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': null,
    'transparent': null,
    'createAt': 1659872083983
  },
  {
    'id': 'hbtgIA0SuVw9lxjB',
    'name': 'GW01网关',
    'category': 'gateway',
    'nodeType': 0,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/hbtgIA0SuVw9lxjB/cover.jpg?Expires=1967598154&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=2gh2jad14mVHGvWThwOd%2FykiB5g%3D',
    'transparent': false,
    'createAt': 1659872083984
  },
  {
    'id': 'eDhXKwEzwFybM5R7',
    'name': '三路开关',
    'category': 'switch',
    'nodeType': 1,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/eDhXKwEzwFybM5R7/cover.jpeg?Expires=1967598172&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=ZrFgANkomVEDQRV5JdmONL0S2sY%3D',
    'transparent': false,
    'createAt': 1659872083985
  },
  {
    'id': 'cGCrkK7Ex4FESAwe',
    'name': '插座',
    'category': 'SmartPlug',
    'nodeType': 1,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/cGCrkK7Ex4FESAwe/cover.jpeg?Expires=1967598137&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=vOjqav0pRZqQFgx8xBo99WhgWXk%3D',
    'transparent': false,
    'createAt': 1659872083986
  },
  {
    'id': 'Rf4QSjbm65X45753',
    'name': '一路开关',
    'category': 'switch',
    'nodeType': 1,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/Rf4QSjbm65X45753/cover.jpeg?Expires=1967598145&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=ksQhmEm5Rn7C7FFqY09o9l%2BZ%2BIQ%3D',
    'transparent': false,
    'createAt': 1659872083987
  },
  {
    'id': 'PN3EDmkBZDD8whDd',
    'name': '门磁',
    'category': 'door',
    'nodeType': 1,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'null',
    'transparent': null,
    'createAt': 1659872083988
  },
  {
    'id': 'N523nWsCiG3CAn6X',
    'name': 'ZGW01',
    'category': 'gateway',
    'nodeType': 0,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/N523nWsCiG3CAn6X/cover.jpg?Expires=1967597641&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=%2BaGcHBT%2FHA3s%2BrZ687U50b4YE0A%3D',
    'transparent': false,
    'createAt': 1659872083988
  },
  {
    'id': 'KdJYpTp5ywNhmrmC',
    'name': '第三方接入',
    'category': '',
    'nodeType': 0,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/KdJYpTp5ywNhmrmC/cover.png?Expires=1968261336&OSSAccessKeyId=LTAI5t8UFEH5eGrBUS5zSiof&Signature=df%2F6JEcxBlXitSNIENPMYJlRE8Y%3D',
    'transparent': false,
    'createAt': 1659872083990
  },
  {
    'id': 'Eit3kmGJtxSHfCKT',
    'name': '燃气表',
    'category': 'meter',
    'nodeType': 2,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': null,
    'transparent': false,
    'createAt': 1659872083990
  },
  {
    'id': 'DSGxxKk6E8mmDk6C',
    'name': '通断器',
    'category': 'switch',
    'nodeType': 1,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/DSGxxKk6E8mmDk6C/cover.jpeg?Expires=1967598201&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=k2PqHc%2BI14DfCwD8kQIflwoBAog%3D',
    'transparent': false,
    'createAt': 1659872083991
  },
  {
    'id': 'D8c5pXFmt2KJDxNm',
    'name': '四路场景面板',
    'category': 'switch',
    'nodeType': 1,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': null,
    'transparent': null,
    'createAt': 1659872083992
  },
  {
    'id': 'AWcJnf7ymGSkaz5M',
    'name': 'smart pulg',
    'category': 'SmartPlug',
    'nodeType': 1,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/AWcJnf7ymGSkaz5M/cover.jpeg?Expires=1967598035&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=tXzWH5%2B4JNcnuTFrJbvGwsbx97c%3D',
    'transparent': true,
    'createAt': 1659872083993
  },
  {
    'id': '6kYp6jszrDns2yh4',
    'name': '温湿度传感器',
    'category': 'sensor',
    'nodeType': 1,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': null,
    'transparent': null,
    'createAt': 1659872083994
  },
  {
    'id': 'nFSJHYW744dzDYfW',
    'name': '测试',
    'category': 'switch',
    'nodeType': 2,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': null,
    'transparent': false,
    'createAt': 1659914779161
  },
  {
    'id': '64WyYNJfWNJrJBsB',
    'name': 'T100S400L',
    'category': 'T100',
    'nodeType': 2,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'null',
    'transparent': false,
    'createAt': 1681869020035
  },
  {
    'id': 'hdJZjrZjrB2SG4Hm',
    'name': 'T100',
    'category': 'T100',
    'nodeType': 2,
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'img': 'null',
    'transparent': false,
    'createAt': 1681864702527
  }
]
// 组列表
const groupOptions = [
  {
    'id': 'g3',
    'name': '组3',
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'remark': '2223333',
    'deviceQty': 17,
    'createAt': 1659872082792
  },
  {
    'id': 'g2',
    'name': '组2',
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'remark': '222',
    'deviceQty': 21,
    'createAt': 1659872082803
  },
  {
    'id': 'g1',
    'name': '分组1',
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'remark': '1111',
    'deviceQty': 10,
    'createAt': 1659872082805
  }
]
const column: IColumn[] = [{
  label: '设备ID',
  key: 'deviceId',
  formHide: true,
  rules: [{ required: true, message: 'ProductKey不能为空' }],
}, {
  label: '产品',
  key: 'productKey',
  type: 'select',
  search: true,
  tableWidth: 120,
  editDisabled: true,
  componentProps: {
    labelAlias: 'name',
    valueAlias: 'id',
    options: productOptions,
  },
  rules: [{ required: true, message: '产品名称不能为空' }],
}, {
  label: '设备DN',
  key: 'deviceName',
  tableWidth: 240,
  componentProps: {
    placeholder: '一般为设备mac'
  },
  rules: [{ required: true, message: '设备DN不能为空' }],
  }
// , {
//     label: '分组',
//     key: 'group',
//     type: 'select',
//     componentProps: {
//       labelAlias: 'name',
//       valueAlias: 'id',
//       options: groupOptions,
//     },
//   }
  , {
  label: '状态',
  key: 'state',
  search: true,
  formHide: true,
  tableWidth: 80,
  slot: true,
}, {
  label: '关键字',
  key: 'key',
  search: true,
  hide: true,
  formHide: true,
}, {
  label: '创建时间',
  key: 'createAt',
  tableWidth: 180,
  type: 'date',
  formHide: true,
}]

const data = ref([])
const getData =  () => {
  state.loading = true
  getDevicesList({
    ...state.page,
    ...state.query,
  }).then((res) => {
    data.value = res.data.rows
    state.total = res.data.total
  }).finally(() => {
    state.loading = false
  })
}
// 保存数据
const onSave = async ({type, data, cancel}: any) => {
  state.loading = true
  await saveDevices(toRaw(data))

  state.loading = false
  cancel()
  getData()
}
// 删除
const handleDelete = async (row: any) => {
  state.loading = true
  await deleteDevices(row.id)
  ElMessage.success('删除成功!')
  state.loading = false
  getData()
}
const options = reactive({
  ref: 'crudRef',
  tableProps: {
    selection: false,
    delBtn: false,
    viewBtn: false,
    editBtn: true,
    menuSlot: true,
    menuWidth: 300,
  },
  data,
  column,
})
</script>

<!-- <style lang="scss" scoped>

</style> -->
