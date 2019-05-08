import axios from 'axios'
import { api } from './api'

interface IRegisterDoneParams {
  websiteId: number
}

export const website = {
  list: () => {
    return axios({
      method: 'get',
      url: api.website.list,
    })
  },
  register: params => {
    return axios({
      method: 'put',
      url: api.website.register,
      data: params,
    })
  },
  registerDone: (params: IRegisterDoneParams) => {
    return axios({
      method: 'POST',
      url: api.website.register,
      data: params,
    })
  },
}
