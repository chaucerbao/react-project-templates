// Dependencies
import styled, {css} from 'styled-components';

// Imported styles
import {yellow, black, tabletWidth} from 'styles/variables';

// Styles
export const SiteHeader = styled.header`
  background: ${black};
  padding: 20px calc((100% - ${tabletWidth}) / 2);
`;

export const SiteFooter = styled.footer`
  background: ${black};
  padding: 20px calc((100% - ${tabletWidth}) / 2);
  color: white;
`;

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
`;
