import request from '@/utils/request'
import { AxiosPromise } from 'axios'

enum Api {
  list = '/rule_engine/tasks/list',
  delete = '/rule_engine/tasks/delete',
  save = '/rule_engine/task/save',
  stop = '/rule_engine/task/pause',
  resume = '/rule_engine/task/resume',
  start = '/rule_engine/task/renew',
}

export interface ITaskVO {
  actions: string
  createAt: number
  desc: string
  expression: string
  id: string
  name: string
  reason: string
  state: string
  type: string
  uid: string
}
// 获取列表
export const getTaskList = (data) => {
  return request({
    url: Api.list,
    method: 'POST',
    data,
  })
}

// 编辑、保存
export const saveTask = (data: ITaskVO) => {
  return request({
    url: Api.save,
    method: 'POST',
    data,
  })
}
// 删除
export const deleteTask = (data) => {
  return request({
    url: Api.delete,
    method: 'POST',
    data,
  })
}
// 停止
export const stopTask = (data) => {
  return request({
    url: Api.stop,
    method: 'POST',
    data,
  })
}
// 恢复
export const reloadTask = (data) => {
  return request({
    url: Api.resume,
    method: 'POST',
    data,
  })
}
// 启动
export const startTask = (data) => {
  return request({
    url: Api.start,
    method: 'POST',
    data,
  })
}
