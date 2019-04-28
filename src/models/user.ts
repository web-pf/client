import { Model } from 'dva'
export interface IModelUser {
  email: string
}
export default {
  namespace: 'user',
  state: {
    email: undefined,
  } as IModelUser,
  reducers: {
    save: (state, { payload: userInfo }) => {
      console.log(userInfo)
      return { ...userInfo }
    },
  },
} as Model
