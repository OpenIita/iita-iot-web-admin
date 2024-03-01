// 虚拟设备Api
import request from '@/utils/request'
import { AxiosPromise } from 'axios'

enum Api {
  list = '/virtual_device/list',
  add = '/virtual_device/add',
  delete = '/virtual_device/delete',
  batchDelete = '/virtual_device/batchDelete',
  detail = '/virtual_device/getDetail',
  update = '/virtual_device/modify',
  run = '/virtual_device/run',
  set = '/virtual_device/setState',
  saveDevices = '/virtual_device/saveDevices',
  saveScript = '/virtual_device/saveScript',
  getLogs = '/virtual_device/logs/list',
}

export interface IVirtualDevicesVO {
  createAt: number
  devices: any[]
  id: string
  name: string
  productKey: string
  script: string
  state: string
  trigger: string
  triggerExpression: string
  type: string
  uid: string
}
export interface IChangeStateVO {
  id: string
  state: string
}
interface IPage {
  pageNum?: number
  pageSize?: number
}
export const getVirtualDevicesList = (data?: IPage): AxiosPromise<any> => {
  return request({
    url: Api.list,
    method: 'post',
    data,
  })
}
// 删除
export const deleteVirtualDevices = (data: (string | number)[]) => {
  return request({
    url: Api.delete,
    method: 'post',
    data,
  })
}
// 删除
export const batchDeleteVirtualDevices = (data: (string | number)[]) => {
  return request({
    url: Api.batchDelete,
    method: 'post',
    data,
  })
}
// 编辑、保存
export const saveVirtualDevices = (data: IVirtualDevicesVO) => {
  return request({
    url: data.id ? Api.update : Api.add,
    method: 'post',
    data,
  })
}

// 获取详情
export const getVirtualDevicesDetail = (data) => {
  return request({
    url: Api.detail,
    method: 'post',
    data,
  })
}

// 设置状态
export const setVirtualDeviceState = (data: IChangeStateVO) => {
  return request({
    url: Api.set,
    method: 'post',
    data,
  })
}

// 手动执行
export const runVirtualDevices = (data: (string | number)[]) => {
  return request({
    url: Api.run,
    method: 'post',
    data,
  })
}

// 保存关联设备
export const saveVirtualDevicesBindDevices = (data) => {
  return request({
    url: Api.saveDevices,
    method: 'post',
    data,
  })
}


// 保存脚本
export const saveVirtualDevicesScript = (data) => {
  return request({
    url: Api.saveScript,
    method: 'post',
    data,
  })
}

// 取虚拟设备执行日志
export const getVirtualDevicesLogs = (data): AxiosPromise<any> => {
  return request({
    url: Api.getLogs,
    method: 'post',
    data,
  })
}