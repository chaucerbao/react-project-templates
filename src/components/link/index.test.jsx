// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router';
import {Provider} from 'mobx-react';

// Component
import Component from './';

// Usage
import * as router from 'react-router-dom';
import stores from 'stores';
const Link = props => (
  <MemoryRouter>
    <Provider router={router} stores={stores}>
      <Component {...props}/>
    </Provider>
  </MemoryRouter>
);

// Tests
it('renders without crashing', () => {
  ReactDOM.render(<Link to="/">Name</Link>, document.createElement('div'));
});
