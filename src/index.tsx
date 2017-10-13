// Libraries
import { reaction } from 'mobx'
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

// Initialize state
const stores = Stores.create(
  {},
  { api: new Api(window.fetch), path: window.location.pathname }
)

// Sync browser's address bar
reaction(
  () => stores.viewStore.path,
  path => {
    if (window.location.pathname !== path) {
      window.history.pushState(undefined, '', path)
    }
  }
)

// Mount
render(
  <Provider stores={stores}>
    <Router />
  </Provider>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
