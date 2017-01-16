/* eslint-disable */
import axios from 'axios';
import {browserHistory} from 'react-router';

//Product Actions
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const GRAB_SUPPLIER_PRODUCTS = 'GRAB_SUPPLIER_PRODUCTS';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCT_CATEGORY = 'GET_PRODUCT_CATEGORY';
export const PUSH_SINGLE_PRODUCT = 'PUSH_SINGLE_PRODUCT';


//Cart Actions
export const UPDATE_CART= 'UPDATE_CART';
export const RESET_CART= 'RESET_CART';
export const REMOVE_PRODUCT_FROM_CART= 'REMOVE_PRODUCT_FROM_CART';

//getting orders
export const ORDERS_TO_STORE= 'ORDERS_TO_STORE';
export const SINGLE_ORDER_TO_STORE= 'SINGLE_ORDER_TO_STORE';

//resets fetching for double render
export const RESET_FETCH= 'RESET_FETCH';

export const getProductCategory = (data) => dispatch => {

	return axios.post('/api/getProductCategory', data)
		.then((res) => {
			const {products} = res.data;
			dispatch(getAllProducts(products));
		})
		.catch((err)=> console.log(err));

}


export const grabSupplierProducts = (Products) => {
	return{
		type: GRAB_SUPPLIER_PRODUCTS,
		Products
	}
}

export const removeProduct = (index) => {
	return{
		type: REMOVE_PRODUCT,
		index
	}
}

export const updateProduct = (product) => {
	return{	
		type: UPDATE_PRODUCT,
		product
	}
}

export const getAllProducts = (products) => {

	return{	
		type: GET_ALL_PRODUCTS,
		products
	}
}

export const pushSingleProduct = (product) => {
	
	return{	
		type: PUSH_SINGLE_PRODUCT,
		product
	}
}

export const resetFetch = () => {
	
	return{	
		type: RESET_FETCH,
	}
}

export const addToCart = (product) => {
	
	return{	
		type: UPDATE_CART,
		product
	}
}

export const removeProductFromCart= (index) => {
	
	return{	
		type: REMOVE_PRODUCT_FROM_CART,
		index
	}
}
export const resetCart= () => {
	
	return{	
		type: RESET_CART,
	}
}

export const addOrdersToStore= (orders) => {
	
	return{	
		type: ORDERS_TO_STORE,
		orders
	}
}

export const singleOrderToStore= (order) => {
	
	return{	
		type: SINGLE_ORDER_TO_STORE,
		order
	}
}


