import { ElDialog, ElButton } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { PropType } from 'vue'
import { IColumn } from '@/components/common/types/search'

type TDialogType = 'add' | 'view' | 'edit'

export default defineComponent({
  name: 'YtTableForm',
  props: {
    // 标题
    column: {
      type: Array as PropType<IColumn[]>,
      default: () => [],
    },
    width: propTypes.number.def(500) || propTypes.string,
  },
  emtis: ['openDialog'],
  setup(props, { emit, slots, expose }) {
    // 定义钩子
    const diglogRef = ref()
    const formRef = ref()
    // 组件内容数据
    const dialogObj = reactive({
      visible: false,
      title: '详情',
    })
    const formObj = reactive<{
      data: Recordable<string, any>
    }>({
      data: {},
    })
    const submitForm = () => {
      console.log('submitForm')
    }
    const cancel = () => {
      dialogObj.visible = false
      console.log('cancel')
    }
    // 打开弹窗
    const openDialog = (type: TDialogType, data?: Recordable<string, any>) => {
      const judgmentObj = {
        view: () => {
          dialogObj.title = '详情'
          formObj.data = data || {}
        },
        edit: () => {
          dialogObj.title = '编辑'
          formObj.data = data || {}
        },
        add: () => {
          dialogObj.title = '新增'
        },
      }
      judgmentObj[type]()
      dialogObj.visible = true
    }
    expose({
      openDialog,
    })
    return () => (
      <ElDialog ref={diglogRef} title={dialogObj.title} v-model={dialogObj.visible} width={props.width} append-to-body>
        {{
          footer: () => (
            <div class="dialog-footer">
              <ElButton type="primary" onClick={submitForm}>
                确 定
              </ElButton>
              <ElButton onClick={cancel}>取 消</ElButton>
            </div>
          ),
        }}
      </ElDialog>
    )
  },
})
