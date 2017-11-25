// Third-party dependencies
import * as React from 'react'
import styled from 'styled-components'

// Type definitions
interface IProps {
  children?: any
}

// Component
const Loading = ({ children = 'Loading...' }: IProps) => (
  <section>{children}</section>
)

// Styles
const StyledLoading = styled(Loading)`
  display: flex;
`

// Exports
export default StyledLoading
