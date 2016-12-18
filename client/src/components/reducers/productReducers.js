import {GRAB_SUPPLIER_PRODUCTS, REMOVE_PRODUCT} from '../actions/productActions';

const initialState ={
	Products: []
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

		default:
			return state;
	}
}
export default ProductReducer;