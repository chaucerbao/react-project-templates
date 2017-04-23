// Dependencies
import React from 'react';
import {shallow} from 'enzyme';

// Component
import Thing from './';

// Tests
it('renders without crashing', () => {
  shallow(<Thing/>);
});
