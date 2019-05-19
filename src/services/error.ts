import axios from 'axios'
import { api } from './api'


interface IGetErrorsList {
  appId: string
}

export const error = {
  list: (params: IGetErrorsList) => {
    return axios({
      method: 'get',
      url: api.error.list,
      params,
    })
  },
  recent: (params: IGetErrorsList) => {
    return axios({
      method: 'get',
      url: api.error.recent,
      params,
    })
  },
  
}
