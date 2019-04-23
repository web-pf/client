import React from 'react'
import { render } from 'react-dom'
import { AppRouter } from './app-router'
if (module.hot) {
  module.hot.accept()
}
render(
  <AppRouter />,
  document.getElementById('root')
)
