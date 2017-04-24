// Third-party dependencies
import React from 'react'
import * as router from 'react-router-dom'
import {storiesOf, action} from '@kadira/storybook'

// Component
import Link from './'

// Mocks
const {MemoryRouter} = router

// Stories
storiesOf('Link', module)
  .add('Internal link', () => (
    <MemoryRouter>
      <Link to='/' router={router} onClick={action('internal-link')}>
        Internal link
      </Link>
    </MemoryRouter>
  ))
  .add('External link', () => (
    <Link
      to='http://google.com/'
      router={router}
      onClick={action('external-link')}
    >
      External link
    </Link>
  ))
