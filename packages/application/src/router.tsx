// Dependencies
import React from 'react'
import Loadable from 'react-loadable'

// Asynchronous page loader
const AsyncPage = (loader: () => Promise<any>) =>
  Loadable({ loader, loading: () => null })

// Pages
const Homepage = AsyncPage(() => import('./pages/homepage'))

// Router
export default () => (
  <>
    <Homepage />
  </>
)
