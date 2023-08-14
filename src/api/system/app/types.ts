export interface AppVO {
  id?: number | string
  appName: string
  appId: string | number
  appSecret: string
  appType: string
  remark: string
}

export interface AppForm extends BaseEntity {
  id?: number | string
  appName: string
  appId: string | number
  appSecret: string
  appType: string
  remark: string
}

export interface AppQuery extends PageQuery {
  id?: number | string
  appName: string
  appId: string | number
  appSecret: string
  appType: string
  remark: string
}
