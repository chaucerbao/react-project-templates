// Third-party dependencies
import React from 'react'
import {shallow} from 'enzyme'

// Component
import SiteFooter from './'

// Tests
it('renders without crashing', () => {
  shallow(<SiteFooter>Content</SiteFooter>)
})
