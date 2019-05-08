import React, { useEffect, useState, Fragment } from 'react'
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout, message } from 'antd'
import { Header } from './components'
import { Account, Dashboard, RegisterWebsite } from './pageComponents'
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

  useEffect(() => {
    // if no user data, log in already(but no checking info) or no log in
    if (!user.email) {
      services.user.checkCurrent().then(res => {
        if (!res.data.error) {
          dispatch({
            type: 'user/save',
            payload: res.data,
          })
        }
      })
    }
  })
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/dashboard">
          <React.Fragment>
            <Dashboard />
          </React.Fragment>
        </Route>
        <Route path="/register">
          <React.Fragment>
            <RegisterWebsite />
          </React.Fragment>
        </Route>
        <Redirect to="/dashboard" />
      </Switch>
    </Fragment>
  )
}
export const AppRouter = connect(({ user }) => ({ user }))(withRouter(RAppRouter))
