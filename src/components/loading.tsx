// Third-party dependencies
import * as React from 'react'
import styled from 'styled-components'

// Type definitions
interface IProps {
  children?: any
}

// Component
const Loading = ({ children = 'Loading...' }: IProps) => <Box>{children}</Box>

// Styles
const Box = styled.section`
  display: flex;
`

// Exports
export default Loading
