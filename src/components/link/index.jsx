// Third-party dependencies
import React from 'react';
import {inject} from 'mobx-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styles
import {aqua} from 'styles/variables';

// Component
const Link = ({router, ...props}) => {
  const isExternal = /^\w+:\/\//.test(props.to);
  const StyledLink = (isExternal ? styled.a : styled(router.Link))`
    color: ${aqua};
  `;

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
Link.propTypes = {
  router: PropTypes.shape({
    Link: PropTypes.func.isRequired
  }).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

// Exports
export default inject('router')(Link);
