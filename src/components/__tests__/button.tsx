// Third-party dependencies
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

// Local dependencies
import theme from '../../styles/theme'

// Component
import Button, { LinkButton } from '../button'

// Mocks
const stores = {}

describe('<Button />', () => {
  it('renders a neutral Button', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Button>Button Text</Button>
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it('renders a disabled, neutral Button', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Button disabled={true}>Button Text</Button>
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it('renders a primary Button', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Button primary={true}>Button Text</Button>
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it('renders a disabled, primary Button', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Button primary={true} disabled={true}>
            Button Text
          </Button>
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })
})

describe('<LinkButton />', () => {
  it('renders a neutral LinkButton', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <LinkButton to="/url" stores={stores}>
            Button Text
          </LinkButton>
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it('renders a disabled, neutral LinkButton', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <LinkButton to="/url" disabled={true} stores={stores}>
            Button Text
          </LinkButton>
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it('renders a primary LinkButton', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <LinkButton to="/url" primary={true} stores={stores}>
            Button Text
          </LinkButton>
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it('renders a disabled, primary LinkButton', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <LinkButton to="/url" primary={true} disabled={true} stores={stores}>
            Button Text
          </LinkButton>
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })
})
