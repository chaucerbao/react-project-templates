// Dependencies
import { configure } from 'mobx'
import { enableLogging } from 'mobx-logger'
import { Provider } from 'mobx-react'
import React from 'react'
import { render } from 'react-dom'

// Configure MobX
configure({ enforceActions: 'always' })
if (process.env.NODE_ENV !== 'production') {
  enableLogging()
}

// Store
import Store from './store'

// Page
import Homepage from './pages/homepage'

// Mount application
render(
  <Provider store={new Store()}>
    <Homepage />
  </Provider>,
  document.getElementById('application')
)
