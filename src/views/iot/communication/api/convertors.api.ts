// 设备Api
import request from '@/utils/request'
import { AxiosPromise, AxiosResponse } from 'axios'

enum Api {
  list = '/protocol/converters/list',
  del = '/protocol/converter/delete',
  add = '/protocol/converter/add',
  edit = '/protocol/converter/edit',
}
export interface IConvertorsVO {
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
  id?: string
}
interface IPage {
  pageNum?: number
  pageSize?: number
}
// 获取列表
export const getConvertorsList = (data?: IPage): AxiosPromise<AxiosResponse<IConvertorsVO[]>> => {
  return request({
    url: Api.list,
    method: 'post',
    data,
  })
}

// 删除
export const deleteConvertors = (data: (string | number)[]) => {
  return request({
    url: Api.del,
    method: 'post',
    data,
  })
}

// 编辑、保存
export const saveConvertors = (data: IConvertorsVO) => {
  return request({
    url: !data.id ? Api.add : Api.edit,
    method: 'post',
    data,
  })
}
