// Third-party dependencies
import { mount } from 'enzyme'
import { Provider } from 'mobx-react'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

// Local dependencies
import theme from '../../styles/theme'

// Component
import Link from '../link'

// Mocks
const stores = { viewStore: { goTo: jest.fn() } }

describe('<Link />', () => {
  it('renders an internal Link', () => {
    const component = renderer
      .create(
        <Provider stores={stores}>
          <ThemeProvider theme={theme}>
            <Link to="/url">Link Text</Link>
          </ThemeProvider>
        </Provider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it('renders an external Link', () => {
    const component = renderer
      .create(
        <Provider stores={stores}>
          <ThemeProvider theme={theme}>
            <Link to="http://domain/">Link Text</Link>
          </ThemeProvider>
        </Provider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it('renders an internal pop-up Link', () => {
    const component = renderer
      .create(
        <Provider stores={stores}>
          <ThemeProvider theme={theme}>
            <Link to="/url" target="_blank">
              Link Text
            </Link>
          </ThemeProvider>
        </Provider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it('renders an external pop-up Link', () => {
    const component = renderer
      .create(
        <Provider stores={stores}>
          <ThemeProvider theme={theme}>
            <Link to="http://domain/" target="_blank">
              Link Text
            </Link>
          </ThemeProvider>
        </Provider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
    expect(component!.props.rel).toBe('noopener')
  })

  it('renders an external pop-up Link with `rel` attribute overridden', () => {
    const component = renderer
      .create(
        <Provider stores={stores}>
          <ThemeProvider theme={theme}>
            <Link to="http://domain/" target="_blank" rel="nofollow">
              Link Text
            </Link>
          </ThemeProvider>
        </Provider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })
})

describe('<Link />', () => {
  beforeEach(() => {
    stores.viewStore.goTo.mockReset()
  })

  it('runs an onClick handler, and navigates', () => {
    const onClickHandler = jest.fn()
    const component = mount(
      <Provider stores={stores}>
        <ThemeProvider theme={theme}>
          <Link to="/url" onClick={onClickHandler}>
            Link Text
          </Link>
        </ThemeProvider>
      </Provider>
    )

    expect(onClickHandler.mock.calls.length).toBe(0)
    expect(stores.viewStore.goTo.mock.calls.length).toBe(0)

    component.simulate('click')

    expect(onClickHandler.mock.calls.length).toBe(1)
    expect(stores.viewStore.goTo.mock.calls.length).toBe(1)
    expect(stores.viewStore.goTo.mock.calls[0][0]).toBe('/url')
  })

  it('runs an onClick handler that returns false, and does not navigate', () => {
    const onClickHandler = jest.fn().mockReturnValue(false)
    const component = mount(
      <Provider stores={stores}>
        <ThemeProvider theme={theme}>
          <Link to="/url" onClick={onClickHandler}>
            Link Text
          </Link>
        </ThemeProvider>
      </Provider>
    )

    expect(onClickHandler.mock.calls.length).toBe(0)
    expect(stores.viewStore.goTo.mock.calls.length).toBe(0)

    component.simulate('click')

    expect(onClickHandler.mock.calls.length).toBe(1)
    expect(stores.viewStore.goTo.mock.calls.length).toBe(0)
  })

  it('does not run the onClick handler, nor navigate, if disabled', () => {
    const onClickHandler = jest.fn()
    const component = mount(
      <Provider stores={stores}>
        <ThemeProvider theme={theme}>
          <Link to="/url" disabled={true}>
            Link Text
          </Link>
        </ThemeProvider>
      </Provider>
    )

    expect(onClickHandler.mock.calls.length).toBe(0)
    expect(stores.viewStore.goTo.mock.calls.length).toBe(0)

    component.simulate('click')

    expect(onClickHandler.mock.calls.length).toBe(0)
    expect(stores.viewStore.goTo.mock.calls.length).toBe(0)
  })
})
