export const POST_PRODUCT = 'POST_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const GET_SUPPLIER_PRODUCTS = 'GET_SUPPLIER_PRODUCTS';

export const getSupplierProducts = (supplierId) => {
	type: GET_SUPPLIER_PRODUCTS,
	supplierId
}

export const postProduct = (product) => {
	type: POST_PRODUCT,
	product
}

export const updateProduct = (product) => {
	
	type: UPDATE_PRODUCT,
	product
}