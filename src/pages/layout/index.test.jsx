// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router';
import {Provider} from 'mobx-react';
import PropTypes from 'prop-types';

// Page
import Page from './';

// Usage
import * as router from 'react-router-dom';
import stores from 'stores';
const Layout = props => (
  <MemoryRouter>
    <Provider router={router} stores={stores}>
      <Page {...props}>
        {props.children}
      </Page>
    </Provider>
  </MemoryRouter>
);

// Property validation
Layout.propTypes = {
  children: PropTypes.node.isRequired
};

// Tests
it('renders without crashing', () => {
  ReactDOM.render(
    <Layout>
      Content
    </Layout>,
    document.createElement('div')
  );
});
