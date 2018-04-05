// Dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import {
  AuthConsumer,
  Context as AuthContext
} from '../components/auth-context'

// Page
export default () => (
  <AuthConsumer>
    {({ logOut }: AuthContext) => {
      logOut()

      return <Redirect to="/" />
    }}
  </AuthConsumer>
)
