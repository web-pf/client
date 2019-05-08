import React from 'react'
import dva from 'dva'
import { HashRouter as Router } from 'react-router-dom'
import { createHashHistory } from 'history'
import { createInspector } from '../../inspector/dist'

import { AppRouter } from './app-router'

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

// create inspector
createInspector({
  server: 'https://webpf.net:4431',
  appId: 'hzN2v3ufjLLQ2sP9R69ZEJ',
})
