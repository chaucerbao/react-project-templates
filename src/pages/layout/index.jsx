// Dependencies
import React, {Component, PropTypes} from 'react';
import {inject} from 'mobx-react';
import styled from 'styled-components';

// Styles
import {SiteHeader, SiteFooter, menuItem} from './style';

// Page
class Layout extends Component {
  render() {
    const {Link} = this.props.router;
    const MenuItem = styled(Link)`${menuItem}`;

    return (
      <div>
        <SiteHeader>
          <nav role="navigation">
            <MenuItem to="/">
              Home
            </MenuItem>
            <MenuItem to="/does-not-exist">
              Not found
            </MenuItem>
          </nav>
        </SiteHeader>
        {this.props.children}
        <SiteFooter>
          The end
        </SiteFooter>
      </div>
    );
  }
}

// Property validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({
    Link: PropTypes.func.isRequired
  }).isRequired
};

// Exports
export default inject('router')(Layout);
