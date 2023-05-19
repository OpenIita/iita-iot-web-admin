import { propTypes } from '@/utils/propTypes'
import { ElButton, ElDatePicker, ElForm, ElFormItem, ElInput, DateModelType } from 'element-plus'
import { PropType } from 'vue'
import { IColumn } from '@/components/common/types/search'
import { useRenderSelect } from './render/useRenderSelect'
// 支持组件集合
const componentMap: any = {
  string: ElInput,
  select: ElSelect,
  date: ElDatePicker,
}

export default defineComponent({
  name: 'YtTableSearch',
  props: {
    data: {
      type: Array as PropType<IColumn[]>,
      default: () => [],
    },
    labelWidth: propTypes.number.def(80),
    clearable: propTypes.bool.def(true),
    loading: propTypes.bool.def(false),
  },
  emits: ['handleSearch'],
  setup(props, { slots, emit }) {
    // 表单数据
    const formModel = ref<Recordable>({})
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
    const resetQuery = () => {
      queryFormRef.value.resetFields()
      handleQuery()
    }
    // 渲染options
    const renderOptions = (item: IColumn) => {
      switch (item.type) {
        case 'select':
          // eslint-disable-next-line no-case-declarations
          const { renderSelectOptions } = useRenderSelect()
          return renderSelectOptions(item)
        default:
          return null
      }
    }
    return () => (
      <div class="search">
        <ElForm ref={queryFormRef} inline={true} labelWidth={props.labelWidth} model={formModel}>
          {props.data.map((m: IColumn) => {
            const type = m?.type || 'string'
            const Com = componentMap[type] as ReturnType<typeof defineComponent>
            return (
              <ElFormItem label={m.label + ':'} prop={m.key}>
                {!m.slot ? (
                  <Com v-model={formModel.value[m.key]} {...getAttr(m)}>
                    {renderOptions(m)}
                  </Com>
                ) : (
                  slots[m.key]?.(m, formModel.value)
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
  },
})
