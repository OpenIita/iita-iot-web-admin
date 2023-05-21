import { propTypes } from '@/utils/propTypes'
import { PropType } from 'vue'
import { tabelProps } from './props/crudProps'
import { IColumn, TFormType } from '@/components/common/types/tableCommon'
import { ElButton, ElTable, ElTableColumn, ElPopconfirm } from 'element-plus'
import Pagination from '@/components/Pagination/index.vue'

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
    ...tabelProps,
  },
  emits: ['handleView', 'handleUpdate', 'handleDelete', 'handleSelectionChange', 'changePage'],
  setup(props, { emit, slots }) {
    const tableRef = ref()
    // 渲染菜单
    const renderMenus = (scope: { row: any }) => {
      return (
        <div>
          <ElButton link type="primary" icon="View" onClick={() => emit('handleView', scope.row)}>
            详情
          </ElButton>
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
        </div>
      )
    }

    // 渲染表格列
    const renderColumn = (column: IColumn) => {
      return (
        <ElTableColumn label={column.label} align="center" width={column.tableWidth || props.tableWidth} prop={column.key}>
          {column.slot && slots[column.key]?.(column)}
        </ElTableColumn>
      )
    }
    const pageObj = reactive({
      total: 10 || 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    })
    const onLoad = (params: any) => {
      const listParams = {
        ...params,
        ...pageObj,
      }
    }
    return () => (
      <div>
        <ElTable ref={tableRef} data={props.data} onSelection-change={() => emit('handleSelectionChange')}>
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
        {pageObj.total > 0 && (
          <Pagination
            total={pageObj.total}
            v-model:page={pageObj.queryParams.pageNum}
            v-model:limit={pageObj.queryParams.pageSize}
            onPagination={(e) => emit('changePage', e)}
          ></Pagination>
        )}
      </div>
    )
  },
})
