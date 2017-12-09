// Third-party dependencies
import * as React from 'react'
import * as renderer from 'react-test-renderer'

// Component
import Loading from '../loading'

describe('<Loading />', () => {
  it('renders', () => {
    const component = renderer.create(<Loading />).toJSON()

    expect(component).toMatchSnapshot()
  })
})
