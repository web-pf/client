import axios from 'axios'
import { api } from './api'

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
}
