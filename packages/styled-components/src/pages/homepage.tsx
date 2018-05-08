// Dependencies
import React from 'react'
import styled from 'styled-components'

// Page
export default () => (
  <>
    <Header>
      <Site>Website</Site>
      <Menu>
        <Link href="#">Item 1</Link>
        <Link href="#">Item 2</Link>
        <Link href="#">Item 3</Link>
      </Menu>
    </Header>
    <Body>
      <h1>Homepage</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </Body>
    <Footer>&copy; {new Date().getFullYear()} Copyright</Footer>
  </>
)

// Styles
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacer.md};
  color: ${({ theme }) => theme.colors.white};
`

const Site = styled.h1`
  margin: 0;
`

const Menu = styled.nav`
  background: ${({ theme }) => theme.colors.primary};
`

const Link = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    text-decoration: underline;
  }

  &:not(:first-child) {
    margin-left: ${({ theme }) => theme.spacer.sm};
  }
`

const Body = styled.main`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacer.md};
`

const Footer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacer.md};
  color: ${({ theme }) => theme.colors.white};
`
