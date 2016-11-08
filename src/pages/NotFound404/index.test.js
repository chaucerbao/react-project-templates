/* eslint-env mocha */

// Dependencies
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'

// Component
import NotFound404 from './index'

describe('<NotFound404 />', () => {
  let instance

  before(() => {
    instance = shallow(<NotFound404 />)
  })

  it('renders', () => {
    assert.ok(instance.containsMatchingElement(<h1>Not found</h1>))
  })
})
