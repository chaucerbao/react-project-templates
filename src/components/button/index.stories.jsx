// Third-party dependencies
import React from 'react'
import * as router from 'react-router-dom'
import {storiesOf, action} from '@kadira/storybook'

// Component
import Button from './'

// Mocks
const {MemoryRouter} = router

// Stories
storiesOf('Button', module)
  .addDecorator(story => (
    <MemoryRouter>
      {story()}
    </MemoryRouter>
  ))
  .add('Default', () => (
    <Button onClick={action('regular-button')}>Regular button</Button>
  ))
  .add('Internal link', () => (
    <Button to='/' router={router} onClick={action('link-button-internal')}>
      Link button (internal)
    </Button>
  ))
  .add('External link', () => (
    <Button
      to='http://google.com/'
      router={router}
      onClick={action('link-button-external')}
    >
      Link button (external)
    </Button>
  ))
