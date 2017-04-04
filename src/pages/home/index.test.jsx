// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router';
import {Provider} from 'mobx-react';
import {StyleSheetTestUtils} from 'aphrodite';

// Page
import Page from './';

// Usage
import * as router from 'react-router-dom';
import stores from 'stores';
const Home = props => (
  <MemoryRouter>
    <Provider router={router} stores={stores}>
      <Page {...props}/>
    </Provider>
  </MemoryRouter>
);

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
  ReactDOM.render(<Home/>, document.createElement('div'));
});
