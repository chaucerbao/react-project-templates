// Third-party dependencies
import React from 'react'
import {storiesOf} from '@kadira/storybook'

// Component
import Layout from './'

// Stories
storiesOf('Layout', module).add('Default', () => (
  <Layout>
    This is the layout
  </Layout>
))
