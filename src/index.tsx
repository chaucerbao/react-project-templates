// Libraries
import { Provider } from 'mobx-react'
import * as React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './register-service-worker'

// Stores
import Stores from './stores'
import Api from './stores/api'

// Router
import Router from './router'

// Global styles
import './styles/global'

// Mount
render(
  <Provider stores={Stores.create({}, { api: new Api(window.fetch) })}>
    <Router />
  </Provider>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
