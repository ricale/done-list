import {combineReducers} from 'redux';

import global from './global';
import days from './days';
import things from './things';

const reducer = combineReducers({
  global,
  days,
  things,
});

export default reducer;
