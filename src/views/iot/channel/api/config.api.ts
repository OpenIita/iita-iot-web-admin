// 产品Api
import request from '@/utils/request'
import { AxiosPromise, AxiosResponse } from 'axios'

enum Api {
  list = '/notify/channel/getList',
  getConfigList = '/notify/channel/config/getList',
  addConfig = '/notify/channel/config/add',
  getConfigById = '/notify/channel/config/getById',
  updateConfigById = '/notify/channel/config/updateById',
  delConfigById = '/notify/channel/config/delById',
}
export interface IChannelConfigsVO {
  id?: number
  channelId: string
  title: string
  param: number
  createAt: number
}
export interface IChannelsVO {
  id?: number
  code: string
  title: string
  icon: number
  createAt: number
}
interface IPage {
  pageNum?: number
  pageSize?: number
}
// 获取通道列表
export const getChannelsList = (): AxiosPromise<AxiosResponse<IChannelsVO[]>> => {
  return request({
    url: Api.list,
    method: 'post',
  })
}

// 获取通道配置列表
export const getConfigList = (): AxiosPromise<AxiosResponse<IChannelConfigsVO[]>> => {
  return request({
    url: Api.getConfigList,
    method: 'post',
  })
}


// 新增通道配置
export const addConfig = (data: IChannelConfigsVO) => {
  return request({
    url: Api.addConfig,
    method: 'post',
    data:data,
  })
}

// 根据ID获取通道配置
export const getConfigById = (data: string | number): AxiosPromise<AxiosResponse<IChannelConfigsVO>> => {
  return request({
    url: Api.getConfigById,
    method: 'post',
    data:data,
  })
}

// 修改通道配置
export const updateConfigById = (data: IChannelConfigsVO) => {
  return request({
    url: Api.updateConfigById,
    method: 'post',
    data:data,
  })
}

// 删除通道配置
export const delConfigById = (data: string | number) => {
  return request({
    url: Api.delConfigById,
    method: 'post',
    data:data,
  })
}