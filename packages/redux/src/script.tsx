// Dependencies
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// Store
import store, { persistor } from './store'

// Page
import Homepage from './pages/homepage'

// Mount application
render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Homepage />
    </PersistGate>
  </Provider>,
  document.getElementById('application')
)
