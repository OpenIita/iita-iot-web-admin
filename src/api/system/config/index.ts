import request from '@/utils/request'
import { ConfigForm, ConfigQuery, ConfigVO } from './types'
import { AxiosPromise } from 'axios'

// 查询参数列表
export function listConfig(query: ConfigQuery): AxiosPromise<ConfigVO[]> {
  return request({
    url: '/system/config/list',
    method: 'post',
    data: query,
  })
}

// 查询参数详细
export function getConfig(configId: string | number): AxiosPromise<ConfigVO> {
  return request({
    url: '/system/config/getDetail',
    method: 'post',
    data: configId,
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey: string): AxiosPromise<ConfigVO> {
  return request({
    url: '/system/config/getConfigKey',
    method: 'post',
    data: configKey,
  })
}

// 新增参数配置
export function addConfig(data: ConfigForm) {
  return request({
    url: '/system/config/add',
    method: 'post',
    data,
  })
}

// 修改参数配置
export function updateConfig(data: ConfigForm) {
  return request({
    url: '/system/config/edit',
    method: 'post',
    data,
  })
}

// 修改参数配置
export function updateConfigByKey(key: string, value: any) {
  return request({
    url: '/system/config/updateByKey',
    method: 'post',
    data: {
      configKey: key,
      configValue: value,
    },
  })
}

// 删除参数配置
export function delConfig(configId: string | number | Array<string | number>) {
  return request({
    url: '/system/config/delete',
    method: 'post',
    data: configId,
  })
}

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/system/config/refreshCache',
    method: 'post',
  })
}
