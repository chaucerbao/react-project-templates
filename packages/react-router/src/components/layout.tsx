// Dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import { AuthConsumer, IContext as AuthContext } from './auth-context'

// Type definitions
interface IProps {
  children: React.ReactNode
}

// Layout
export default ({ children }: IProps) => (
  <AuthConsumer>
    {({ isLoggedIn }: AuthContext) => (
      <>
        <header>
          <nav>
            <Link to="/">Homepage</Link>
            &nbsp;
            <Link to="/secret?deep=linking">Secret</Link>
            &nbsp;
            <Link to="/not-found">Page not found</Link>
            &nbsp;
            {isLoggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Log in</Link>
            )}
          </nav>
        </header>
        <main>{children}</main>
        <footer>&copy; Copyright {new Date().getFullYear()}</footer>
      </>
    )}
  </AuthConsumer>
)
