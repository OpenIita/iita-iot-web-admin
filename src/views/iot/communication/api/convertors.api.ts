// 设备消息转换器Api
import request from '@/utils/request'
import { AxiosPromise, AxiosResponse } from 'axios'

enum Api {
  list = '/protocol/converters/list',
  del = '/protocol/converter/delete',
  add = '/protocol/converter/add',
  edit = '/protocol/converter/edit',
  converterScript = '/protocol/getConverterScript',
  editConverterScript = '/protocol/converterScript/edit',
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

// 脚本详情
export interface IConverterScript {
  createAt: number
  desc: string
  id: string
  name: string
  script: string
  typ: string
  uid: string
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

// 获取转换脚本详情
export const getConverterScript = (data: string | number): AxiosPromise<IConverterScript> => {
  return request({
    url: Api.converterScript,
    method: 'post',
    data,
  })
}

// 编辑转换脚本
export const editConverterScript = (data: IConverterScript) => {
  return request({
    url: Api.editConverterScript,
    method: 'post',
    data,
  })
}
