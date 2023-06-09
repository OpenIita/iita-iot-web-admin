import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { DictDataForm, DictDataQuery, DictDataVO } from './types'
// 根据字典类型查询字典数据信息
export function getDicts(dictType: string): AxiosPromise<DictDataVO[]> {
  return request({
    url: '/system/dict/data/type',
    method: 'post',
    data: dictType
  })
}

// 查询字典数据列表
export function listData(query: DictDataQuery): AxiosPromise<DictDataVO[]> {
  return request({
    url: '/system/dict/data/list',
    method: 'post',
    data: query,
  })
}

// 查询字典数据详细
export function getData(dictCode: string | number): AxiosPromise<DictDataVO> {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data: {
      dictCode,
    },
  })
}

// 新增字典数据
export function addData(data: DictDataForm) {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data,
  })
}

// 修改字典数据
export function updateData(data: DictDataForm) {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data,
  })
}

// 删除字典数据
export function delData(dictCode: string | number | Array<string | number>) {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data: {
      dictCode,
    },
  })
}
