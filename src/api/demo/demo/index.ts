import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { DemoVO, DemoForm, DemoQuery } from '@/api/demo/demo/types'

/**
 * 查询测试单列表
 * @param query
 * @returns {*}
 */
export const listDemo = (query?: DemoQuery): AxiosPromise<DemoVO[]> => {
  return request({
    url: '/demo/demo/list',
    method: 'post',
    data: query,
  })
}

/**
 * 查询测试单详细
 * @param id
 */
export const getDemo = (id: string | number): AxiosPromise<DemoVO> => {
  return request({
    url: '/demo/demo',
    method: 'post',
    data: {
      id,
    },
  })
}

/**
 * 新增测试单
 * @param data
 */
export const addDemo = (data: DemoForm) => {
  return request({
    url: '/demo/demo',
    method: 'post',
    data,
  })
}

/**
 * 修改测试单
 * @param data
 */
export const updateDemo = (data: DemoForm) => {
  return request({
    url: '/demo/demo',
    method: 'post',
    data,
  })
}

/**
 * 删除测试单
 * @param id
 */
export const delDemo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/demo/demo',
    method: 'post',
    data: {
      id,
    },
  })
}
