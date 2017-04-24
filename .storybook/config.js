import {configure, addDecorator} from '@kadira/storybook'
import React from 'react'
import {MemoryRouter, Route, Link, NavLink, Redirect} from 'react-router-dom'
import {Provider} from 'mobx-react'

// Provided router components
const router = {
  Route,
  Link,
  NavLink,
  Redirect
}

const requireContext = require.context(
  '../src/components',
  true,
  /.stories.jsx?$/
)

addDecorator(story => (
  <MemoryRouter>
    <Provider router={router}>
      {story()}
    </Provider>
  </MemoryRouter>
))

configure(() => {
  requireContext.keys().forEach(filename => requireContext(filename))
}, module)
