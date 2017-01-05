//import Auth Actions
import {AUTHORIZE_USER, AUTHORIZE_ERROR, AUTHORIZE_USER_UPDATE, USER_LOGOUT} from '../actions/authActions';
import {UPDATE_CART, REMOVE_PRODUCT_FROM_CART, RESET_CART} from '../actions/productActions.js';

const initialState = {
	user: null,
	error: null,
	cart: [],
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