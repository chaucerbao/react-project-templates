// Libraries
import * as React from 'react'
import styled from 'styled-components'

// Components
import Link from '../components/link'

// Definitions
interface IProps {
  children: any
}

// Styles
const Nav = styled.nav`
  display: flex;
  flex-direction: row;
`
const NavLink = styled(Link)`
  transition: background-color 0.2s, color 0.2s;
  border: 1px solid gray;
  padding: 10px;
  text-decoration: none;
  color: dimgray;

  &:not(:first-of-type) {
    margin-left: 10px;
  }

  &:hover {
    background-color: gray;
    color: white;
  }
`

// Page
const Wrapper = ({ children }: IProps) => children
const Layout = ({ children }: IProps) => (
  <Wrapper>
    <header>
      <h1>React site</h1>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/page-not-found">Not Found (404)</NavLink>
      </Nav>
    </header>
    <main>{children}</main>
    <footer>Footer</footer>
  </Wrapper>
)

// Exports
export default Layout
