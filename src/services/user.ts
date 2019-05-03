import axios from 'axios'
import { trimParamterPrefix } from '@/utils/trimParamPrefix'
import { api } from './api'

interface ICheckIsRegistered {
  _email: string
}
interface IRegister {
  email: string
  nickname: string
  passwords: string
  invitationCode: string
}
interface ILogin {
  email: string
  passwords: string
}

export const user = {
  login: (params: ILogin) => {
    const { email, passwords } = params

    const formdata = new FormData()
    formdata.append('email', email)
    formdata.append('passwords', passwords)

    return axios({
      method: 'POST',
      url: api.user.login,
      data: formdata,
    })
  },
  checkCurrent: () =>
    axios({
      method: 'get',
      url: api.user.current,
    }),
  checkIsRegistered: (params: ICheckIsRegistered) => {
    return axios({
      method: 'get',
      url: api.user.checkStatus,
      params: trimParamterPrefix(params),
    })
  },
  register: (params: IRegister) => {
    const { email, passwords, nickname, invitationCode } = params

    const formdata = new FormData()
    formdata.append('email', email)
    formdata.append('nickname', nickname)
    formdata.append('passwords', passwords)
    formdata.append('invitationCode', invitationCode)

    return axios({
      method: 'PUT',
      url: api.user.register,
      data: formdata,
    })
  },
}
