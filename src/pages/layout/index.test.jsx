// Dependencies
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {StyleSheetTestUtils} from 'aphrodite';

// Page
import Page from './';

// Usage
import router from 'react-router-dom';
import stores from 'stores';
const Layout = props => (
  <Provider router={router} stores={stores}>
    <Page {...props}>
      {props.children}
    </Page>
  </Provider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

// Setup and cleanup
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  return new Promise(resolve => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    return process.nextTick(resolve);
  });
});

// Tests
it('renders without crashing', () => {
  ReactDOM.render(
    <Layout>
      Content
    </Layout>,
    document.createElement('div')
  );
});
