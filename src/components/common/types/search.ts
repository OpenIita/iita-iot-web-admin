export type TFormType = 'string' | 'select' | 'date'

export interface IColumn {
  label: string // 搜索名称
  key: string // 搜索key
  type?: TFormType // 数据类型
  slot?: boolean // 是否用插槽
  componentProps?: any // 组件props
}
export interface ISearchProps {
  data: IColumn[]
  labelWidth?: number
  clearable?: boolean // 是否可清空
  loading: boolean // 当前加载状态
}
