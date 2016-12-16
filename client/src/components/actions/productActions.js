export const POST_PRODUCT = 'POST_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const GRAB_SUPPLIER_PRODUCTS = 'GRAB_SUPPLIER_PRODUCTS';

export const grabSupplierProducts = (Products) => {
	return{
		type: GRAB_SUPPLIER_PRODUCTS,
		Products
	}
}

export const postProduct = (product) => {
	type: POST_PRODUCT,
	product
}

export const updateProduct = (product) => {
	
	type: UPDATE_PRODUCT,
	product
}