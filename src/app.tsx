import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import dva from 'dva'

import { AppRouter } from './app-router'

if (module.hot) {
  module.hot.accept()
}

const app = dva()

app.model(require('@/models/user').default)
app.router(() => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
))
app.start('#root')
