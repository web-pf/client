import axios from 'axios'
import { trimParamterPrefix } from '@/utils/trimParamPrefix'
import { api } from './api'

interface ICheckIsRegistered {
  _email: string
}

export const user = {
  checkIsRegistered: (params: ICheckIsRegistered) => {
    return axios({
      method: 'get',
      url: api.user.current,
      params: trimParamterPrefix(params),
    })
  },
}
