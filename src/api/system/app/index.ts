import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { AppForm, AppVO } from './types'

interface IPage {
    pageSize: number
    pageNum: number
}

// 查询应用信息列表
export function listApp(query: IPage): AxiosPromise<any> {
    return request({
        url: '/system/app/list',
        method: 'post',
        params: query,
    })
}

// 查询应用信息详细
export function getApp(id: string | number): AxiosPromise<AppVO> {
    return request({
        url: '/system/app/getDetail',
        method: 'post',
        data: id,
    })
}

// 新增应用信息
export function addApp(data: AppForm) {
    return request({
        url: '/system/app/add',
        method: 'post',
        data,
    })
}

// 修改应用信息
export function updateApp(data: AppForm) {
    return request({
        url: '/system/app/edit',
        method: 'post',
        data: data,
    })
}

// 删除应用信息
export function delApp(id: Array<string | number>) {
    return request({
        url: '/system/app/delete',
        method: 'post',
        data: id,
    })
}
