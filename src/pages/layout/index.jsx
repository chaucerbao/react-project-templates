// Dependencies
import React, {Component, PropTypes} from 'react';
import {inject} from 'mobx-react';
import {css} from 'aphrodite/no-important';

// Styles
import style from './style';

// Page
class Layout extends Component {
  render() {
    const {NavLink} = this.props.router;

    return (
      <div className={css(style.layout)}>
        <header>
          <nav role="navigation">
            <NavLink exact to="/" activeClassName={css(style.activeLink)}>
              Home
            </NavLink>
            <NavLink
              to="/does-not-exist"
              activeClassName={css(style.activeLink)}
              >
              Not Found
            </NavLink>
          </nav>
        </header>
        {this.props.children}
        <footer/>
      </div>
    );
  }
}

// Property validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({
    NavLink: PropTypes.func.isRequired
  }).isRequired
};

// Exports
export default inject('router')(Layout);
