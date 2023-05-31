import { propTypes } from '@/utils/propTypes'
import { PropType } from 'vue'
import { IColumn } from '../types/tableCommon'
import { AxiosPromise } from 'axios'

// 搜索组件参数
export const searchProps = {
  slot: propTypes.bool.def(false), // 搜索插槽
  loading: propTypes.bool.def(false), // 搜索loading
  labelWidth: propTypes.number.def(80), // 搜索label宽度
  clearable: propTypes.bool.def(true), // 搜索是否有控件取消
}

// 功能区组件参数
export const funProps = {
  // 布局
  gutter: propTypes.number.def(10),
  span: propTypes.number.def(1.5),
  // 按钮权限
  addPermi: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  delPermi: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  exportPermi: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  // 按钮显示
  addBtn: propTypes.bool.def(true),
  // 删除暂无批量删除
  delBtn: propTypes.bool.def(false),
  // TODO: 导出暂时没得、后面加
  exportBtn: propTypes.bool.def(false),
  // 按钮文字
  addBtnText: propTypes.string.def('新增'),
  delBtnText: propTypes.string.def('删除'),
  exportBtnText: propTypes.string.def('导出'),
}

// 表格组件参数
export const tableProps = {
  width: propTypes.number || propTypes.string,
  menuWidth: propTypes.number.def(200) || propTypes.string,
  // 序号
  index: propTypes.bool.def(true),
  loading: propTypes.bool.def(false),
  // 多选
  selection: propTypes.bool.def(true),
  // 菜单
  menu: propTypes.bool.def(true),
  // 按钮权限
  viewPermi: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  delPermi: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  editPermi: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  // 按钮显示
  viewBtn: propTypes.bool.def(true),
  delBtn: propTypes.bool.def(true),
  editBtn: propTypes.bool.def(true),
  // 菜单插槽
  menuSlot: propTypes.bool.def(false),
  // 隐藏分页
  pageHide: propTypes.bool.def(false),
}

// 表单组件参数
export const formProps = {
  labelWidth: propTypes.string.def('120px'),
  clearable: propTypes.bool.def(true),
  width: propTypes.number.def(600) || propTypes.string,
  gutter: propTypes.number.def(0),
  col: propTypes.number.def(24),
}

export const crudProps = {
  data: {
    type: Object as PropType<Record<string, any>[]>,
    default: () => [],
  },
  column: {
    type: Array as PropType<IColumn[]>,
    default: () => [],
  },
  loading: propTypes.bool.def(false),
  searchProps: Object,
  funProps: Object,
  tableProps: Object,
  formProps: Object,
}
