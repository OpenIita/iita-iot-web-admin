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
import { deleteVirtualDevices, getVirtualDevicesList, saveVirtualDevices } from '../api/virtualDevices.api'

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
  await deleteVirtualDevices(row.id)
  ElMessage.success('删除成功!')
  state.loading = false
  getData()
}
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
