// Third-party dependencies
import React from 'react'
import * as router from 'react-router-dom'
import {storiesOf} from '@kadira/storybook'

// Component
import Layout from './'

// Mocks
const {MemoryRouter} = router

// Stories
storiesOf('Layout', module)
  .addDecorator(story => (
    <MemoryRouter>
      {story()}
    </MemoryRouter>
  ))
  .add('Default', () => (
    <Layout router={router}>
      This is the layout
    </Layout>
  ))
