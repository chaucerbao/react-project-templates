// Dependencies
import React from 'react'
import { MemoryRouter, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { configure, addDecorator } from '@kadira/storybook'

// Global styles
import 'normalize.css/normalize.css'
import 'styles/global'

// Require context
const requireContext = require.context(
  '../src/components',
  true,
  /.stories.jsx?$/
)

// Provided router components
const router = {
  Route,
  Link,
  NavLink,
  Redirect
}

// Decorate all stories
addDecorator(story => (
  <MemoryRouter>
    <Provider router={router}>
      <div style={{ margin: '8px' }}>{story()}</div>
    </Provider>
  </MemoryRouter>
))

// Load stories
configure(() => {
  requireContext.keys().forEach(filename => requireContext(filename))
}, module)
