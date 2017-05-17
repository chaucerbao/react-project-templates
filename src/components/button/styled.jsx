// Dependencies
import styled from 'styled-components'

// Component
import Button from './'

// Styles
import { gray } from 'styles/variables'

// Component
export default styled(Button)`
  border: 0;
  background: ${gray};
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
`
