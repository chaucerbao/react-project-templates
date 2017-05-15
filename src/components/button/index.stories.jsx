// Dependencies
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import styled from 'styled-components'

// Component
import Button from './'

// Styles
const Item = styled.div`
  display: inline-block;
  margin: 0 10px;
`

// Stories
storiesOf('Button', module).add('Neutral', () => (
  <div>
    <Item>
      <Button onClick={action('regular-button')}>Regular button</Button>
    </Item>
    <Item>
      <Button to='/' onClick={action('link-button-internal')}>
        Link button (internal)
      </Button>
    </Item>
    <Item>
      <Button to='http://google.com/' onClick={action('link-button-external')}>
        Link button (external)
      </Button>
    </Item>
  </div>
))
