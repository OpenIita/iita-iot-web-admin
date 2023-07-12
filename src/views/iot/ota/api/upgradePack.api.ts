import request from '@/utils/request'

enum Api {
  list = '/ota/package/getList',
  del = '/ota/package/delById',
  add = '/ota/package/add',
  upgrade = '/ota/device/upgrade',
  upload = '/ota/package/upload',
  result = '/ota/result',
  devices = '/device/list',
}

// 获取列表
export const getUpgradePack = (data) => {
  return request({
    url: Api.list,
    method: 'post',
    data,
  })
}

// 删除
export const delUpgradePack = (data) => {
  return request({
    url: Api.del,
    method: 'post',
    data,
  })
}
// 新增
export const addUpgradePack = (data) => {
  return request({
    url: Api.add,
    method: 'post',
    data,
  })
}
// 升级
export const upgradeUpgradePack = (data) => {
  return request({
    url: Api.upgrade,
    method: 'post',
    data,
  })
}
// 上传
export const uploadUpgradePack = (data) => {
  return request({
    url: Api.upload,
    method: 'post',
    data,
  })
}
// 结果
export const resultUpgradePack = (data) => {
  return request({
    url: Api.result,
    method: 'post',
    data,
  })
}

// 获取升级包设备
export const getDevices = (data) => {
  return request({
    url: Api.devices,
    method: 'post',
    data,
  })
}
