import download from '@/utils/download'
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { computed, nextTick, reactive, ref, unref, watch } from 'vue'

interface ResponseType<T = any> {
  list: T[]
  total?: number
}

interface UseTableConfig<T = any> {
  getListApi: (option: any) => Promise<T>
  delListApi?: (option: any) => Promise<T>
  exportListApi?: (option: any) => Promise<T>
  // 返回数据格式配置
  response?: ResponseType
  // 默认传递的参数
  defaultParams?: Recordable
  props?: any
}

interface TableObject<T = any> {
  pageSize: number
  currentPage: number
  total: number
  tableList: T[]
  params: any
  loading: boolean
  exportLoading: boolean
  currentRow: Nullable<T>
}

export const useTable = <T = any>(config?: UseTableConfig<T>) => {
  const tableObject = reactive<TableObject<T>>({
    // 页数
    pageSize: 10,
    // 当前页
    currentPage: 1,
    // 总条数
    total: 10,
    // 表格数据
    tableList: [],
    // AxiosConfig 配置
    params: {
      ...(config?.defaultParams || {}),
    },
    // 加载中
    loading: true,
    // 导出加载中
    exportLoading: false,
    // 当前行的数据
    currentRow: null,
  })

  const paramsObj = computed(() => {
    return {
      ...tableObject.params,
      pageSize: tableObject.pageSize,
      pageNo: tableObject.currentPage,
    }
  })

  watch(
    () => tableObject.currentPage,
    () => {
      methods.getList()
    }
  )

  watch(
    () => tableObject.pageSize,
    () => {
      // 当前页不为1时，修改页数后会导致多次调用getList方法
      if (tableObject.currentPage === 1) {
        methods.getList()
      } else {
        tableObject.currentPage = 1
        methods.getList()
      }
    }
  )

  // Table实例
  const tableRef = ref()

  // ElTable实例
  const elTableRef = ref<ComponentRef<typeof ElTable>>()

  const register = (ref: any, elRef: ComponentRef<typeof ElTable>) => {
    tableRef.value = ref
    elTableRef.value = elRef
  }

  const getTable = async () => {
    await nextTick()
    const table = unref(tableRef)
    if (!table) {
      console.error('The table is not registered. Please use the register method to register')
    }
    return table
  }

  const delData = async (ids: string | number | string[] | number[]) => {
    let idsLength = 1
    if (ids instanceof Array) {
      idsLength = ids.length
      await Promise.all(
        ids.map(async (id: string | number) => {
          await (config?.delListApi && config?.delListApi(id))
        })
      )
    } else {
      await (config?.delListApi && config?.delListApi(ids))
    }
    ElMessage.success('删除成功')

    // 计算出临界点
    tableObject.currentPage =
      tableObject.total % tableObject.pageSize === idsLength || tableObject.pageSize === 1
        ? tableObject.currentPage > 1
          ? tableObject.currentPage - 1
          : tableObject.currentPage
        : tableObject.currentPage
    await methods.getList()
  }

  const methods = {
    getList: async () => {
      tableObject.loading = true
      const res = await config?.getListApi(unref(paramsObj)).finally(() => {
        tableObject.loading = false
      })
      if (res) {
        tableObject.tableList = (res as unknown as ResponseType).list
        if ((res as unknown as ResponseType).total) {
          tableObject.total = (res as unknown as ResponseType).total as unknown as number
        }
      }
    },
    setProps: async (props: any = {}) => {
      const table = await getTable()
      table?.setProps(props)
    },
    setColumn: async (columnProps: any) => {
      const table = await getTable()
      table?.setColumn(columnProps)
    },
    getSelections: async () => {
      const table = await getTable()
      return (table?.selections || []) as T[]
    },
    // 与Search组件结合
    setSearchParams: (data: Recordable) => {
      tableObject.params = Object.assign(tableObject.params, {
        pageSize: tableObject.pageSize,
        pageNo: 1,
        ...data,
      })
      // 页码不等于1时更新页码重新获取数据，页码等于1时重新获取数据
      if (tableObject.currentPage !== 1) {
        tableObject.currentPage = 1
      } else {
        methods.getList()
      }
    },
    // 删除数据
    delList: async (ids: string | number | string[] | number[], multiple: boolean, message = true) => {
      const tableRef = await getTable()
      if (multiple) {
        if (!tableRef?.selections.length) {
          ElMessage.warning('暂未选择数据')
          return
        }
      }
      await delData(ids)
    },
  }

  config?.props && methods.setProps(config.props)

  return {
    register,
    elTableRef,
    tableObject,
    methods,
    tableMethods: methods,
  }
}
