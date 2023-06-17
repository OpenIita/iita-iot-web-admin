<template>
  <el-row>
    <el-col :span="12">
      <el-tabs type="border-card">
        <el-tab-pane label="上行指令调试">
          <el-tabs type="border-card">
            <el-tab-pane label="属性上报">
              <DeviceSimulatorProperties :properties="properties" :deviceDetail="this.deviceDetail" propertiesTyp="属性上报"
                >S</DeviceSimulatorProperties
              >
            </el-tab-pane>
            <el-tab-pane label="事件上报">
              <DeviceSimulatorProperties :properties="events" :deviceDetail="deviceDetail" propertiesTyp="事件上报"></DeviceSimulatorProperties>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="下行指令调试">
          <el-tabs type="border-card">
            <el-tab-pane label="属性调试">
              <DeviceSimulatorProperties
                :properties="properties"
                :deviceDetail="this.deviceDetail"
                propertiesTyp="属性调试"
              ></DeviceSimulatorProperties>
            </el-tab-pane>
            <el-tab-pane label="服务调用"></el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <!-- TODO:不兼容后面改 -->
        <!-- <el-tab-pane label="mqtt模拟器"> -->
          <!-- <MqttClient :deviceDetail="this.deviceDetail"></MqttClient> -->
        <!-- </el-tab-pane> -->
      </el-tabs>
      <el-divider direction="vertical" />
    </el-col>
    <el-col :span="12">
      <el-tabs type="border-card">
        <el-tab-pane label="设备日志">
          <device-log :deviceDetail="this.deviceDetail" :thingModelEvents="events" :thingModelServices="services"></device-log>
        </el-tab-pane>
        <!-- <el-tab-pane label="服务器日志"> </el-tab-pane> -->
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import DeviceSimulatorProperties from './DeviceSimulatorProperties.vue'
import DeviceLog from './DeviceLog.vue'
// import MqttClient from './MqttClient.vue'

export default{
    name: 'deviceSimulator',
    props:{
      thingModelFunctions:{
        type: Array
      },
      deviceDetail:{
        type: Object
      }
    },
    data(){
        return {
        connection: {
        protocol: 'ws',
        host: 'broker.emqx.io',
        // ws: 8083; wss: 8084
        port: 8083,
        endpoint: '/mqtt',
        // for more options, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
        clean: true,
        connectTimeout: 30 * 1000, // ms
        reconnectPeriod: 4000, // ms
        clientId:
          'emqx_vue_' +
          Math.random()
            .toString(16)
            .substring(2, 8),
        // auth
        username: 'emqx_test',
        password: 'emqx_test',
      },qosList: [0, 1, 2],
      client: {
        connected: false,
      },
        }
    },
    computed:{
      properties(){
        return this.thingModelFunctions.filter(o=> o.type=='property')
      },
      events(){
        return this.thingModelFunctions.filter(o=> o.type=='event')
      },
      services(){
        return this.thingModelFunctions.filter(o=> o.type=='service')
      }
    },
    created(){

    },

    components: {
      DeviceSimulatorProperties,
      DeviceLog,
      // MqttClient
  },
}
</script>
