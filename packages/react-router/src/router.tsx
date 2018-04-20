// Dependencies
import React from 'react'
import Loadable from 'react-loadable'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AuthProvider from './components/auth-context'
import Layout from './components/layout'
import Loading from './components/loading'
import ProtectedRoute from './components/protected-route'
import Logout from './pages/logout'
import NotFound from './pages/not-found'

// Asynchronous page loader
const AsyncPage = (loader: () => Promise<any>) =>
  Loadable({ loader, loading: Loading })

// Pages
const Homepage = AsyncPage(() => import('./pages/homepage'))
const Login = AsyncPage(() => import('./pages/login'))
const Secret = AsyncPage(() => import('./pages/secret'))

// Router
const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <Layout>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/secret" component={Secret} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </AuthProvider>
  </BrowserRouter>
)

// Exports
export default Router
