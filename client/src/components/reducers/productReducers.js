import {GRAB_SUPPLIER_PRODUCTS, REMOVE_PRODUCT, GET_ALL_PRODUCTS, PUSH_SINGLE_PRODUCT, UPDATE_CART, RESET_FETCH, ORDERS_TO_STORE} from '../actions/productActions';

const initialState ={
	Products: [],
	isFetching: true
}

const ProductReducer = (state=initialState, action) => {

	switch(action.type){
		case GRAB_SUPPLIER_PRODUCTS:
			return{
				...state,
				Products: action.Products
			}

		case REMOVE_PRODUCT:

			return{
				...state,
				Products: [
					...state.Products.slice(0,action.index),
					...state.Products.slice(action.index +1)

				]
			}

		case GET_ALL_PRODUCTS:
			return{
				...state,
				Products: action.products,
				isFetching: false
			}

		case PUSH_SINGLE_PRODUCT:
			return{
				...state,
				Products: action.product,
				isFetching: false
			}


		case RESET_FETCH:
			return{
				...state,
				isFetching: true
			}

		case ORDERS_TO_STORE:
			return{
				...state,
				Orders: action.orders,
				isFetching: false
			}



		default:
			return state;
	}
}
export default ProductReducer;