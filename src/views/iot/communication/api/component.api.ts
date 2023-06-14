// 通讯组件Api
import request from '@/utils/request'
import { AxiosPromise, AxiosResponse } from 'axios'

enum Api {
  list = '/protocol/list',
  add = '/protocol/addComponent',
  update = '/protocol/editComponent',
  delete = '/protocol/delete',
  detail = '/protocol/getComponentDetail',
  changeState = '/protocol/component/changeState',
  saveScript = '/protocol/saveComponentScript',
}

export interface IComponentVO {
  config: string
  converType: string
  converter: string
  createAt: number
  createBy: number
  createDept: number
  createTime: string
  id: string
  jarFile: string
  name: string
  protocol: string
  script: string
  scriptTyp: string
  state: string
  type: string
  uid: string
  updateBy: number
  updateTime: string
}

interface IPage {
  pageNum?: number
  pageSize?: number
}

// 获取列表
export const getComponentList = (): AxiosPromise<AxiosResponse<IComponentVO[]>> => {
  return request({
    url: Api.list,
    method: 'post',
  })
}

// 删除
export const deleteComponent = (data: (string | number)[]) => {
  return request({
    url: Api.delete,
    method: 'post',
    data,
  })
}

// 编辑、保存
export const saveComponent = (data: IComponentVO) => {
  return request({
    url: !data.id ? Api.add : Api.update,
    method: 'post',
    data,
  })
}

// 状态更改
export const changeState = (data) => {
  return request({
    url: Api.changeState,
    method: 'post',
    data,
  })
}

// 获取详情
export const getComponentDetail = (data: string | number) => {
  return request({
    url: Api.detail,
    method: 'post',
    data,
  })
}

// 保存组件脚本
export const saveComponentScript = (data) => {
  return request({
    url: Api.saveScript,
    method: 'post',
    data,
  })
}
