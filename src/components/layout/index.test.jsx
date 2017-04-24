// Dependencies
import React from 'react';
import {shallow} from 'enzyme';

// Component
import Layout from './';

// Usage
import * as router from 'react-router-dom';

// Tests
it('renders without crashing', () => {
  shallow(<Layout router={router}>Children</Layout>);
});