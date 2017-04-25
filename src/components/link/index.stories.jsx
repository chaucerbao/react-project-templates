// Dependencies
import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

// Component
import Link from './'

// Stories
storiesOf('Link', module)
  .add('Internal link', () => (
    <Link to='/' onClick={action('internal-link')}>
      Internal link
    </Link>
  ))
  .add('External link', () => (
    <Link to='http://google.com/' onClick={action('external-link')}>
      External link
    </Link>
  ))
