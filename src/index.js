import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from 'reducers';
import Navigator from './Navigator';

const middlewares = [thunkMiddleware];
if(process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const appliedMiddleware = applyMiddleware(...middlewares);

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  appliedMiddleware
);

const DoneListApp = (props) => (
  <Provider store={store}>
    <Navigator store={store} />
  </Provider>
);

export default DoneListApp;
