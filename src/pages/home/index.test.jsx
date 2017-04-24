// Third-party dependencies
import React from 'react'
import {shallow} from 'enzyme'

// Page
import Home from './'

// Mocks
import stores from 'stores'

// Tests
it('renders without crashing', () => {
  shallow(<Home stores={stores} />)
})
