import request from '@/utils/request'
import { DictTypeForm, DictTypeVO, DictTypeQuery } from './types'
import { AxiosPromise } from 'axios'

// 查询字典类型列表
export function listType(query: DictTypeQuery): AxiosPromise<DictTypeVO[]> {
  return request({
    url: '/system/dict/type/list',
    method: 'post',
    params: query,
  })
}

// 查询字典类型详细
export function getType(dictId: number | string): AxiosPromise<DictTypeVO> {
  return request({
    url: '/system/dict/type/' + dictId,
    method: 'post',
  })
}

// 新增字典类型
export function addType(data: DictTypeForm) {
  return request({
    url: '/system/dict/type',
    method: 'post',
    data: data,
  })
}

// 修改字典类型
export function updateType(data: DictTypeForm) {
  return request({
    url: '/system/dict/type',
    method: 'post',
    data: data,
  })
}

// 删除字典类型
export function delType(dictId: string | number | Array<string | number>) {
  return request({
    url: '/system/dict/type/' + dictId,
    method: 'post',
  })
}

// 刷新字典缓存
export function refreshCache() {
  return request({
    url: '/system/dict/type/refreshCache',
    method: 'post',
  })
}

// 获取字典选择框列表
export function optionselect(): AxiosPromise<DictTypeVO[]> {
  return request({
    url: '/system/dict/type/optionselect',
    method: 'post',
  })
}
