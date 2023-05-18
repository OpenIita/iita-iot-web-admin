export type TFormType = 'string' | 'select' | 'time' | 'dateRange'

export interface ISearchData {
  label: string // 搜索名称
  key: string // 搜索key
  type?: TFormType // 数据类型
  slot?: boolean
}
export interface ISearchProps {
  data: ISearchData[]
  labelWidth?: number
  clearable?: boolean // 是否可清空
}
