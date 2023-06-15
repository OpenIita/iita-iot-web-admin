import request from '@/utils/request'
import { AxiosPromise } from 'axios'

enum Api {
  list = '/product/category/list',
  del = '/product/category/delete',
  save = '/product/category/edit',
  all = '/product/category/getAll',
}
export interface ICategoriesVO {
  createAt: number
  createBy: number
  createDept: number
  createTime: string
  id?: string
  name: string
  updateBy: number
  updateTime: string
}
// 获取列表
export const getCategoriesList = (data?: ICategoriesVO): AxiosPromise<any> => {
  return request({
    url: Api.list,
    method: 'post',
    data,
  })
}

// 获取所有
export const getCategoriesAll = (): AxiosPromise<ICategoriesVO[]> => {
  return request({
    url: Api.all,
    method: 'post',
  })
}

// 删除
export const deleteCategories = (data: (string | number)[]) => {
  return request({
    url: Api.del,
    method: 'post',
    data,
  })
}

// 编辑、保存
export const saveCategories = (data: ICategoriesVO) => {
  return request({
    url: Api.save,
    method: 'post',
    data,
  })
}
