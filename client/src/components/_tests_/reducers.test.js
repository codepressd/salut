import  authReducer from '../reducers/authReducers';
import productReducer from '../reducers/productReducers';




describe('Test authReducers', () => {


	it('AUTHORIZE_USER State ', () => {

		const initialState = {
			user: null,
			error: null,
			cart: [],
			token: null
		}

		const actions = {
			type: 'AUTHORIZE_USER',
			user: {name: 'username'},
			token: '34wer3w'
		}

		const newState = authReducer(initialState, actions);

		expect(newState).toEqual({user: {name:'username'}, error: null, cart:[], token:'34wer3w'});
		
      	});
	//for some reason this test is failing??
      	it('AUTHORIZE_ERROR State ', () => {

		const initialState = {
			user: null,
			error: null,
			cart: [],
			token: null
		}

		const actions = {
			type: 'AUTHORIZE_ERROR',
			error: 'there was an error'
		}

		const newState = authReducer(initialState, actions);

		expect(newState).toEqual({user: null, error: null, cart:[], token: null});
		
      	});	

      	it('AUTHORIZE_USER_UPDATE State ', () => {

		const initialState = {
			user: null,
			error: null,
			cart: [],
			token: 'hello'
		}

		const actions = {
			type: 'AUTHORIZE_USER',
			user: {name: 'username'},
			token: '34wer3w'
		}

		const newState = authReducer(initialState, actions);

		expect(newState).toEqual({user: {name:'username'}, error: null, cart:[], token:'34wer3w'});
		
      	});	

      	it('USER_LOGOUT State ', () => {

		const initialState = {
			user: null,
			error: null,
			cart: [],
			token: null
		}

		const actions = {
			type: 'USER_LOGOUT',
		}

		const newState = authReducer(initialState, actions);

		expect(newState).toEqual({user: null, error: null, cart:[], token: null});
		
      	});	

      	it('UPDATE_CART State ', () => {

		const initialState = {
			user: null,
			error: null,
			cart: [],
			token: '34wer3w'
		}

		const actions = {
			type: 'UPDATE_CART',
			product: [{},{}]
		}

		const newState = authReducer(initialState, actions);

		expect(newState).toEqual({user: null, error: null, cart:[{},{}], token:'34wer3w'});
		
      	});	

      	it('REMOVE_PRODUCT_FROM_CART State ', () => {

		const initialState = {
			user: null,
			error: null,
			cart: [{},{},{}],
			token: '34wer3w'
		}

		const actions = {
			type: 'REMOVE_PRODUCT_FROM_CART',
			index: 1
		}

		const newState = authReducer(initialState, actions);

		expect(newState).toEqual({user:null, error: null, cart:[{},{}], token:'34wer3w'});
		
      	});	

      	it('RESET_CART State ', () => {

		const initialState = {
			user: null,
			error: null,
			cart: [{},{}],
			token: '34wer3w'
		}

		const actions = {
			type: 'RESET_CART',
		
		}

		const newState = authReducer(initialState, actions);

		expect(newState).toEqual({user: null, error: null, cart:[], token:'34wer3w'});
		
      	});			   

});

//Product Reducers Tests

describe('Test Product Reducers', () => {


	it('GRAB_SUPPLIER_PRODUCTS State ', () => {

		const initialState ={
			Products: [],
			isFetching: true
		};

		const actions = {
			type: 'GRAB_SUPPLIER_PRODUCTS',
			Products: [{},{}]
		}

		const newState = productReducer(initialState, actions);

		expect(newState).toEqual({Products:[{},{}], isFetching: true});
		
      	});

	it('REMOVE_PRODUCT State ', () => {

		const initialState ={
			Products: [{},{},{}],
			isFetching: true
		};

		const actions = {
			type: 'REMOVE_PRODUCT',
			index: 1
		}

		const newState = productReducer(initialState, actions);

		expect(newState).toEqual({Products:[{},{}], isFetching: true});
		
      	});

	it('GET_ALL_PRODUCTS State ', () => {

		const initialState ={
			Products: [],
			isFetching: true
		};

		const actions = {
			type: 'GET_ALL_PRODUCTS',
			products: [{},{}]
		}

		const newState = productReducer(initialState, actions);

		expect(newState).toEqual({Products:[{},{}], isFetching: false});
		
      	});

	it('PUSH_SINGLE_PRODUCT State ', () => {

		const initialState ={
			Products: [],
			isFetching: true
		};

		const actions = {
			type: 'PUSH_SINGLE_PRODUCT',
			product: {}
		}

		const newState = productReducer(initialState, actions);

		expect(newState).toEqual({Products:{}, isFetching: false});
		
      	});

	it('RESET_FETCH State ', () => {

		const initialState ={
			Products: [],
			isFetching: false
		};

		const actions = {
			type: 'RESET_FETCH',
			
		}

		const newState = productReducer(initialState, actions);

		expect(newState).toEqual({Products:[], isFetching: true});
		
      	});

	it('ORDERS_TO_STORE State ', () => {

		const initialState ={
			Products: [],
			isFetching: true
		};

		const actions = {
			type: 'ORDERS_TO_STORE',
			orders: [{},{}]
		}

		const newState = productReducer(initialState, actions);

		expect(newState).toEqual({Orders: [{},{}], Products:[], isFetching: false});
		
      	});

	it('SINGLE_ORDER_TO_STORE State ', () => {

		const initialState ={
			Products: [],
			isFetching: true
		};

		const actions = {
			type: 'SINGLE_ORDER_TO_STORE',
			order: {},

		}

		const newState = productReducer(initialState, actions);

		expect(newState).toEqual({ Order: {}, Products: [], isFetching: false});
		
      	});

});