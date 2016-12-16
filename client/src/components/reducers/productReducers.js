import {GRAB_SUPPLIER_PRODUCTS} from '../actions/productActions';

const initialState ={
	Products: []
}

const ProductReducer = (state=initialState, action) => {
	console.log(action.products);
	switch(action.type){
		case GRAB_SUPPLIER_PRODUCTS:
			return{
				...state,
				Products: action.Products
			}

		default:
			return state;
	}
}
export default ProductReducer;