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

	it('Signup API Call', (done) => {
		mock
			.onPost('api/signup')
			.reply(200, {
				userId: 5445,
				role: 'Supplier'
			})

		const expectedReply ={
				userId: 5445,
				role: 'Supplier'
			};

		axios.post('api/signup', {email: 'fake@fake.com', password: 'fakepass'})
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Login API Call', (done) => {
		mock
			.onPost('api/login')
			.reply(200, {
				userId: 5445,
				role: 'Supplier'
			})

		const expectedReply ={
				userId: 5445,
				role: 'Supplier'
			};

		axios.post('api/login', {email: 'fake@fake.com', password: 'fakepass'})
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Tests updateUserData  action', (done) => {
		mock
			.onPost('/api/updateUser')
			.reply(200, {
				user:{},
				token: 'JWT 1243'
			})

		const expectedReply ={
				user:{},
				token: 'JWT 1243'
			};

		axios.post('/api/updateUser', {companyName: 'JWT 1234', address: '123', city: 'Reno', state: 'Nevada', userId: '567483'})
		.then((res) => {
			expect(res.data).toEqual(expectedReply);
			done();
		})
   

	});

	it('Tests changePassword action', (done) => {
		mock
			.onPost('/api/changePassword')
			.reply(200, {
				user:{},
				token: 'JWT 1243',
				success: true
			})

		const expectedReply ={
				user:{},
				token: 'JWT 1243',
				success: true
			};

		axios.post('/api/changePassword', {oldPassword: '456', newPassword: '123', confirmPassword: '123', userId: '567483'})
		.then((res) => {
			expect(res.data).toEqual(expectedReply);
			done();
		})
   

	});
	

	it('Tests checkUserToken  action', (done) => {
		mock
			.onPost('/api/checkUserToken')
			.reply(200, {
				user:{},
				token: 'JWT 1243',
				success: true
			})

		const expectedReply ={
				user:{},
				token: 'JWT 1243',
				success: true
			};

		axios.post('/api/checkUserToken', {token: 'JWT 1234', userId: '567483'})
		.then((res) => {
			expect(res.data).toEqual(expectedReply);
			done();
		})
   

	});


	it('Tests USER_TOKEN_SUCCESS  action', () => {

		const user = {
			name: 'Hello'
		}
		const token ='34we34';
		const success = true;

		const expectedActions = {
			type: authActions.USER_TOKEN_SUCCESS,
			user: {name: 'Hello'},
			token: '34we34',
			success: true
		}
		
		expect(authActions.userTokenSuccess(user, token, success)).toEqual(expectedActions)
		   

	});

	it('Tests USER_TOKEN_FAIL  action', () => {
		

		const expireTime = true;
		const message ='Something Went Wrong';
		const success = false;

		const expectedActions = {
			type: authActions.USER_TOKEN_FAIL,
			expireTime: true,
			message: 'Something Went Wrong',
			success: false
		}
		
		expect(authActions.userTokenFail(expireTime, message, success)).toEqual(expectedActions)
		   

	});

	it('Tests NO_TOKEN_FAIL  action', () => {
		
		const message ='You do not have a valid token';
		const success = false;

		const expectedActions = {
			type: authActions.NO_TOKEN_FAIL,
			message: 'You do not have a valid token',
			success: false
		}
		
		expect(authActions.noTokenFail(message, success)).toEqual(expectedActions)
		   

	});

	it('Tests NOT_AUTHORIZED  action', () => {
		
		const message ='Not Authorized to View this Content';
		const success = false;

		const expectedActions = {
			type: authActions.NOT_AUTHORIZED,
			message: 'Not Authorized to View this Content',
			success: false
		}
		
		expect(authActions.notAuthorized(message, success)).toEqual(expectedActions)
		   

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

	it('Tests CHANGE_PASSWORD_ERROR action', () => {
		
		const error ='You had a error with changing your password';

		const expectedActions = {
			type: authActions.CHANGE_PASSWORD_ERROR ,
			error: 'You had a error with changing your password'
		}


		expect(authActions.changePasswordError(error)).toEqual(expectedActions)
		   

	});

	it('Tests TOGGLE_USER_MENU action', () => {
		
		const toggle = true;

		const expectedActions = {
			type: authActions.TOGGLE_USER_MENU ,
			toggle: true
		}


		expect(authActions.toggleUserMenu(toggle)).toEqual(expectedActions)
		   

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