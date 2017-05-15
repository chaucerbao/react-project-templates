// Dependencies
import React from 'react'
import { shallow } from 'enzyme'

// Component
import SiteHeader from './'

// Tests
it('renders without crashing', () => {
  shallow(<SiteHeader>Content</SiteHeader>)
})
