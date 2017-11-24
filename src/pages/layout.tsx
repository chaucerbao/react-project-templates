// Third-party dependencies
import * as React from 'react'
import styled from 'styled-components'

// Components
import Link from '../components/link'

// Type definitions
interface IProps {
  children: any
}

// Layout
const Wrapper = ({ children }: IProps) => children
const Layout = ({ children }: IProps) => (
  <Wrapper>
    <header>
      <Title>
        <TitleLink to="/">React project</TitleLink>
      </Title>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/page-not-found">Not Found (404)</NavLink>
      </Nav>
    </header>
    <main>{children}</main>
    <Footer>Footer</Footer>
  </Wrapper>
)

// Styles
const Title = styled.h1`
  margin: 0;
  background-color: #333;
  padding: 32px 0;
  text-align: center;
`
const TitleLink = styled(Link)`
  text-decoration: none;
  color: white;
`
const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  background-color: lightsteelblue;
`
const NavLink = styled(Link)`
  transition: background-color 0.2s, color 0.2s;
  margin: 10px 20px;
  text-decoration: none;
  color: white;

  &:not(:first-of-type) {
    margin-left: 10px;
  }

  &:hover {
    color: gainsboro;
  }
`
const Footer = styled.footer`
  background-color: #333;
  padding: 10px 20px;
  color: white;
`

// Exports
export default Layout
