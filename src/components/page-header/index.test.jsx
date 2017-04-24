// Styles
import React from 'react';
import {shallow} from 'enzyme';

// Component
import PageHeader from './';

// Tests
it('renders without crashing', () => {
  shallow(<PageHeader>Content</PageHeader>);
});
