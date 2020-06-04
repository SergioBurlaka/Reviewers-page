
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const middlewares = [thunkMiddleware];

const composeEnhancers = composeWithDevTools({});
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares)),
);



export default store