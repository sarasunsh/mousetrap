'use strict';

import { combineReducers } from 'redux';

import mice from './allMice';
import currentMouse from './singleMouse';
import exptArms from './experiment';
// import dogs from './analytics';

const rootReducer = combineReducers({
  mice,
  currentMouse,
  exptArms
  // dogs
});

export default rootReducer;

