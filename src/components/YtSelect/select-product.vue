<template>
  <el-input class="cu-input" size="small" placeholder="请选择产品" v-model.trim="name" @clear="onClear" clearable @click="handleSelect">
    <template #append>
      <el-button type="primaqry" @click="handleSelect">选择</el-button>
    </template>
  </el-input>
  <el-dialog title="选择产品" v-model="dialogState.show" width="1200px">
    <yt-crud
      ref="ytCrudRef"
      :data="data"
      :column="column"
      :table-props="{
        menu: false,
        selection: multiple,
      }"
      :fun-props="{
        hide: true
      }"
      @row-click="rowClick"
    ></yt-crud>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogState.show = false">取消</el-button>
        <el-button type="primary" @click="handleMultiple">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import { IColumn } from '../common/types/tableCommon'

import YtCrud from '@/components/common/yt-crud.vue'

const props = defineProps({
  id: propTypes.string.def(''),
  // 是否多选
  multiple: propTypes.bool.def(false)
})
const emits = defineEmits(['onSelect', 'update:id'])

// 单击
const ytCrudRef = ref()

const rowClick = (row: any) => {
  if (props.multiple) {
    ytCrudRef.value.getTableRef().tableRef.toggleRowSelection(toRaw(row), undefined)
    return
  }
  emits('onSelect', row)
  emits('update:id', row.id)
  dialogState.data = row
  dialogState.show = false
  console.log(row)
}
// 多选
const handleMultiple = () => {
  const rows = ytCrudRef.value.getTableRef().tableRef.getSelectionRows()
  dialogState.data = {
    id: rows.map((m: any) => m.id),
    name: rows.map((m: any) => m.name).join(',')
  }
  emits('update:id', dialogState.data.id)
  dialogState.show = false
}

// 清空
const onClear = () => {
  emits('update:id', '')
  dialogState.data = {}
}
const dialogState = reactive({
  show: false,
  data: {} as any,
})
const name = computed(() => {
  return dialogState.data?.name || ''
})
const handleSelect = () => {
  console.log('handleSelect')
  dialogState.show = true
}
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
  rules: [{ required: true, message: 'ProductKey不能为空' }],
}, {
  label: '产品名称',
  search: true,
  key: 'name',
  rules: [{ required: true, message: '产品名称不能为空' }],
}, {
  label: '品类',
  key: 'category',
  search: true,
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
}]
const data = ref([
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
  }
])
</script>

<style lang="scss" scoped>
.cu-input {
  cursor: pointer;
}
::v-deep(.el-input-group__append) {
  background-color: var(--el-color-primary);
  color: #fff;
}
</style>
