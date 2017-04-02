// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {StyleSheetTestUtils} from 'aphrodite';

// Page
import Home from './';

// Mocks
const stores = {
  user: {
    all: [],
    getAll: () => {}
  }
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
  ReactDOM.render(<Home stores={stores}/>, document.createElement('div'));
});