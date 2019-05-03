import React from 'react'
import dva from 'dva'
import { HashRouter as Router } from 'react-router-dom'
import {createHashHistory} from 'history'

import { AppRouter } from './app-router'

if (module.hot) {
  module.hot.accept()
}

export const history = createHashHistory()

const app = dva({
  history
})

app.model(require('@/models/user').default)
app.router(() => (
  <Router>
    <AppRouter />
  </Router>
))
app.start('#root')
