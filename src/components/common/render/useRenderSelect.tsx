import { ElOption, ElOptionGroup } from 'element-plus'

export const useRenderSelect = () => {
  // 渲染 select options
  const renderSelectOptions = (item: any) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    return item?.componentProps?.options?.map((option: any) => {
      if (option?.options?.length) {
        return (
          <ElOptionGroup label={option[labelAlias || 'label']}>
            {() => {
              return option?.options?.map((v: any) => {
                return renderSelectOptionItem(item, v)
              })
            }}
          </ElOptionGroup>
        )
      } else {
        return renderSelectOptionItem(item, option)
      }
    })
  }

  // 渲染 select option item
  const renderSelectOptionItem = (item: any, option: any) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    const valueAlias = item?.componentProps?.optionsAlias?.valueField

    const { label, value, ...other } = option

    return <ElOption {...other} label={labelAlias ? option[labelAlias] : label} value={valueAlias ? option[valueAlias] : value}></ElOption>
  }

  return {
    renderSelectOptions,
  }
}
