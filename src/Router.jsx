// Dependencies
import React from 'react'
import ReactRouter from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import browserHistory from 'react-router/lib/browserHistory'

// Layout
import Application from './Application'

// Code-split the routes
function load (page, nextState, callback) {
  require.ensure([], require => callback(null, require(`pages/${page}/index`).default))
}

// Router
const Router = (
  <ReactRouter history={browserHistory}>
    <Route path='/' component={Application}>
      <IndexRoute getComponent={(...args) => load('Homepage', ...args)} />
      <Route path='*' getComponent={(...args) => load('NotFound404', ...args)} />
    </Route>
  </ReactRouter>
)

export default Router
