// Third-party dependencies
import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

// Component
import Button from './'

// Stories
storiesOf('Button', module)
  .add('Default', () => (
    <Button onClick={action('regular-button')}>Regular button</Button>
  ))
  .add('Internal link', () => (
    <Button to='/' onClick={action('link-button-internal')}>
      Link button (internal)
    </Button>
  ))
  .add('External link', () => (
    <Button to='http://google.com/' onClick={action('link-button-external')}>
      Link button (external)
    </Button>
  ))
