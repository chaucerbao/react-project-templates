// Dependencies
import styled from 'styled-components'

// Components
import SmartButton from './smart-button'

// Styles
import {gray} from 'styles/variables'

// Component
export default styled(SmartButton)`
  border: 0;
  background: ${gray};
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;
`
