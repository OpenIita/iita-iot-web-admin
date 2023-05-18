import { propTypes } from '@/utils/propTypes'
import { ElButton, ElDatePicker, ElForm, ElFormItem, ElInput, DateModelType } from 'element-plus'
import { PropType } from 'vue'
import { ISearchData } from '@/components/common/types/search'
// 支持组件集合
const componentMap: any = {
  string: ElInput,
  select: ElSelect,
  time: ElDatePicker,
  dateRange: ElDatePicker,
}

export default defineComponent({
  name: 'YtTableSearch',
  props: {
    data: {
      type: Array as PropType<ISearchData[]>,
      default: () => [],
    },
    labelWidth: propTypes.number.def(80),
    clearable: propTypes.bool.def(true),
  },
  setup(props, { slots }) {
    // 表单数据
    const formModel = ref<Recordable>({})
    const getAttr = (option: ISearchData) => {
      return {
        placeholder: `${option.type === 'string' || !option.type ? '请输入' : '请选择'}${option.label}`,
      }
    }
    const queryFormRef = ref()
    const handleQuery = () => {
      console.log('handleQuery', formModel.value)
    }
    const resetQuery = () => {
      queryFormRef.value.resetFields()
      handleQuery()
    }
    return () => (
      <div class="search">
        <ElForm ref={queryFormRef} inline={true} labelWidth={props.labelWidth} model={formModel}>
          {props.data.map((m: ISearchData) => {
            const type = m?.type || 'string'
            const Com = componentMap[type] as ReturnType<typeof defineComponent>
            return (
              <ElFormItem label={m.label + ':'} prop={m.key}>
                {!m.slot ? <Com v-model={formModel.value[m.key]} {...getAttr(m)}></Com> : slots[m.key]?.(m, formModel.value)}
              </ElFormItem>
            )
          })}
          <ElFormItem>
            <ElButton type="primary" onClick={handleQuery} icon="Search">
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
