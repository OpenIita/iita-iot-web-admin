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
  deviceSimulateSend = '/device/simulateSend',
  propertySet = '/device/{deviceId}/service/property/set',
  deviceLogs = '/device/deviceLogs/list',
  serviceInvoke = '/device/{deviceId}/service/{service}/invoke',
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
