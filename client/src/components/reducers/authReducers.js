//import Auth Actions
import {AUTHORIZE_USER, AUTHORIZE_ERROR, AUTHORIZE_USER_UPDATE, USER_LOGOUT} from '../actions/authActions';

const initialState = {
	user: null,
	error: null,
	token: null
}

const AuthUserReducer = (state = initialState, action) => {
	switch(action.type){
		case AUTHORIZE_USER:
			return{
				...state,
				user: action.user,
				token: action.token
			}

		case AUTHORIZE_ERROR:
			return{
				...state,
				error: action.error
			}

		case AUTHORIZE_USER_UPDATE:
			return{
				...state,
				user: action.user,
				token: action.token
			}

		case USER_LOGOUT:
			return initialState;

		default:
		return state;
	}
}
export default AuthUserReducer;