import request from '@/utils/request'
// import { AxiosPromise } from 'axios'

/**
 * 首页统计数据
 * @returns 统计数据
 */
export const stats = () => {
  return request({
    url: '/stats/main',
    method: 'post'
  })
}