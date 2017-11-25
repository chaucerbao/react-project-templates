// Third-party dependencies
import * as React from 'react'
import styled from 'styled-components'

// Components
import { Link } from '../components/link'

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
  background-color: ${props => props.theme.darkgray};
  padding: 32px 0;
  text-align: center;
`
const TitleLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.white};
`
const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.lightblue};
`
const NavLink = styled(Link)`
  transition: background-color 0.2s, color 0.2s;
  margin: 10px 20px;
  text-decoration: none;
  color: ${props => props.theme.white};

  &:not(:first-of-type) {
    margin-left: 10px;
  }

  &:hover {
    color: ${props => props.theme.lightgray};
  }
`
const Footer = styled.footer`
  background-color: ${props => props.theme.darkgray};
  padding: 10px 20px;
  color: ${props => props.theme.white};
`

// Exports
export default Layout
