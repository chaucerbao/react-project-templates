// Dependencies
import { Provider } from 'mobx-react'
import React from 'react'
import { render } from 'react-dom'

// Store
import store from './store'

// Page
import Homepage from './pages/homepage'

// Mount application
render(
  <Provider store={store}>
    <Homepage />
  </Provider>,
  document.getElementById('application'),
)
