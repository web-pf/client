import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { Header } from './components'
import { Account } from './pageComponents'
export function AppRouter() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
