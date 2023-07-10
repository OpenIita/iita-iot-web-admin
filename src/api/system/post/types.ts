export interface PostVO extends BaseEntity {
  id: number | string
  postCode: string
  postName: string
  postSort: number
  status: string
  remark: string
}

export interface PostForm {
  id?: number | string
  postCode: string
  postName: string
  postSort: number
  status: string
  remark: string
}

export interface PostQuery extends PageQuery {
  postCode: string
  postName: string
  status: string
}
