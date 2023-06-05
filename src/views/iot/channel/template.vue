<template>
  <div>
    <yt-crud ref="crudRef" :data="data" :column="column"></yt-crud>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import YtCrud from '@/components/common/yt-crud.vue'

const column: IColumn[] = [{
  label: '模板名称',
  key: 'title',
  tableWidth: 200,
  rules: [{ required: true, message: '模板名称不能为空' }],
}, {
  label: '通道配置',
  key: 'channelConfigId',
  tableWidth: 150,
  type: 'select',
  componentProps: {
    labelAlias: 'title',
    valueAlias: 'id',
    options: [
      {
        "id": "947d22b7-305b-d959-874a-06e277143d44",
        "channelId": "fa1c5eaa-de6e-48b6-805e-8f091c7bb832",
        "title": "告警邮件配置",
        "param": {},
        "createAt": 1684824055050
      },
      {
        "id": "75f37720-22bb-4f0b-f127-78f2091507a0",
        "channelId": "fa1c5eaa-de6e-48b6-805e-8f091c7bb832",
        "title": "告警钉钉配置",
        "param": {
          "dingTalkWebhook": "xxxxxxxxxxxxxxxx",
          "dingTalkSecret": "xxxx"
        },
        "createAt": 1684824055053
      },
      {
        "id": "6e5db9b5-a709-723b-665b-bbca5ce6a62c",
        "channelId": "fa1c5eaa-de6e-48b6-805e-8f091c7bb833",
        "title": "告警企业微信配置",
        "param": {
          "qyWechatWebhook": "xxxxxxxxxxxxxxxx"
        },
        "createAt": 1684824055053
      }
    ]
  }
}, {
  label: '模板内容',
  key: 'content',
  componentProps: {
    type: 'textarea',
    rows: 4,
  }
}]

const data = ref([
  {
    "id": "0640bbe2-788e-ca94-5fb4-c5e7f91e546d",
    "channelConfigId": "947d22b7-305b-d959-874a-06e277143d44",
    "channelCode": "Email",
    "title": "告警邮件模板",
    "content": "您的设备【${title}】<font color=\"warning\">温度过高</font>",
    "createAt": 1684824055055
  },
  {
    "id": "7fd90ab1-63c8-cd92-2a58-b7bd04f557f1",
    "channelConfigId": "75f37720-22bb-4f0b-f127-78f2091507a0",
    "channelCode": "DingTalk",
    "title": "告警钉钉模板",
    "content": "您的设备【${title}】<font color=\"warning\">温度过高</font>",
    "createAt": 1684824055057
  },
  {
    "id": "74ece781-1d84-220b-cbb2-3270e245bb3b",
    "channelConfigId": "6e5db9b5-a709-723b-665b-bbca5ce6a62c",
    "channelCode": "QyWechat",
    "title": "告警企业微信模板",
    "content": "您的设备【${title}】<font color=\"warning\">温度过高</font>",
    "createAt": 1684824055057
  }
])
</script>

<!-- <style lang="scss" scoped>

</style> -->
