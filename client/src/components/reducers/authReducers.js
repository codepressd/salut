//import Auth Actions
import {AUTHORIZE_USER, AUTHORIZE_ERROR, AUTHORIZE_USER_UPDATE, USER_LOGOUT, TOGGLE_USER_MENU, CHANGE_PASSWORD_ERROR, USER_TOKEN_SUCCESS, USER_RESET_FETCH, NO_TOKEN_FAIL, USER_TOKEN_FAIL, NOT_AUTHORIZED} from '../actions/authActions';
import {UPDATE_CART, REMOVE_PRODUCT_FROM_CART, RESET_CART} from '../actions/productActions.js';

const initialState = {
	user: null,
	menu: false,
	error: null,
	expiretime: false,
	message:'',
	userIsFetching: true,
	success: false,
	cart: [],
	token: null
}

const AuthUserReducer = (state = initialState, action) => {
	
	switch(action.type){
		case AUTHORIZE_USER:
			return{
				...state,
				user: action.user,
				token: action.token, 
				success: action.success,
				userIsFetching: false
			}

		case AUTHORIZE_ERROR:
			return{
				...state,
				error: action.error
			}
		case USER_RESET_FETCH:
			return{
				...state,
				userIsFetching: true,
				success: false,
				menu: false
			}

		case AUTHORIZE_USER_UPDATE:
			return{
				...state,
				user: action.user,
				token: action.token
			}


		case USER_LOGOUT:
			return initialState;

		case TOGGLE_USER_MENU:

			return {
				...state, 
				menu: action.toggle
			}


		case USER_TOKEN_SUCCESS:
			return{
				...state,
				expireTime: action.expireTime,
				success: action.success,
				userIsFetching: false
			}

		case USER_TOKEN_FAIL:
			return{
				...state,
				token: action.token,
				message: action.message,
				user: action.user,
				success: action.success,
				userIsFetching: false
			}

		case NO_TOKEN_FAIL:
			return{
				...state,
				success: action.success,
				message: action.message,
				userIsFetching: false
			}

		case NOT_AUTHORIZED:
			return{
				...state,
				success: action.success,
				message: action.message,
				userIsFetching: false
			}


		case CHANGE_PASSWORD_ERROR:
			return{
				...state,
				error: action.error
			}

		case UPDATE_CART:
			
			return{
				...state,
				cart: action.product
					
			}

		case REMOVE_PRODUCT_FROM_CART:
			
			return{
				...state,
				cart: [
					...state.cart.slice(0,action.index),
					...state.cart.slice(action.index +1)

				]
			}

		case RESET_CART:
			
			return{
				...state,
				cart: []
			}

		default:
		return state;
	}
}
export default AuthUserReducer;