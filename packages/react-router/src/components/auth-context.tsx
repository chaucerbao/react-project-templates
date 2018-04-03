// Dependencies
import React from 'react'

// Type definitions
interface Props {
  children: React.ReactNode
}
interface State {
  isLoggedIn: boolean
}
export interface Context {
  isLoggedIn: State['isLoggedIn']
  logIn: () => void
  logOut: () => void
}

// Context
const AuthContext = React.createContext()

// Provider
export default class AuthProvider extends React.Component<Props, State> {
  state = {
    isLoggedIn: false
  }

  logIn = () => {
    this.setState({ isLoggedIn: true })
  }

  logOut = () => {
    this.setState({ isLoggedIn: false })
  }

  render() {
    const { isLoggedIn } = this.state
    const { logIn, logOut } = this

    return (
      <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

// Consumer
export const AuthConsumer = AuthContext.Consumer
