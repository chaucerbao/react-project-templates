// Dependencies
import React, {PropTypes} from 'react';
import {inject} from 'mobx-react';
import styled from 'styled-components';

// Styles
import {aqua} from 'styles/variables';

// Component
const Link = ({router, external, ...props}) => {
  const StyledLink = (external ? styled.a : styled(router.Link))`
    color: ${aqua};
  `;

  const transformedProps = external ?
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
  external: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};
Link.defaultProps = {
  external: false
};

// Exports
export default inject('router')(Link);
