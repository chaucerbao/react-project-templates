/* eslint-env mocha */

// Dependencies
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'

// Component
import Application from './index'

describe('<Application />', () => {
  let instance

  before(() => {
    instance = shallow(<Application />)
  })

  it('renders', () => {
    assert.ok(instance.containsMatchingElement(<header>Site Header</header>))
  })
})
