import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { CacheVO } from './types'

// 查询缓存详细
export function getCache(): AxiosPromise<CacheVO> {
  return request({
    url: '/monitor/cache',
    method: 'post',
  })
}

// 查询缓存名称列表
export function listCacheName() {
  return request({
    url: '/monitor/cache/getNames',
    method: 'post',
  })
}

// 查询缓存键名列表
export function listCacheKey(cacheName: string) {
  return request({
    url: '/monitor/cache/getKeys',
    method: 'post',
    data: {
      cacheName,
    },
  })
}

// 查询缓存内容
export function getCacheValue(cacheName: string, cacheKey: string) {
  return request({
    url: '/monitor/cache/getValue',
    method: 'post',
    data: {
      cacheName,
      cacheKey,
    },
  })
}

// 清理指定名称缓存
export function clearCacheName(cacheName: string) {
  return request({
    url: '/monitor/cache/clearCacheName',
    method: 'post',
    data: {
      cacheName,
    },
  })
}

// 清理指定键名缓存
export function clearCacheKey(cacheName: string, cacheKey: string) {
  return request({
    url: '/monitor/cache/clearCacheKey',
    method: 'post',
    data: {
      cacheName,
      cacheKey,
    },
  })
}

// 清理全部缓存
export function clearCacheAll() {
  return request({
    url: '/monitor/cache/clearCacheAll',
    method: 'post',
  })
}
