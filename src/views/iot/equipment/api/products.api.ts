// 产品Api
import request from '@/utils/request'
import { AxiosPromise, AxiosResponse } from 'axios'

enum Api {
  list = '/product/list',
  add = '/product/add',
  edit = '/product/edit',
}
export interface IProductsVO {
  id?: string
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
