import {combineReducers} from 'redux';

import global from './global';
import error from './error';
import days from './days';
import things from './things';

const reducer = combineReducers({
  global,
  error,
  days,
  things,
});

export default reducer;
