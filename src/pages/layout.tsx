// Libraries
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

// Interfaces
import { IStores } from '../stores'

// Definitions
interface IProps {
  children: any
}
interface IInjectedProps extends IProps {
  stores: IStores
}

// Styles
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`

// Page
const Wrapper = ({ children }: IProps) => children

@inject('stores')
@observer
class Layout extends React.Component<{}, {}> {
  get injected() {
    return this.props as IInjectedProps
  }

  public render() {
    const { children } = this.props

    return (
      <Wrapper>
        <header>
          <h1>React site</h1>
          <Nav>
            <a onClick={this.showHomepage}>Home</a>
            <a onClick={this.show404}>Not Found</a>
          </Nav>
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </Wrapper>
    )
  }

  private showHomepage = () => this.injected.stores.viewStore.showHomepage()
  private show404 = () => this.injected.stores.viewStore.show404()
}

// Exports
export default Layout
