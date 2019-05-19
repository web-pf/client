import axios from 'axios'
import { api } from './api'


interface IResource {
  appId: string
  startDate: number
  endDate: number
}
interface ITrending {
  appId: string
  startDate: number
  endDate: number
  indicators: string
}

export const perf = {
  trending: (params: ITrending) => {
    return axios({
      method: 'get',
      url: api.perf.trending,
      params,
    })
  },
  resource: (params: IResource) => {
    return axios({
      method: 'get',
      url: api.perf.resource,
      params,
    })
  },
}
