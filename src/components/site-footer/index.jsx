// Dependencies
import styled from 'styled-components';

// Imported styles
import {black, tabletWidth} from 'styles/variables';

// Styles
export default styled.footer`
  background: ${black};
  padding: 20px calc((100% - ${tabletWidth}) / 2);
  color: white;
`;
