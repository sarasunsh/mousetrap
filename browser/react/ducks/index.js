'use strict';

import { combineReducers } from 'redux';

import mice from './allMice';
import currentMouse from './singleMouse';
import exptArms from './experiment';

const rootReducer = combineReducers({
  mice,
  currentMouse,
  exptArms
});

export default rootReducer;

