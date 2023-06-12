import { UserVO } from '@/api/system/user/types'
import { UserQuery } from '@/api/system/user/types'
import { AxiosPromise } from 'axios'
import { RoleQuery, RoleVO, RoleDeptTree } from './types'
import request from '@/utils/request'

export const listRole = (query: RoleQuery): AxiosPromise<RoleVO[]> => {
  return request({
    url: '/system/role/list',
    method: 'post',
    data: query,
  })
}

/**
 * 查询角色详细
 */
export const getRole = (id: string | number): AxiosPromise<RoleVO> => {
  return request({
    url: '/system/role/getInfo',
    method: 'post',
    data: id,
  })
}

/**
 * 新增角色
 */
export const addRole = (data: any) => {
  return request({
    url: '/system/role/add',
    method: 'post',
    data,
  })
}

/**
 * 修改角色
 * @param data
 */
export const updateRole = (data: any) => {
  return request({
    url: '/system/role/edit',
    method: 'post',
    data,
  })
}

/**
 * 角色数据权限
 */
export const dataScope = (data: any) => {
  return request({
    url: '/system/role/dataScope',
    method: 'post',
    data,
  })
}

/**
 * 角色状态修改
 */
export const changeRoleStatus = (id: string | number, status: string) => {
  const data = {
    id,
    status,
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'post',
    data,
  })
}

/**
 * 删除角色
 */
export const delRole = (id: Array<string | number> | string | number) => {
  return request({
    url: '/system/role/delete',
    method: 'post',
    data: id,
  })
}

/**
 * 查询角色已授权用户列表
 */
export const allocatedUserList = (query: UserQuery): AxiosPromise<UserVO[]> => {
  return request({
    url: '/system/role/authUser/allocatedList',
    method: 'post',
    data: query,
  })
}

/**
 * 查询角色未授权用户列表
 */
export const unallocatedUserList = (query: UserQuery): AxiosPromise<UserVO[]> => {
  return request({
    url: '/system/role/authUser/unallocatedList',
    method: 'post',
    data: query,
  })
}

/**
 * 取消用户授权角色
 */
export const authUserCancel = (data: any) => {
  return request({
    url: '/system/role/authUser/cancel',
    method: 'post',
    data,
  })
}

/**
 * 批量取消用户授权角色
 */
export const authUserCancelAll = (data: any) => {
  return request({
    url: '/system/role/authUser/cancelAll',
    method: 'post',
    data,
  })
}

/**
 * 授权用户选择
 */
export const authUserSelectAll = (data: any) => {
  return request({
    url: '/system/role/authUser/selectAll',
    method: 'post',
    data,
  })
}
// 根据角色ID查询部门树结构
export const deptTreeSelect = (id: string | number): AxiosPromise<RoleDeptTree> => {
  return request({
    url: '/system/role/deptTree',
    method: 'post',
    data: {
      id,
    },
  })
}
