/**
 * Main store function
 */
 import {routerMiddleware} from 'react-router-redux';
 import {browserHistory} from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './pages/App/components/DevTools';
import rootReducer from './reducers';

import {loadUserState, saveUserState} from './components/localStorage';


export function configureStore() {


const persistedUserState = loadUserState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory);

  // Middleware and store enhancers
  const enhancers = composeEnhancers(
    applyMiddleware(thunk, routingMiddleware),
  );

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  const store = createStore(rootReducer, persistedUserState, enhancers);

//persist state

store.subscribe(() => {
  saveUserState({
    ActiveUser: store.getState().ActiveUser
  });
});

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
