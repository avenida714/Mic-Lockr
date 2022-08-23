//frontend/src/store/index.js

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import micReducer from './mics';

//PHASE 1 LOGIN FORM PAGE

import sessionReducer from './session';

const rootReducer = combineReducers({
  session: sessionReducer,
  mics: micReducer
});



let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

/**NOTE before phase1 of part 2 frontend:
"You can now remove the POST /api/test test route in your backend code, as you won't be needing it anymore."   -- what is this?
 */
