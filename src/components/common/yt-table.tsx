import { propTypes } from '@/utils/propTypes'
import { PropType } from 'vue'
import { IColumn } from '@/components/common/types/search'
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
    // 序号
    index: propTypes.bool.def(true),
    // 传入数据
    data: {
      type: Array as PropType<Record<string, any>[]>,
    },
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
  },
  emits: ['handleView', 'handleUpdate', 'handleDelete', 'handleSelectionChange'],
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
            <ElButton link type="primary" icon="Edit" onClick={() => emit('handleUpdate', scope.row)}>
              编辑
            </ElButton>
          )}
          {props.delBtn && (
            <ElPopconfirm title="是否确认删除该数据?" onConfirm={() => emit('handleDelete', scope.row)}>
              {{
                reference: () => (
                  <ElButton link type="danger" icon="Delete">
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
    const renderColumn = (data: IColumn) => {
      return (
        <ElTableColumn label={data.label} align="center" prop={data.key}>
          {data.slot ? slots[data.key]?.(data) : null}
        </ElTableColumn>
      )
    }
    const pageObj = reactive({
      total: props.data?.length || 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    })
    const getList = () => {
      console.log('getList')
    }
    return () => (
      <div>
        <ElTable ref={tableRef} v-loading={props.loading} data={props.data} onSelection-change={() => emit('handleSelectionChange')}>
          {props.selection && <ElTableColumn type="selection" width="55" align="center" />}
          {props.index && <ElTableColumn type="index" width="55" align="center" label="序号" />}
          {props.column.map((m: IColumn) => {
            return renderColumn(m)
          })}
          {props.menu && (
            <ElTableColumn label="操作" align="center" class-name="small-padding fixed-width">
              {{ default: (scope: { row: any }) => renderMenus(scope) }}
            </ElTableColumn>
          )}
        </ElTable>
        {pageObj.total > 0 && (
          <Pagination
            total={pageObj.total}
            v-model:page={pageObj.queryParams.pageNum}
            v-model:limit={pageObj.queryParams.pageSize}
            onPagination={getList}
          ></Pagination>
        )}
      </div>
    )
  },
})
