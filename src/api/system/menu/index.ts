import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { MenuQuery, MenuVO, MenuForm, MenuTreeOption, RoleMenuTree } from './types'

// 查询菜单列表
export const listMenu = (query?: MenuQuery): AxiosPromise<MenuVO[]> => {
  return request({
    url: '/system/menu/list',
    method: 'post',
    params: query,
  })
}

// 查询菜单详细
export const getMenu = (menuId: string | number): AxiosPromise<MenuVO> => {
  return request({
    url: '/system/menu/' + menuId,
    method: 'post',
  })
}

// 查询菜单下拉树结构
export const treeselect = (): AxiosPromise<MenuTreeOption[]> => {
  return request({
    url: '/system/menu/treeselect',
    method: 'post',
  })
}

// 根据角色ID查询菜单下拉树结构
export const roleMenuTreeselect = (roleId: string | number): AxiosPromise<RoleMenuTree> => {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'post',
  })
}

// 根据角色ID查询菜单下拉树结构
export const tenantPackageMenuTreeselect = (packageId: string | number): AxiosPromise<RoleMenuTree> => {
  return request({
    url: '/system/menu/tenantPackageMenuTreeselect/' + packageId,
    method: 'post',
  })
}

// 新增菜单
export const addMenu = (data: MenuForm) => {
  return request({
    url: '/system/menu',
    method: 'post',
    data: data,
  })
}

// 修改菜单
export const updateMenu = (data: MenuForm) => {
  return request({
    url: '/system/menu',
    method: 'post',
    data: data,
  })
}

// 删除菜单
export const delMenu = (menuId: string | number) => {
  return request({
    url: '/system/menu/' + menuId,
    method: 'post',
  })
}
