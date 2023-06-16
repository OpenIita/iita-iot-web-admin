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
      @onLoad="getData">
      <template #paramFormItem="{ row }">
        <el-card v-if="row.channelId" class="box-card" shadow="never">
          <template #header>
            <div class="clearfix">
              <span>参数配置</span>
            </div>
          </template>
          <div v-for="item in state.typeObj" :key="item.code">
            <div v-if="item.code === getChannelCode(row.channelId)">
              <el-form-item v-for="opt in item.list" :key="opt.value" :label="opt.label + ':'">
                <el-switch v-if="opt.type === 'switch'" v-model="row.param[opt.value]"></el-switch>
                <el-input v-else v-model="row.param[opt.value]" :placeholder="'请输入' + opt.label"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-card>
      </template>
    </yt-crud>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import YtCrud from '@/components/common/yt-crud.vue'
import { getConfigList, IChannelConfigsVO } from './api/configs.api'

const data = ref<IChannelConfigsVO[]>([])
const state = reactive({
  total: 0,
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  query: {},
  loading: false,
  typeObj: [
    {
      code: 'Email',
      list: [{
        label: '邮件发送人',
        value: 'form',
      }, {
        label: '邮件主机',
        value: 'host',
      }, {
        label: '用户名',
        value: 'userName',
      }, {
        label: '密码',
        value: 'passWord',
      }, {
        label: '邮件授权',
        value: 'mailSmtpAuth',
        type: 'switch',
      }, {
        label: '邮件接收人',
        value: 'to',
      }]
    },
    {
      code: 'QyWechat',
      list: [{
        label: '机器人webhook',
        value: 'qyWechatWebhook',
      }]
    },
    {
      code: 'DingTalk',
      list: [{
        label: '机器人密钥',
        value: 'dingTalkSecret',
      }, {
        label: '机器人webhook',
        value: 'dingTalkWebhook',
      }]
    }
  ],
  channelCode: '',
  channelOptions: [
    {
      "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
      "code": "DingTalk",
      "title": "钉钉",
      "icon": "http://www.baidu.com",
      "createAt": 1684824055044
    },
    {
      "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb832",
      "code": "QyWechat",
      "title": "企业微信",
      "icon": "http://www.baidu.com",
      "createAt": 1684824055047
    },
    {
      "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb833",
      "code": "Email",
      "title": "邮箱",
      "icon": "http://www.baidu.com",
      "createAt": 1684824055048
    }
  ]
})
const column: IColumn[] = [{
  label: '通道配置名称',
  key: 'title',
  tableWidth: 200,
  rules: [{ required: true, message: '通道配置名称不能为空' }],
}, {
  label: '通道类型',
  key: 'channelId',
  tableWidth: 150,
  type: 'select',
  rules: [{ required: true, message: '请选择类型' }],
  componentProps: {
    labelAlias: 'title',
    valueAlias: 'id',
    options: state.channelOptions,
  }
}, {
  label: '通道参数',
  key: 'paramStr',
  formHide: true,
}, {
  label: '参数配置',
  key: 'param',
  hide: true,
  formItemSlot: true,
  componentProps: {
    defaultValue: {},
  }
}]

const getData = () => {
  state.loading = true
  getConfigList({
    ...state.page,
    ...state.query,
  }).then(res => {
    data.value = res.data.rows || []
    state.total = res.data.total
  }).finally(() => {
    state.loading = false
  })
}

const getChannelCode = (id: string) => {
  const obj = state.channelOptions.find(f => f.id === id)
  console.log(obj?.code)
  return obj?.code || ''
}

// const data = ref([
//   {
//     "id": "947d22b7-305b-d959-874a-06e277143d44",
//     "channelId": "fa1c5eaa-de6e-48b6-805e-8f091c7bb832",
//     "title": "告警邮件配置",
//     "param": {},
//     "createAt": 1684824055050
//   },
//   {
//     "id": "75f37720-22bb-4f0b-f127-78f2091507a0",
//     "channelId": "fa1c5eaa-de6e-48b6-805e-8f091c7bb832",
//     "title": "告警钉钉配置",
//     "param": {
//       "dingTalkWebhook": "xxxxxxxxxxxxxxxx",
//       "dingTalkSecret": "xxxx"
//     },
//     "createAt": 1684824055053
//   },
//   {
//     "id": "6e5db9b5-a709-723b-665b-bbca5ce6a62c",
//     "channelId": "fa1c5eaa-de6e-48b6-805e-8f091c7bb833",
//     "title": "告警企业微信配置",
//     "param": {
//       "qyWechatWebhook": "xxxxxxxxxxxxxxxx"
//     },
//     "createAt": 1684824055053
//   }
// ].map(m => ({
//   ...m,
//   paramStr: m.param ? JSON.stringify(m.param) : m.param
// })))
</script>

<!-- <style lang="scss" scoped>

</style> -->
