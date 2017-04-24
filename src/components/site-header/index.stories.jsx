// Third-party dependencies
import React from 'react'
import {storiesOf} from '@kadira/storybook'

// Component
import SiteHeader from './'

// Stories
storiesOf('SiteHeader', module).add('Default', () => (
  <SiteHeader>
    This is the site header
  </SiteHeader>
))
