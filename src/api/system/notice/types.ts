export interface NoticeVO extends BaseEntity {
  noticeId: number
  noticeTitle: string
  noticeType: string
  noticeContent: string
  status: string
  remark: string
  createByName: string
}

export interface NoticeQuery extends PageQuery {
  noticeTitle: string
  createByName: string
  status: string
  noticeType: string
}

export interface NoticeForm {
  id?: number | string
  noticeTitle: string
  noticeType: string
  noticeContent: string
  status: string
  remark: string
  createByName: string
}
