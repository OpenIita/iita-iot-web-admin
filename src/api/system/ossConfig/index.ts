import request from '@/utils/request'
import { OssConfigForm, OssConfigQuery, OssConfigVO } from './types'
import { AxiosPromise } from 'axios'

// 查询对象存储配置列表
export function listOssConfig(query: OssConfigQuery): AxiosPromise<OssConfigVO[]> {
  return request({
    url: '/resource/oss/config/list',
    method: 'post',
    params: query,
  })
}

// 查询对象存储配置详细
export function getOssConfig(ossConfigId: string | number): AxiosPromise<OssConfigVO> {
  return request({
    url: '/resource/oss/config/' + ossConfigId,
    method: 'post',
  })
}

// 新增对象存储配置
export function addOssConfig(data: OssConfigForm) {
  return request({
    url: '/resource/oss/config',
    method: 'post',
    data: data,
  })
}

// 修改对象存储配置
export function updateOssConfig(data: OssConfigForm) {
  return request({
    url: '/resource/oss/config',
    method: 'post',
    data: data,
  })
}

// 删除对象存储配置
export function delOssConfig(ossConfigId: string | number | Array<string | number>) {
  return request({
    url: '/resource/oss/config/' + ossConfigId,
    method: 'post',
  })
}

// 对象存储状态修改
export function changeOssConfigStatus(ossConfigId: string | number, status: string, configKey: string) {
  const data = {
    ossConfigId,
    status,
    configKey,
  }
  return request({
    url: '/resource/oss/config/changeStatus',
    method: 'post',
    data: data,
  })
}
