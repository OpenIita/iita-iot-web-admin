import request from '@/utils/request'
import { DbTableQuery, DbTableVO, TableQuery, TableVO, GenTableVO, DbTableForm } from './types'
import { AxiosPromise } from 'axios'

// 查询生成表数据
export const listTable = (query: TableQuery): AxiosPromise<TableVO[]> => {
  return request({
    headers: { datasource: localStorage.getItem('dataName') },
    url: '/tool/gen/list',
    method: 'post',
    data: query,
  })
}
// 查询db数据库列表
export const listDbTable = (query: DbTableQuery): AxiosPromise<DbTableVO[]> => {
  return request({
    headers: { datasource: localStorage.getItem('dataName') },
    url: '/tool/gen/db/list',
    method: 'post',
    data: query,
  })
}

// 查询表详细信息
export const getGenTable = (tableId: string | number): AxiosPromise<GenTableVO> => {
  return request({
    headers: { datasource: localStorage.getItem('dataName') },
    url: '/tool/gen/getDetail',
    method: 'post',
    data: tableId,
  })
}

// 修改代码生成信息
export const updateGenTable = (data: DbTableForm) => {
  return request({
    headers: { datasource: localStorage.getItem('dataName') },
    url: '/tool/gen/edit',
    method: 'post',
    data,
  })
}

// 导入表
export const importTable = (data: { tables: Array<string | number> }) => {
  return request({
    headers: { datasource: localStorage.getItem('dataName') },
    url: '/tool/gen/importTable',
    method: 'post',
    data,
  })
}

// 预览生成代码
export const previewTable = (tableId: string | number) => {
  return request({
    headers: { datasource: localStorage.getItem('dataName') },
    url: '/tool/gen/preview',
    method: 'post',
    data: tableId,
  })
}

// 删除表数据
export const delTable = (tableIds: Array<string | number>) => {
  return request({
    headers: { datasource: localStorage.getItem('dataName') },
    url: '/tool/gen/delete',
    method: 'post',
    data: tableIds,
  })
}

// 生成代码（自定义路径）
export const genCode = (tableName: string) => {
  return request({
    headers: { datasource: localStorage.getItem('dataName') },
    url: '/tool/gen/genCode',
    method: 'post',
    data: {
      tableName,
    },
  })
}

// 同步数据库
export const synchDb = (tableName: string) => {
  return request({
    headers: { datasource: localStorage.getItem('dataName') },
    url: '/tool/gen/synchDb',
    method: 'post',
    data: tableName,
  })
}
