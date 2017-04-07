// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Page
import Thing from './';

// Tests
it('renders without crashing', () => {
  ReactDOM.render(<Thing/>, document.createElement('div'));
});
