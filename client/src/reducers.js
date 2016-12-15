/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers

import ActiveUser from './components/reducers/authReducers';

// Combine all reducers into one root reducer
export default combineReducers({
  ActiveUser,
});
