/* eslint-env mocha */

// Dependencies
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'

// Component
import Homepage from './index'

describe('<Homepage />', () => {
  let instance

  before(() => {
    instance = shallow(<Homepage />)
  })

  it('renders', () => {
    assert.ok(instance.containsMatchingElement(<h1>Homepage</h1>))
  })
})
