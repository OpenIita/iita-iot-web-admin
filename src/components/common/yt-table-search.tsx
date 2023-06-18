import { propTypes } from '@/utils/propTypes'
import { searchProps } from './props/crudProps'
import { ElButton, ElDatePicker, ElForm, ElFormItem, ElInput, DateModelType } from 'element-plus'
import { Component, PropType } from 'vue'
import { IColumn } from '@/components/common/types/tableCommon'
import { componentMap, renderOptions } from '@/components/common/render/useRenderComponent'

export default defineComponent({
  name: 'YtTableSearch',
  props: {
    column: {
      type: Array as PropType<IColumn[]>,
      default: () => [],
    },
    ...searchProps,
  },
  emits: ['handleSearch', 'update:query'],
  setup(props, { slots, emit }) {
    // 表单数据
    const formModel = ref<Recordable>(props.query)
    const getAttr = (option: IColumn) => {
      return {
        clearable: props.clearable,
        placeholder: `${option.type === 'string' || !option.type ? '请输入' : '请选择'}${option.label}`,
        ...option.componentProps,
      }
    }
    const queryFormRef = ref()
    const handleQuery = () => {
      emit('handleSearch', formModel.value)
    }
    // watch(
    //   () => formModel,
    //   (newV) => {
    //     emit('update:query', newV.value || {})
    //   },
    //   {
    //     immediate: true,
    //     deep: true,
    //   }
    // )
    const resetQuery = () => {
      queryFormRef.value.resetFields()
      handleQuery()
    }
    const searchData = ref<IColumn[]>([])
    props.column.forEach((item: IColumn) => {
      if (item.search) {
        searchData.value.push(item)
      }
    })

    return () => {
      return (
        searchData.value?.length > 0 && (
          <div class="search">
            <ElForm ref={queryFormRef} inline={true} labelWidth={props.labelWidth} model={formModel}>
              {searchData.value.map((m: IColumn) => {
                const type = m?.type || 'string'
                const Com = componentMap.get(type) as ReturnType<typeof defineComponent>
                return (
                  <ElFormItem label={m.label + ':'} prop={m.key}>
                    {!m.searchSlot ? (
                      <Com v-model={formModel.value[m.key]} {...getAttr(m)}>
                        {renderOptions(m)}
                      </Com>
                    ) : (
                      slots[m.key + 'Search']?.({
                        column: m,
                        row: formModel.value,
                      })
                    )}
                  </ElFormItem>
                )
              })}
              <ElFormItem>
                <ElButton type="primary" onClick={handleQuery} icon="Search" loading={props.loading}>
                  搜索
                </ElButton>
                <ElButton onClick={resetQuery} icon="Refresh">
                  重置
                </ElButton>
              </ElFormItem>
            </ElForm>
          </div>
        )
      )
    }
  },
})
