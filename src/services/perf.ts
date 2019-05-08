import axios from 'axios'
import { api } from './api'

interface IAppId {
  appId: string
}

export const perf = {
  navTimingSharing: (params: IAppId) => {
    return axios({
      method: 'get',
      url: api.perf.nav_timing_sharing,
      params: {
        appId: params.appId,
      },
    })
  },
  navTimingTrending: (params: IAppId) => {
    return axios({
      method: 'get',
      url: api.perf.nav_timing_trending,
      params: {
        appId: params.appId,
      },
    })
  },
}
