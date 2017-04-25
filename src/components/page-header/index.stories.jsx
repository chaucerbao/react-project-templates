// Dependencies
import React from 'react'
import {storiesOf} from '@kadira/storybook'

// Component
import PageHeader from './'

// Stories
storiesOf('PageHeader', module).add('Default', () => (
  <PageHeader>
    This is the page header
  </PageHeader>
))
