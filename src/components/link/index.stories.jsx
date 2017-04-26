// Dependencies
import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import styled from 'styled-components'

// Component
import Link from './'

// Styles
const Item = styled.div`
  display: inline-block;
  margin: 0 10px;
`

// Stories
storiesOf('Link', module).add('Default', () => (
  <div>
    <Item>
      <Link to='/' onClick={action('internal-link')}>Internal link</Link>
    </Item>
    <Item>
      <Link to='http://google.com/' onClick={action('external-link')}>
        External link
      </Link>
    </Item>
  </div>
))
