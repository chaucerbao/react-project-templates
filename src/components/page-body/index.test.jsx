// Dependencies
import React from 'react'
import { shallow } from 'enzyme'

// Component
import PageBody from './'

// Tests
it('renders without crashing', () => {
  shallow(<PageBody>Content</PageBody>)
})
