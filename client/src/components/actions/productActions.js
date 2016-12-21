export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const GRAB_SUPPLIER_PRODUCTS = 'GRAB_SUPPLIER_PRODUCTS';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const PUSH_SINGLE_PRODUCT = 'PUSH_SINGLE_PRODUCT';
export const UPDATE_CART= 'UPDATE_CART';
export const RESET_FETCH= 'RESET_FETCH';

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

export const updateCart = (product) => {
	
	return{	
		type: UPDATE_CART,
		product
	}
}
