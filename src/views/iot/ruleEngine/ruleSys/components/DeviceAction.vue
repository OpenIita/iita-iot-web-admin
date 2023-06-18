<template>
  <div class="item" style="width: 240px;margin-left: 15px;display: inherit;">
    <select-device v-if="item.type === 'device'" placeholder="选择设备" @onSelect="selectDevices"></select-device>
  </div>
  <div v-if="productKey">
    <el-row v-for="service in config.services" :key="service.identifier">
      <el-col :span="22">
        <el-row class="service-box">
          <el-col :span="8">
            <el-select size="mini" v-model="service.identifier" @change="serviceSelected(service)">
              <el-option label="设置属性" value="set"></el-option>
              <el-option v-for="s in services" :label="s.name" :value="s.identifier" :key="s.identifier"></el-option>
            </el-select>
          </el-col>
          <el-col :span="16" style="padding-left: 5px">
            <el-row v-if="service.identifier == 'set'">
              <el-col :span="20">
                <el-row v-for="param in service.inputData" :key="param.identifier">
                  <el-col :span="10">
                    <el-select size="mini" v-model="param.identifier">
                      <el-option v-for="prop in properties" :label="prop.name" :value="prop.identifier" :key="prop.identifier"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2"> 值: </el-col>
                  <el-col :span="7">
                    <el-input v-model="param.value" size="mini"></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-button @click="delParam(service.inputData, param)" size="mini">-</el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="2">
                <el-button @click="addParam(service.inputData)" size="mini">+</el-button>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col :span="20">
                <el-row v-for="param in findService(service.identifier).inputData" :key="param.identifier">
                  <el-col :span="10">
                    {{ param.name }}
                  </el-col>
                  <el-col :span="2"> 值: </el-col>
                  <el-col :span="7">
                    <el-input v-model="param.value" size="mini"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2" style="padding-left: 3px">
        <el-button @click="delService(service)" size="mini">-</el-button>
      </el-col>
    </el-row>
    <el-button @click="addService" size="mini">+</el-button>
  </div>
</template>

<script>
import { propTypes } from '@/utils/propTypes'
import { getObjectModel } from '@/views/iot/equipment/api/products.api'

// import { GetThingModel } from '../../api/productApi'
export default defineComponent ({
  name: 'DeviceAction',
  props: {
    productKey: propTypes.string.def(''),
    config: {
      type: Object,
      default: () => {
        return {
          type: 'device',
          services: [
            {
              device: '',
              identifier: 'set',
              inputData: [],
            },
          ],
        }
      },
    },
  },
  data() {
    return {
      showDeviceSelector: false,
      selectedPk: '',
      selectedDn: '',
      properties: [],
      services: [],
      configRef: {},
    }
  },
  created() {
    this.init()
  },
  watch: {
    config() {
      this.init()
    },
  },
  methods: {
    init() {
      if (!this.configRef.services || this.configRef.services.length == 0) {
        return
      }
      console.log('this.config', this.config)
      this.configRef = this.config
      let service = this.configRef.services[0]
      if (service.device) {
        let pkDn = service.device.split('/')
        this.selectedPk = pkDn[0]
        this.selectedDn = pkDn[1]
        this.getThingModel(pkDn[0])
      }
      console.log(this.configRef)
    },
    openDeviceSelector() {
      this.showDeviceSelector = !this.showDeviceSelector
    },
    onDeviceSelected(device) {
      this.selectedPk = device.productKey
      this.selectedDn = device.deviceName
      this.showDeviceSelector = false
      this.configRef.services = []
      this.getThingModel(device.productKey)
    },
    getThingModel(pk) {
      getObjectModel(pk).then((res) => {
        console.log('res', res)
        this.initThingModel(res)
      })
    },
    initThingModel(res) {
      this.properties = []
      this.services = []
      res.model.properties.forEach((p) => {
        this.properties.push(p)
      })

      res.model.services.forEach((s) => {
        this.services.push(s)
      })
    },
    addService() {
      this.configRef.services.push({
        device: this.selectedPk + '/' + this.selectedDn,
        identifier: 'set',
        inputData: [],
      })
    },
    serviceSelected (service) {
      this.services.forEach((s) => {
        if (service.identifier == s.identifier) {
          service.inputData = s.inputData
        }
      })
    },
    delService(service) {
      let idx = this.configRef.services.findIndex(
        (s) => s.identifier == service.identifier
      )
      this.configRef.services.splice(idx, 1)
    },
    findService(identifier) {
      let service = {}
      console.log('this.services', this.services.length)
      if (this.services.length === 0) return ''
      this.services.forEach((s) => {
        if (s.identifier == identifier) {
          service = s
          return service
        }
      })
      this.configRef.services.forEach((s) => {
        if (s.identifier == identifier) {
          service = s
          return service
        }
      })
      return service
    },
    addParam(inputData) {
      inputData.push({})
    },
    delParam(inputData, param) {
      let idx = inputData.findIndex((d) => (d.identifier = param.identifier))
      inputData.splice(idx, 1)
    },
  },
})
</script>

<style scoped>
.service-box {
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0 5px;
  margin: 5px 0;
  background-color: #eee;
}
</style>
