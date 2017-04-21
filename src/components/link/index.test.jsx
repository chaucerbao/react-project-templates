// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Page
import Link from './';

// Tests
it('renders without crashing', () => {
  ReactDOM.render(<Link to="/">Name</Link>, document.createElement('div'));
});
