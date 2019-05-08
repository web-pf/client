import { user } from './user'
import { website } from './website'
import { perf } from './perf'

import axios from 'axios'
import { history } from '@/app'

axios.defaults.validateStatus = () => {
  return true
}

axios.interceptors.response.use(response => {
  if(response.status === 403) {
    history.push('/account')
  }
  return response
})

export const services = {
  user,
  website,
  perf
}
