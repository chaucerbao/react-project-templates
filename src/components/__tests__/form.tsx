// Third-party dependencies
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

// Local dependencies
import theme from '../../styles/theme'

// Component
import { Checkbox, Input, Radio, Select, TextArea } from '../form'

describe('<Input />', () => {
  it('renders', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Input
            label="Label"
            name="name"
            value="Value"
            error="Error message"
          />
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })
})

describe('<TextArea />', () => {
  it('renders', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <TextArea
            label="Label"
            name="name"
            value="Value"
            error="Error message"
          />
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })
})

describe('<Select />', () => {
  it('renders', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Select
            label="Label"
            name="name"
            value="two"
            options={[
              { label: 'Option 1', value: 'one' },
              { label: 'Option 2', value: 'two' },
              { label: 'Option 3', value: 'three' }
            ]}
            error="Error message"
          />
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })
})

describe('<Checkbox />', () => {
  it('renders', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Checkbox
            label="Label"
            name="name"
            value={['one', 'three']}
            options={[
              { label: 'Option 1', value: 'one' },
              { label: 'Option 2', value: 'two' },
              { label: 'Option 3', value: 'three' }
            ]}
            error="Error message"
          />
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })
})

describe('<Radio />', () => {
  it('renders', () => {
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Radio
            label="Label"
            name="name"
            value="two"
            options={[
              { label: 'Option 1', value: 'one' },
              { label: 'Option 2', value: 'two' },
              { label: 'Option 3', value: 'three' }
            ]}
            error="Error message"
          />
        </ThemeProvider>
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })
})
