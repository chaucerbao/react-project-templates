// Dependencies
import React from 'react'

// Type definitions
interface IProps {
  children: React.ReactNode
}
interface IState {
  isLoggedIn: boolean
}
export interface IContext {
  isLoggedIn: IState['isLoggedIn']
  logIn: () => void
  logOut: () => void
}

// Context
const AuthContext = React.createContext()

// Provider
export default class AuthProvider extends React.Component<IProps, IState> {
  public state = {
    isLoggedIn: false,
  }

  public render() {
    const { isLoggedIn } = this.state
    const { logIn, logOut } = this

    return (
      <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }

  private logIn = () => {
    this.setState({ isLoggedIn: true })
  }

  private logOut = () => {
    this.setState({ isLoggedIn: false })
  }
}

// Consumer
export const AuthConsumer = AuthContext.Consumer
