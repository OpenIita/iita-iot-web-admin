/* eslint-disable no-case-declarations */
import { propTypes } from '@/utils/propTypes'
import { PropType } from 'vue'
import { tableProps } from './props/crudProps'
import { IColumn, TFormType } from '@/components/common/types/tableCommon'
import { ElButton, ElTable, ElTableColumn, ElPopconfirm } from 'element-plus'
import Pagination from '@/components/Pagination/index.vue'
import { formatDate } from '@/utils/formatTime'

interface IScope {
  row: any
  $index: any
  column: any
}

export default defineComponent({
  name: 'YtTableName',
  props: {
    // 列
    column: {
      type: Array as PropType<IColumn[]>,
      default: () => [],
    },
    // 传入数据
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
    // 分页参数
    page: propTypes.object.def({
      pageNum: 1,
      pageSize: 10,
    }),
    total: propTypes.number.def(0),
    ...tableProps,
  },
  emits: ['handleView', 'handleUpdate', 'handleDelete', 'handleSelectionChange', 'changePage', 'rowClick', 'update:page'],
  setup(props, { emit, slots, expose }) {
    const tableRef = ref()
    // 渲染菜单
    const renderMenus = (scope: { row: any }) => {
      return (
        <div>
          {props.viewBtn && (
            <ElButton
              link
              type="primary"
              icon="View"
              {...() => {
                if (props.viewPermi) return { vHasPermi: props.viewPermi }
                return {}
              }}
              onClick={() => emit('handleView', scope.row)}
            >
              详情
            </ElButton>
          )}
          {props.editBtn && (
            <ElButton
              link
              type="primary"
              icon="Edit"
              onClick={() => emit('handleUpdate', scope.row)}
              {...() => {
                if (props.editPermi) return { vHasPermi: props.editPermi }
                return {}
              }}
            >
              编辑
            </ElButton>
          )}
          {props.delBtn && (
            <ElPopconfirm title="是否确认删除该数据?" onConfirm={() => emit('handleDelete', scope.row)}>
              {{
                reference: () => (
                  <ElButton
                    link
                    type="danger"
                    icon="Delete"
                    {...() => {
                      if (props.delPermi) return { vHasPermi: props.delPermi }
                      return {}
                    }}
                  >
                    删除
                  </ElButton>
                ),
              }}
            </ElPopconfirm>
          )}
          {props.menuSlot}
          {props.menuSlot && slots.menuSlot?.(scope)}
        </div>
      )
    }
    // 渲染表格列
    const renderColumn = (column: IColumn) => {
      const renDiv = (scope: IScope) => {
        const row = toRaw(scope?.row)

        if (!column.slot) {
          switch (column.type) {
            case 'date':
              return formatDate(row[column.key], column?.componentProps?.format)
            case 'select':
            case 'radio':
              if (!column.componentProps) return
              const { options, labelAlias, valueAlias } = column.componentProps
              const labelName = labelAlias || 'label'
              const valueName = valueAlias || 'value'
              const obj = toRaw(options)?.find((f: any) => {
                return f[valueName] == toRaw(row[column.key])
              })
              return obj ? obj[labelName] : row[column.key]
              break
            default:
              break
          }
          return scope?.row[column.key] || ''
        }
        return slots[column.key]?.(scope)
      }
      return (
        <ElTableColumn label={column.label} align="center" width={column.tableWidth || props.width} prop={column.key}>
          {{
            default: (scope: IScope) => renDiv(scope),
          }}
        </ElTableColumn>
      )
    }
    const pageObj = reactive(props.page)
    // 切换分页
    const changePage = (e: any) => {
      emit('changePage', pageObj)
      emit('update:page', pageObj)
    }
    // 单选
    const rowClick = (row: any) => {
      emit('rowClick', row)
    }
    // const onLoad = (params: any) => {
    //   const listParams = {
    //     ...params,
    //     ...pageObj,
    //   }
    // }
    expose({
      tableRef,
    })
    return () => (
      <div>
        <ElTable
          ref={tableRef}
          data={props.data}
          onSelection-change={() => emit('handleSelectionChange')}
          size={props.size}
          column-key={props.columnKey}
          onCurrent-change={rowClick}
        >
          {props.selection && <ElTableColumn type="selection" width="55" align="center" />}
          {props.index && <ElTableColumn type="index" width="55" align="center" label="序号" />}
          {props.column.map((m: IColumn) => {
            if (!m.hide) return renderColumn(m)
          })}
          {props.menu && (
            <ElTableColumn label="操作" align="center" width={props.menuWidth} class-name="small-padding fixed-width">
              {{ default: (scope: { row: any }) => renderMenus(scope) }}
            </ElTableColumn>
          )}
        </ElTable>
        {!props.pageHide && (
          <Pagination total={props.total} v-model:page={pageObj.pageNum} v-model:limit={pageObj.pageSize} onPagination={changePage}></Pagination>
        )}
      </div>
    )
  },
})
