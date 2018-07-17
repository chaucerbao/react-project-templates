// Dependencies
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { AuthConsumer, IContext as AuthContext } from './auth-context'

// Component
export default (props: RouteProps) => (
  <AuthConsumer>
    {({ isLoggedIn }: AuthContext) =>
      isLoggedIn ? (
        <Route {...props} />
      ) : (
        <Redirect
          to={`/login?${props.location!.pathname}${encodeURIComponent(
            props.location!.search,
          )}`}
        />
      )}
  </AuthConsumer>
)
