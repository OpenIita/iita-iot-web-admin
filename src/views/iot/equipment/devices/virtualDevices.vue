<template>
  <div>
    <yt-crud v-bind="options">
      <template #menuSlot="scope">
        <el-button link type="primary" icon="Setting" @click="handleConfig(scope.row.id)">配置</el-button>
      </template>
      <template #state="scope">
        <el-tag v-if="scope.row.state === 'running'" type="success" size="mini">运行中</el-tag>
        <el-tag v-else-if="scope.row.state === 'stopped'" type="danger" size="mini">已停止</el-tag>
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

import CrontabBox from '@/components/Crontab/index.vue'
import YtCrud from '@/components/common/yt-crud.vue'

// 跳转配置
const router = useRouter()
const handleConfig = (id: string) => {
  if (!id) return
  router.push(`virtualDeviceConfig/${id}`)
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
const column: IColumn[] = [{
  label: '名称',
  key: 'name',
  rules: [{ required: true, message: '名称不能为空' }],
}, {
  label: '产品',
  key: 'productKey',
  type: 'select',
  search: true,
  tableWidth: 120,
  componentProps: {
    labelAlias: 'name',
    valueAlias: 'id',
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
  label: '修改日期',
  key: 'createAt',
  type: 'date',
  formHide: true,
}]

const data = ref([
  {
    "id": "6293953092084e2df303ba3e",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "三路开关",
    "productKey": "eDhXKwEzwFybM5R7",
    "devices": null,
    "type": "protocol",
    "script": "\nvar mid=1000;\n\nfunction getMid(){\n  mid++;\n  if(mid>9999){\n\tmid=1;\n  }\n  return mid+\"\";\n}\n\nfunction getRequestId(){\n  return \"RID\"+new Date().getTime()+getMid();\n}\n\n\nthis.receive=function(service,device){\n  return [];\n}\n\nthis.report=function(device){\n  return {\n    \"mid\":getRequestId(),\n    \"productKey\":device.productKey,  \n    \"deviceName\":device.deviceName,\n    \"type\":\"property\",\n    \"identifier\":\"report\",\n    \"occurred\":new Date().getTime(),\t//时间戳，设备上的事件或数据产生的本地时间\n    \"time\":new Date().getTime(),\t\t//时间戳，消息上报时间\n    \"data\":{\n\t  \"rssi\":127-parseInt(Math.random()*127),\n\t  \"powerstate_1\":Math.random()>0.5?1:0,\n\t  \"powerstate_2\":Math.random()>0.5?1:0,\n\t  \"powerstate_3\":Math.random()>0.5?1:0\n    }\n  }\n}",
    "trigger": "random",
    "triggerExpression": "hour",
    "state": "stopped",
    "createAt": 1653839152090
  },
  {
    "id": "629391ae92084e2df303ba3d",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "温湿度传感器",
    "productKey": "6kYp6jszrDns2yh4",
    "devices": null,
    "type": "thingModel",
    "script": "\nvar mid=1000;\n\nfunction getMid(){\n  mid++;\n  if(mid>9999){\n\tmid=1;\n  }\n  return mid+\"\";\n}\n\nfunction getRequestId(){\n  return \"RID\"+new Date().getTime()+getMid();\n}\n\n\nthis.receive=function(service,device){\n  return [];\n}\n\nthis.report=function(device){\n  return {\n    \"mid\":getRequestId(),\n    \"productKey\":device.productKey,  \n    \"deviceName\":device.deviceName,\n    \"type\":\"property\",\n    \"identifier\":\"report\",\n    \"occurred\":new Date().getTime(),\t//时间戳，设备上的事件或数据产生的本地时间\n    \"time\":new Date().getTime(),\t\t//时间戳，消息上报时间\n    \"data\":{\n      \"humidity\":parseInt(Math.random()*100),\n\t  \"temperature\":parseInt(Math.random()*500)-38\n    }\n  }\n}",
    "trigger": "none",
    "triggerExpression": "second",
    "state": "stopped",
    "createAt": 1653838254989
  },
  {
    "id": "629390f492084e2df303ba3c",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "调光灯",
    "productKey": "xpsYHExTKPFaQMS7",
    "devices": null,
    "type": "protocol",
    "script": "\nvar mid=1000;\n\nfunction getMid(){\n  mid++;\n  if(mid>9999){\n\tmid=1;\n  }\n  return mid+\"\";\n}\n\nfunction getRequestId(){\n  return \"RID\"+new Date().getTime()+getMid();\n}\n\n\nthis.receive=function(service,device){\n  return [];\n}\n\nthis.report=function(device){\n  return {\n    \"mid\":getRequestId(),\n    \"productKey\":device.productKey,  \n    \"deviceName\":device.deviceName,\n    \"type\":\"property\",\n    \"identifier\":\"report\",\n    \"occurred\":new Date().getTime(),\t//时间戳，设备上的事件或数据产生的本地时间\n    \"time\":new Date().getTime(),\t\t//时间戳，消息上报时间\n    \"data\":{\n      \"brightness\":parseInt(Math.random()*100),\n\t  \"powerstate\":Math.random()>0.5?1:0\n    }\n  }\n}",
    "trigger": "random",
    "triggerExpression": "second",
    "state": "running",
    "createAt": 1653838068860
  },
  {
    "id": "62925cb72002b44c15caeb1c",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "虚拟门磁1",
    "productKey": "PN3EDmkBZDD8whDd",
    "devices": null,
    "type": "thingModel",
    "script": "\nvar mid=1000;\n\nfunction getMid(){\n  mid++;\n  if(mid>9999){\n\tmid=1;\n  }\n  return mid+\"\";\n}\n\nfunction getRequestId(){\n  return \"RID\"+new Date().getTime()+getMid();\n}\n\n\nthis.receive=function(service,device){\n  return [];\n}\n\nthis.report=function(device){\n  return {\n    \"mid\":getRequestId(),\n    \"productKey\":device.productKey,  \n    \"deviceName\":device.deviceName,\n    \"type\":\"property\",\n    \"identifier\":\"report\",\n    \"occurred\":new Date().getTime(),\t//时间戳，设备上的事件或数据产生的本地时间\n    \"time\":new Date().getTime(),\t\t//时间戳，消息上报时间\n    \"data\":{\n      \"rssi\":127-parseInt(Math.random()*127),\n      \"power\":parseInt(Math.random()*100),\n\t  \"doorStatus\":Math.random()>0.5?1:0\n    }\n  }\n}",
    "trigger": "none",
    "triggerExpression": "minute",
    "state": "stopped",
    "createAt": 1653759159567
  },
  {
    "id": "628fd800fba69e633a972e12",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "开关1",
    "productKey": "Rf4QSjbm65X45753",
    "devices": null,
    "type": "thingModel",
    "script": "\nvar mid=1000;\n\nfunction getMid(){\n  mid++;\n  if(mid>9999){\n\tmid=1;\n  }\n  return mid+\"\";\n}\n\nfunction getRequestId(){\n  return \"RID\"+new Date().getTime()+getMid();\n}\n\n\nthis.receive=function(service,device){\n  return [{\n    \"productKey\":service.productKey,\n    \"deviceName\":service.deviceName,\n    \"mid\":service.mid,\n    \"type\":\"service\",\n    \"identifier\":\"reboot_reply\",\n    \"data\":{},\n    \"code\":0\n  },{\n    \"mid\":getRequestId(),\n    \"productKey\":service.productKey,  \n    \"deviceName\":service.deviceName,\n    \"type\":\"property\",\n    \"identifier\":\"report\",\n    \"occurred\":new Date().getTime(),\n    \"time\":new Date().getTime(),\n    \"data\":{\n      \"volt\":parseInt(Math.random()*100),\n\t  \"powerstate\":Math.random()>0.5?1:0\n    }\n  }]\n}\n\nthis.report=function(device){\n  return {\n    \"mid\":getRequestId(),\n    \"productKey\":device.productKey,  \n    \"deviceName\":device.deviceName,\n    \"type\":\"property\",\n    \"identifier\":\"report\",\n    \"occurred\":new Date().getTime(),\t//时间戳，设备上的事件或数据产生的本地时间\n    \"time\":new Date().getTime(),\t\t//时间戳，消息上报时间\n    \"data\":{\n      \"volt\":parseInt(Math.random()*100)\n    }\n  }\n}",
    "trigger": "cron",
    "triggerExpression": "0 * * * * ? ",
    "state": "running",
    "createAt": 1653594112764
  },
  {
    "id": "628fa6bc1b735b73cb260042",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "虚拟插座12",
    "productKey": "cGCrkK7Ex4FESAwe",
    "devices": null,
    "type": "thingModel",
    "script": "\nvar mid=1000;\n\nfunction getMid(){\n  mid++;\n  if(mid>9999){\n\tmid=1;\n  }\n  return mid+\"\";\n}\n\nfunction getRequestId(){\n  return \"RID\"+new Date().getTime()+getMid();\n}\n\n\nthis.receive=function(service,device){\n  var identifier=service.identifier;\n  var result= [{\n    \"productKey\":service.productKey,\n    \"deviceName\":service.deviceName,\n    \"mid\":service.mid,\n    \"type\":\"service\",\n    \"identifier\":identifier+\"_reply\",\n    \"data\":{},\n    \"code\":0\n  }]\n  \n  if(service.type==\"property\" && (identifier==\"get\" || identifier==\"set\")){\n\tresult.push({\n\t  \"mid\":getRequestId(),\n\t  \"productKey\":device.productKey,  \n\t  \"deviceName\":device.deviceName,\n\t  \"type\":\"property\",\n\t  \"identifier\":\"report\",\n\t  \"occurred\":new Date().getTime(),\n\t  \"time\":new Date().getTime(),\n\t  \"data\":service.params\n\t});\n  }\n  \n  return result;\n}\n\nthis.report=function(device){\n  return {\n    \"mid\":getRequestId(),\n    \"productKey\":device.productKey,  \n    \"deviceName\":device.deviceName,\n    \"type\":\"property\",\n    \"identifier\":\"report\",\n    \"occurred\":new Date().getTime(),\t//时间戳，设备上的事件或数据产生的本地时间\n    \"time\":new Date().getTime(),\t\t//时间戳，消息上报时间\n    \"data\":{\n      \"rssi\":127-parseInt(Math.random()*127),\n\t  \"powerstate\":Math.random()>0.5?1:0\n    }\n  }\n}",
    "trigger": "random",
    "triggerExpression": "minute",
    "state": "running",
    "createAt": 1653581500076
  },
  {
    "id": "2758f090-e791-4da5-aab9-3eee1fcf8bf4",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "dddddd",
    "productKey": "xpsYHExTKPFaQMS7",
    "devices": null,
    "type": "thingModel",
    "script": null,
    "trigger": "cron",
    "triggerExpression": "1-1 * * * * ?",
    "state": "stopped",
    "createAt": 1669886467692
  }
])

const options = reactive({
  ref: 'crudRef',
  tableProps: {
    selection: false,
    delBtn: false,
    menuSlot: true,
    menuWidth: 220,
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
