// 产品Api
import request from '@/utils/request'
import { AxiosPromise, AxiosResponse } from 'axios'

enum Api {
  list = '/product/list',
  add = '/product/add',
  edit = '/product/edit',
  objectModelList = '/product/getThingModelByProductKey',
  saveObjectModel = '/product/thingModel/save',
}
export interface IProductsVO {
  id?: number
  productKey: string
  category: string
  createAt: number
  img: string
  name: string
  nodeType: number
  transparent: boolean
  uid: string
}
interface IPage {
  pageNum?: number
  pageSize?: number
}
// 获取列表
export const getProductsList = (data?: IPage): AxiosPromise<AxiosResponse<IProductsVO[]>> => {
  return request({
    url: Api.list,
    method: 'post',
    data,
  })
}

// 编辑、保存
export const saveProducts = (data: IProductsVO) => {
  return request({
    url: !data.id ? Api.add : Api.edit,
    method: 'post',
    data,
  })
}

// 获取物模型
export const getObjectModel = (data: string | number) => {
  return request({
    url: Api.objectModelList,
    method: 'post',
    data,
  })
}

// 保存物模型
export const saveObjectModel = (data) => {
  return request({
    url: Api.saveObjectModel,
    method: 'post',
    data,
  })
}
