export interface OperLogQuery extends PageQuery {
  title: string
  operName: string
  businessType: string
  status: string
  orderByColumn: string
  isAsc: string
}

export interface OperLogVO extends BaseEntity {
  operId: string | number
  tenantId: string
  title: string
  businessType: number
  businessTypes?: number[]
  method: string
  requestMethod: string
  operatorType: number
  operName: string
  deptName: string
  operUrl: string
  operIp: string
  operLocation: string
  operParam: string
  jsonResult: string
  status: number
  errorMsg: string
  operTime: string
  costTime: number
}

export interface OperLogForm {
  operId?: number | string
  tenantId?: string | number
  title: string
  businessType: number
  businessTypes?: number[]
  method: string
  requestMethod: string
  operatorType: number
  operName: string
  deptName: string
  operUrl: string
  operIp: string
  operLocation: string
  operParam: string
  jsonResult: string
  status: number
  errorMsg: string
  operTime: string
  costTime: number
}
