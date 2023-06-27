// 模板配置Api
import request from '@/utils/request'
import { AxiosPromise, AxiosResponse } from 'axios'

enum Api {
  list = '/notify/channel/template/getList',
  add = '/notify/channel/template/add',
  del = '/notify/channel/template/delById',
}
export interface IChannelTemplateVo {
  id?: number
  channelConfigId: number
  title: string
  content: string
  createAt: number
}
interface IPage {
  pageNum?: number
  pageSize?: number
}
// 获取模板配置列表
export const getTemplatesList = (data?: IPage): AxiosPromise<AxiosResponse<IChannelTemplateVo[]>> => {
  return request({
    url: Api.list,
    method: 'post',
    data: data,
  })
}

// 保存、编辑模板配置
export const saveTemplate = (data: IChannelTemplateVo) => {
  return request({
    url: Api.add,
    method: 'post',
    data: data,
  })
}

// 删除模板配置
export const deleteTemplate = (data: (string | number)[]) => {
  return request({
    url: Api.del,
    method: 'post',
    data,
  })
}
