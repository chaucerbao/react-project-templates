// Third-party dependencies
import * as lozad from 'lozad'
import { reaction } from 'mobx'
import { Provider } from 'mobx-react'
import * as React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'
import registerServiceWorker from './register-service-worker'

// Stores
import Stores from './stores'
import Api from './stores/api'

// Routing
import Router from './router'
import routes from './routes'

// Global styles
import './styles/global'
import theme from './styles/theme'

// Initialize the state
const stores = Stores.create(
  {},
  {
    api: new Api(window.fetch.bind(window)),
    path: window.location.pathname,
    routes
  }
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

// Lazy loader
const lazy = lozad('[data-lazy]', { rootMargin: '25%' })

// Mount the application
render(
  <Provider lazy={lazy} stores={stores}>
    <ThemeProvider theme={theme}>
      <Router routes={routes} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
