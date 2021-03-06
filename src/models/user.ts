import { Model } from 'dva'
export interface IModelUser {
  email: string
  nickname: string
  privilegeCode: number
}
export default {
  namespace: 'user',
  state: {
    email: undefined,
  } as IModelUser,
  reducers: {
    save: (state, { payload: userInfo }) => {
      return { ...userInfo }
    },
  },
} as Model
