// Dependencies
import React, {Component, PropTypes} from 'react';
import {css} from 'aphrodite/no-important';

// Styles
import style from './style';

// Page
class Layout extends Component {
  render() {
    return (
      <div className={css(style.layout, this.props.css)}>
        <header/>
        {this.props.children}
        <footer/>
      </div>
    );
  }
}

// Property validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  css: PropTypes.object
};

Layout.defaultProps = {
  css: undefined
};

// Exports
export default Layout;
