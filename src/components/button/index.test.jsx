// Third-party dependencies
import React from 'react';
import {shallow} from 'enzyme';

// Component
import Button from './';

// Mocks
import * as router from 'react-router-dom';

// Tests
it('renders without crashing', () => {
  shallow(<Button>Name</Button>);
});
