// Dependencies
import styled from 'styled-components'

// Styles
import {black, tabletWidth} from 'styles/variables'

// Component
export default styled.footer`
  background: ${black};
  padding: 20px calc((100% - ${tabletWidth}) / 2);
  color: white;
`
