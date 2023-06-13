// 设备Api
import request from '@/utils/request'
import { AxiosPromise } from 'axios'

enum Api {
  devicesList = '/device/list',
  devicesDel = '/device/unbind',
  devicesSave = '/device/add',
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
    url: Api.devicesSave,
    method: 'post',
    data,
  })
}
