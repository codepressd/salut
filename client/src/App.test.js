import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {configureStore} from './store';
import { syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} history={history} />, div);
});
