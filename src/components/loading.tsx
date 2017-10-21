// Libraries
import * as React from 'react'
import styled from 'styled-components'

// Definitions
interface IProps {
  children?: any
}

// Styles
const Box = styled.section`
  display: flex;
`

// Page
const Loading = ({ children = 'Loading...' }: IProps) => <Box>{children}</Box>

// Exports
export default Loading
