import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';

import {reducers} from '../../App/redux-store';

export const reduxStore = () => {
  const middlewares = [thunk];

  return createStore(reducers, applyMiddleware(...middlewares));
};
