import axios from 'axios'
import { trimParamterPrefix } from '@/utils/trimParamPrefix'
import { api } from './api'

export const website = {
  register: params => {
    return axios({
      method: 'PUT',
      url: api.website.register,
      data: params,
    })
  },
}
