// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router';
import {Provider} from 'mobx-react';

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

// Tests
it('renders without crashing', () => {
  ReactDOM.render(<Home/>, document.createElement('div'));
});
