// 设备Api
import request from '@/utils/request'
import { AxiosPromise } from 'axios'

enum Api {
  devicesList = '/device/list',
  devicesDel = '/device/delete',
  devicesAdd = '/device/add',
  devicesUpdate = '/device/save',
  devicesDetail = '/device/detail',
  devicesTagAdd = '/device/tag/add',
  deviceConfigSave = '/device/config/save',
  deviceSimulateSend = '/device/simulateSend',
  devicePropertyLogs = '/device/deviceProperty/log/list',
  deviceConfigGet = '/device/config/get',
  deviceConfigSend = '/device/config/send',
  propertySet = '/device/service/property/set',
  propertyGet = '/device/service/property/get',
  deviceLogs = '/device/deviceLogs/list',
  serviceInvoke = '/device/service/invoke',
  childrenDeviceList = '/device/children/list',
  childrenDevice = '',
}
export interface IDevicesVO {
  id: number | string
  createAt: number
  createBy: number
  createDept: number
  createTime: string
  deviceId: string
  deviceName: string
  model: string
  offlineTime: number
  onlineTime: number
  parentId: string
  productKey: string
  secret: string
  state: string
  uid: string
  updateBy: number
  updateTime: string
}
interface IPage {
  pageNum?: number
  pageSize?: number
  coverData?: number | string
}
// 获取列表
export const getDevicesList = (data?: IPage): AxiosPromise<any> => {
  return request({
    url: Api.devicesList,
    method: 'post',
    data,
  })
}

// 删除
export const deleteDevices = (data: (string | number)[]) => {
  return request({
    url: Api.devicesDel,
    method: 'post',
    data,
  })
}

// 编辑、保存
export const saveDevices = (data: IDevicesVO) => {
  return request({
    url: data.id ? Api.devicesUpdate : Api.devicesAdd,
    method: 'post',
    data,
  })
}
// 获取设备详情
export const getDevicesDetail = (data) => {
  return request({
    url: Api.devicesDetail,
    method: 'post',
    data,
  })
}
// 添加设备标签
export const devicesTagAdd = (data) => {
  return request({
    url: Api.devicesTagAdd,
    method: 'post',
    data,
  })
}

// 模拟上报
export const deviceSimulateSend = (data) => {
  return request({
    url: Api.deviceSimulateSend,
    method: 'post',
    data,
  })
}
// 设备属性设置
export const propertySet = (data) => {
  return request({
    url: Api.propertySet,
    method: 'post',
    data,
  })
}

export const propertyGet = (data) => {
  return request({
    url: Api.propertyGet,
    method: 'post',
    data,
  })
}

// 设备日志查询
export const deviceLogs = (data) => {
  return request({
    url: Api.deviceLogs,
    method: 'post',
    data,
  })
}
// 设备服务调用
export const serviceInvoke = (data) => {
  return request({
    url: Api.serviceInvoke,
    method: 'post',
    data,
  })
}
// 获取子设备列表
export const getChildrenDeviceList = (data?: IPage) => {
  return request({
    url: Api.childrenDeviceList,
    method: 'post',
    data,
  })
}
// 设备配置保存
export const saveDeviceConfig = (data) => {
  return request({
    url: Api.deviceConfigSave,
    method: 'post',
    data,
  })
}
// 获取设备配置
export const getDeviceConfig = (data) => {
  return request({
    url: Api.deviceConfigGet,
    method: 'post',
    data,
  })
}
// 设备配置下发
export const sendDeviceConfig = (data) => {
  return request({
    url: Api.deviceConfigSend,
    method: 'post',
    data,
  })
}

// 获取属性日志
export const devicePropertyLogs = (data) => {
  return request({
    url: Api.devicePropertyLogs,
    method: 'post',
    data,
  })
}
