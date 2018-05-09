// Dependencies
import React from 'react'
import styled from 'styled-components'

// Styles
import { color, has, spacer } from '../styles/utils'

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

      <Buttons>
        <Button primary>Primary</Button>
        <Button>Regular</Button>
        <Button disabled>Disabled</Button>
      </Buttons>
    </Body>
    <Footer>&copy; {new Date().getFullYear()} Copyright</Footer>
  </>
)

// Styled Components
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${color('grey')};
  background: ${color('primary')};
  padding: ${spacer('md')};
  color: ${color('white')};
`

const Site = styled.h1`
  margin: 0;
`

const Menu = styled.nav`
  background: ${color('primary')};
`

const Link = styled.a`
  text-decoration: none;
  color: ${color('white')};

  &:hover {
    text-decoration: underline;
  }

  &:not(:first-child) {
    margin-left: ${spacer('sm')};
  }
`

const Body = styled.main`
  background: ${color('white')};
  padding: ${spacer('md')};
`

const Buttons = styled.section`
  display: flex;
  justify-content: space-around;
`

const Button = styled.button`
  border-radius: 4px;
  cursor: pointer;
  padding: ${spacer('sm')} ${spacer('lg')};

  /* Primary */
  ${has('primary')`
    background: ${color('primary')};
    color: ${color('white')};
  `}

  /* Disabled */
  ${has('disabled')`
    opacity: .5;
    cursor: not-allowed;
  `}
`

const Footer = styled.footer`
  border-top: 1px solid ${color('grey')};
  background: ${color('primary')};
  padding: ${spacer('md')};
  color: ${color('white')};
`
