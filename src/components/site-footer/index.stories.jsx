// Third-party dependencies
import React from 'react'
import {storiesOf} from '@kadira/storybook'

// Component
import SiteFooter from './'

// Stories
storiesOf('SiteFooter', module).add('Default', () => (
  <SiteFooter>
    This is the site footer
  </SiteFooter>
))
