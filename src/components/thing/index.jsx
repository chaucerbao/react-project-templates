// Dependencies
import React from 'react';
import {css} from 'aphrodite/no-important';

// Styles
import style from './style';

// Component
const Thing = () => {
  return <div className={css(style.thing)}>This is the thing component</div>;
};

// Exports
export default Thing;
