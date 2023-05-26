import { IColumn } from '@/components/common/types/tableCommon'
import { PropType } from 'vue'
import { formProps } from './props/crudProps'
import { componentMap, renderOptions } from '@/components/common/render/useRenderComponent'

import { ElDialog, ElButton, ElForm, ElFormItem, FormRules, ElRow, ElCol } from 'element-plus'
import { deepClone } from '@/utils'

type TDialogType = 'add' | 'view' | 'update'

export default defineComponent({
  name: 'YtTableForm',
  props: {
    // 标题
    column: {
      type: Array as PropType<IColumn[]>,
      default: () => [],
    },
    ...formProps,
  },
  emtis: ['openDialog', 'onSuccess'],
  setup(props, { emit, slots, expose }) {
    console.log('formprops', props)
    // 定义钩子
    const diglogRef = ref()
    const formRef = ref()
    // 组件内容数据
    const dialogObj = reactive({
      visible: false,
      title: '详情',
      type: 'view',
    })
    const formObj = reactive<{
      data: Recordable<string, any>
    }>({
      data: {},
    })
    const submitForm = () => {
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          emit('onSuccess', {
            type: dialogObj.type,
            data: formObj.data,
          })
        }
      })
    }
    const cancel = () => {
      reset()
      dialogObj.visible = false
    }
    // 表单重置
    const reset = () => {
      formObj.data = {}
      formRef.value.resetFields()
    }
    // 弹窗关闭前
    const beforeClose = (done: () => void) => {
      reset()
      done()
    }
    const getAttr = (option: IColumn) => {
      return {
        clearable: props.clearable,
        placeholder: `${option.type === 'string' || !option.type ? '请输入' : '请选择'}${option.label}`,
        ...option.componentProps,
      }
    }
    // 打开弹窗
    const openDialog = (type: TDialogType, data?: Recordable<string, any>) => {
      dialogObj.type = type
      const judgmentObj = {
        view: () => {
          dialogObj.title = '详情'
          formObj.data = deepClone(unref(data)) || {}
        },
        update: () => {
          dialogObj.title = '编辑'
          formObj.data = deepClone(unref(data)) || {}
        },
        add: () => {
          props.column.forEach((item: IColumn) => {
            // 判断默认值
            const defaultValue = item?.componentProps?.defaultValue
            if (defaultValue || defaultValue === 0) formObj.data[item.key] = defaultValue
          })
          dialogObj.title = '新增'
        },
      }
      judgmentObj[type]()
      dialogObj.visible = true
    }
    expose({
      openDialog,
      cancel,
    })

    const formData = ref<IColumn[]>(toRaw(props.column))
    const rules: FormRules = {}
    formData.value.forEach((item: IColumn) => {
      if (item.rules) {
        rules[item.key] = item.rules
      }
    })
    return () => (
      <ElDialog ref={diglogRef} title={dialogObj.title} v-model={dialogObj.visible} width={props.width} append-to-body beforeClose={beforeClose}>
        {{
          default: () => (
            <ElForm ref={formRef} model={formObj.data} rules={rules} labelWidth={props.labelWidth} disabled={dialogObj.type === 'view'}>
              <ElRow gutter={props.gutter}>
                {props.column.map((m: IColumn) => {
                  console.log(slots)
                  const type = m?.type || 'string'
                  const Com = componentMap.get(type) as ReturnType<typeof defineComponent>
                  if (!m.formHide) {
                    return (
                      <ElCol span={props.col}>
                        {!m.formItemSlot ? (
                          <ElFormItem label={m.label + ':'} prop={m.key} key={m.key}>
                            {!m.formSlot ? (
                              <Com v-model={formObj.data[m.key]} {...getAttr(m)}>
                                {renderOptions(m)}
                              </Com>
                            ) : (
                              slots[m.key + 'Form']?.({
                                column: m,
                                row: formObj.data,
                              })
                            )}
                          </ElFormItem>
                        ) : (
                          slots[m.key + 'FormItem']?.({
                            column: m,
                            row: formObj.data,
                          })
                        )}
                      </ElCol>
                    )
                  }
                })}
              </ElRow>
            </ElForm>
          ),
          footer: () => (
            <div class="dialog-footer">
              <ElButton onClick={cancel}>取 消</ElButton>
              {dialogObj.type !== 'view' && (
                <ElButton type="primary" onClick={submitForm}>
                  保 存
                </ElButton>
              )}
            </div>
          ),
        }}
        {/* */}
      </ElDialog>
    )
  },
})
