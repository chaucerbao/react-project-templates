// Libraries
import * as React from 'react'
import styled from 'styled-components'

// Components
import Layout from './layout'

// Styles
const Box = styled.section`
  padding: 20px;
`

// Page
const NotFound = () => (
  <Layout>
    <Box>Page not found (404)</Box>
  </Layout>
)

// Exports
export default NotFound
