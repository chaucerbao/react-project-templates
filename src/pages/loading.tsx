// Libraries
import * as React from 'react'
import styled from 'styled-components'

// Components
import Layout from './layout'

// Styles
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

// Page
const Loading = () => (
  <Layout>
    <Box>Loading...</Box>
  </Layout>
)

// Exports
export default Loading
