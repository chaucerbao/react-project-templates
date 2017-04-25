// Dependencies
import React from 'react'
import {shallow} from 'enzyme'

// Component
import Link from './'

// Mocks
import * as router from 'react-router-dom'

// Tests
it('renders without crashing', () => {
  shallow(<Link to='/' router={router}>Name</Link>)
})
