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

  it('renders children in the body', () => {
    const component = shallow(
      <Application>
        <h1>Hello world!</h1>
      </Application>
    )

    assert.ok(component.containsMatchingElement(<main><h1>Hello world!</h1></main>))
  })
})
