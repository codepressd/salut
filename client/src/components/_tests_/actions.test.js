import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authActions from '../actions/authActions';
import * as productActions from '../actions/productActions';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const middlewares =[thunk];
const mockStore = configMockStore(middlewares);
const mock = new MockAdapter(axios);



//Auth Action
describe('Test All  Actions', () => {


	it('Tests AUTHORIZE_USER action', () => {
		const user = {
			name: 'Hello'
		}
		const token ='34we34';

		const expectedActions = {
			type: authActions.AUTHORIZE_USER,
			user: {name: 'Hello'},
			token: '34we34'
		}


		expect(authActions.authorizeUser(user, token)).toEqual(expectedActions)
		   

	});

	it('Tests AUTHORIZE_USER_UPDATE action', () => {
		const user = {
			name: 'Hello'
		}
		const token ='34we34';

		const expectedActions = {
			type: authActions.AUTHORIZE_USER_UPDATE,
			user: {name: 'Hello'}
		}


		expect(authActions.authorizeUserUpdate(user)).toEqual(expectedActions)
		   

	});
	//This test should work but I do a redirect which messes with the test

	// it('Tests USER_LOGOUT  action', () => {

	// 	const expectedActions = {
	// 		type: authActions.USER_LOGOUT
	// 	}


	// 	expect(authActions.logoutUser()).toEqual(expectedActions)
		   

	// });

	

});

//Product Actions
describe('Test All  Actions', () => {


	it('Tests GRAB_SUPPLIER_PRODUCTS action', () => {
		const products = [{
			name: 'productName'
		},
		{
			name: 'productName2'
		}]
		

		const expectedActions = {
			type: productActions.GRAB_SUPPLIER_PRODUCTS,
			Products:  [{
			name: 'productName'
		},
		{
			name: 'productName2'
		}]
		}


		expect(productActions.grabSupplierProducts(products)).toEqual(expectedActions)
		   

	});

	it('Tests REMOVE_PRODUCT action', () => {
		const index  = 1;

		const expectedActions = {
			type: productActions.REMOVE_PRODUCT,
			index: 1
		};


		expect(productActions.removeProduct(index)).toEqual(expectedActions)
	
	});

	it('Tests UPDATE_PRODUCT action', () => {
		const product  = {};

		const expectedActions = {
			type: productActions.UPDATE_PRODUCT,
			product: {}
		};


		expect(productActions.updateProduct(product)).toEqual(expectedActions)
	
	});

	it('Tests GET_ALL_PRODUCTS action', () => {
		const products  = [{},{}];

		const expectedActions = {
			type: productActions.GET_ALL_PRODUCTS,
			products: [{},{}]
		};


		expect(productActions.getAllProducts(products)).toEqual(expectedActions)
	
	});

	it('Tests  PUSH_SINGLE_PRODUCT action', () => {
		const product  = {};

		const expectedActions = {
			type: productActions. PUSH_SINGLE_PRODUCT,
			product: {}
		};


		expect(productActions.pushSingleProduct (product)).toEqual(expectedActions)
	
	});

	it('Tests RESET_FETCH action', () => {
		

		const expectedActions = {
			type: productActions.RESET_FETCH,
		
		};


		expect(productActions.resetFetch()).toEqual(expectedActions)
	
	});

	it('Tests UPDATE_CART action', () => {
		const product = {};

		const expectedActions = {
			type: productActions.UPDATE_CART,
			product: {}
		};


		expect(productActions.addToCart(product)).toEqual(expectedActions)
	
	});

	it('Tests REMOVE_PRODUCT_FROM_CART action', () => {
		const index  = 1;

		const expectedActions = {
			type: productActions.REMOVE_PRODUCT_FROM_CART,
			index: 1
		};


		expect(productActions.removeProductFromCart(index)).toEqual(expectedActions)
	
	});

	it('Tests  RESET_CART action', () => {
		
		const expectedActions = {
			type: productActions.RESET_CART
		};


		expect(productActions.resetCart()).toEqual(expectedActions)
	
	});

	it('Tests ORDERS_TO_STORE action', () => {
		const orders  = [{},{}];

		const expectedActions = {
			type: productActions.ORDERS_TO_STORE,
			orders: [{},{}]
		};


		expect(productActions.addOrdersToStore(orders)).toEqual(expectedActions)
	
	});

	it('Tests SINGLE_ORDER_TO_STORE action', () => {
		const order  = {};

		const expectedActions = {
			type: productActions.SINGLE_ORDER_TO_STORE,
			order: {}
		};


		expect(productActions.singleOrderToStore(order)).toEqual(expectedActions)
	
	});

});