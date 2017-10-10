// Libraries
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// Definitions
interface IProps {
  children: any
}

// Styles
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`

// Page
const Wrapper = ({ children }: IProps) => children
const Layout = ({ children }: IProps) => (
  <Wrapper>
    <header>
      <h1>React site</h1>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/not-found">Not Found (404)</Link>
      </Nav>
    </header>
    <main>{children}</main>
    <footer>Footer</footer>
  </Wrapper>
)

export default Layout
