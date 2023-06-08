import request from '@/utils/request'
import { LoginInfoQuery, LoginInfoVO } from './types'
import { AxiosPromise } from 'axios'

// 查询登录日志列表
export function list(query: LoginInfoQuery): AxiosPromise<LoginInfoVO[]> {
  return request({
    url: '/monitor/logininfor/list',
    method: 'post',
    data: query,
  })
}

// 删除登录日志
export function delLoginInfo(infoId: string | number | Array<string | number>) {
  return request({
    url: '/monitor/logininfor',
    method: 'post',
    data: {
      infoId,
    },
  })
}

// 解锁用户登录状态
export function unlockLoginInfo(userName: string | Array<string>) {
  return request({
    url: '/monitor/logininfor/unlock',
    method: 'post',
    data: {
      userName,
    },
  })
}

// 清空登录日志
export function cleanLoginInfo() {
  return request({
    url: '/monitor/logininfor/clean',
    method: 'post',
  })
}
