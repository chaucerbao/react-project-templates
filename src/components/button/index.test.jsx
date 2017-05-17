// Dependencies
import React from 'react'
import { shallow } from 'enzyme'

// Component
import Button from './styled'

// Tests
it('renders without crashing', () => {
  shallow(<Button>Name</Button>)
})
