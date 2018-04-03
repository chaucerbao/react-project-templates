// Dependencies
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { AuthConsumer, Context as AuthContext } from './auth-context'

// Type definitions
interface Props extends RouteProps {}

// Component
export default (props: Props) => (
  <AuthConsumer>
    {({ isLoggedIn }: AuthContext) =>
      isLoggedIn ? (
        <Route {...props} />
      ) : (
        <Redirect
          to={`/login?${props.location!.pathname}${encodeURIComponent(
            props.location!.search
          )}`}
        />
      )
    }
  </AuthConsumer>
)
