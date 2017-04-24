// Third-party dependencies
import React from 'react';
import {inject} from 'mobx-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Component
const SmartLink = ({router, ...props}) => {
  const isExternal = /^\w+:\/\//.test(props.to);
  const StyledLink = (isExternal ? styled.a : styled(router.Link))``;

  const transformedProps = isExternal ?
    Object.assign({}, props, {
      to: undefined,
      href: props.to,
      target: '_blank'
    }) :
    props;

  return <StyledLink {...transformedProps}/>;
};

// Property validation
SmartLink.propTypes = {
  router: PropTypes.shape({
    Link: PropTypes.func.isRequired
  }).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

// Exports
export default inject('router')(SmartLink);
