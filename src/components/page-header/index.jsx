// Dependencies
import styled from 'styled-components'

// Styles
import { blue, silver, tabletWidth } from 'styles/variables'

// Component
export default styled.h1`
  margin: 0;
  background: ${silver};
  padding: 50px calc((100% - ${tabletWidth}) / 2);
  text-align: center;
  color: ${blue};
`
