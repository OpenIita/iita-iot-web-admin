import { propTypes } from '@/utils/propTypes'
import { PropType } from 'vue'
import { IColumn } from '../types/tableCommon'
import { AxiosPromise } from 'axios'

// 搜索组件参数
export const searchProps = {
  searchLoing: propTypes.bool.def(false), // 搜索loading
  searchLabelWidth: propTypes.number.def(80), // 搜索label宽度
  searchClearable: propTypes.bool.def(true), // 搜索是否有控件取消
}

// 功能区组件参数
export const funProps = {
  // 布局
  funGutter: propTypes.number.def(10),
  funSpan: propTypes.number.def(1.5),
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
export const tabelProps = {
  tableWidth: propTypes.number || propTypes.string,
  menuWidth: propTypes.number.def(200) || propTypes.string,
  // 序号
  index: propTypes.bool.def(true),
  loading: propTypes.bool.def(false),
  // 多选
  selection: propTypes.bool.def(true),
  // 菜单
  menu: propTypes.bool.def(true),
  // 按钮权限
  delPermi: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  editPermi: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  // 按钮显示
  delBtn: propTypes.bool.def(true),
  editBtn: propTypes.bool.def(true),
}

// 表单组件参数
export const formProps = {
  formLabelWidth: propTypes.string.def('120px'),
  formClearable: propTypes.bool.def(true),
  formWidth: propTypes.number.def(600) || propTypes.string,
  formGutter: propTypes.number.def(0),
  formCol: propTypes.number.def(12),
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
  ...searchProps,
  ...funProps,
  ...tabelProps,
  ...formProps,
}
