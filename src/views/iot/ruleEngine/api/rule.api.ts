import request from '@/utils/request'

enum Api {
  list = '/rule_engine/list',
  saveRule = '/rule_engine/edit',
  delete = '/rule_engine/delete',
  resume = '/rule_engine/resume',
  pause = '/rule_engine/pause',
  logList = '/rule_engine/ruleLog/list',
  logClear = '/rule_engine/ruleLog/clear',
}

// 获取列表
export const getRuleList = (data) => {
  return request({
    url: Api.list,
    method: 'post',
    data,
  })
}
// 编辑规则
export const saveRule = (data) => {
  return request({
    url: Api.saveRule,
    method: 'post',
    data,
  })
}
// 删除规则
export const deleteRule = (data) => {
  return request({
    url: Api.delete,
    method: 'post',
    data,
  })
}
// 停止
export const pauseRule = (data) => {
  return request({
    url: Api.pause,
    method: 'post',
    data,
  })
}

// 恢复
export const resumeRule = (data) => {
  return request({
    url: Api.resume,
    method: 'post',
    data,
  })
}

// 获取日志
export const getRulesLog = (data) => {
  return request({
    url: Api.logList,
    method: 'post',
    data,
  })
}
// 清空日志
export const clearRulesLog = (data) => {
  return request({
    url: Api.logClear,
    method: 'post',
    data,
  })
}
