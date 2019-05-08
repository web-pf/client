import { Model } from 'dva'

export interface IModelWebsite {
  websiteId: number
  appId: string
  name: string
  url: string
  description: string
}
export default {
  namespace: 'websites',
  state: false,
  reducers: {
    save: (state, { payload }) => {
      return [...payload]
    },
  },
} as Model
