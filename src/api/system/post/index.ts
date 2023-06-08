import request from '@/utils/request'
import { PostForm, PostQuery, PostVO } from './types'
import { AxiosPromise } from 'axios'

// 查询岗位列表
export function listPost(query: PostQuery): AxiosPromise<PostVO[]> {
  return request({
    url: '/system/post/list',
    method: 'post',
    data: query,
  })
}

// 查询岗位详细
export function getPost(postId: string | number): AxiosPromise<PostVO> {
  return request({
    url: '/system/post',
    method: 'post',
    data: {
      postId,
    },
  })
}

// 新增岗位
export function addPost(data: PostForm) {
  return request({
    url: '/system/post',
    method: 'post',
    data,
  })
}

// 修改岗位
export function updatePost(data: PostForm) {
  return request({
    url: '/system/post',
    method: 'post',
    data,
  })
}

// 删除岗位
export function delPost(postId: string | number | (string | number)[]) {
  return request({
    url: '/system/post',
    method: 'post',
    data: {
      postId,
    },
  })
}
