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
import routes from './routes'

// Global styles
import './styles/global'

// Initialize the state
const stores = Stores.create(
  {},
  { api: new Api(window.fetch), path: window.location.pathname }
)

// Sync the browser's address bar to the current path
reaction(
  () => stores.viewStore.path,
  path => {
    if (window.location.pathname !== path) {
      window.history.pushState(undefined, '', path)
    }
  }
)

// Listen to the browser's back/forward navigation
window.onpopstate = e => {
  if (e.type === 'popstate') {
    stores.viewStore.goTo(window.location.pathname)
  }
}

// Mount the application
render(
  <Provider stores={stores}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
