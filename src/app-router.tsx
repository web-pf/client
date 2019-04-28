import React, { useEffect } from 'react'
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout } from 'antd'
import { Header } from './components'
import { Account } from './pageComponents'
import { services } from './services'
import { connect } from 'dva'
import { IModelUser } from './models/user'
import { Dispatch } from 'redux'

interface IRouterProps extends RouteComponentProps {
  user: IModelUser
  dispatch: Dispatch
}
function RAppRouter(props: IRouterProps) {
  const { user, dispatch, history, location } = props
  const redirectTo = (path:string) => {
    if(!location.pathname.split('/').includes(path)) {
      history.push(path)
    }
  }
  useEffect(() => {
    if (!user.email) {
      services.user.checkCurrent().then(res => {
        const { data } = res
        if (!res.data.error) {
          dispatch({
            type: 'user/save',
            payload: res.data,
          })
          redirectTo('/')
        } else {
          redirectTo('/account')
        }
      })
    } else {
      redirectTo('/account')
    }
  })
  return (
      <Switch>
        <Route path="/account">
          <Account />
        </Route>
        <Route>
          <Header />
          <Route path="/dashboard" />
        </Route>
        <Redirect to="/dashboard" />
      </Switch>
  )
}
export const AppRouter = connect(({ user }) => ({ user }))(withRouter(RAppRouter))
