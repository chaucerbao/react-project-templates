// Dependencies
import { configure } from 'mobx'
import { enableLogging } from 'mobx-logger'
import { Provider } from 'mobx-react'
import React from 'react'
import { render } from 'react-dom'

// Configure MobX
configure({ enforceActions: 'strict' })
if (process.env.NODE_ENV !== 'production') {
  enableLogging()
}

// Store
import store from './store'

// Page
import Homepage from './pages/homepage'

// Mount application
render(
  <Provider store={store}>
    <Homepage />
  </Provider>,
  document.getElementById('application')
)
