// Dependencies
import React from 'react'
import { shallow } from 'enzyme'

// Component
import Button from './'

// Tests
it('renders without crashing', () => {
  shallow(<Button>Name</Button>)
})
