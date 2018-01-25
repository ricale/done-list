import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from 'reducers';
import Navigator from './Navigator';

const middleware = (e =>
  applyMiddleware(
    thunkMiddleware,
    (e !== 'production' ? logger : undefined)
  )
)(process.env.NODE_ENV);

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware
);

const DoneListApp = (props) => (
  <Provider store={store}>
    <Navigator store={store} />
  </Provider>
);

export default DoneListApp;
