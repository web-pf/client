import React from 'react'
import dva from 'dva'
import { HashRouter as Router } from 'react-router-dom'
import { createHashHistory } from 'history'
import { createInspector } from 'perf-inspector'

import { AppRouter } from './app-router'

// create inspector
createInspector({
  server: 'https://webpf.net',
  appId: 'platform',
})

if (module.hot) {
  module.hot.accept()
}

export const history = createHashHistory()

const app = dva({
  history,
})

// register models
app.model(require('@/models/user').default)
app.model(require('@/models/websites').default)

//
app.router(() => (
  <Router>
    <AppRouter />
  </Router>
))

//
app.start('#root')


