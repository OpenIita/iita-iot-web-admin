// 贡献人员Api
import request from '@/utils/request'

enum Api {
  list = '/contribution/contributor/list',
  add = '/contribution/contributor/add',
  delete = '/contribution/contributor/delete',
  edit = '/contribution/contributor/edit',
  detail = '/contribution/contributor/getDetail',
}

// 获取贡献人员列表
export const getContributorList = (data) => {
  return request({
    url: Api.list,
    method: 'post',
    data,
  })
}
// 修改贡献人员列表
export const editContributorList = (data) => {
  return request({
    url: Api.edit,
    method: 'post',
    data,
  })
}
// 新增贡献人员列表
export const addContributorList = (data) => {
  return request({
    url: Api.add,
    method: 'post',
    data,
  })
}
// 获取贡献人员详情
export const getContributorDetail = (data) => {
  return request({
    url: Api.detail,
    method: 'post',
    data,
  })
}
