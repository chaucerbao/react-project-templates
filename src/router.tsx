// Libraries
import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// Pages
import Homepage from './pages/homepage'

const Router = () => (
  <BrowserRouter>
    <Route exact={true} path="/" component={Homepage} />
  </BrowserRouter>
)

export default Router
