/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers

import ActiveUser from './components/reducers/authReducers';
import Products from './components/reducers/productReducers';

// Combine all reducers into one root reducer
export default combineReducers({
  ActiveUser,
  Products,
});
