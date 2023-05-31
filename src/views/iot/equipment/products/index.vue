<template>
  <div>
    <yt-crud v-bind="options">
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

// 分类字典
const cateOptions = [
  {
    id: 'switch',
    name: '开关',
    createAt: 1647599367057
  },
  {
    id: 'sensor',
    name: '传感器',
    createAt: 1649743382683
  },
  {
    id: 'meter',
    name: '表计',
    createAt: 1654237582120
  },
  {
    id: 'light',
    name: '灯',
    createAt: 1650174762755
  },
  {
    id: 'gateway',
    name: '网关',
    createAt: 1646637047902
  },
  {
    id: 'fan',
    name: '风扇',
    createAt: 1646630215889
  },
  {
    id: 'door',
    name: '门磁',
    createAt: 1650173898298
  },
  {
    id: 'SmartPlug',
    name: '智能插座',
    createAt: 1645409421118
  },
  {
    id: 'T100',
    name: 'T100',
    createAt: 1681807566413
  }
]
const column: IColumn[] = [{
  label: 'ProductKey',
  key: 'id',
  search: true,
  rules: [{ required: true, message: 'ProductKey不能为空' }],
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
    options: cateOptions,
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

const data = ref([
  {
    "id": "xpsYHExTKPFaQMS7",
    "name": "调光灯",
    "category": "light",
    "nodeType": 1,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "null",
    "transparent": false,
    "createAt": 1681962512815
  },
  {
    "id": "hdX3PCMcFrCYpesJ",
    "name": "智能风扇",
    "category": "fan",
    "nodeType": 1,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": null,
    "transparent": null,
    "createAt": 1659872083983
  },
  {
    "id": "hbtgIA0SuVw9lxjB",
    "name": "GW01网关",
    "category": "gateway",
    "nodeType": 0,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/hbtgIA0SuVw9lxjB/cover.jpg?Expires=1967598154&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=2gh2jad14mVHGvWThwOd%2FykiB5g%3D",
    "transparent": false,
    "createAt": 1659872083984
  },
  {
    "id": "eDhXKwEzwFybM5R7",
    "name": "三路开关",
    "category": "switch",
    "nodeType": 1,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/eDhXKwEzwFybM5R7/cover.jpeg?Expires=1967598172&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=ZrFgANkomVEDQRV5JdmONL0S2sY%3D",
    "transparent": false,
    "createAt": 1659872083985
  },
  {
    "id": "cGCrkK7Ex4FESAwe",
    "name": "插座",
    "category": "SmartPlug",
    "nodeType": 1,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/cGCrkK7Ex4FESAwe/cover.jpeg?Expires=1967598137&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=vOjqav0pRZqQFgx8xBo99WhgWXk%3D",
    "transparent": false,
    "createAt": 1659872083986
  },
  {
    "id": "Rf4QSjbm65X45753",
    "name": "一路开关",
    "category": "switch",
    "nodeType": 1,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/Rf4QSjbm65X45753/cover.jpeg?Expires=1967598145&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=ksQhmEm5Rn7C7FFqY09o9l%2BZ%2BIQ%3D",
    "transparent": false,
    "createAt": 1659872083987
  },
  {
    "id": "PN3EDmkBZDD8whDd",
    "name": "门磁",
    "category": "door",
    "nodeType": 1,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "null",
    "transparent": null,
    "createAt": 1659872083988
  },
  {
    "id": "N523nWsCiG3CAn6X",
    "name": "ZGW01",
    "category": "gateway",
    "nodeType": 0,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/N523nWsCiG3CAn6X/cover.jpg?Expires=1967597641&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=%2BaGcHBT%2FHA3s%2BrZ687U50b4YE0A%3D",
    "transparent": false,
    "createAt": 1659872083988
  },
  {
    "id": "KdJYpTp5ywNhmrmC",
    "name": "第三方接入",
    "category": "",
    "nodeType": 0,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/KdJYpTp5ywNhmrmC/cover.png?Expires=1968261336&OSSAccessKeyId=LTAI5t8UFEH5eGrBUS5zSiof&Signature=df%2F6JEcxBlXitSNIENPMYJlRE8Y%3D",
    "transparent": false,
    "createAt": 1659872083990
  },
  {
    "id": "Eit3kmGJtxSHfCKT",
    "name": "燃气表",
    "category": "meter",
    "nodeType": 2,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": null,
    "transparent": false,
    "createAt": 1659872083990
  }
])
// 打开物模型
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

const options = reactive({
  ref: 'crudRef',
  tableProps: {
    selection: false,
    delBtn: false,
    menuSlot: true,
    menuWidth: 240,
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
