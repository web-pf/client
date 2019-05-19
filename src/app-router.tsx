import React, { useEffect, useState, Fragment } from 'react'
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout, Select, message } from 'antd'
import { Header, SubHeader } from './components'
import { Account, Dashboard, RegisterWebsite, Errors } from './pageComponents'
import { services } from './services'
import { connect } from 'dva'
import { IModelUser } from './models/user'
import { IModelWebsite } from '@/models/websites'
import { Dispatch } from 'redux'

interface IRouterProps extends RouteComponentProps {
  user: IModelUser
  websites: IModelWebsite[]
  dispatch: Dispatch
}
function RAppRouter(props: IRouterProps) {
  const { user, dispatch, history, location, websites } = props
  const [currentWebsite, setCurrentWebsite] = useState<any>()

  const subHeaderTitle = location.pathname.split('/')[1]

  useEffect(() => {
    !websites &&
      services.website.list().then(res => {
        const { error, msg, payload } = res.data
        if (!error) {
          dispatch({
            type: 'websites/save',
            payload,
          })
        } else {
          message.error(msg)
        }
      })
  })

  useEffect(() => {
    if (!currentWebsite && websites && websites.length) {
      setCurrentWebsite(websites[0])
    }
  })
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
      <SubHeader
        label={subHeaderTitle}
        hideAppendRoutes={['account', 'register']}
        append={
          websites &&
          websites.length && (
            <Select
              defaultValue={websites[0].name}
              onChange={selectedId =>
                setCurrentWebsite(websites.filter(item => String(item.websiteId) === selectedId)[0])
              }
            >
              {websites &&
                websites.map(website => {
                  const { websiteId, name, url } = website

                  return <Select.Option key={websiteId}>{name}</Select.Option>
                })}
            </Select>
          )
        }
      />
      <Switch>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/dashboard">
          <React.Fragment>
            <Dashboard currentWebsite={currentWebsite} />
          </React.Fragment>
        </Route>
        <Route path="/register">
          <React.Fragment>
            <RegisterWebsite />
          </React.Fragment>
        </Route>
        <Route path="/Errors">{currentWebsite && <Errors appId={currentWebsite.appId} />}</Route>
        <Redirect to="/dashboard" />
      </Switch>
    </Fragment>
  )
}
export const AppRouter = connect(({ user, websites }) => ({ user, websites }))(
  withRouter(RAppRouter)
)
