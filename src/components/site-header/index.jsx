// Third-party dependencies
import styled, {css} from 'styled-components'

// Styles
import {yellow, black, tabletWidth} from 'styles/variables'

// Component
export default styled.header`
  background: ${black};
  padding: 20px calc((100% - ${tabletWidth}) / 2);
`

export const menuItem = css`
  text-transform: capitalize;
  text-decoration: none;
  color: white;

  &:not(:first-of-type) {
    margin-left: 20px;
  }

  &:hover {
    text-decoration: underline;
    color: ${yellow};
  }
`
