<template>
  <div>
    <vue-json-editor v-model:json="config" :showBtns="false" :mode="'code'" lang="zh" height="600" />
    <el-button @click="saveConfig" type="primary" style="margin-top: 15px;">保存</el-button>
    <el-button @click="sendConfig" type="primary" style="margin-top: 15px;">下发</el-button>
  </div>
</template>

<script>
import VueJsonEditor from 'vue3-ts-jsoneditor'
import {
  getDeviceConfig,
  sendDeviceConfig,
  saveDeviceConfig,
} from '@/views/iot/equipment/api/devices.api'
import { ElNotification } from 'element-plus'
export default defineComponent({
  name: 'deviceConfig',
  props: {
    deviceId: {
      type: String,
    },
  },
  components: {
    VueJsonEditor,
  },
  data() {
    return {
      config: '',
    }
  },
  mounted() {
    this.getConfig()
  },
  watch: {
    deviceId: function () {
      this.getConfig()
    },
  },
  methods: {
    getConfig() {
      console.log('getDeviceConfig')
      getDeviceConfig(this.deviceId).then((rst) => {
        if(rst.code === 200){
          this.config = JSON.parse(rst.data?.config || {})
        }
      })
    },
    saveConfig() {
      saveDeviceConfig({
        deviceId: this.deviceId,
        config: JSON.stringify(this.config),
      }).then((res) => {
        if (res.data) {
          ElNotification({
            title: '成功',
            message: '修改成功',
            type: 'success',
          })
        } else {
          ElNotification({
            title: '提示',
            message: '保存失败',
            type: 'error',
          })
        }
      })
    },
    sendConfig() {
      sendDeviceConfig(this.deviceId).then(() => {
        ElNotification({
          title: '成功',
          message: '下发成功',
          type: 'success',
        })
      })
    },
  },
})
</script>
