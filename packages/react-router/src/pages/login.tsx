// Dependencies
import React from 'react'
import { Redirect, RouteProps } from 'react-router-dom'
import {
  AuthConsumer,
  IContext as AuthContext,
} from '../components/auth-context'

// Type definitions
interface IProps {
  location: RouteProps['location']
}
interface IState {
  form: {
    email: string
    password: string,
  }
}

// Login
export default class Login extends React.Component<IProps, IState> {
  public state = {
    form: {
      email: '',
      password: '',
    },
  }

  public updateField = (e: React.FormEvent<HTMLInputElement>) => {
    const field = e.currentTarget

    this.setState({
      form: Object.assign({}, this.state.form, { [field.name]: field.value }),
    })
  }

  public render() {
    const { form } = this.state
    const path = this.props.location!.search

    return (
      <AuthConsumer>
        {({ isLoggedIn, logIn }: AuthContext) =>
          isLoggedIn ? (
            <Redirect to={path ? decodeURIComponent(path.substring(1)) : '/'} />
          ) : (
            <>
              <h1>Login</h1>

              <form onSubmit={logIn}>
                <div>
                  <label htmlFor="email">
                    <span>E-mail address</span>
                    <input
                      id="email"
                      name="email"
                      value={form.email}
                      type="email"
                      onChange={this.updateField}
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="password">
                    <span>Password</span>
                    <input
                      id="password"
                      name="password"
                      value={form.password}
                      type="password"
                      onChange={this.updateField}
                    />
                  </label>
                </div>

                <button type="submit">Submit</button>
              </form>
            </>
          )
        }
      </AuthConsumer>
    )
  }
}
