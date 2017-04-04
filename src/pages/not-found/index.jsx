// Dependencies
import React, {Component} from 'react';
import {css} from 'aphrodite/no-important';

// Components
import Layout from 'pages/layout';

// Styles
import style from './style';

// Page
class NotFound extends Component {
  render() {
    return (
      <Layout>
        <main>
          <h1 className={css(style.header)}>Page not found</h1>
        </main>
      </Layout>
    );
  }
}

// Exports
export default NotFound;
