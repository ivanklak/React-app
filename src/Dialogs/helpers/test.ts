import thunk from 'redux-thunk';
import {applyMiddleware, createStore as createReduxStore} from 'redux';

import {reducers} from '../../App/redux-store';

export const createStore = () => {
  const middlewares = [thunk];

  return createReduxStore(reducers, applyMiddleware(...middlewares));
};
