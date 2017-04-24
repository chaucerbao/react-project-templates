// Third-party dependencies
import React from 'react';
import {shallow} from 'enzyme';

// Page
import NotFound from './';

// Tests
it('renders without crashing', () => {
  shallow(<NotFound/>);
});
