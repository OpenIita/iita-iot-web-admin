import request from '@/utils/request'
import { OperLogQuery, OperLogVO } from './types'
import { AxiosPromise } from 'axios'

// 查询操作日志列表
export function list(query: OperLogQuery): AxiosPromise<OperLogVO[]> {
  return request({
    url: '/monitor/operlog/list',
    method: 'post',
    data: query,
  })
}

// 删除操作日志
export function delOperlog(operIds: Array<string | number>) {
  return request({
    url: '/monitor/operlog/delete',
    method: 'post',
    data: operIds,
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/monitor/operlog/clean',
    method: 'post',
  })
}
