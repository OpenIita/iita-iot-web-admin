<template>
  <el-input class="cu-input" :placeholder="placeholder" size="small" v-model.trim="name" @clear="onClear" clearable @click="handleSelect">
    <template #append>
      <el-button type="primaqry" @click="handleSelect">选择</el-button>
    </template>
  </el-input>
  <el-dialog title="选择设备" v-model="dialogState.show" width="1200px">
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
  // TODO:调接口时有产品id就传入
  // 固定产品id
  productId: propTypes.string,
  // 是否多选
  multiple: propTypes.bool.def(false),
  placeholder: propTypes.string.def('请选择设备'),
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
    deviceName: rows.map((m: any) => m.deviceName).join(',')
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
  return dialogState.data?.deviceName || ''
})
const handleSelect = () => {
  console.log('handleSelect')
  dialogState.show = true
}
// 产品字典
const productOptions = [
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
  },
  {
    "id": "DSGxxKk6E8mmDk6C",
    "name": "通断器",
    "category": "switch",
    "nodeType": 1,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/DSGxxKk6E8mmDk6C/cover.jpeg?Expires=1967598201&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=k2PqHc%2BI14DfCwD8kQIflwoBAog%3D",
    "transparent": false,
    "createAt": 1659872083991
  },
  {
    "id": "D8c5pXFmt2KJDxNm",
    "name": "四路场景面板",
    "category": "switch",
    "nodeType": 1,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": null,
    "transparent": null,
    "createAt": 1659872083992
  },
  {
    "id": "AWcJnf7ymGSkaz5M",
    "name": "smart pulg",
    "category": "SmartPlug",
    "nodeType": 1,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "http://iotkit-img.oss-cn-shenzhen.aliyuncs.com/product/AWcJnf7ymGSkaz5M/cover.jpeg?Expires=1967598035&OSSAccessKeyId=LTAI5tGEHNoVu5tWHUWnosrs&Signature=tXzWH5%2B4JNcnuTFrJbvGwsbx97c%3D",
    "transparent": true,
    "createAt": 1659872083993
  },
  {
    "id": "6kYp6jszrDns2yh4",
    "name": "温湿度传感器",
    "category": "sensor",
    "nodeType": 1,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": null,
    "transparent": null,
    "createAt": 1659872083994
  },
  {
    "id": "nFSJHYW744dzDYfW",
    "name": "测试",
    "category": "switch",
    "nodeType": 2,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": null,
    "transparent": false,
    "createAt": 1659914779161
  },
  {
    "id": "64WyYNJfWNJrJBsB",
    "name": "T100S400L",
    "category": "T100",
    "nodeType": 2,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "null",
    "transparent": false,
    "createAt": 1681869020035
  },
  {
    "id": "hdJZjrZjrB2SG4Hm",
    "name": "T100",
    "category": "T100",
    "nodeType": 2,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "img": "null",
    "transparent": false,
    "createAt": 1681864702527
  }
]
// 组列表
const groupOptions = [
  {
    "id": "g3",
    "name": "组3",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "remark": "2223333",
    "deviceQty": 17,
    "createAt": 1659872082792
  },
  {
    "id": "g2",
    "name": "组2",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "remark": "222",
    "deviceQty": 21,
    "createAt": 1659872082803
  },
  {
    "id": "g1",
    "name": "分组1",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "remark": "1111",
    "deviceQty": 10,
    "createAt": 1659872082805
  }
]
const column: IColumn[] = [{
  label: '产品',
  key: 'productKey',
  type: 'select',
  search: !!props.productId,
  tableWidth: 120,
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
}, {
  label: '分组',
  key: 'group',
  type: 'select',
  search: true,
  componentProps: {
    labelAlias: 'name',
    valueAlias: 'id',
    options: groupOptions,
  },
}, {
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
const data = ref([
  {
    "id": "16818017836420test100000000000056",
    "deviceId": "16818017836420test100000000000056",
    "productKey": "hdJZjrZjrB2SG4Hm",
    "deviceName": "test1",
    "model": "m1",
    "secret": "7Bxm4JPf2FB5MYbC",
    "parentId": null,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "subUid": null,
    "state": {
      "online": false,
      "onlineTime": 1681892506997,
      "offlineTime": 1681892808076
    },
    "property": null,
    "tag": {},
    "group": 'g2',
    "createAt": 1681801783642
  },
  {
    "id": "16807860199690wgth100000000000055",
    "deviceId": "16807860199690wgth100000000000055",
    "productKey": "hbtgIA0SuVw9lxjB",
    "deviceName": "wgTH1",
    "model": "zm01",
    "secret": null,
    "parentId": "",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "subUid": null,
    "state": {
      "online": false,
      "onlineTime": 0,
      "offlineTime": 1680786604632
    },
    "property": null,
    "tag": {},
    "group": 'g2',
    "createAt": 1680786019976
  },
  {
    "id": "1677826031695011ff030300000100149",
    "deviceId": "1677826031695011ff030300000100149",
    "productKey": "64WyYNJfWNJrJBsB",
    "deviceName": "11FF0303000001",
    "model": "m1",
    "secret": "MYBrcrQwsFbB32WJ",
    "parentId": null,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "subUid": null,
    "state": {
      "online": false,
      "onlineTime": 1681950613282,
      "offlineTime": 1681952409968
    },
    "property": null,
    "tag": {},
    "group": 'g2',
    "createAt": 1677826031700
  },
  {
    "id": "16683910549100test010000000000063",
    "deviceId": "16683910549100test010000000000063",
    "productKey": "cGCrkK7Ex4FESAwe",
    "deviceName": "TEST01",
    "model": "m1",
    "secret": null,
    "parentId": null,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "subUid": null,
    "state": {
      "online": false,
      "onlineTime": 1679628030790,
      "offlineTime": 1682235909571
    },
    "property": null,
    "tag": {},
    "group": 'g2',
    "createAt": 1668391054914
  },
  {
    "id": "16666002437520c411e0218bdf000012a",
    "deviceId": "16666002437520c411e0218bdf000012a",
    "productKey": "N523nWsCiG3CAn6X",
    "deviceName": "C411E0218BDF",
    "model": "device",
    "secret": "NSTCSBxzBWxAfpMe",
    "parentId": null,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "subUid": null,
    "state": {
      "online": false,
      "onlineTime": 1666855934531,
      "offlineTime": 1666858939498
    },
    "property": null,
    "tag": {},
    "group": 'g2',
    "createAt": 1666600243763
  },
  {
    "id": "16604869627650testgw011321000014d",
    "deviceId": "16604869627650testgw011321000014d",
    "productKey": "hbtgIA0SuVw9lxjB",
    "deviceName": "TEST:GW:011321",
    "model": "22",
    "secret": null,
    "parentId": null,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "subUid": null,
    "state": {
      "online": false,
      "onlineTime": 1660487562978,
      "offlineTime": 1680786604612
    },
    "property": null,
    "tag": {},
    "group": 'g2',
    "createAt": 1660486962765
  },
  {
    "id": "16604869625930testgw011668000014f",
    "deviceId": "16604869625930testgw011668000014f",
    "productKey": "hbtgIA0SuVw9lxjB",
    "deviceName": "TEST:GW:011668",
    "model": "GW01",
    "secret": null,
    "parentId": null,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "subUid": null,
    "state": {
      "online": false,
      "onlineTime": 1660487539218,
      "offlineTime": 1660487838616
    },
    "property": null,
    "tag": {},
    "group": 'g2',
    "createAt": 1660486962593
  },
  {
    "id": "16604869611510testgw0111030000145",
    "deviceId": "16604869611510testgw0111030000145",
    "productKey": "hbtgIA0SuVw9lxjB",
    "deviceName": "TEST:GW:011103",
    "model": "GW01",
    "secret": null,
    "parentId": null,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "subUid": null,
    "state": {
      "online": false,
      "onlineTime": 1660487612176,
      "offlineTime": 1660487823244
    },
    "property": null,
    "tag": {},
    "group": 'g2',
    "createAt": 1660486961151
  },
  {
    "id": "16604869608780testgw011223000014e",
    "deviceId": "16604869608780testgw011223000014e",
    "productKey": "hbtgIA0SuVw9lxjB",
    "deviceName": "TEST:GW:011223",
    "model": "GW01",
    "secret": null,
    "parentId": null,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "subUid": null,
    "state": {
      "online": false,
      "onlineTime": 1660487599293,
      "offlineTime": 1660487850003
    },
    "property": null,
    "tag": {},
    "group": 'g2',
    "createAt": 1660486960878
  },
  {
    "id": "16604869589520testgw0117390000142",
    "deviceId": "16604869589520testgw0117390000142",
    "productKey": "hbtgIA0SuVw9lxjB",
    "deviceName": "TEST:GW:011739",
    "model": "GW01",
    "secret": null,
    "parentId": null,
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "subUid": null,
    "state": {
      "online": false,
      "onlineTime": 1660487593508,
      "offlineTime": 1660487863150
    },
    "property": null,
    "tag": {},
    "group": 'g2',
    "createAt": 1660486958952
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
