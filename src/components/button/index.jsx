// Third-party dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

// Components
import SmartLink from 'components/link/smart-link';

// Styles
import {gray} from 'styles/variables';
const buttonStyle = css`
  background: ${gray};
`;

// Component
const Button = props => {
  const isLink = Boolean(props.to);
  const StyledButton = (isLink ?
    styled(SmartLink) :
    styled.button)`${buttonStyle}`;

  return <StyledButton {...props}/>;
};

// Property validation
Button.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

// Exports
export default Button;
