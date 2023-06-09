export interface DictTypeVO extends BaseEntity {
  id: number | string
  dictName: string
  dictType: string
  status: string
  remark: string
}

export interface DictTypeForm {
  id: number | string | undefined
  dictName: string
  dictType: string
  status: string
  remark: string
}

export interface DictTypeQuery extends PageQuery {
  dictName: string
  dictType: string
  status: string
}
