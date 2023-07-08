export interface IContributorVO {
  contributor: string
  context?: string
  avatar: string
  post: TPost
  tags: string
  title: string
  id?: number
  intro?: string
}
// 1前端开发,2后端开发,3全栈开发,4测试,5ui设计师,6产品经理,7架构师
export type TPost = 1 | 2 | 3 | 4 | 5 | 6 | 7

export const postOptions: {
  value: TPost
  label: string
}[] = [
  {
    value: 1,
    label: '前端开发',
  },
  {
    value: 2,
    label: '后端开发',
  },
  {
    value: 3,
    label: '全栈开发',
  },
  {
    value: 4,
    label: '测试',
  },
  {
    value: 5,
    label: 'UI设计师',
  },
  {
    value: 6,
    label: '产品经理',
  },
  {
    value: 7,
    label: '架构师',
  },
]
