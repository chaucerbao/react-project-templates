// Libraries
import * as React from 'react'
import styled from 'styled-components'

// Components
import Layout from './layout'

// Definitions
interface IProps {
  children: any
}

// Styles
const Box = styled.section`
  padding: 20px;
`

// Page
const NotFound = ({ children }: IProps) => (
  <Layout>
    <Box>Page not found (404)</Box>
  </Layout>
)

export default NotFound
