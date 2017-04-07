// Dependencies
import styled from 'styled-components';

// Style helpers
import {blue, silver, tabletWidth} from 'styles/variables';

// Styles
export const PageHeader = styled.h1`
  margin: 0;
  background: ${silver};
  padding: 50px calc((100% - ${tabletWidth}) / 2);
  text-align: center;
  color: ${blue};
`;

export const PageBody = styled.section`
  padding: 50px calc((100% - ${tabletWidth}) / 2);
`;
