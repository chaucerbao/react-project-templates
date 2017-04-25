// Dependencies
import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

// Component
import Button from './'

// Stories
storiesOf('Button', module).add('Neutral', () => (
  <div style={{display: 'flex', justifyContent: 'space-around'}}>
    <Button onClick={action('regular-button')}>Regular button</Button>
    <Button to='/' onClick={action('link-button-internal')}>
      Link button (internal)
    </Button>
    <Button to='http://google.com/' onClick={action('link-button-external')}>
      Link button (external)
    </Button>
  </div>
))
