// Libraries
import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Pages
import Homepage from './pages/homepage'
import NotFound from './pages/not-found'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Homepage} exact={true} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Router
